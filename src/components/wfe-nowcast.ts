import { LitElement, html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { customElement, property, state } from "lit/decorators.js";

type NowcastForecastItem = {
  datetime: string;
  precipitation: number;
};

const NOWCAST_MINUTES = 60;
const NOWCAST_MIN_BAR_WIDTH_PX = 5;
const NOWCAST_MAX_BAR_WIDTH_PX = 7;
const NOWCAST_BASE_GAP_PX = 5;
const NOWCAST_PRECIPITATION_MIN_SCALE = 1;

@customElement("wfe-nowcast")
export class WFENowcast extends LitElement {
  @property({ attribute: false }) forecast: NowcastForecastItem[] = [];
  @state() private _barStride = 1;
  @state() private _barGap = NOWCAST_BASE_GAP_PX;
  private _resizeObserver?: ResizeObserver;

  protected createRenderRoot() {
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

  render() {
    const series = this._buildMinuteSeries();
    const bars = this._reduceSeries(series, this._barStride);
    const maxValue = bars.reduce((max, value) => Math.max(max, value), 0);
    const scale = Math.max(NOWCAST_PRECIPITATION_MIN_SCALE, maxValue);
    const labels = this._barStride > 1
      ? ["Now", "20m", "40m", "60m"]
      : ["Now", "10m", "20m", "30m", "40m", "50m", "60m"];

    return html`
      <div
        class=${classMap({ "nowcast-bars": true })}
        style=${styleMap({ "--wfe-nowcast-gap": `${this._barGap}px` })}
      >
        ${bars.map(value => {
          const ratio = Math.min(1, value / scale);
          return html`
            <div class="nowcast-bar">
              <div class="nowcast-bar-fill" style=${styleMap({ height: `${Math.round(ratio * 100)}%` })}></div>
            </div>
          `;
        })}
      </div>
      <div class="nowcast-labels">
        ${labels.map(label => html`<span>${label}</span>`)}
      </div>
    `;
  }

  private _setupResizeObserver() {
    if (this._resizeObserver) {
      return;
    }

    this._resizeObserver = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect?.width ?? this.clientWidth;
      this._updateResolution(width);
    });
    this._resizeObserver.observe(this);
  }

  private _updateResolution(width: number) {
    if (!Number.isFinite(width) || width <= 0) {
      return;
    }
    const { stride, gap } = this._resolveLayout(width);
    if (stride !== this._barStride) {
      this._barStride = stride;
    }
    if (gap !== this._barGap) {
      this._barGap = gap;
    }
  }

  private _buildMinuteSeries(): number[] {
    const normalized = (Array.isArray(this.forecast) ? this.forecast : [])
      .map(item => {
        const timestamp = new Date(item.datetime).getTime();
        return {
          timestamp,
          value: Number.isFinite(item.precipitation) ? Math.max(0, item.precipitation) : 0,
        };
      })
      .filter(item => Number.isFinite(item.timestamp))
      .sort((a, b) => a.timestamp - b.timestamp);

    const values = normalized.map(item => item.value);
    const series = values.slice(0, NOWCAST_MINUTES);
    while (series.length < NOWCAST_MINUTES) {
      series.push(0);
    }
    return series;
  }

  private _reduceSeries(series: number[], stride: number): number[] {
    if (stride <= 1) {
      return series;
    }
    const grouped: number[] = [];
    for (let index = 0; index < series.length; index += stride) {
      const chunk = series.slice(index, index + stride);
      grouped.push(chunk.reduce((max, value) => Math.max(max, value), 0));
    }
    return grouped;
  }

  private _resolveLayout(width: number): { stride: number; gap: number } {
    let stride = 1;
    let gap = NOWCAST_BASE_GAP_PX;

    while (stride < NOWCAST_MINUTES) {
      const barWidth = this._computeBarWidth(width, stride, gap);
      if (barWidth >= NOWCAST_MIN_BAR_WIDTH_PX) {
        break;
      }
      stride += 1;
    }

    const barCount = Math.ceil(NOWCAST_MINUTES / stride);
    if (barCount > 1) {
      const maxGap = (width - barCount * NOWCAST_MAX_BAR_WIDTH_PX) / (barCount - 1);
      if (maxGap > gap) {
        gap = maxGap;
      }
    }

    return { stride, gap: Math.max(0, gap) };
  }

  private _computeBarWidth(width: number, stride: number, gap: number): number {
    const barCount = Math.ceil(NOWCAST_MINUTES / stride);
    if (barCount <= 0) {
      return 0;
    }
    if (barCount === 1) {
      return width;
    }
    return (width - gap * (barCount - 1)) / barCount;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wfe-nowcast": WFENowcast;
  }
}
