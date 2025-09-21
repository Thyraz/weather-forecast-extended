import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import type { WeatherForecastExtendedConfig } from "../types";

type HaFormSelector =
  | { entity: { domain?: string } }
  | { boolean: {} }
  | { text: {} }
  | { select: { options: Array<{ value: string; label: string }> } };

type HaFormSchema = {
  name: keyof WeatherForecastExtendedConfig | "entity" | "name" | "hourly_forecast" | "daily_forecast" | "show_header";
  selector: HaFormSelector;
  optional?: boolean;
  disabled?: boolean;
};

type ToggleName = "show_header" | "hourly_forecast" | "daily_forecast";

const fireEvent = (node: HTMLElement, type: string, detail?: unknown) => {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
};

@customElement("weather-forecast-extended-editor")
export class WeatherForecastExtendedEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: WeatherForecastExtendedConfig;

  static styles = css`
    .sun-section {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .sun-section h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .sun-option {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .sun-option input[type="checkbox"] {
      width: 18px;
      height: 18px;
    }

    .sun-option span {
      flex: 1;
    }

    .sun-coordinates {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .sun-field {
      display: flex;
      flex: 1 1 120px;
      flex-direction: column;
      gap: 4px;
      font-size: 14px;
    }

    .sun-field input {
      font: inherit;
      padding: 6px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      background: var(--ha-card-background, #fff);
      color: var(--primary-text-color);
    }

    .sun-field input:disabled {
      opacity: 0.6;
    }
  `;

  public setConfig(config: WeatherForecastExtendedConfig): void {
    this._config = {
      type: "custom:weather-forecast-extended-card",
      ...config,
      show_header: config.show_header ?? true,
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      orientation: config.orientation ?? "vertical",
    };
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const schema = this._buildSchema();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
      <div class="sun-section">
        <h4>Sunrise & Sunset</h4>
        <label class="sun-option">
          <input
            type="checkbox"
            name="show_sun_times"
            .checked=${this._config.show_sun_times ?? false}
            @change=${this._handleSunToggleChange}
          />
          <span>Show sunrise & sunset</span>
        </label>
        ${this._config.show_sun_times
          ? html`
            <label class="sun-option">
              <input
                type="checkbox"
                name="sun_use_home_coordinates"
                .checked=${this._config.sun_use_home_coordinates ?? true}
                @change=${this._handleSunToggleChange}
              />
              <span>Use Home Assistant location</span>
            </label>
            <div class="sun-coordinates">
              <label class="sun-field">
                <span>Latitude</span>
                <input
                  type="text"
                  name="sun_latitude"
                  placeholder="e.g. 48.137"
                  .value=${String(this._config.sun_latitude ?? "")}
                  ?disabled=${this._config.sun_use_home_coordinates ?? true}
                  @input=${this._handleSunInputChange}
                />
              </label>
              <label class="sun-field">
                <span>Longitude</span>
                <input
                  type="text"
                  name="sun_longitude"
                  placeholder="e.g. 11.575"
                  .value=${String(this._config.sun_longitude ?? "")}
                  ?disabled=${this._config.sun_use_home_coordinates ?? true}
                  @input=${this._handleSunInputChange}
                />
              </label>
            </div>
          `
          : nothing}
      </div>
    `;
  }

  private _handleValueChanged(event: CustomEvent<{ value: Partial<WeatherForecastExtendedConfig> }>) {
    event.stopPropagation();
    this._updateConfig(event.detail.value);
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
      case "show_header":
        return this.hass.localize("ui.panel.lovelace.editor.card.generic.show_header") || "Show header";
      case "hourly_forecast":
        return this.hass.localize("ui.panel.lovelace.editor.card.weather.show_forecast_hourly") || "Show hourly forecast";
      case "daily_forecast":
        return this.hass.localize("ui.panel.lovelace.editor.card.weather.show_forecast_daily") || "Show daily forecast";
      case "orientation":
        return this.hass.localize("ui.panel.lovelace.editor.card.generic.orientation") || "Orientation";
      default:
        return schema.name;
    }
  };

  private _handleSunToggleChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement | null;
    if (!target) {
      return;
    }
    const key = target.name as keyof WeatherForecastExtendedConfig;
    this._updateConfig({ [key]: target.checked } as Partial<WeatherForecastExtendedConfig>);
  }

  private _handleSunInputChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement | null;
    if (!target) {
      return;
    }
    const key = target.name as keyof WeatherForecastExtendedConfig;
    const value = target.value.trim();
    const update: Partial<WeatherForecastExtendedConfig> = {};
    (update as any)[key] = value === "" ? undefined : value;
    this._updateConfig(update);
  }

  private _buildSchema(): HaFormSchema[] {
    const baseSchema: HaFormSchema[] = [
      { name: "entity", selector: { entity: { domain: "weather" } } },
      { name: "name", selector: { text: {} }, optional: true },
    ];

    const toggleNames: ToggleName[] = ["show_header", "hourly_forecast", "daily_forecast"];
    const toggleSchemas: HaFormSchema[] = toggleNames.map(name => ({ name, selector: { boolean: {} } }));

    const config = this._config;
    if (config) {
      const enabledCount = toggleNames.reduce((count, name) =>
        this._isSectionEnabled(name, config) ? count + 1 : count,
      0);

      toggleNames.forEach((name, index) => {
        const isEnabled = this._isSectionEnabled(name, config);
        toggleSchemas[index].disabled = enabledCount <= 1 && isEnabled;
      });
    }

    baseSchema.push(...toggleSchemas);
    baseSchema.push({
      name: "orientation",
      selector: {
        select: {
          options: [
            { value: "vertical", label: "Vertical" },
            { value: "horizontal", label: "Horizontal" },
          ],
        },
      },
      optional: true,
    });

    return baseSchema;
  }

  private _isSectionEnabled(name: ToggleName, config: WeatherForecastExtendedConfig): boolean {
    const value = config[name];
    return value !== false;
  }

  private _updateConfig(changes: Partial<WeatherForecastExtendedConfig>) {
    if (!this._config) {
      return;
    }

    const updated: WeatherForecastExtendedConfig = {
      ...this._config,
      ...changes,
      type: "custom:weather-forecast-extended-card",
    };

    if (!updated.name) {
      delete (updated as Partial<WeatherForecastExtendedConfig>).name;
    }

    this._config = updated;
    fireEvent(this, "config-changed", { config: updated });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-forecast-extended-editor": WeatherForecastExtendedEditor;
  }
}
