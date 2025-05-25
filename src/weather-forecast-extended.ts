import { ResizeController } from "@lit-labs/observers/resize-controller";
import type { PropertyValues } from "lit";
import { LitElement, html, nothing } from "lit";
import { state } from "lit/decorators";
import { formatTime, formatHour, formatDayPeriod, formatDateWeekdayShort, formatDateDayTwoDigit, isNewDay, useAmPm } from "./date-time";
import type { ForecastEvent, WeatherEntity } from "./weather";
import {
  getForecast,
  getSecondaryWeatherAttribute,
  getWeatherStateIcon,
  getWeatherUnit,
  getWind,
  subscribeForecast
} from "./weather";
import { HomeAssistant, LovelaceCardConfig, ActionConfig } from "custom-card-helpers";
import { LovelaceGridOptions } from "./types";
import { styles } from "./weather-forecast-extended.styles";

// HA config object
interface Config extends LovelaceCardConfig {
  showSeconds: boolean;
  twentyFourHourFormat: boolean;
  hideBackground: boolean;
  styles: Styles;
  entity: string
  tap_action: ActionConfig;
}

interface HassEvent extends Event {
  detail
}

// Available CSS options for the card
type Styles = {
  width: string;
  height: string;
  font: string;
  fontSize: string;
  textColor: string;
}

export class WeatherForecastExtended extends LitElement {
  // internal reactive states
  @state() private _config: Config;
  @state() private _header: string | typeof nothing;
  @state() private _entity: string;
  @state() private _name: string;
  @state() private _state: WeatherEntity;
  @state() private _status: string;

  @state() private _forecastEvent?: ForecastEvent;
  @state() private _subscribed?: Promise<() => void>;

  // private property
  private _hass;

  // lifecycle interface
  setConfig(config: Config) {
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

  // Load styles using LitElement
  static styles = styles;

  // Lit callback
  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && this._config && this._hass) {
      this._subscribeForecastEvents();
    }
  }

  // Lit callback
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._config || !this._hass) {
      return;
    }

    if (changedProps.has("_config") || !this._subscribed) {
      this._subscribeForecastEvents();
    }
  }

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

  // Lit callback
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

    console.log("FORECASTDATA");
    console.log(forecastData);

    const weatherStateIcon = getWeatherStateIcon(this._status, this);

    // Needs to be set bassed on if user wants to see weather summary later
    const weather = false;
    const forecast = this._config.show_forecast !== false && forecastData?.forecast?.length ? forecastData.forecast : undefined;

    const hourly = forecastData?.type === "hourly";

    return html`
      <ha-card header="${this._header}">
        ${forecast
          ? html`
            <div class="forecast">
              ${forecast.map((item) =>
                this._showValue(item.temperature)
                  ? html`
                      <div>
                        <div class=${hourly && isNewDay(new Date(item.datetime), this._hass) ? 'new-day' : ''}>
                          ${hourly
                            ? html`
                                ${isNewDay(new Date(item.datetime), this._hass)
                                  ? formatDateWeekdayShort(
                                      new Date(item.datetime),
                                      this._hass!.locale,
                                      this._hass!.config
                                    )
                                  : formatHour(
                                      new Date(item.datetime),
                                      this._hass!.locale,
                                      this._hass!.config
                                    )
                                }
                              `
                            : html`
                                ${formatDateWeekdayShort(
                                  new Date(item.datetime),
                                  this._hass!.locale,
                                  this._hass!.config
                                )}
                              `
                          }
                        </div>
                        <div class="day-of-month">
                          ${!hourly
                            ? html`
                                ${formatDateDayTwoDigit(
                                  new Date(item.datetime),
                                  this._hass!.locale,
                                  this._hass!.config
                                )}
                              `
                            : ""
                          }
                        </div>
                         <div class="${isNewDay(new Date(item.datetime), this._hass) ? 'ampm-hidden' : 'ampm'}">
                          ${hourly && useAmPm(this._hass!.locale)
                            ? html`
                                ${formatDayPeriod(
                                  new Date(item.datetime),
                                  this._hass!.locale,
                                  this._hass!.config
                                )}
                              `
                            : ""
                          }
                        </div>
                          ${this._showValue(item.condition)
                            ? html`
                                <div class="forecast-image-icon">
                                  ${getWeatherStateIcon(
                                    item.condition!,
                                    this,
                                    !(
                                      item.is_daytime ||
                                      item.is_daytime === undefined
                                    )
                                  )}
                                </div>
                              `
                            : ""
                          }
                        <div class="temp">
                          ${this._showValue(item.temperature)
                            ? html`${Math.round(item.temperature)}°`
                            : "—"}
                        </div>
                        <div class="templow">
                          ${this._showValue(item.templow)
                            ? html`${Math.round(item.templow)}°`
                            : hourly
                              ? ""
                              : "—"
                          }
                        </div>
                        <div class="precipitation ${item.precipitation > 0.3 ? 'active' : ''}">
                          ${this._showValue(item.precipitation)
                            ? html`${item.precipitation}`
                            : "—"}
                        </div>
                        <div class="precipitationprobability ${item.precipitation_probability > 30 ? 'active' : ''}">
                          ${this._showValue(item.precipitation_probability)
                            ? html`${item.precipitation_probability}%`
                            : "—"
                          }
                        </div>
                      </div>
                    `
                  : ""
                )}
              </div>
            `: "" }
      </ha-card>
    `;
  }

  private _showValue(item?: any): boolean {
    return typeof item !== "undefined" && item !== null;
  }

  // Called by HA for card sizing
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
}
