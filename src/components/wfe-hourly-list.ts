import { LitElement, html, nothing, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ForecastAttribute } from "../weather";
import { formatDayPeriod, formatDateWeekdayShort, formatHour, isNewDay, useAmPm } from "../date-time";
import { getWeatherStateIcon } from "../weather";
import type { HomeAssistant } from "custom-card-helpers";

@customElement("wfe-hourly-list")
export class WFEHourlyList extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) forecast: ForecastAttribute[] = [];
  private _resizeObserver?: ResizeObserver;

  protected createRenderRoot() {
    // Render in light DOM so parent CSS applies
    return this;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._setupResizeObserver();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = undefined;
    }
  }

  protected updated(): void {
    // Recalculate after DOM updates (including when forecast changes)
    this.updateComplete.then(() => this._recalculateTranslationHeights());
  }

  render() {
    if (!this.forecast?.length) return nothing;
    return html`${this.forecast.map((item) => this._renderHourlyItem(item))}`;
  }

  private _setupResizeObserver() {
    if (this._resizeObserver) return;
    const forecastEl = this.closest('.forecast.hourly') as HTMLElement | null;
    if (!forecastEl) return;
    this._resizeObserver = new ResizeObserver(() => {
      this._recalculateTranslationHeights();
    });
    this._resizeObserver.observe(forecastEl);
  }

  private _recalculateTranslationHeights() {
    const forecastEl = (this.closest('.forecast.hourly') as HTMLElement | null) ?? (this as unknown as HTMLElement);
    // Query first item as reference for heights
    const translateContainer = this.querySelector('.translate-container') as HTMLElement | null;
    const iconContainer = this.querySelector('.icon-container') as HTMLElement | null;
    if (!translateContainer || !iconContainer || !forecastEl) return;

    const containerHeight = translateContainer.offsetHeight;
    const contentHeight = iconContainer.offsetHeight;

    forecastEl.style.setProperty('--translate-container-height', `${containerHeight}px`);
    forecastEl.style.setProperty('--translate-content-height', `${contentHeight}px`);
  }

  private _hasValidValue(item?: any): boolean {
    return typeof item !== "undefined" && item !== null;
  }

  private _renderHourlyItem(item: ForecastAttribute): TemplateResult | typeof nothing {
    if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) {
      return nothing;
    }

    const date = new Date(item.datetime);
    const newDay = isNewDay(date, this.hass.config as any);

    return html`
      <div class="forecast-item">
        <div class="date ${newDay ? 'new-day' : ''}">
          ${newDay
            ? formatDateWeekdayShort(date, this.hass.locale as any, this.hass.config as any)
            : formatHour(date, this.hass.locale as any, this.hass.config as any)}
        </div>
        ${useAmPm(this.hass.locale as any)
          ? html`<div class="${newDay ? 'ampm-hidden' : 'ampm'}">${formatDayPeriod(date, this.hass.locale as any, this.hass.config as any)}</div>`
          : ""}
        <div class="translate-container">
          <div class="icon-container" style=${`--item-temp: ${item.temperature}`}>
            <div class="forecast-image-icon">
              ${getWeatherStateIcon(item.condition!, this, !(item.is_daytime || item.is_daytime === undefined))}
            </div>
            <div class="temp">${Math.round(item.temperature)}°</div>
          </div>
          <div class="templow"></div>
        </div>
        ${this._renderPrecipitationInfo(item)}
      </div>
    `;
  }

  private _renderPrecipitationInfo(item: ForecastAttribute): TemplateResult {
    const hasPrecipitation = this._hasValidValue(item.precipitation);
    const hasPrecipitationProbability = this._hasValidValue(item.precipitation_probability);

    return html`
      <div class="precipitation ${((item.precipitation ?? 0) as number) > 0.3 ? 'active' : ''}">
        ${hasPrecipitation ? html`${(item.precipitation as number).toFixed(1)}` : "—"}
      </div>
      <div class="precipitationprobability ${((item.precipitation_probability ?? 0) as number) > 30 ? 'active' : ''}">
        ${hasPrecipitationProbability ? html`${item.precipitation_probability}%` : "—"}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wfe-hourly-list": WFEHourlyList;
  }
}
