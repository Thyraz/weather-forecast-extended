import type { PropertyValues } from "lit";
import { LitElement, html, nothing, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import SunCalc from "suncalc";
import type { SunCoordinates, SunEventType, SunTimesByDay } from "../types";
import type { ForecastAttribute } from "../weather";
import { formatDayPeriod, formatDateWeekdayShort, formatHour, formatHourMinute, useAmPm } from "../date-time";
import { getWeatherStateIcon } from "../weather";
import type { HomeAssistant } from "custom-card-helpers";

const PRECIPITATION_DISPLAY_THRESHOLD = 0.3;
const HOURLY_PRECIPITATION_MIN_SCALE = 1;
const HOURLY_PRECIPITATION_MAX_SCALE = 5;

@customElement("wfe-hourly-list")
export class WFEHourlyList extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) forecast: ForecastAttribute[] = [];
  @property({ attribute: false }) showSunTimes = false;
  @property({ attribute: false }) sunCoordinates?: SunCoordinates;
  private _resizeObserver?: ResizeObserver;
  private _sunTimesByDay: SunTimesByDay = {};

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

  protected willUpdate(changedProps: PropertyValues<this>): void {
    if (
      changedProps.has("forecast") ||
      changedProps.has("sunCoordinates") ||
      changedProps.has("showSunTimes")
    ) {
      this._calculateSunTimes();
    }
  }

  render() {
    if (!this.forecast?.length) return nothing;

    const parts: TemplateResult[] = [];
    let currentDay: string | undefined;
    const precipitationScale = this._computePrecipitationScale(
      HOURLY_PRECIPITATION_MIN_SCALE,
      HOURLY_PRECIPITATION_MAX_SCALE,
    );

    this.forecast.forEach((item, index) => {
      if (!item?.datetime) {
        return;
      }

      const date = new Date(item.datetime);
      if (!Number.isFinite(date.getTime())) {
        return;
      }

      const dayKey = this._formatDayKey(date);
      if (dayKey !== currentDay) {
        currentDay = dayKey;
        parts.push(this._renderDayMarker(date));
      }

      const hourlyItem = this._renderHourlyItem(item, index, precipitationScale);
      if (hourlyItem !== nothing) {
        parts.push(hourlyItem);
      }
    });

    return html`${parts}`;
  }

  private _renderDayMarker(date: Date): TemplateResult {
    const label = formatDateWeekdayShort(date, this.hass?.locale as any, this.hass?.config as any);
    return html`<div class="day-marker">${label}</div>`;
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

  private _renderHourlyItem(
    item: ForecastAttribute,
    index: number,
    precipitationScale?: number,
  ): TemplateResult | typeof nothing {
    if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) {
      return nothing;
    }

    const date = new Date(item.datetime);
    const sunEvent = this._getSunEventForHour(date, index);
    const eventDate = sunEvent ? new Date(sunEvent.timestamp) : undefined;
    const dateClasses = ["date"];
    if (sunEvent) {
      dateClasses.push(sunEvent.type);
    }

    const dateLabel = sunEvent
      ? formatHourMinute(eventDate!, this.hass.locale as any, this.hass.config as any)
      : formatHour(date, this.hass.locale as any, this.hass.config as any);

    const showAmPm = useAmPm(this.hass.locale as any);
    const amPmDate = eventDate ?? date;
    const amPmLabel = showAmPm ? formatDayPeriod(amPmDate, this.hass.locale as any, this.hass.config as any) : undefined;

    return html`
      <div class="forecast-item">
        <div class="${dateClasses.join(" ")}">${dateLabel}</div>
        ${showAmPm
          ? html`<div class="ampm">${amPmLabel ?? ""}</div>`
          : ""}
        <div class="translate-container">
          <div class="icon-container" style=${`--item-temp: ${item.temperature}`}>
            <div class="forecast-image-icon">
              ${getWeatherStateIcon(item.condition!, this, this._shouldUseNightIcon(item, date))}
            </div>
            <div class="temp">${Math.round(item.temperature)}°</div>
          </div>
          <div class="templow"></div>
        </div>
        ${this._renderPrecipitationInfo(item, precipitationScale)}
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

    let overflow = false;
    let precipitationStyle: string | typeof nothing = nothing;

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

  private _calculateSunTimes() {
    if (!this.sunCoordinates || !this.forecast?.length) {
      this._sunTimesByDay = {};
      return;
    }

    const { latitude, longitude } = this.sunCoordinates;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      this._sunTimesByDay = {};
      return;
    }

    const sunTimes: SunTimesByDay = {};

    for (const item of this.forecast) {
      if (!item?.datetime) {
        continue;
      }

      const date = new Date(item.datetime);
      if (!Number.isFinite(date.getTime())) {
        continue;
      }

      const key = this._formatDayKey(date);
      if (sunTimes[key]) {
        continue;
      }

      const baseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      let times = SunCalc.getTimes(baseDate, latitude, longitude);
      let sunrise = this._toTimestamp(times.sunrise);
      let sunset = this._toTimestamp(times.sunset);
      // Keep rendered day aligned with the calendar day of the forecast even if
      // user and forecast locations sit in very different time zones.
      const dayShift = this._determineDayShift(key, sunrise, sunset);
      if (dayShift !== 0) {
        const shiftedDate = new Date(baseDate);
        shiftedDate.setDate(shiftedDate.getDate() + dayShift);
        times = SunCalc.getTimes(shiftedDate, latitude, longitude);
        sunrise = this._toTimestamp(times.sunrise);
        sunset = this._toTimestamp(times.sunset);
      }
      sunTimes[key] = {};
      if (sunrise !== undefined) {
        sunTimes[key].sunrise = sunrise;
      }
      if (sunset !== undefined) {
        sunTimes[key].sunset = sunset;
      }
    }

    this._sunTimesByDay = sunTimes;
  }

  private _shouldUseNightIcon(item: ForecastAttribute, date: Date): boolean {
    if (item.is_daytime === false) {
      return true;
    }
    if (item.is_daytime === true) {
      return false;
    }

    const derived = this._isNightFromSunTimes(date);
    return derived ?? false;
  }

  private _isNightFromSunTimes(date: Date): boolean | undefined {
    const times = this._sunTimesByDay?.[this._formatDayKey(date)];
    if (!times || times.sunrise === undefined || times.sunset === undefined) {
      return undefined;
    }

    const timestamp = date.getTime();
    if (!Number.isFinite(timestamp)) {
      return undefined;
    }

    if (times.sunrise <= times.sunset) {
      return timestamp < times.sunrise || timestamp >= times.sunset;
    }

    return !(timestamp >= times.sunrise && timestamp < times.sunset);
  }

  private _getSunEventForHour(date: Date, index: number): { type: SunEventType; timestamp: number } | undefined {
    if (!this.showSunTimes || !this._sunTimesByDay) {
      return undefined;
    }

    const key = this._formatDayKey(date);
    const times = this._sunTimesByDay[key];
    if (!times) {
      return undefined;
    }

    const start = date.getTime();
    if (!Number.isFinite(start)) {
      return undefined;
    }
    const end = this._getIntervalEnd(index, start);

    if (times.sunrise !== undefined && times.sunrise >= start && times.sunrise < end) {
      return { type: "sunrise", timestamp: times.sunrise };
    }

    if (times.sunset !== undefined && times.sunset >= start && times.sunset < end) {
      return { type: "sunset", timestamp: times.sunset };
    }

    return undefined;
  }

  private _getIntervalEnd(index: number, start: number): number {
    const next = this.forecast?.[index + 1];
    if (next?.datetime) {
      const nextDate = new Date(next.datetime);
      const nextTime = nextDate.getTime();
      if (Number.isFinite(nextTime) && nextTime > start) {
        return nextTime;
      }
    }
    // Fallback to one hour window if we can't determine the next step
    return start + 60 * 60 * 1000;
  }

  private _formatDayKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  private _toTimestamp(value?: Date): number | undefined {
    if (!value) {
      return undefined;
    }
    const time = value.getTime();
    return Number.isFinite(time) ? time : undefined;
  }

  private _determineDayShift(targetKey: string, sunrise?: number, sunset?: number): number {
    // Returns +1/-1 when sunrise/sunset fall on the previous/next day once
    // rendered in the user's local time zone. That happens when the forecast
    // location is many hours away from the viewer.
    const evaluate = (timestamp?: number): number => {
      if (timestamp === undefined) {
        return 0;
      }
      const eventKey = this._formatDayKey(new Date(timestamp));
      if (eventKey === targetKey) {
        return 0;
      }
      return eventKey < targetKey ? 1 : -1;
    };

    const sunriseShift = evaluate(sunrise);
    if (sunriseShift !== 0) {
      return sunriseShift;
    }

    return evaluate(sunset);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wfe-hourly-list": WFEHourlyList;
  }
}
