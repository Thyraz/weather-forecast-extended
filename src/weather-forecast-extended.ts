import type { PropertyValues } from "lit";
import { LitElement, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { state } from "lit/decorators";
import type { ForecastEvent, WeatherEntity } from "./weather";
import { subscribeForecast } from "./weather";
import type { HomeAssistant } from "custom-card-helpers";
import { LovelaceGridOptions, SunCoordinates, WeatherForecastExtendedConfig } from "./types";
import { styles } from "./weather-forecast-extended.styles";
import { WeatherImages } from './weather-images';
import "./components/wfe-daily-list";
import "./components/wfe-hourly-list";
import { enableMomentumScroll } from "./utils/momentum-scroll";

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
  @state() private _forecastDailyEvent?: ForecastEvent;
  @state() private _forecastHourlyEvent?: ForecastEvent;

  // private property
  private _subscriptions: SubscriptionMap = { hourly: undefined, daily: undefined };
  private _resizeObserver: ResizeObserver;
  private _oldContainerWidth: number;
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
    const defaults: WeatherForecastExtendedConfig = {
      type: "custom:weather-forecast-extended-card",
      ...config,
      show_header: config.show_header ?? true,
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      orientation: config.orientation ?? "vertical",
      show_sun_times: config.show_sun_times ?? false,
      sun_use_home_coordinates: config.sun_use_home_coordinates ?? true,
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
  }

  public getGridOptions(): LovelaceGridOptions {
    const minRows = 3;
    var rows = 2.5;
    rows += this._config.daily_forecast !== false ? 3 : 0;
    rows += this._config.hourly_forecast !== false ? 2.5 : 0;

    rows = Math.floor(rows);

    return {
      columns: 12,
      rows: rows,
      min_columns: 6,
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
      show_header: true,
      hourly_forecast: true,
      daily_forecast: true,
      orientation: "vertical",
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

    const showDaily = Boolean(this._config.daily_forecast && this._forecastDailyEvent?.forecast?.length);
    const showHourly = Boolean(this._config.hourly_forecast && this._forecastHourlyEvent?.forecast?.length);
    const showHeader = this._config.show_header !== false;
    const showForecasts = showDaily || showHourly;
    const showForecastDivider = showDaily && showHourly;
    const sunCoordinates = this._resolveSunCoordinates();
    const showSunTimes = Boolean(this._config.show_sun_times && sunCoordinates);
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

    const hasContent = showHeader || showForecasts;

    if (!hasContent) {
      const cardLabel = this._name || this._entity;
      return html`
        <hui-warning>
          ${cardLabel} has no sections enabled.
        </hui-warning>
      `;
    }

    return html`
      <ha-card>
        ${showHeader
          ? html`
            <div
              class=${classMap(headerClassMap)}
              style=${`background-image: url(${this._getWeatherBgImage(this._state.state)})`}
            >
              <div class="temp">${this._hass.formatEntityAttributeValue(this._state, "temperature") || this._state.state}</div>
              <div class="condition">${this._hass.formatEntityState(this._state) || this._state.state}</div>
            </div>
          `
          : nothing}
        ${showHeader && showForecasts
          ? html`<div class="divider card-divider"></div>`
          : nothing}
        ${showForecasts
          ? html`
            <div class=${classMap(containerClassMap)}>
              ${showDaily
                ? html`
                  <div class="forecast-daily-container">
                    <div class="fade-left"></div>
                    <div class="fade-right"></div>
                    <div class="forecast daily">
                      <wfe-daily-list
                        .hass=${this._hass}
                        .forecast=${this._forecastDailyEvent!.forecast}
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
              ${showHourly
                ? html`
                  <div class="forecast-hourly-container">
                    <div class="fade-left"></div>
                    <div class="fade-right"></div>
                    <div
                      class="forecast hourly"
                      style=${this._hourlyMinTemp !== undefined && this._hourlyMaxTemp !== undefined
                        ? `--min-temp: ${this._hourlyMinTemp}; --max-temp: ${this._hourlyMaxTemp};`
                        : nothing}
                    >
                      <wfe-hourly-list
                        .hass=${this._hass}
                        .forecast=${this._forecastHourlyEvent!.forecast}
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

  private _resolveSunCoordinates(): SunCoordinates | undefined {
    if (!this._config?.show_sun_times) {
      this._sunCoordinateCacheKey = undefined;
      this._sunCoordinateCache = undefined;
      return undefined;
    }

    const useHome = this._config.sun_use_home_coordinates ?? true;
    if (useHome) {
      const latitude = this._parseCoordinate(this._hass?.config?.latitude, -90, 90);
      const longitude = this._parseCoordinate(this._hass?.config?.longitude, -180, 180);
      if (latitude !== undefined && longitude !== undefined) {
        const key = `${latitude},${longitude}`;
        if (this._sunCoordinateCacheKey === key && this._sunCoordinateCache) {
          return this._sunCoordinateCache;
        }
        const coords: SunCoordinates = { latitude, longitude };
        this._sunCoordinateCacheKey = key;
        this._sunCoordinateCache = coords;
        return coords;
      }
      this._sunCoordinateCacheKey = undefined;
      this._sunCoordinateCache = undefined;
      return undefined;
    }

    const latitude = this._parseCoordinate(this._config.sun_latitude, -90, 90);
    const longitude = this._parseCoordinate(this._config.sun_longitude, -180, 180);
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
    // this._state.state is a string like "snowy-rainy"
    // The WeatherImages object keys are like "snowyrainy"
    // So we need to remove the hyphens from the state string
    const imageKey = state.replace(/-/g, '') as keyof typeof WeatherImages;
    return WeatherImages[imageKey] ?? WeatherImages.partlycloudy; // Fallback
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

    ([daily, hourly]).forEach(elem => {
      if (elem) {
        const itemWidth = parseInt(getComputedStyle(elem).getPropertyValue("--icon-container-width"));
        const minGap = parseInt(getComputedStyle(elem).getPropertyValue("--min-gap"));
        const padding = 16;

        const maxItems = Math.floor((containerWidth + minGap - 2*padding) / (itemWidth + minGap));
        if (maxItems < 2) return; // Avoid divide by zero
        const totalItemWidth = maxItems * itemWidth;
        const gap = Math.round((containerWidth - 2*padding - totalItemWidth) / (maxItems - 1));

        elem.style.setProperty("--dynamic-gap", `${gap}px`);
      }
    });

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
