import type { PropertyValues } from "lit";
import { LitElement, html, nothing } from "lit";
import { state } from "lit/decorators";
import type { ForecastEvent, WeatherEntity } from "./weather";
import { subscribeForecast } from "./weather";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { LovelaceGridOptions } from "./types";
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
  @state() private _config: LovelaceCardConfig;
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
  private _hourlyMomentumCleanup?: () => void;
  private _hourlyMomentumElement?: HTMLElement;

  // Called by HA
  setConfig(config: LovelaceCardConfig) {
    this._config = config;
    this._entity = config.entity;
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
    const minRows = 1;
    var rows = 2.5;
    rows += this._config.daily_forecast !== false ? 2.5 : 0;
    rows += this._config.hourly_forecast !== false ? 3.0 : 0;

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
    if (this._hourlyMomentumCleanup) {
      this._hourlyMomentumCleanup();
      this._hourlyMomentumCleanup = undefined;
      this._hourlyMomentumElement = undefined;
    }
  }

  updated(changedProps: PropertyValues) {
     super.updated(changedProps);
    if (!this._config || !this._hass) {
      return;
    }

    if (changedProps.has("_config") || (!this._subscriptions.hourly && !this._subscriptions.daily)) {
      this._subscribeForecastEvents();
    }

    const card = this.shadowRoot.querySelector('ha-card') as HTMLElement;
    const daily = this.shadowRoot.querySelector('.forecast.daily') as HTMLElement;
    const hourly = this.shadowRoot.querySelector('.forecast.hourly') as HTMLElement;

    if (hourly) {
      this._initDragScroll(hourly);
    } else if (this._hourlyMomentumCleanup) {
      this._hourlyMomentumCleanup();
      this._hourlyMomentumCleanup = undefined;
      this._hourlyMomentumElement = undefined;
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

    // Calculate min/max temperatures for hourly forecast vertical icon translation
    if (this._forecastHourlyEvent?.forecast?.length) {
      const temps = this._forecastHourlyEvent.forecast
        .map(item => item.temperature)
        .filter(temp => typeof temp === "number");
      this._hourlyMinTemp = temps.length ? Math.min(...temps) : undefined;
      this._hourlyMaxTemp = temps.length ? Math.max(...temps) : undefined;
    }

    // Calculate min/max temperatures for daily forecast temperature bar chart
    if (this._forecastDailyEvent?.forecast?.length) {
      const dailyTemps = this._forecastDailyEvent.forecast.flatMap(item =>
        [item.temperature, item.templow].filter(temp => typeof temp === "number")
      );
      this._dailyMinTemp = dailyTemps.length ? Math.min(...dailyTemps) : undefined;
      this._dailyMaxTemp = dailyTemps.length ? Math.max(...dailyTemps) : undefined;
    }

    if (this._status === "unavailable") {
      return html`
        <ha-card class="unavailable">
          <p>${this._name} is unavailable.</p>
        </ha-card>
      `;
    }

    const showDaily = this._config.daily_forecast && this._forecastDailyEvent?.forecast?.length;
    const showHourly = this._config.hourly_forecast && this._forecastHourlyEvent?.forecast?.length;

    return html`
      <ha-card>
        <div class="weather" style="background-image: url(${this._getWeatherBgImage(this._state.state)})">
          <div class="temp">${this._hass.formatEntityAttributeValue(this._state, "temperature") || this._state.state}</div>
          <div class="condition">${this._hass.formatEntityState(this._state) || this._state.state}</div>
        </div>
        ${showDaily || showHourly
          ? html`
            <div class="divider"></div>
          `
          : ""
        }
        <div class="forecast-container">
          <div class="forecast-daily-container">
            <div class="fade-left"></div>
            <div class="fade-right"></div>
            ${showDaily
              ? html`
                <div class="forecast daily">
                  <wfe-daily-list
                    .hass=${this._hass}
                    .forecast=${this._forecastDailyEvent!.forecast}
                    .min=${this._dailyMinTemp}
                    .max=${this._dailyMaxTemp}
                  ></wfe-daily-list>
                </div>
              `
              : ""
            }
          </div>
        <div class="divider"></div>
          <div class="forecast-hourly-container">
            <div class="fade-left"></div>
            <div class="fade-right"></div>
            ${showHourly
              ? html`
                <div class="forecast hourly"
                  style=${this._hourlyMinTemp !== undefined && this._hourlyMaxTemp !== undefined
                    ? `--min-temp: ${this._hourlyMinTemp}; --max-temp: ${this._hourlyMaxTemp};`
                    : nothing}>
                  <wfe-hourly-list
                    .hass=${this._hass}
                    .forecast=${this._forecastHourlyEvent!.forecast}
                  ></wfe-hourly-list>
                </div>
              `
              : ""
            }
          </div>
        </div>
      </ha-card>
    `;
  }

  // Private methods
  private _calculateMinMaxTemps() {
    if (this._forecastHourlyEvent?.forecast?.length) {
      const temps = this._forecastHourlyEvent.forecast
        .map(item => item.temperature)
        .filter(temp => typeof temp === "number");
      this._hourlyMinTemp = temps.length ? Math.min(...temps) : undefined;
      this._hourlyMaxTemp = temps.length ? Math.max(...temps) : undefined;
    }

    if (this._forecastDailyEvent?.forecast?.length) {
      const dailyTemps = this._forecastDailyEvent.forecast.flatMap(item =>
        [item.temperature, item.templow].filter(temp => typeof temp === "number")
      );
      this._dailyMinTemp = dailyTemps.length ? Math.min(...dailyTemps) : undefined;
      this._dailyMaxTemp = dailyTemps.length ? Math.max(...dailyTemps) : undefined;
    }
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

  private _initDragScroll(container: HTMLElement) {
    if (this._hourlyMomentumElement === container) {
      return;
    }

    if (this._hourlyMomentumCleanup) {
      this._hourlyMomentumCleanup();
      this._hourlyMomentumCleanup = undefined;
    }

    this._hourlyMomentumElement = container;
    this._hourlyMomentumCleanup = enableMomentumScroll(container, {
      snapSelector: ".forecast-item",
    });
  }
}
