import type { PropertyValues } from "lit";
import { LitElement, html, nothing } from "lit";
import { state } from "lit/decorators";
import { formatHour, formatDayPeriod, formatDateWeekdayShort, formatDateDayTwoDigit, isNewDay, useAmPm } from "./date-time";
import type { ForecastEvent, WeatherEntity } from "./weather";
import {
  getForecast,
  getWeatherStateIcon,
  subscribeForecast
} from "./weather";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { LovelaceGridOptions } from "./types";
import { styles } from "./weather-forecast-extended.styles";

export class WeatherForecastExtended extends LitElement {
  // internal reactive states
  @state() private _config: LovelaceCardConfig;
  @state() private _header: string | typeof nothing;
  @state() private _entity: string;
  @state() private _name: string;
  @state() private _state: WeatherEntity;
  @state() private _status: string;

  @state() private _forecastEvent?: ForecastEvent;
  @state() private _subscribed?: Promise<() => void>;

  // private property
  private _resizeObserver;
  private _hass;
  private _oldContainerWidth;

  // Called by HA
  setConfig(config: LovelaceCardConfig) {
    this._config = config;
    this._header = config.header === "" ? nothing : config.header;
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
    var rows = this._config.forecast_type === "daily" ? 4 : 3;
    var min_rows = 1;
    return {
      columns: 12,
      rows: rows,
      min_columns: 6,
      min_rows: min_rows,
    };
  }

  // Load styles using LitElement
  static styles = styles;

  // Forecast
  private _needForecastSubscription() {
    return (
      this._config.forecast_type
    );
  }

  private _unsubscribeForecastEvents() {
    if (this._subscribed) {
      this._subscribed.then((unsub) => unsub());
      this._subscribed = undefined;
    }
  }

  private async _subscribeForecastEvents() {
    this._unsubscribeForecastEvents();
    if (
      !this.isConnected ||
      !this._hass ||
      !this._config ||
      !this._needForecastSubscription() ||
      !this._hass.config.components.includes("weather") ||
      !this._state
    ) {
      return;
    }

    this._subscribed = subscribeForecast(
      this._hass!,
      this._entity,
      this._config.forecast_type as "daily" | "hourly" | "twice_daily",
      (event) => {
        this._forecastEvent = event;
      }
    ).catch((e) => {
      if (e.code === "invalid_entity_id") {
        setTimeout(() => {
          this._subscribed = undefined;
        }, 2000);
      }
      throw e;
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
    this._resizeObserver.disconnect();
  }

  updated(changedProps: PropertyValues): void {
     super.updated(changedProps);
    if (!this._config || !this._hass) {
      return;
    }

    if (changedProps.has("_config") || !this._subscribed) {
      this._subscribeForecastEvents();
    }

    if (!this._resizeObserver) {
      const card = this.shadowRoot.querySelector('ha-card') as HTMLElement;
      this._resizeObserver = new ResizeObserver((entries) => this._updateGap() );
      this._resizeObserver.observe(card);

      // Call once for the initial size
      this._updateGap()
    }
  }

  render() {
    if (!this._config || !this._hass) {
      return nothing;
    }

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

    const forecastData = getForecast(
      this._state.attributes,
      this._forecastEvent,
      this._config?.forecast_type
    );

    const forecast = this._config.show_forecast !== false && forecastData?.forecast?.length ? forecastData.forecast : undefined;
    const hourly = forecastData?.type === "hourly";

    return html`
      <ha-card header="${this._header}">
        ${forecast
          ? html`
            <div class="forecast">
              ${forecast.map((item) => {
                const date = new Date(item.datetime);
                const newDay = isNewDay(date, this._hass);
                return this._hasValidValue(item.temperature)
                  ? html`
                      <div class="card-content">
                        <div class=${hourly && newDay ? 'new-day' : ''}>
                          ${hourly
                            ? html`
                                ${newDay
                                  ? formatDateWeekdayShort(date, this._hass!.locale, this._hass!.config)
                                  : formatHour(date, this._hass!.locale, this._hass!.config)
                                }
                              `
                            : html`${formatDateWeekdayShort(date, this._hass!.locale, this._hass!.config)}`
                          }
                        </div>
                        <div class="day-of-month">
                          ${!hourly
                            ? html`${formatDateDayTwoDigit(date, this._hass!.locale, this._hass!.config)}`
                            : ""
                          }
                        </div>
                        <div class="${newDay ? 'ampm-hidden' : 'ampm'}">
                          ${hourly && useAmPm(this._hass!.locale)
                            ? html`${formatDayPeriod(date, this._hass!.locale, this._hass!.config)}`
                            : ""
                          }
                        </div>

                        ${this._hasValidValue(item.condition)
                          ? html`
                              <div class="forecast-image-icon">
                                ${getWeatherStateIcon(item.condition!, this, !(item.is_daytime || item.is_daytime === undefined))}
                              </div>
                            `
                          : ""
                        }

                        <div class="temp">
                          ${this._hasValidValue(item.temperature)
                            ? html`${Math.round(item.temperature)}°`
                            : "—"
                          }
                        </div>
                        <div class="templow">
                          ${this._hasValidValue(item.templow)
                            ? html`${Math.round(item.templow)}°`
                            : hourly
                              ? ""
                              : "—"
                          }
                        </div>
                        <div class="precipitation ${item.precipitation > 0.3 ? 'active' : ''}">
                          ${this._hasValidValue(item.precipitation)
                            ? html`${item.precipitation}`
                            : "—"
                          }
                        </div>
                        <div class="precipitationprobability ${item.precipitation_probability > 30 ? 'active' : ''}">
                          ${this._hasValidValue(item.precipitation_probability)
                            ? html`${item.precipitation_probability}%`
                            : "—"
                          }
                        </div>
                      </div>
                    `
                  : nothing;
              })}
            </div>
          `: ""
        }
      </ha-card>
    `;
  }

  // Private methods

  private _hasValidValue(item?: any): boolean {
    return typeof item !== "undefined" && item !== null;
  }

  private _updateGap() {
    const container = this.shadowRoot.querySelector('ha-card') as HTMLElement | null;
    if (!container) {
      return;
    }

    const containerWidth = container.clientWidth;
    if (containerWidth === this._oldContainerWidth) {
      return;
    }

    const itemWidth = 40;
    const minGap = 30;
    const padding = 16;
    const maxItems = Math.floor((containerWidth + minGap - 2*padding) / (itemWidth + minGap));

    if (maxItems < 2) return; // Avoid divide by zero

    const totalItemWidth = maxItems * itemWidth;
    const gap = Math.round((containerWidth - 2*padding - totalItemWidth) / (maxItems - 1));

    container.style.setProperty("--dynamic-gap", `${gap}px`);
    this._oldContainerWidth = containerWidth;
  }
}
