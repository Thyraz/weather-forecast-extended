import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import type { WeatherForecastExtendedConfig } from "../types";

type AttributeFieldName = "header_attribute_1" | "header_attribute_2" | "header_attribute_3";

type EditorFormData = WeatherForecastExtendedConfig & Partial<Record<AttributeFieldName, string>>;

const ATTRIBUTE_FIELD_NAMES: AttributeFieldName[] = [
  "header_attribute_1",
  "header_attribute_2",
  "header_attribute_3",
];

type HaFormSelector =
  | { entity: { domain?: string; device_class?: string | string[] } }
  | { boolean: {} }
  | { text: {} }
  | { select: { options: Array<{ value: string; label: string }>; custom_value?: boolean } };

type HaFormSchema = {
  name: keyof WeatherForecastExtendedConfig | "entity" | "hourly_forecast" | "daily_forecast" | "show_header" | AttributeFieldName;
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
    .sun-section,
    .location-section {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .sun-section h4,
    .location-section h4 {
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
    const formData = this._createFormData();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
      <div class="location-section">
        <h4>Location</h4>
        <span>Needed for sunrise/sunset markers and day/night backgrounds</span>
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
      </div>
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
      </div>
    `;
  }

  private _handleValueChanged(event: CustomEvent<{ value: EditorFormData }>) {
    event.stopPropagation();
    const formValue = event.detail.value;

    const headerAttributes = this._extractHeaderAttributes(formValue);

    const configUpdate: Partial<WeatherForecastExtendedConfig> = {
      ...formValue,
      header_attributes: headerAttributes,
    };

    ATTRIBUTE_FIELD_NAMES.forEach(name => {
      delete (configUpdate as Record<string, unknown>)[name];
    });

    this._updateConfig(configUpdate);
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return schema.name;
    }

    switch (schema.name) {
      case "entity":
        return this.hass.localize("ui.panel.lovelace.editor.card.generic.entity");
      case "header_temperature_entity":
        return "Local header temperature sensor (optional)";
      case "header_attribute_1":
      case "header_attribute_2":
      case "header_attribute_3":
        return "Header attribute";
      case "show_header":
        return this.hass.localize("ui.panel.lovelace.editor.card.generic.show_header") || "Show header";
      case "hourly_forecast":
        return this.hass.localize("ui.panel.lovelace.editor.card.weather.show_forecast_hourly") || "Show hourly forecast";
      case "daily_forecast":
        return this.hass.localize("ui.panel.lovelace.editor.card.weather.show_forecast_daily") || "Show daily forecast";
      case "orientation":
        return this.hass.localize("ui.panel.lovelace.editor.card.generic.orientation") || "Orientation";
      case "use_night_header_backgrounds":
        return "Use separate header backgrounds for nightly conditions";
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

  private _createFormData(): EditorFormData {
    if (!this._config) {
      return {} as EditorFormData;
    }

    const attributes = this._config.header_attributes ?? [];

    const formData: EditorFormData = {
      ...this._config,
      header_attribute_1: attributes[0],
      header_attribute_2: attributes[1],
      header_attribute_3: attributes[2],
    };

    return formData;
  }

  private _extractHeaderAttributes(formValue: EditorFormData): string[] {
    return ATTRIBUTE_FIELD_NAMES
      .map(name => formValue[name])
      .map(attr => (typeof attr === "string" ? attr.trim() : ""))
      .filter(attr => attr.length > 0)
      .slice(0, 3);
  }

  private _buildAttributeOptions(): Array<{ value: string; label: string }> {
    if (!this.hass) {
      return [{ value: "", label: "None" }];
    }

    const entityId = this._config?.entity;
    if (!entityId) {
      return [{ value: "", label: "None" }];
    }

    const entityState = this.hass.states[entityId];
    if (!entityState) {
      return [{ value: "", label: "None" }];
    }

    const attributeNames = Object.keys(entityState.attributes ?? {}).sort((a, b) => a.localeCompare(b));

    return [
      { value: "", label: "None" },
      ...attributeNames.map(attribute => ({ value: attribute, label: attribute })),
    ];
  }

  private _buildSchema(): HaFormSchema[] {
    const baseSchema: HaFormSchema[] = [
      { name: "entity", selector: { entity: { domain: "weather" } } },
      {
        name: "header_temperature_entity",
        selector: { entity: { domain: "sensor", device_class: "temperature" } },
        optional: true,
      },
    ];

    const attributeOptions = this._buildAttributeOptions();
    const attributeSchemas: HaFormSchema[] = ATTRIBUTE_FIELD_NAMES.map(name => ({
      name,
      selector: {
        select: {
          options: attributeOptions,
          custom_value: true,
        },
      },
      optional: true,
      disabled: !this._config?.entity,
    }));

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

    baseSchema.push(...attributeSchemas);
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

    baseSchema.push({
      name: "use_night_header_backgrounds",
      selector: { boolean: {} },
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

    if (updated.header_attributes) {
      updated.header_attributes = updated.header_attributes
        .filter((attr, index) => index < 3 && typeof attr === "string")
        .map(attr => attr.trim())
        .filter(attr => attr.length > 0);
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
