import type { PropertyValues } from "lit";
import { LitElement, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { state } from "lit/decorators";
import type { ForecastEvent, WeatherEntity } from "./weather";
import { subscribeForecast } from "./weather";
import type { HomeAssistant } from "custom-card-helpers";
import { LovelaceGridOptions, SunCoordinates, WeatherForecastExtendedConfig } from "./types";
import { styles } from "./weather-forecast-extended.styles";
import { DEFAULT_WEATHER_IMAGE, WeatherImages } from "./weather-images";
import "./components/wfe-daily-list";
import "./components/wfe-hourly-list";
import { enableMomentumScroll } from "./utils/momentum-scroll";
import type { HassEntity } from "home-assistant-js-websocket";
import SunCalc from "suncalc";

const MISSING_ATTRIBUTE_TEXT = "missing";

// Private types
type ForecastType = "hourly" | "daily";
type SubscriptionMap = Record<ForecastType, Promise<() => void> | undefined>;

export class WeatherForecastExtended extends LitElement {
  // internal reactive states
  @state() private _config: WeatherForecastExtendedConfig;
  @state() private _header: string | typeof nothing;
  @state() private _entity: string;
  @state() private _name: string;
  @state() private _state: WeatherEntity;
  @state() private _status: string;
  @state() private _headerTemperatureState?: HassEntity;
  @state() private _forecastDailyEvent?: ForecastEvent;
  @state() private _forecastHourlyEvent?: ForecastEvent;
  @state() private _dailyGap?: number;
  @state() private _hourlyGap?: number;

  // private property
  private _subscriptions: SubscriptionMap = { hourly: undefined, daily: undefined };
  private _resizeObserver?: ResizeObserver;
  private _oldContainerWidth?: number;
  private _hourlyMinTemp?: number;
  private _hourlyMaxTemp?: number;
  private _dailyMinTemp?: number;
  private _dailyMaxTemp?: number;
  private _hass;
  private _momentumCleanup: Partial<Record<ForecastType, () => void>> = {};
  private _momentumElement: Partial<Record<ForecastType, HTMLElement>> = {};
  private _sunCoordinateCacheKey?: string;
  private _sunCoordinateCache?: SunCoordinates;

  // Called by HA
  setConfig(config: WeatherForecastExtendedConfig) {
    // Validate config for attributes to show in the header (also limit to 3 in case user adds more in YAML mode)
    const normalizedHeaderAttributes = Array.isArray(config.header_attributes)
      ? config.header_attributes
        .filter((attr, index) => index < 3 && typeof attr === "string")
        .map(attr => attr.trim())
        .filter(attr => attr.length > 0)
      : [];

    const defaults: WeatherForecastExtendedConfig = {
      type: "custom:weather-forecast-extended-card",
      ...config,
      show_header: config.show_header ?? true,
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      orientation: config.orientation ?? "vertical",
      show_sun_times: config.show_sun_times ?? false,
      sun_use_home_coordinates: config.sun_use_home_coordinates ?? true,
      use_night_header_backgrounds: config.use_night_header_backgrounds ?? true,
      header_attributes: normalizedHeaderAttributes,
    };

    this._config = defaults;
    this._entity = defaults.entity;
    // call set hass() to immediately adjust to a changed entity
    // while editing the entity in the card editor
    if (this._hass) {
      this.hass = this._hass;
    }
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._state = hass.states[this._entity] as WeatherEntity;

    if (this._state) {
      this._status = this._state.state;
      const fn = this._state.attributes.friendly_name;
      this._name = fn ? fn : this._entity;
    }

    const headerTemperatureEntity = this._config?.header_temperature_entity;
    this._headerTemperatureState = headerTemperatureEntity
      ? (hass.states[headerTemperatureEntity] as HassEntity | undefined)
      : undefined;
  }

  public getGridOptions(): LovelaceGridOptions {
    if (!this._config) {
      return {
        columns: 12,
        rows: 3,
        min_columns: 6,
        min_rows: 3,
      };
    }

    const orientation = this._config.orientation ?? "vertical";
    const showHeader = this._config.show_header !== false;
    const showDaily = this._config.daily_forecast !== false;
    const showHourly = this._config.hourly_forecast !== false;

    let rows = 3;

    if (orientation === "horizontal") {
      if (!showDaily && !showHourly) {
        rows = showHeader ? 3 : 3;
      } else if (showDaily && showHourly) {
        rows = showHeader ? 6 : 5;
      } else {
        rows = showHeader ? 5 : 4;
      }
    } else {
      let computed = 0;
      if (showHeader) {
        computed += 3;
      }
      if (showDaily) {
        computed += 3;
      }
      if (showHourly) {
        computed += 2;
      }
      if (showDaily && showHourly) {
        computed += 1;
      }
      if (!showHeader && showDaily && showHourly) {
        computed += 1;
      }

      if (!showHeader && (showDaily || showHourly)) {
        computed = Math.max(computed, 4);
      }

      if (!showHeader && !showDaily && !showHourly) {
        computed = 3;
      }

      rows = Math.max(computed, 3);
    }

    const minRows = rows;

    return {
      columns: 12,
      rows,
      min_columns: orientation === "horizontal" ? 12 : 6,
      min_rows: minRows,
    };
  }

  // Load styles using LitElement
  static styles = styles;

  static async getConfigElement() {
    await import("./editor/weather-forecast-extended-editor");
    return document.createElement("weather-forecast-extended-editor");
  }

  static getStubConfig(hass: HomeAssistant): WeatherForecastExtendedConfig {
    const weatherEntity = Object.keys(hass?.states ?? {}).find(entityId => entityId.startsWith("weather."));
    return {
      type: "custom:weather-forecast-extended-card",
      entity: weatherEntity ?? "weather.home",
      header_attributes: [],
      show_header: true,
      hourly_forecast: true,
      daily_forecast: true,
      orientation: "vertical",
      use_night_header_backgrounds: true,
    };
  }

  // Forecast subscriptions
  private _needForecastSubscription() {
    return (
      this._config.daily_forecast || this._config.hourly_forecast
    );
  }

  private _unsubscribeForecastEvents() {
    (Object.values(this._subscriptions) as Promise<() => void>[]).forEach(sub => {
      sub?.then(unsub => unsub());
    });
    this._subscriptions = { hourly: undefined, daily: undefined };
  }

  private async _subscribeForecast(type: ForecastType) {
    if (this._subscriptions[type]) return;

    this._subscriptions[type] = subscribeForecast(
      this._hass,
      this._entity,
      type,
      (event) => {
        if (type === "hourly") this._forecastHourlyEvent = event;
        if (type === "daily") this._forecastDailyEvent = event;
        this._calculateMinMaxTemps();
         // Hourly translation dimensions recalculation happens inside wfe-hourly-list
      }
    ).catch(e => {
      this._subscriptions[type] = undefined;
      throw e;
    });
  }

  private async _subscribeForecastEvents() {
    this._unsubscribeForecastEvents();

    const shouldSubscribe =
      this.isConnected &&
      this._hass &&
      this._config &&
      this._needForecastSubscription() &&
      this._hass.config.components.includes("weather") &&
      this._state;

    if (!shouldSubscribe) return;

    (["hourly", "daily"] as ForecastType[]).forEach(type => {
      const configKey = `${type}_forecast` as "hourly_forecast" | "daily_forecast";
      if (this._config[configKey]) {
        this._subscribeForecast(type);
      }
    });
  }

   // Lit callbacks
  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && this._config && this._hass) {
      this._subscribeForecastEvents();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeForecastEvents();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    Object.values(this._momentumCleanup).forEach(cleanup => cleanup?.());
    this._momentumCleanup = {};
    this._momentumElement = {};
  }

  updated(changedProps: PropertyValues) {
     super.updated(changedProps);

    const forecastHourlyChanged = changedProps.has("_forecastHourlyEvent");
    const forecastDailyChanged = changedProps.has("_forecastDailyEvent");

    if (forecastHourlyChanged || forecastDailyChanged) {
      this._calculateMinMaxTemps();
    }

    if (!this._config || !this._hass) {
      return;
    }

    if (changedProps.has("_config") || (!this._subscriptions.hourly && !this._subscriptions.daily)) {
      this._subscribeForecastEvents();
    }

    const card = this.shadowRoot.querySelector('ha-card') as HTMLElement;
    const daily = this.shadowRoot.querySelector('.forecast.daily') as HTMLElement;
    const hourly = this.shadowRoot.querySelector('.forecast.hourly') as HTMLElement;

    if (daily) {
      this._initDragScroll("daily", daily);
    } else {
      this._teardownDragScroll("daily");
    }

    if (hourly) {
      this._initDragScroll("hourly", hourly);
    } else {
      this._teardownDragScroll("hourly");
    }

    if (!this._resizeObserver) {

      if (!card || (!daily && !hourly))
        return;

       this._resizeObserver = new ResizeObserver(() => {
         this._updateGap();
       });
      this._resizeObserver.observe(card);

      // Call once for the initial size
      this._updateGap()

  // Hourly translation heights are handled inside wfe-hourly-list
    }
  }

  // Render methods
  render() {
    if (!this._config || !this._hass)
      return nothing;

    if (!this._state) {
      return html`
        <hui-warning>
          ${this._name} not found.
        </hui-warning>
      `;
    }

    if (this._status === "unavailable") {
      return html`
        <ha-card class="unavailable">
          <p>${this._name} is unavailable.</p>
        </ha-card>
      `;
    }

    const dailyEnabled = this._config.daily_forecast !== false;
    const hourlyEnabled = this._config.hourly_forecast !== false;
    const showHeader = this._config.show_header !== false;
    const showForecasts = dailyEnabled || hourlyEnabled;
    const showForecastDivider = dailyEnabled && hourlyEnabled;
    const dailyForecast = this._forecastDailyEvent?.forecast ?? [];
    const hourlyForecast = this._forecastHourlyEvent?.forecast ?? [];
    const sunCoordinates = this._resolveSunCoordinates();
    const showSunTimes = Boolean(this._config.show_sun_times && sunCoordinates && hourlyEnabled);
    const orientation = this._config.orientation ?? "vertical";
    const containerClassMap = {
      "forecast-container": true,
      "orientation-horizontal": orientation === "horizontal",
      "orientation-vertical": orientation !== "horizontal",
    };

    const headerClassMap = {
      weather: true,
      "header-only": showHeader && !showForecasts,
    };

    const hasContent = showHeader || dailyEnabled || hourlyEnabled;

    const dailyStyle = this._dailyGap !== undefined
      ? styleMap({ "--dynamic-gap": `${this._dailyGap}px` })
      : nothing;

    const hourlyStyle = (() => {
      const styles: Record<string, string> = {};
      if (this._hourlyGap !== undefined) {
        styles["--dynamic-gap"] = `${this._hourlyGap}px`;
      }
      if (this._hourlyMinTemp !== undefined && this._hourlyMaxTemp !== undefined) {
        styles["--min-temp"] = `${this._hourlyMinTemp}`;
        styles["--max-temp"] = `${this._hourlyMaxTemp}`;
      }
      return Object.keys(styles).length ? styleMap(styles) : nothing;
    })();

    if (!hasContent) {
      const cardLabel = this._name || this._entity;
      return html`
        <hui-warning>
          ${cardLabel} has no sections enabled.
        </hui-warning>
      `;
    }

    const headerAttributes = this._computeHeaderAttributes();

    return html`
      <ha-card>
        ${showHeader
          ? html`
            <div
              class=${classMap(headerClassMap)}
              style=${`background-image: url(${this._getWeatherBgImage(this._state.state)})`}
            >
              <div class="header-content">
                ${headerAttributes.length
                  ? html`
                    <div class="header-attributes">
                      ${headerAttributes.map(({ attribute, display, missing }) => {
                        const chipClassMap = {
                          "attribute-chip": true,
                          missing,
                        };
                        const chipTitle = `${attribute}: ${display}`;
                        return html`
                          <div
                            class=${classMap(chipClassMap)}
                            title=${chipTitle}
                          >
                            ${display}
                          </div>
                        `;
                      })}
                    </div>
                  `
                  : nothing}
                <div class="header-main">
                  <div class="temp">${this._computeHeaderTemperature()}</div>
                  <div class="condition">${this._hass.formatEntityState(this._state) || this._state.state}</div>
                </div>
              </div>
            </div>
          `
          : nothing}
        ${showHeader && showForecasts
          ? html`<div class="divider card-divider"></div>`
          : nothing}
        ${showForecasts
          ? html`
            <div class=${classMap(containerClassMap)}>
              ${dailyEnabled
                ? html`
                  <div class="forecast-daily-container">
                    <div class="fade-left"></div>
                    <div class="fade-right"></div>
                    <div class="forecast daily" style=${dailyStyle}>
                      <wfe-daily-list
                        .hass=${this._hass}
                        .forecast=${dailyForecast}
                        .min=${this._dailyMinTemp}
                        .max=${this._dailyMaxTemp}
                        @wfe-daily-selected=${this._handleDailySelected}
                      ></wfe-daily-list>
                    </div>
                  </div>
                `
                : nothing}
              ${showForecastDivider
                ? html`<div class="divider forecast-divider"></div>`
                : nothing}
              ${hourlyEnabled
                ? html`
                  <div class="forecast-hourly-container">
                    <div class="fade-left"></div>
                    <div class="fade-right"></div>
                    <div
                      class="forecast hourly"
                      style=${hourlyStyle}
                    >
                      <wfe-hourly-list
                        .hass=${this._hass}
                        .forecast=${hourlyForecast}
                        .showSunTimes=${showSunTimes}
                        .sunCoordinates=${sunCoordinates}
                      ></wfe-hourly-list>
                    </div>
                  </div>
                `
                : nothing}
            </div>
          `
          : nothing}
      </ha-card>
    `;
  }

  // Private methods

  // Header temperature from configured sensor or weather entity attribute
  private _computeHeaderTemperature(): string {
    if (!this._hass || !this._state) {
      return "";
    }

    const sensorState = this._headerTemperatureState;
    if (sensorState && !this._isStateUnavailable(sensorState.state)) {
      const formattedSensor = this._hass.formatEntityState(sensorState);
      return formattedSensor || sensorState.state;
    }

    const formattedWeather = this._hass.formatEntityAttributeValue(this._state, "temperature");
    return formattedWeather || this._state.state || "";
  }

  private _isStateUnavailable(state?: string): boolean {
    if (!state) {
      return true;
    }

    const normalized = state.toLowerCase();
    return normalized === "unavailable" || normalized === "unknown";
  }

  // Header attributes (up to 3)
  private _computeHeaderAttributes(): Array<{ attribute: string; display: string; missing: boolean }> {
    if (!this._config?.header_attributes?.length || !this._state || !this._hass) {
      return [];
    }

    return this._config.header_attributes.slice(0, 3).map(attribute => this._formatHeaderAttribute(attribute));
  }

  // Format a single header attribute
  private _formatHeaderAttribute(attribute: string): { attribute: string; display: string; missing: boolean } {
    if (!this._state || !this._hass) {
      return { attribute, display: MISSING_ATTRIBUTE_TEXT, missing: true };
    }

    // Check if attribute exists on the entity
    const hasAttribute = Object.prototype.hasOwnProperty.call(this._state.attributes, attribute);
    if (!hasAttribute) {
      return { attribute, display: MISSING_ATTRIBUTE_TEXT, missing: true };
    }

    const rawValue = (this._state.attributes as unknown as Record<string, unknown>)[attribute];

    if (rawValue === undefined || rawValue === null) {
      return { attribute, display: MISSING_ATTRIBUTE_TEXT, missing: true };
    }

    // Try to format the attribute value using Home Assistant's built-in formatter
    const formattedValue = this._hass.formatEntityAttributeValue(this._state, attribute);
    const resolvedValue = formattedValue !== undefined && formattedValue !== null && formattedValue !== ""
      ? formattedValue
      : rawValue;

    if (resolvedValue === undefined || resolvedValue === null) {
      return { attribute, display: MISSING_ATTRIBUTE_TEXT, missing: true };
    }

    if (typeof resolvedValue === "string") {
      if (resolvedValue.trim().length === 0) {
        return { attribute, display: MISSING_ATTRIBUTE_TEXT, missing: true };
      }
      return { attribute, display: resolvedValue, missing: false };
    }

    if (typeof resolvedValue === "number" || typeof resolvedValue === "boolean") {
      return { attribute, display: String(resolvedValue), missing: false };
    }

    return { attribute, display: JSON.stringify(resolvedValue), missing: false };
  }

  private _calculateMinMaxTemps() {
    let hourlyMin: number | undefined;
    let hourlyMax: number | undefined;
    let dailyMin: number | undefined;
    let dailyMax: number | undefined;

    if (this._forecastHourlyEvent?.forecast?.length) {
      const temps = this._forecastHourlyEvent.forecast
        .map(item => item.temperature)
        .filter(temp => typeof temp === "number");
      hourlyMin = temps.length ? Math.min(...temps) : undefined;
      hourlyMax = temps.length ? Math.max(...temps) : undefined;
    }

    if (this._forecastDailyEvent?.forecast?.length) {
      const dailyTemps = this._forecastDailyEvent.forecast.flatMap(item =>
        [item.temperature, item.templow].filter(temp => typeof temp === "number")
      );
      dailyMin = dailyTemps.length ? Math.min(...dailyTemps) : undefined;
      dailyMax = dailyTemps.length ? Math.max(...dailyTemps) : undefined;
    }

    this._hourlyMinTemp = hourlyMin;
    this._hourlyMaxTemp = hourlyMax;
    this._dailyMinTemp = dailyMin;
    this._dailyMaxTemp = dailyMax;
  }

  private _getLocationCoordinates(): SunCoordinates | undefined {
    if (!this._config) {
      this._sunCoordinateCacheKey = undefined;
      this._sunCoordinateCache = undefined;
      return undefined;
    }

    const useHome = this._config.sun_use_home_coordinates ?? true;
    const latitude = useHome
      ? this._parseCoordinate(this._hass?.config?.latitude, -90, 90)
      : this._parseCoordinate(this._config.sun_latitude, -90, 90);
    const longitude = useHome
      ? this._parseCoordinate(this._hass?.config?.longitude, -180, 180)
      : this._parseCoordinate(this._config.sun_longitude, -180, 180);

    if (latitude === undefined || longitude === undefined) {
      this._sunCoordinateCacheKey = undefined;
      this._sunCoordinateCache = undefined;
      return undefined;
    }

    const key = `${latitude},${longitude}`;
    if (this._sunCoordinateCacheKey === key && this._sunCoordinateCache) {
      return this._sunCoordinateCache;
    }

    const coords: SunCoordinates = { latitude, longitude };
    this._sunCoordinateCacheKey = key;
    this._sunCoordinateCache = coords;
    return coords;
  }

  private _resolveSunCoordinates(): SunCoordinates | undefined {
    if (!this._config?.show_sun_times) {
      return undefined;
    }

    return this._getLocationCoordinates();
  }

  private _parseCoordinate(value: number | string | undefined, min: number, max: number): number | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    const numericValue = typeof value === "number" ? value : parseFloat(value);
    if (!Number.isFinite(numericValue)) {
      return undefined;
    }

    if (numericValue < min || numericValue > max) {
      return undefined;
    }

    return numericValue;
  }

  private _getWeatherBgImage(state: string): string {
    const variants = WeatherImages[state.replace(/-/g, '')];
    const useNightBackgrounds = this._config?.use_night_header_backgrounds !== false;
    const isDaytime = useNightBackgrounds ? this._isDaytimeNow() : true;
    const fallback = useNightBackgrounds && !isDaytime
      ? DEFAULT_WEATHER_IMAGE.night
      : DEFAULT_WEATHER_IMAGE.day;

    if (!variants) {
      return fallback;
    }

    if (!useNightBackgrounds) {
      return variants.day;
    }

    return isDaytime ? variants.day : variants.night;
  }

  private _isDaytimeNow(): boolean {
    const attributeValue = this._state?.attributes?.is_daytime;
    if (typeof attributeValue === "boolean") {
      return attributeValue;
    }

    const coordinates = this._getLocationCoordinates();
    if (!coordinates) {
      return true;
    }

    const now = new Date();
    const times = SunCalc.getTimes(now, coordinates.latitude, coordinates.longitude);
    const sunrise = times.sunrise?.getTime();
    const sunset = times.sunset?.getTime();

    if (typeof sunrise !== "number" || Number.isNaN(sunrise) || typeof sunset !== "number" || Number.isNaN(sunset)) {
      return true;
    }

    const nowTime = now.getTime();
    if (sunrise <= sunset) {
      return nowTime >= sunrise && nowTime < sunset;
    }

    return nowTime >= sunrise || nowTime < sunset;
  }

  private _updateGap() {
    const container = this.shadowRoot.querySelector('ha-card') as HTMLElement | null;
    const daily = this.shadowRoot.querySelector('.forecast.daily') as HTMLElement | null;
    const hourly = this.shadowRoot.querySelector('.forecast.hourly') as HTMLElement | null;
    if (!container || (!daily && !hourly)) {
      return;
    }

    const containerWidth = container.clientWidth;
    if (containerWidth === this._oldContainerWidth) {
      return;
    }

    const computeGap = (elem: HTMLElement | null): number | undefined => {
      if (!elem) {
        return undefined;
      }
      const styles = getComputedStyle(elem);
      const itemWidth = parseInt(styles.getPropertyValue("--icon-container-width"));
      const minGap = parseInt(styles.getPropertyValue("--min-gap"));
      if (Number.isNaN(itemWidth) || Number.isNaN(minGap)) {
        return undefined;
      }
      const padding = 16;
      const maxItems = Math.floor((containerWidth + minGap - 2 * padding) / (itemWidth + minGap));
      if (maxItems < 2) {
        return undefined;
      }
      const totalItemWidth = maxItems * itemWidth;
      return Math.round((containerWidth - 2 * padding - totalItemWidth) / (maxItems - 1));
    };

    const dailyGap = computeGap(daily);
    if (dailyGap !== undefined && dailyGap !== this._dailyGap) {
      this._dailyGap = dailyGap;
    } else if (dailyGap === undefined && this._dailyGap !== undefined) {
      this._dailyGap = undefined;
    }

    const hourlyGap = computeGap(hourly);
    if (hourlyGap !== undefined && hourlyGap !== this._hourlyGap) {
      this._hourlyGap = hourlyGap;
    } else if (hourlyGap === undefined && this._hourlyGap !== undefined) {
      this._hourlyGap = undefined;
    }

    this._oldContainerWidth = containerWidth;
  }

  private _teardownDragScroll(type: ForecastType) {
    if (this._momentumCleanup[type]) {
      this._momentumCleanup[type]!();
      delete this._momentumCleanup[type];
      delete this._momentumElement[type];
    }
  }

  private _initDragScroll(type: ForecastType, container: HTMLElement) {
    if (this._momentumElement[type] === container) {
      return;
    }

    this._teardownDragScroll(type);

    this._momentumElement[type] = container;
    this._momentumCleanup[type] = enableMomentumScroll(container, {
      snapSelector: ".forecast-item",
    });
  }

  private _handleDailySelected(ev: CustomEvent<{ datetime: string }>) {
    const datetime = ev.detail?.datetime;
    if (!datetime || !this._forecastHourlyEvent?.forecast?.length) {
      return;
    }

    const targetDate = new Date(datetime);
    const targetDay = targetDate.getDate();
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    const hourlyForecast = this._forecastHourlyEvent.forecast;
    const targetIndex = hourlyForecast.findIndex((entry) => {
      const entryDate = new Date(entry.datetime);
      return (
        entryDate.getDate() === targetDay &&
        entryDate.getMonth() === targetMonth &&
        entryDate.getFullYear() === targetYear
      );
    });

    const hourlyContainer = this.shadowRoot?.querySelector<HTMLElement>(".forecast.hourly");
    if (!hourlyContainer) {
      return;
    }

    if (targetIndex <= 0) {
      hourlyContainer.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const hourlyItems = Array.from(hourlyContainer.querySelectorAll<HTMLElement>(".forecast-item"));
    const targetItem = hourlyItems[targetIndex];
    if (!targetItem) {
      return;
    }

    const containerRect = hourlyContainer.getBoundingClientRect();
    const itemRect = targetItem.getBoundingClientRect();
    const offset = itemRect.left - containerRect.left + hourlyContainer.scrollLeft - 16; // account for padding

    hourlyContainer.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }
}
