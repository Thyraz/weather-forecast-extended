import { LitElement, html, nothing, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ForecastAttribute } from "../weather";
import { formatDateDayTwoDigit, formatDateWeekdayShort, isNewDay } from "../date-time";
import { getWeatherStateIcon } from "../weather";
import type { HomeAssistant } from "custom-card-helpers";

const PRECIPITATION_DISPLAY_THRESHOLD = 0.3;
const DAILY_PRECIPITATION_MIN_SCALE = 4;
const DAILY_PRECIPITATION_MAX_SCALE = 20;

@customElement("wfe-daily-list")
export class WFEDailyList extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) forecast: ForecastAttribute[] = [];
  @property({ attribute: false }) min?: number;
  @property({ attribute: false }) max?: number;

  protected createRenderRoot() {
    // Render in light DOM so parent CSS applies
    return this;
  }

  render() {
    if (!this.forecast?.length) return nothing;
    const precipitationScale = this._computePrecipitationScale(
      DAILY_PRECIPITATION_MIN_SCALE,
      DAILY_PRECIPITATION_MAX_SCALE,
    );
    return html`
      ${this.forecast.map((item) => this._renderDailyItem(item, precipitationScale))}
    `;
  }

  private _hasValidValue(item?: any): boolean {
    return typeof item !== "undefined" && item !== null;
  }

  private _renderDailyItem(
    item: ForecastAttribute,
    precipitationScale?: number,
  ): TemplateResult | typeof nothing {
    if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) {
      return nothing;
    }
    const date = new Date(item.datetime);
    const newDay = isNewDay(date, this.hass.config as any);

    return html`
      <div class="forecast-item" @click=${() => this._handleSelect(item)}>
        <div class="date">${formatDateWeekdayShort(date, this.hass.locale as any, this.hass.config as any)}</div>
        ${!newDay ? html`<div class="day-of-month">${formatDateDayTwoDigit(date, this.hass.locale as any, this.hass.config as any)}</div>` : ""}
        <div class="translate-container">
          <div class="icon-container">
            <div class="forecast-image-icon">
              ${getWeatherStateIcon(item.condition!, this, false)}
            </div>
            <div class="temp">${Math.round(item.temperature)}°</div>
          </div>
          ${this._renderTemperatureBar(item)}
          <div class="templow">${this._hasValidValue(item.templow) ? html`${Math.round(item.templow!)}°` : "—"}</div>
        </div>
        ${this._renderPrecipitationInfo(item, precipitationScale)}
      </div>
    `;
  }

  private _handleSelect(item: ForecastAttribute) {
    if (!item?.datetime) return;
    this.dispatchEvent(new CustomEvent("wfe-daily-selected", {
      detail: {
        datetime: item.datetime,
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _renderTemperatureBar(item: ForecastAttribute): TemplateResult | typeof nothing {
    if (!this._hasValidValue(item.templow)) {
      return nothing;
    }

    // Styling prozentual relativ zu globalem Min/Max
    return html`
      <div class="temperature-bar">
        <div class="temperature-bar-inner" style=${this._getTemperatureBarStyle(item.temperature, item.templow!)}></div>
      </div>
    `;
  }

  private _renderPrecipitationInfo(
    item: ForecastAttribute,
    precipitationScale?: number,
  ): TemplateResult | typeof nothing {
    const hasPrecipitation = this._hasValidValue(item.precipitation);
    const hasPrecipitationProbability = this._hasValidValue(item.precipitation_probability);

    if (!hasPrecipitation && !hasPrecipitationProbability) {
      return nothing;
    }

    const precipitationValue = hasPrecipitation ? (item.precipitation as number) : undefined;
    const precipitationClasses = ["precipitation"];
    if ((precipitationValue ?? 0) > PRECIPITATION_DISPLAY_THRESHOLD) {
      precipitationClasses.push("active");
    }

    let precipitationStyle: string | typeof nothing = nothing;
    let overflow = false;

    if (
      precipitationScale !== undefined &&
      precipitationValue !== undefined &&
      precipitationValue >= PRECIPITATION_DISPLAY_THRESHOLD
    ) {
      const normalized = precipitationScale > 0 ? Math.min(precipitationValue / precipitationScale, 1) : 0;
      const percent = `${(normalized * 100).toFixed(2)}%`;
      precipitationStyle = `--precipitation-fill: ${percent};`;
      overflow = precipitationValue > precipitationScale;
    }

    if (overflow) {
      precipitationClasses.push("overflow");
    }

    return html`
      ${hasPrecipitation
        ? html`<div class="${precipitationClasses.join(" ")}" style=${precipitationStyle}>
            ${(item.precipitation as number).toFixed(1)}
          </div>`
        : nothing}
      ${hasPrecipitationProbability
        ? html`<div class="precipitationprobability ${((item.precipitation_probability ?? 0) as number) > 30 ? 'active' : ''}">
            ${item.precipitation_probability}%
          </div>`
        : nothing}
    `;
  }

  private _computePrecipitationScale(minScale: number, maxScale: number): number | undefined {
    if (!this.forecast?.length) {
      return undefined;
    }

    const values = this.forecast
      .map((item) => (typeof item?.precipitation === "number" ? item.precipitation : undefined))
      .filter((value): value is number => typeof value === "number");

    if (!values.length) {
      return undefined;
    }

    const highestValue = Math.max(...values);
    const unconstrained = Math.max(minScale, highestValue);
    return Math.min(unconstrained, maxScale);
  }

  private _getTemperatureBarStyle(maxTemp: number, minTemp: number): string {
    if (this.min === undefined || this.max === undefined) return "";
    const total = this.max - this.min;
    if (!total) return "";

    const top = ((this.max - maxTemp) / total) * 100;
    const bottom = ((this.max - minTemp) / total) * 100;
    const height = bottom - top;

    return `top: ${top}%; height: ${height}%;`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wfe-daily-list": WFEDailyList;
  }
}
