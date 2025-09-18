import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import type { WeatherForecastExtendedConfig } from "../types";

type HaFormSelector =
  | { entity: { domain?: string } }
  | { boolean: {} }
  | { text: {} };

type HaFormSchema = {
  name: keyof WeatherForecastExtendedConfig | "entity" | "name" | "hourly_forecast" | "daily_forecast";
  selector: HaFormSelector;
  optional?: boolean;
};

const fireEvent = (node: HTMLElement, type: string, detail?: unknown) => {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
};

@customElement("weather-forecast-extended-editor")
export class WeatherForecastExtendedEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: WeatherForecastExtendedConfig;

  private readonly _schema: HaFormSchema[] = [
    { name: "entity", selector: { entity: { domain: "weather" } } },
    { name: "name", selector: { text: {} }, optional: true },
    { name: "hourly_forecast", selector: { boolean: {} } },
    { name: "daily_forecast", selector: { boolean: {} } },
  ];

  public setConfig(config: WeatherForecastExtendedConfig): void {
    this._config = {
      type: "custom:weather-forecast-extended-card",
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      ...config,
    };
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
    `;
  }

  private _handleValueChanged(event: CustomEvent<{ value: Partial<WeatherForecastExtendedConfig> }>) {
    event.stopPropagation();
    if (!this._config) {
      return;
    }

    const value = event.detail.value;
    const updated: WeatherForecastExtendedConfig = {
      ...this._config,
      ...value,
      type: "custom:weather-forecast-extended-card",
    };

    if (!updated.name) {
      delete (updated as Partial<WeatherForecastExtendedConfig>).name;
    }

    this._config = updated;
    fireEvent(this, "config-changed", { config: updated });
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return schema.name;
    }

    switch (schema.name) {
      case "entity":
        return this.hass.localize("ui.panel.lovelace.editor.card.generic.entity");
      case "name":
        return this.hass.localize("ui.panel.lovelace.editor.card.generic.name");
      case "hourly_forecast":
        return this.hass.localize("ui.panel.lovelace.editor.card.weather.show_forecast_hourly") || "Show hourly forecast";
      case "daily_forecast":
        return this.hass.localize("ui.panel.lovelace.editor.card.weather.show_forecast_daily") || "Show daily forecast";
      default:
        return schema.name;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-forecast-extended-editor": WeatherForecastExtendedEditor;
  }
}
