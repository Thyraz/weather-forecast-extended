import type { PropertyValues } from "lit";
import { LitElement, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { state } from "lit/decorators";
import type { ForecastAttribute, ForecastEvent, WeatherEntity } from "./weather";
import { subscribeForecast } from "./weather";
import { handleAction, hasAction } from "custom-card-helpers";
import type { ActionConfig, HomeAssistant } from "custom-card-helpers";
import { LovelaceGridOptions, SunCoordinates, WeatherForecastExtendedConfig, WeatherIconMap } from "./types";
import type { AttributeHeaderChip, HeaderChip, TemplateHeaderChip } from "./types";
import { styles } from "./weather-forecast-extended.styles";
import { DEFAULT_WEATHER_IMAGE, WeatherImages } from "./weather-images";
import "./components/wfe-daily-list";
import "./components/wfe-hourly-list";
import "./components/wfe-nowcast";
import { enableMomentumScroll } from "./utils/momentum-scroll";
import type { HassEntity } from "home-assistant-js-websocket";
import SunCalc from "suncalc";

const MISSING_ATTRIBUTE_TEXT = "missing";

// Private types
type ForecastType = "hourly" | "daily";
type SubscriptionMap = Record<ForecastType, Promise<() => void> | undefined>;
type HeaderChipDisplay = {
  label: string;
  display: string;
  missing: boolean;
  tooltip: string;
  type: HeaderChip["type"];
  action?: ActionConfig;
  icon?: string;
};

type RenderTemplateEventMessage = {
  result?: unknown;
  listeners?: unknown;
  error?: string;
  level?: string;
};

type HassConnection = HomeAssistant["connection"];
type HassUnsubscribeFunc = ReturnType<HassConnection["subscribeMessage"]> extends Promise<infer T>
  ? T
  : never;
type HassFormatEntityState = (stateObj: HassEntity) => string | undefined;
type HassFormatEntityAttributeValue = (stateObj: HassEntity, attribute: string) => unknown;

type ExtendedHomeAssistant = HomeAssistant & {
  formatEntityState?: HassFormatEntityState;
  formatEntityAttributeValue?: HassFormatEntityAttributeValue;
};

type EnergyPreferences = {
  energy_sources?: Array<{
    type?: string;
    config_entry_solar_forecast?: string[] | null;
  }>;
};

type EnergySolarForecast = {
  wh_hours?: Record<string, number | string>;
};

type NowcastForecastItem = {
  datetime: string;
  precipitation: number;
};

type NowcastServiceForecastItem = {
  datetime?: string;
  precipitation?: number | string;
};

type NowcastServiceEntityResponse = {
  forecast?: NowcastServiceForecastItem[];
};

type NowcastServiceResponse = {
  response?: Record<string, NowcastServiceEntityResponse>;
};

const SOLAR_FORECAST_ATTRIBUTE = "solar_forecast";
const NOWCAST_SERVICE_NAME = "get_minute_forecast";

const isAttributeHeaderChip = (chip: HeaderChip): chip is AttributeHeaderChip =>
  chip.type === "attribute";

const isTemplateHeaderChip = (chip: HeaderChip): chip is TemplateHeaderChip =>
  chip.type === "template";

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
  @state() private _templateChipValues: Record<number, { display: string; missing: boolean }> = {};
  @state() private _solarForecastByHour: Record<string, number> = {};
  @state() private _solarForecastByDay: Record<string, number> = {};
  @state() private _nowcastForecast: NowcastForecastItem[] = [];
  @state() private _nowcastHasRain = false;
  @state() private _headerPageIndex = 0;

  // private property
  private _subscriptions: SubscriptionMap = { hourly: undefined, daily: undefined };
  private _resizeObserver?: ResizeObserver;
  private _oldContainerWidth?: number;
  private _hourlyMinTemp?: number;
  private _hourlyMaxTemp?: number;
  private _dailyMinTemp?: number;
  private _dailyMaxTemp?: number;
  private _hass?: ExtendedHomeAssistant;
  private _templateSubscriptions: Array<Promise<HassUnsubscribeFunc> | undefined> = [];
  private _momentumCleanup: Partial<Record<ForecastType, () => void>> = {};
  private _momentumElement: Partial<Record<ForecastType, HTMLElement>> = {};
  private _sunCoordinateCacheKey?: string;
  private _sunCoordinateCache?: SunCoordinates;
  private _solarForecastRequestId = 0;
  private _nowcastRequestId = 0;
  private _nowcastEntityId?: string;
  private _nowcastServiceDomain?: string;
  private _nowcastLastUpdated?: string;
  private _nowcastRefreshTimeout?: number;
  private _nowcastRefreshInterval?: number;
  private _headerSwipeStartX?: number;
  private _headerSwipePointerId?: number;

  // Called by HA
  setConfig(config: WeatherForecastExtendedConfig) {
    const previousNowcastEntity = this._config?.nowcast_entity;
    const previousNowcastLayout = this._config?.nowcast_layout;
    const normalizedHeaderChips = this._normalizeHeaderChips(config);
    const normalizedHeaderAttributes = normalizedHeaderChips
      .filter(isAttributeHeaderChip)
      .map(chip => chip.attribute)
      .filter(attribute => typeof attribute === "string" && attribute.trim().length > 0);
    const normalizedDailyMinGap = this._normalizeMinGapValue(config.daily_min_gap);
    const normalizedHourlyMinGap = this._normalizeMinGapValue(config.hourly_min_gap);
    const normalizedHourlyDimBelow = this._normalizeOptionalNumber(config.hourly_extra_attribute_dim_below);
    const normalizedDailyDimBelow = this._normalizeOptionalNumber(config.daily_extra_attribute_dim_below);
    const normalizedHourlyColor = this._normalizeOptionalText(config.hourly_extra_attribute_color);
    const normalizedDailyColor = this._normalizeOptionalText(config.daily_extra_attribute_color);
    const normalizedIconMap = this._normalizeIconMap(config.icon_map);
    const normalizedMasonryRows = this._normalizeMasonryRows(config.masonry_rows);

    const defaults: WeatherForecastExtendedConfig = {
      type: "custom:weather-forecast-extended-card",
      ...config,
      nowcast_entity: config.nowcast_entity,
      nowcast_layout: config.nowcast_layout ?? "pager",
      nowcast_always_show: config.nowcast_always_show ?? false,
      show_header: config.show_header ?? true,
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      orientation: config.orientation ?? "vertical",
      show_sun_times: config.show_sun_times ?? false,
      sun_use_home_coordinates: config.sun_use_home_coordinates ?? true,
      use_night_header_backgrounds: config.use_night_header_backgrounds ?? true,
      header_chips: normalizedHeaderChips,
      header_attributes: normalizedHeaderAttributes,
      icon_map: normalizedIconMap,
      daily_min_gap: normalizedDailyMinGap,
      hourly_min_gap: normalizedHourlyMinGap,
      hourly_extra_attribute: config.hourly_extra_attribute,
      hourly_extra_attribute_unit: config.hourly_extra_attribute_unit,
      hourly_extra_attribute_color: normalizedHourlyColor,
      hourly_extra_attribute_dim_below: normalizedHourlyDimBelow,
      daily_extra_attribute: config.daily_extra_attribute,
      daily_extra_attribute_unit: config.daily_extra_attribute_unit,
      daily_extra_attribute_color: normalizedDailyColor,
      daily_extra_attribute_dim_below: normalizedDailyDimBelow,
      solar_forecast_entries: Array.isArray(config.solar_forecast_entries)
        ? config.solar_forecast_entries
        : undefined,
      masonry_rows: normalizedMasonryRows,
    };

    this._config = defaults;
    if (previousNowcastEntity !== defaults.nowcast_entity) {
      this._resetNowcastState();
    }
    if (previousNowcastLayout !== defaults.nowcast_layout) {
      this._headerPageIndex = 0;
    }
    this._entity = defaults.entity;
    // call set hass() to immediately adjust to a changed entity
    // while editing the entity in the card editor
    if (this._hass) {
      this.hass = this._hass;
    }

    this._refreshTemplateSubscriptions();
    this._setupNowcastRefreshTimer();
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

    this._refreshTemplateSubscriptions();
    this._handleNowcastHassUpdate();
    this._setupNowcastRefreshTimer();
  }

  private _normalizeHeaderChips(config: WeatherForecastExtendedConfig): HeaderChip[] {
    const limit = 3;
    const normalized: HeaderChip[] = [];

    if (Array.isArray(config.header_chips)) {
      for (const chip of config.header_chips) {
        if (normalized.length >= limit || !chip || typeof chip !== "object") {
          continue;
        }

        if (chip.type === "attribute") {
          const attr = typeof chip.attribute === "string" ? chip.attribute.trim() : "";
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === "string" ? chip.icon.trim() : undefined;
          normalized.push({ type: "attribute", attribute: attr, tap_action, icon });
          continue;
        }

        if (chip.type === "template") {
          const template = typeof chip.template === "string" ? chip.template.trim() : "";
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === "string" ? chip.icon.trim() : undefined;
          normalized.push({ type: "template", template, tap_action, icon });
        }
      }
    }

    if (normalized.length) {
      return normalized.slice(0, limit);
    }

    const attributeEntries = Array.isArray(config.header_attributes)
      ? config.header_attributes
        .filter((attr, index) => index < limit && typeof attr === "string")
        .map(attr => attr.trim())
        .filter(attr => attr.length > 0)
      : [];

    return attributeEntries.map(attribute => ({ type: "attribute", attribute }));
  }

  private _normalizeMinGapValue(value?: number | string): number | undefined {
    if (value === null || typeof value === "undefined") {
      return undefined;
    }
    const numericValue = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(numericValue)) {
      return undefined;
    }
    const clamped = Math.max(10, numericValue);
    return Math.round(clamped);
  }

  private _normalizeOptionalNumber(value?: number | string): number | undefined {
    if (value === null || typeof value === "undefined") {
      return undefined;
    }
    const numericValue = typeof value === "number" ? value : Number(value);
    return Number.isFinite(numericValue) ? numericValue : undefined;
  }

  private _normalizeOptionalText(value?: string): string | undefined {
    if (value === null || typeof value === "undefined") {
      return undefined;
    }
    const trimmed = String(value).trim();
    return trimmed.length ? trimmed : undefined;
  }

  private _normalizeMasonryRows(value?: number | string): number | undefined {
    if (value === null || typeof value === "undefined") {
      return undefined;
    }
    const numericValue = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(numericValue)) {
      return undefined;
    }
    if (numericValue <= 0) {
      return undefined;
    }
    return Math.max(1, Math.round(numericValue));
  }

  private _normalizeIconMap(iconMap?: WeatherIconMap): WeatherIconMap | undefined {
    if (!iconMap || typeof iconMap !== "object") {
      return undefined;
    }

    const normalized: WeatherIconMap = {};
    Object.entries(iconMap).forEach(([key, value]) => {
      if (typeof value !== "string") {
        return;
      }
      const trimmed = value.trim();
      if (trimmed.length) {
        (normalized as Record<string, string>)[key] = trimmed;
      }
    });

    return Object.keys(normalized).length ? normalized : undefined;
  }

  private _shouldApplyMasonryHeight(): boolean {
    if (!this._config?.masonry_rows) {
      return false;
    }
    if (!this.isConnected) {
      return true;
    }
    const rowHeight = getComputedStyle(this).getPropertyValue("--row-height").trim();
    if (rowHeight) {
      return false;
    }
    return !Boolean(
      this.closest("hui-sections-view") ||
      this.closest("hui-section-view") ||
      this.closest("hui-section")
    );
  }

  private _getHeaderChips(): HeaderChip[] {
    if (!this._config) {
      return [];
    }

    if (Array.isArray(this._config.header_chips) && this._config.header_chips.length) {
      return this._config.header_chips.slice(0, 3);
    }

    const attributeEntries = this._config.header_attributes ?? [];
    return attributeEntries.slice(0, 3).map(attribute => ({ type: "attribute", attribute }));
  }

  private _refreshTemplateSubscriptions() {
    if (!this.isConnected || !this._config || !this._hass?.connection) {
      this._teardownTemplateSubscriptions({ clearValues: !this.isConnected });
      return;
    }

    const chips = this._getHeaderChips();
    const previousValues = this._templateChipValues;

    this._teardownTemplateSubscriptions();

    const nextSubscriptions: Array<Promise<HassUnsubscribeFunc> | undefined> = [];
    const nextValues: Record<number, { display: string; missing: boolean }> = {};

    chips.forEach((chip, index) => {
      if (chip.type !== "template") {
        this._clearTemplateChipValue(index);
        nextSubscriptions[index] = undefined;
        return;
      }

      const template = chip.template.trim();
      if (!template) {
        this._clearTemplateChipValue(index);
        nextSubscriptions[index] = undefined;
        return;
      }

      if (previousValues[index]) {
        nextValues[index] = previousValues[index];
      }

      const unsubscribePromise = this._subscribeTemplate(index, template);

      nextSubscriptions[index] = unsubscribePromise;
    });

    this._templateSubscriptions = nextSubscriptions;
    this._templateChipValues = { ...nextValues };
  }

  private _subscribeTemplate(index: number, template: string): Promise<HassUnsubscribeFunc> | undefined {
    const connection = this._hass?.connection;
    if (!connection) {
      this._setTemplateChipValue(index, MISSING_ATTRIBUTE_TEXT, true);
      return undefined;
    }

    return connection
      .subscribeMessage<RenderTemplateEventMessage>(
        message => this._handleTemplateResult(index, template, message),
        {
          type: "render_template",
          template,
          strict: true,
          report_errors: true,
        },
      )
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error("weather-forecast-extended: template subscription failed", error);
        this._setTemplateChipValue(index, MISSING_ATTRIBUTE_TEXT, true);
        return undefined;
      });
  }

  private _teardownTemplateSubscriptions({ clearValues = false }: { clearValues?: boolean } = {}) {
    this._templateSubscriptions.forEach(subscription => {
      subscription?.then(unsub => {
        if (typeof unsub === "function") {
          unsub();
        }
      }).catch(() => undefined);
    });
    this._templateSubscriptions = [];

    if (clearValues && Object.keys(this._templateChipValues).length) {
      this._templateChipValues = {};
    }
  }

  private _handleTemplateResult(index: number, template: string, message: RenderTemplateEventMessage) {
    if (message?.error) {
      this._setTemplateChipValue(index, MISSING_ATTRIBUTE_TEXT, true);
      return;
    }

    const raw = message?.result;

    if (raw === null || raw === undefined) {
      this._setTemplateChipValue(index, MISSING_ATTRIBUTE_TEXT, true);
      return;
    }

    if (typeof raw === "string") {
      const trimmed = raw.trim();
      if (trimmed.length === 0) {
        this._setTemplateChipValue(index, MISSING_ATTRIBUTE_TEXT, true);
        return;
      }
      this._setTemplateChipValue(index, raw, false);
      return;
    }

    if (typeof raw === "number" || typeof raw === "boolean") {
      this._setTemplateChipValue(index, String(raw), false);
      return;
    }

    try {
      this._setTemplateChipValue(index, JSON.stringify(raw), false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("weather-forecast-extended: failed to stringify template result", template, error);
      this._setTemplateChipValue(index, MISSING_ATTRIBUTE_TEXT, true);
    }
  }

  private _setTemplateChipValue(index: number, display: string, missing: boolean) {
    const previous = this._templateChipValues[index];
    if (previous && previous.display === display && previous.missing === missing) {
      return;
    }

    this._templateChipValues = {
      ...this._templateChipValues,
      [index]: { display, missing },
    };
  }

  private _clearTemplateChipValue(index: number) {
    if (!(index in this._templateChipValues)) {
      return;
    }

    const { [index]: _removed, ...rest } = this._templateChipValues;
    this._templateChipValues = rest;
  }

  public getCardSize(): number {
    if (this._config?.masonry_rows !== undefined) {
      return Math.max(1, Math.ceil(this._config.masonry_rows));
    }

    const gridRows = this.getGridOptions()?.rows ?? 3;
    const sectionRowHeightPx = 56;
    const estimatedHeight = gridRows * sectionRowHeightPx;
    return Math.max(1, Math.ceil(estimatedHeight / 50));
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
    const hasInlineNowcast = Boolean(
      showHeader &&
      this._config.nowcast_entity &&
      (this._config.nowcast_layout ?? "pager") === "inline",
    );

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
        computed += 2;
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
      if (showHeader && (showDaily || showHourly) && !(showDaily && showHourly)) {
        computed += 1;
      }
      if (showHeader && showDaily && showHourly) {
        computed += 1;
      }

      if (!showHeader && showHourly) {
        computed = Math.max(computed, 3);
      }

      if (!showHeader && showDaily) {
        computed = Math.max(computed, 4);
      }

      if (!showHeader && !showDaily && !showHourly) {
        computed = 2;
      }

      rows = Math.max(computed, 2);
    }

    if (hasInlineNowcast) {
      rows += 1;
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
    this._refreshTemplateSubscriptions();
    if (this.hasUpdated && this._config && this._hass) {
      this._subscribeForecastEvents();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._teardownTemplateSubscriptions({ clearValues: true });
    this._unsubscribeForecastEvents();
    this._clearNowcastRefreshTimer();
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

    if (changedProps.has("_config") || forecastHourlyChanged || forecastDailyChanged) {
      this._refreshSolarForecastData();
    }

    if (changedProps.has("_config")) {
      this._refreshNowcastData();
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
    const dailyForecastRaw = this._forecastDailyEvent?.forecast ?? [];
    const hourlyForecastRaw = this._forecastHourlyEvent?.forecast ?? [];
    const dailyForecast = this._applySolarForecastToForecast(dailyForecastRaw, "daily");
    const hourlyForecast = this._applySolarForecastToForecast(hourlyForecastRaw, "hourly");
    const sunCoordinates = this._getLocationCoordinates();
    const showSunTimes = Boolean(this._config.show_sun_times && sunCoordinates && hourlyEnabled);
    const orientation = this._config.orientation ?? "vertical";
    const temperatureTapAction = this._config.header_tap_action_temperature;
    const conditionTapAction = this._config.header_tap_action_condition;
    const temperatureActionEntity = this._config.header_temperature_entity || this._entity;
    const hasTemperatureTapAction = hasAction(temperatureTapAction);
    const hasConditionTapAction = hasAction(conditionTapAction);
    const headerTemperature = this._computeHeaderTemperature();
    const headerCondition = this._hass?.formatEntityState?.(this._state) || this._state.state;
    const containerClassMap = {
      "forecast-container": true,
      "orientation-horizontal": orientation === "horizontal",
      "orientation-vertical": orientation !== "horizontal",
    };

    const headerOnly = showHeader && !showForecasts;
    const nowcastEnabled = this._isNowcastEnabled();
    const nowcastLayout = this._config.nowcast_layout ?? "pager";
    const showNowcastPager = nowcastEnabled && nowcastLayout === "pager";
    const showInlineNowcast = nowcastEnabled &&
      nowcastLayout === "inline" &&
      (this._config.nowcast_always_show || this._nowcastHasRain || headerOnly);

    const headerClassMap = {
      weather: true,
      "header-only": headerOnly,
      "nowcast-inline": showInlineNowcast,
      "nowcast-pager": showNowcastPager,
    };

    const hasContent = showHeader || dailyEnabled || hourlyEnabled;

    const dailyStyle = (() => {
      const styles: Record<string, string> = {};
      if (this._dailyGap !== undefined) {
        styles["--dynamic-gap"] = `${this._dailyGap}px`;
      }
      if (this._config?.daily_min_gap !== undefined) {
        styles["--min-gap"] = `${this._config.daily_min_gap}px`;
      }
      return Object.keys(styles).length ? styleMap(styles) : nothing;
    })();

    const hourlyStyle = (() => {
      const styles: Record<string, string> = {};
      if (this._hourlyGap !== undefined) {
        styles["--dynamic-gap"] = `${this._hourlyGap}px`;
      }
      if (this._hourlyMinTemp !== undefined && this._hourlyMaxTemp !== undefined) {
        styles["--min-temp"] = `${this._hourlyMinTemp}`;
        styles["--max-temp"] = `${this._hourlyMaxTemp}`;
      }
      if (this._config?.hourly_min_gap !== undefined) {
        styles["--min-gap"] = `${this._config.hourly_min_gap}px`;
      }
      return Object.keys(styles).length ? styleMap(styles) : nothing;
    })();

    const cardStyle = (() => {
      if (!this._shouldApplyMasonryHeight()) {
        return nothing;
      }
      const rowCount = this._config?.masonry_rows ?? 0;
      if (!Number.isFinite(rowCount) || rowCount <= 0) {
        return nothing;
      }
      return styleMap({ "min-height": `${rowCount * 50}px` });
    })();

    if (!hasContent) {
      const cardLabel = this._name || this._entity;
      return html`
        <hui-warning>
          ${cardLabel} has no sections enabled.
        </hui-warning>
      `;
    }

    const headerChips = this._computeHeaderChipDisplays();
    const useSnowNowcastFill = this._shouldUseSnowNowcastFill();
    const headerStyles: Record<string, string> = {
      "background-image": `url(${this._getWeatherBgImage(this._state.state)})`,
    };

    if (showInlineNowcast && !headerOnly) {
      headerStyles["--wfe-header-height"] = "calc(4 * var(--row-height, 56px))";
    }

    const headerChipsTemplate = headerChips.length
      ? headerChips.map(chip => {
        const hasChipAction = hasAction(chip.action);
        const chipClassMap = {
          "attribute-chip": true,
          missing: chip.missing,
          "template-chip": chip.type === "template",
          "has-action": hasChipAction,
        };
        const chipTitle = chip.tooltip || `${chip.label}: ${chip.display}`;
        return html`
          <div
            class=${classMap(chipClassMap)}
            title=${chipTitle}
            role=${hasChipAction ? "button" : nothing}
            tabindex=${hasChipAction ? 0 : nothing}
            @click=${hasChipAction ? () => this._handleHeaderChipTap(chip.action) : undefined}
            @keydown=${hasChipAction
              ? (ev: KeyboardEvent) => this._handleHeaderChipKeydown(ev, chip.action)
              : undefined}
          >
            ${chip.icon
              ? html`<ha-icon class="chip-icon" .icon=${chip.icon}></ha-icon>`
              : nothing}
            <span class="header-pill-text">${chip.display}</span>
          </div>
        `;
      })
      : nothing;

    const pagerDotsTemplate = showNowcastPager
      ? html`
        <div class="pager-dots">
          ${[0, 1].map(index => html`
            <button
              class=${classMap({ "pager-dot": true, active: index === this._headerPageIndex })}
              type="button"
              aria-label=${`Header page ${index + 1}`}
              @click=${() => this._setHeaderPage(index)}
            ></button>
          `)}
        </div>
      `
      : nothing;

    const headerAttributesTemplate = headerChips.length
      ? html`
        <div class="header-attributes">
          ${headerChipsTemplate}
        </div>
      `
      : nothing;

    const headerMainTemplate = html`
      <div class="header-main">
        <div
          class=${classMap({
            temp: true,
            "has-action": hasTemperatureTapAction,
          })}
          role=${hasTemperatureTapAction ? "button" : nothing}
          tabindex=${hasTemperatureTapAction ? 0 : nothing}
          @click=${hasTemperatureTapAction
            ? () => this._handleHeaderTap(temperatureTapAction, temperatureActionEntity)
            : undefined}
          @keydown=${hasTemperatureTapAction
            ? (ev: KeyboardEvent) => this._handleHeaderKeydown(ev, temperatureTapAction, temperatureActionEntity)
            : undefined}
        >
          <span class="header-pill-text">${headerTemperature}</span>
        </div>
        <div
          class=${classMap({
            condition: true,
            "has-action": hasConditionTapAction,
          })}
          role=${hasConditionTapAction ? "button" : nothing}
          tabindex=${hasConditionTapAction ? 0 : nothing}
          @click=${hasConditionTapAction ? () => this._handleHeaderTap(conditionTapAction) : undefined}
          @keydown=${hasConditionTapAction
            ? (ev: KeyboardEvent) => this._handleHeaderKeydown(ev, conditionTapAction)
            : undefined}
        >
          <span class="header-pill-text">
            ${headerCondition}
          </span>
        </div>
      </div>
    `;

    const headerLayoutTemplate = html`
      <div class="header-layout">
        ${headerAttributesTemplate}
        ${headerMainTemplate}
      </div>
    `;

    const nowcastPanelTemplate = html`
      <div
        class="nowcast-panel"
        style=${useSnowNowcastFill
          ? styleMap({ "--wfe-nowcast-fill-color": "rgba(255, 255, 255, 0.9)" })
          : nothing}
      >
        <wfe-nowcast .forecast=${this._nowcastForecast}></wfe-nowcast>
      </div>
    `;

    return html`
      <ha-card style=${cardStyle}>
        ${showHeader
          ? html`
            <div
              class=${classMap(headerClassMap)}
              style=${styleMap(headerStyles)}
            >
              <div class="header-content">
                ${showNowcastPager
                  ? html`
                    <div class="header-pager">
                      <div
                        class="header-pages"
                        style=${styleMap({ transform: `translateX(-${this._headerPageIndex * 100}%)` })}
                        @pointerdown=${this._handleHeaderPagerPointerDown}
                        @pointerup=${this._handleHeaderPagerPointerUp}
                        @pointercancel=${this._handleHeaderPagerPointerCancel}
                      >
                        <div class="header-page header-page-primary">
                          ${headerLayoutTemplate}
                        </div>
                        <div class="header-page header-page-nowcast">
                          ${nowcastPanelTemplate}
                        </div>
                      </div>
                      ${pagerDotsTemplate}
                    </div>
                  `
                  : html`
                    ${headerLayoutTemplate}
                    ${showInlineNowcast ? nowcastPanelTemplate : nothing}
                  `}
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
                        .extraAttribute=${this._config.daily_extra_attribute}
                        .extraAttributeUnit=${this._config.daily_extra_attribute_unit}
                        .extraAttributeColor=${this._config.daily_extra_attribute_color}
                        .extraAttributeDimBelow=${this._config.daily_extra_attribute_dim_below}
                        .iconMap=${this._config.icon_map}
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
                        .extraAttribute=${this._config.hourly_extra_attribute}
                        .extraAttributeUnit=${this._config.hourly_extra_attribute_unit}
                        .extraAttributeColor=${this._config.hourly_extra_attribute_color}
                        .extraAttributeDimBelow=${this._config.hourly_extra_attribute_dim_below}
                        .iconMap=${this._config.icon_map}
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
      const formattedSensor = this._hass?.formatEntityState?.(sensorState);
      if (formattedSensor && typeof formattedSensor === "string") {
        return formattedSensor;
      }
      return sensorState.state;
    }

    const formattedWeather = this._hass?.formatEntityAttributeValue?.(this._state, "temperature");
    if (formattedWeather && typeof formattedWeather === "string") {
      return formattedWeather;
    }
    return this._state.state || "";
  }

  private _isStateUnavailable(state?: string): boolean {
    if (!state) {
      return true;
    }

    const normalized = state.toLowerCase();
    return normalized === "unavailable" || normalized === "unknown";
  }

  // Header chips (attribute / template)
  private _computeHeaderChipDisplays(): HeaderChipDisplay[] {
    if (!this._config) {
      return [];
    }

    const chips = this._getHeaderChips();
    if (!chips.length) {
      return [];
    }

    const displays: HeaderChipDisplay[] = [];

    chips.forEach((chip, index) => {
      const action = hasAction(chip.tap_action) ? chip.tap_action : undefined;
      const icon = typeof (chip as any).icon === "string" ? (chip as any).icon.trim() : undefined;

      if (chip.type === "template") {
        const templateString = chip.template?.trim() ?? "";
        if (!templateString) {
          return;
        }

        const templateValue = this._templateChipValues[index];
        const display = templateValue?.display ?? MISSING_ATTRIBUTE_TEXT;
        const missing = templateValue?.missing ?? true;
        const tooltip = `Template: ${templateString}`;
        displays.push({
          label: "Template",
          display,
          missing,
          tooltip,
          type: chip.type,
          action,
          icon,
        });
        return;
      }

      const attribute = chip.attribute?.trim() ?? "";
      if (!attribute) {
        return;
      }

      const formatted = this._formatHeaderAttribute(attribute);
      const label = attribute;
      const tooltip = `${attribute}: ${formatted.display}`;
      displays.push({
        label,
        display: formatted.display,
        missing: formatted.missing,
        tooltip,
        type: chip.type,
        action,
        icon,
      });
    });

    return displays;
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
      const formattedValue = this._hass?.formatEntityAttributeValue?.(this._state, attribute);
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

  private _needsSolarForecast(): boolean {
    if (!this._config) {
      return false;
    }
    return (
      this._config.hourly_extra_attribute === SOLAR_FORECAST_ATTRIBUTE ||
      this._config.daily_extra_attribute === SOLAR_FORECAST_ATTRIBUTE
    );
  }

  private _refreshSolarForecastData() {
    if (!this._needsSolarForecast()) {
      if (Object.keys(this._solarForecastByHour).length || Object.keys(this._solarForecastByDay).length) {
        this._solarForecastByHour = {};
        this._solarForecastByDay = {};
      }
      return;
    }

    if (!this._hass?.callWS) {
      return;
    }

    const requestId = ++this._solarForecastRequestId;
    this._loadSolarForecastData(requestId);
  }

  private async _loadSolarForecastData(requestId: number) {
    try {
      const prefs = await this._hass!.callWS<EnergyPreferences>({ type: "energy/get_prefs" });
      if (requestId !== this._solarForecastRequestId) {
        return;
      }

      const availableEntries = this._extractSolarForecastEntries(prefs);
      const selectedEntries = this._selectSolarForecastEntries(availableEntries);

      if (!selectedEntries.length) {
        this._solarForecastByHour = {};
        this._solarForecastByDay = {};
        return;
      }

      const forecasts = await this._hass!.callWS<Record<string, EnergySolarForecast>>({
        type: "energy/solar_forecast",
      });
      if (requestId !== this._solarForecastRequestId) {
        return;
      }

      const { hourly, daily } = this._buildSolarForecastMaps(forecasts, selectedEntries);
      this._solarForecastByHour = hourly;
      this._solarForecastByDay = daily;
    } catch (_err) {
      this._solarForecastByHour = {};
      this._solarForecastByDay = {};
    }
  }

  private _extractSolarForecastEntries(prefs?: EnergyPreferences): string[] {
    const energySources = prefs?.energy_sources ?? [];
    const entries = new Set<string>();

    energySources.forEach(source => {
      if (source?.type !== "solar") {
        return;
      }
      const configured = source.config_entry_solar_forecast;
      if (!Array.isArray(configured)) {
        return;
      }
      configured.forEach(entryId => {
        if (typeof entryId === "string" && entryId.trim().length) {
          entries.add(entryId);
        }
      });
    });

    return Array.from(entries);
  }

  private _selectSolarForecastEntries(availableEntries: string[]): string[] {
    if (!this._config) {
      return [];
    }

    if (this._config.solar_forecast_entries) {
      if (!this._config.solar_forecast_entries.length) {
        return [];
      }
      const selected = new Set(this._config.solar_forecast_entries);
      return availableEntries.filter(entryId => selected.has(entryId));
    }

    return availableEntries;
  }

  private _buildSolarForecastMaps(
    forecasts: Record<string, EnergySolarForecast>,
    selectedEntries: string[],
  ): { hourly: Record<string, number>; daily: Record<string, number> } {
    const hourly: Record<string, number> = {};
    const daily: Record<string, number> = {};

    selectedEntries.forEach(entryId => {
      const data = forecasts?.[entryId];
      const whHours = data?.wh_hours ?? {};
      Object.entries(whHours).forEach(([timestamp, rawValue]) => {
        const valueWh = typeof rawValue === "number" ? rawValue : Number(rawValue);
        if (!Number.isFinite(valueWh)) {
          return;
        }

        const date = new Date(timestamp);
        if (!Number.isFinite(date.getTime())) {
          return;
        }

        const valueKwh = valueWh / 1000;
        const hourKey = this._formatSolarHourKey(date);
        const dayKey = this._formatSolarDayKey(date);

        hourly[hourKey] = (hourly[hourKey] ?? 0) + valueKwh;
        daily[dayKey] = (daily[dayKey] ?? 0) + valueKwh;
      });
    });

    return { hourly, daily };
  }

  private _applySolarForecastToForecast(
    forecast: ForecastAttribute[],
    type: ForecastType,
  ): ForecastAttribute[] {
    const source = type === "hourly" ? this._solarForecastByHour : this._solarForecastByDay;
    if (!forecast?.length || !Object.keys(source).length) {
      return forecast;
    }

    return forecast.map(item => {
      if (!item?.datetime) {
        return item;
      }
      const date = new Date(item.datetime);
      if (!Number.isFinite(date.getTime())) {
        return item;
      }
      const key = type === "hourly" ? this._formatSolarHourKey(date) : this._formatSolarDayKey(date);
      const value = source[key];
      if (value === undefined) {
        return item;
      }
      return { ...item, solar_forecast: value };
    });
  }

  private _resetNowcastState() {
    this._nowcastRequestId += 1;
    this._nowcastEntityId = undefined;
    this._nowcastServiceDomain = undefined;
    this._nowcastLastUpdated = undefined;
    this._nowcastForecast = [];
    this._nowcastHasRain = false;
    this._headerPageIndex = 0;
    this._clearNowcastRefreshTimer();
  }

  private _clearNowcastForecast() {
    if (this._nowcastForecast.length || this._nowcastHasRain) {
      this._nowcastForecast = [];
      this._nowcastHasRain = false;
    }
  }

  private _refreshNowcastData() {
    if (!this._isNowcastEnabled() || !this._hass?.callWS) {
      this._clearNowcastForecast();
      return;
    }

    const entityId = this._config?.nowcast_entity;
    if (!entityId) {
      this._clearNowcastForecast();
      return;
    }

    const requestId = ++this._nowcastRequestId;
    this._loadNowcastData(requestId, entityId);
  }

  private async _loadNowcastData(requestId: number, entityId: string) {
    try {
      const serviceDomain = await this._resolveNowcastServiceDomain(entityId, requestId);
      if (!serviceDomain || requestId !== this._nowcastRequestId) {
        this._clearNowcastForecast();
        return;
      }

      const response = await this._hass!.callWS<NowcastServiceResponse>({
        type: "call_service",
        domain: serviceDomain,
        service: NOWCAST_SERVICE_NAME,
        target: { entity_id: entityId },
        return_response: true,
      });

      if (requestId !== this._nowcastRequestId) {
        return;
      }

      const forecast = this._extractNowcastForecast(response, entityId);
      this._setNowcastForecast(forecast);
    } catch (_err) {
      this._clearNowcastForecast();
    }
  }

  private async _resolveNowcastServiceDomain(
    entityId: string,
    requestId: number,
  ): Promise<string | undefined> {
    if (this._nowcastEntityId === entityId && this._nowcastServiceDomain) {
      return this._nowcastServiceDomain;
    }

    try {
      const entry = await this._hass!.callWS<{ platform?: string }>({
        type: "config/entity_registry/get",
        entity_id: entityId,
      });
      if (requestId !== this._nowcastRequestId) {
        return undefined;
      }
      const platform = entry?.platform;
      this._nowcastEntityId = entityId;
      this._nowcastServiceDomain = typeof platform === "string" && platform.trim().length
        ? platform
        : undefined;
      return this._nowcastServiceDomain;
    } catch (_err) {
      this._nowcastEntityId = entityId;
      this._nowcastServiceDomain = undefined;
      return undefined;
    }
  }

  private _extractNowcastForecast(
    response: NowcastServiceResponse,
    entityId: string,
  ): NowcastForecastItem[] {
    const items: NowcastForecastItem[] = [];
    const entries = response?.response?.[entityId]?.forecast;
    if (!Array.isArray(entries)) {
      return items;
    }

    entries.forEach(entry => {
      const datetime = typeof entry?.datetime === "string" ? entry.datetime : undefined;
      if (!datetime) {
        return;
      }
      const timestamp = new Date(datetime).getTime();
      if (!Number.isFinite(timestamp)) {
        return;
      }

      const rawValue = entry?.precipitation;
      const precipitation = typeof rawValue === "number" ? rawValue : Number(rawValue);
      if (!Number.isFinite(precipitation)) {
        return;
      }

      items.push({ datetime, precipitation: Math.max(0, precipitation) });
    });

    return items.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
  }

  private _setNowcastForecast(forecast: NowcastForecastItem[]) {
    const hasRain = forecast.some(item => item.precipitation > 0);
    const hadRain = this._nowcastHasRain;

    this._nowcastForecast = forecast;
    this._nowcastHasRain = hasRain;

    if (!hadRain && hasRain && this._headerPageIndex === 0 && this._isNowcastPagerEnabled()) {
      this._headerPageIndex = 1;
    }
  }

  private _handleNowcastHassUpdate() {
    if (!this._isNowcastEnabled() || !this._hass) {
      return;
    }

    const entityId = this._config?.nowcast_entity;
    if (!entityId) {
      return;
    }

    const state = this._hass.states[entityId] as HassEntity | undefined;
    if (!state) {
      this._clearNowcastForecast();
      return;
    }

    const lastUpdated = state.last_updated ?? state.last_changed;
    if (!lastUpdated || lastUpdated === this._nowcastLastUpdated) {
      return;
    }

    this._nowcastLastUpdated = lastUpdated;
    this._refreshNowcastData();
  }

  private _isNowcastEnabled(): boolean {
    return Boolean(this._config?.nowcast_entity);
  }

  private _isNowcastPagerEnabled(): boolean {
    return this._isNowcastEnabled() && (this._config?.nowcast_layout ?? "pager") === "pager";
  }

  private _setupNowcastRefreshTimer() {
    if (!this._isNowcastEnabled() || !this._hass) {
      this._clearNowcastRefreshTimer();
      return;
    }

    this._clearNowcastRefreshTimer();

    const now = Date.now();
    const nextMinuteDelay = 60000 - (now % 60000);
    this._nowcastRefreshTimeout = window.setTimeout(() => {
      this._refreshNowcastData();
      this._nowcastRefreshInterval = window.setInterval(() => {
        this._refreshNowcastData();
      }, 60000);
    }, nextMinuteDelay);
  }

  private _clearNowcastRefreshTimer() {
    if (this._nowcastRefreshTimeout !== undefined) {
      window.clearTimeout(this._nowcastRefreshTimeout);
      this._nowcastRefreshTimeout = undefined;
    }
    if (this._nowcastRefreshInterval !== undefined) {
      window.clearInterval(this._nowcastRefreshInterval);
      this._nowcastRefreshInterval = undefined;
    }
  }

  private _formatSolarHourKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}`;
  }

  private _formatSolarDayKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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

  private _shouldUseSnowNowcastFill(): boolean {
    const condition = this._state?.state;
    return condition === "snowy" || condition === "snowy-rainy";
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

  private _setHeaderPage(index: number) {
    const clamped = index <= 0 ? 0 : 1;
    if (clamped === this._headerPageIndex) {
      return;
    }
    this._headerPageIndex = clamped;
  }

  private _handleHeaderPagerPointerDown(event: PointerEvent) {
    if (!this._isNowcastPagerEnabled()) {
      return;
    }
    this._headerSwipePointerId = event.pointerId;
    this._headerSwipeStartX = event.clientX;
    const target = event.currentTarget as HTMLElement | null;
    if (target?.setPointerCapture) {
      target.setPointerCapture(event.pointerId);
    }
  }

  private _handleHeaderPagerPointerUp(event: PointerEvent) {
    if (event.pointerId !== this._headerSwipePointerId) {
      return;
    }
    const startX = this._headerSwipeStartX;
    const deltaX = startX !== undefined ? event.clientX - startX : 0;
    const threshold = 32;

    if (Math.abs(deltaX) >= threshold) {
      this._setHeaderPage(deltaX < 0 ? 1 : 0);
    }

    const target = event.currentTarget as HTMLElement | null;
    if (target?.releasePointerCapture) {
      target.releasePointerCapture(event.pointerId);
    }
    this._headerSwipePointerId = undefined;
    this._headerSwipeStartX = undefined;
  }

  private _handleHeaderPagerPointerCancel(event: PointerEvent) {
    if (event.pointerId !== this._headerSwipePointerId) {
      return;
    }
    const target = event.currentTarget as HTMLElement | null;
    if (target?.releasePointerCapture) {
      target.releasePointerCapture(event.pointerId);
    }
    this._headerSwipePointerId = undefined;
    this._headerSwipeStartX = undefined;
  }

  private _handleHeaderTap(actionConfig?: ActionConfig, entity?: string) {
    this._executeTapAction(actionConfig, entity);
  }

  private _handleHeaderKeydown(event: KeyboardEvent, actionConfig?: ActionConfig, entity?: string) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    this._handleHeaderTap(actionConfig, entity);
  }

  private _handleHeaderChipTap(actionConfig?: ActionConfig) {
    this._executeTapAction(actionConfig);
  }

  private _handleHeaderChipKeydown(event: KeyboardEvent, actionConfig?: ActionConfig) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    this._handleHeaderChipTap(actionConfig);
  }

  private _executeTapAction(actionConfig?: ActionConfig, entityOverride?: string) {
    if (!this._hass || !this._config || !actionConfig || !hasAction(actionConfig)) {
      return;
    }

    const actionType = (actionConfig as any).action as string | undefined;
    const performAction = (actionConfig as any).perform_action as string | undefined;
    if (actionType === "perform-action" && performAction) {
      const [domain, service] = performAction.split(".", 2);
      if (domain && service) {
        const data = (actionConfig as any).data ?? (actionConfig as any).service_data;
        const target = (actionConfig as any).target;
        this._hass.callService(domain, service, data, target);
        return;
      }
    }

    handleAction(
      this,
      this._hass,
      {
        entity: entityOverride || this._entity,
        tap_action: actionConfig,
      },
      "tap",
    );
  }
}
