import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import type { HeaderChip, WeatherForecastExtendedConfig } from "../types";

const HEADER_CHIP_INDEXES = [0, 1, 2] as const;

type HeaderChipFieldName =
  | `header_chip_${1 | 2 | 3}_type`
  | `header_chip_${1 | 2 | 3}_attribute`
  | `header_chip_${1 | 2 | 3}_template`;

type EditorFormData = WeatherForecastExtendedConfig & Partial<Record<HeaderChipFieldName, string>>;

const chipTypeFieldName = (index: number): HeaderChipFieldName =>
  `header_chip_${index + 1}_type` as HeaderChipFieldName;
const chipAttributeFieldName = (index: number): HeaderChipFieldName =>
  `header_chip_${index + 1}_attribute` as HeaderChipFieldName;
const chipTemplateFieldName = (index: number): HeaderChipFieldName =>
  `header_chip_${index + 1}_template` as HeaderChipFieldName;

const CHIP_FORM_FIELD_NAMES = HEADER_CHIP_INDEXES.reduce<HeaderChipFieldName[]>((names, index) => {
  names.push(
    chipTypeFieldName(index),
    chipAttributeFieldName(index),
    chipTemplateFieldName(index),
  );
  return names;
}, []);

const CHIP_TYPE_OPTIONS: Array<{ value: "attribute" | "template"; label: string }> = [
  { value: "attribute", label: "Attribute" },
  { value: "template", label: "Template" },
];

type HaFormSelector =
  | { entity: { domain?: string; device_class?: string | string[] } }
  | { boolean: {} }
  | { text: {} }
  | { select: { options: Array<{ value: string; label: string }>; custom_value?: boolean } };

type HaFormSchema = {
  name: keyof WeatherForecastExtendedConfig | "entity" | HeaderChipFieldName;
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
  @state() private _chipTypes: Record<number, "attribute" | "template"> = {
    0: "attribute",
    1: "attribute",
    2: "attribute",
  };

  static styles = css`
    .sun-section,
    .location-section {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .chips-section {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .chips-section h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .chips-hint {
      margin: 0;
      font-size: 14px;
      color: var(--secondary-text-color);
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
    const normalizedChips = this._normalizeHeaderChips(config);
    this._chipTypes = this._buildChipTypeState(normalizedChips);

    this._config = {
      type: "custom:weather-forecast-extended-card",
      ...config,
      show_header: config.show_header ?? true,
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      orientation: config.orientation ?? "vertical",
      header_chips: normalizedChips,
      header_attributes: normalizedChips
        .filter(chip => chip.type === "attribute")
        .map(chip => chip.attribute),
    };
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const { base: baseSchema, chips: chipSchema } = this._buildSchemas();
    const formData = this._createFormData();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${baseSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
      <div class="chips-section">
        <h4>Header chips</h4>
        <p class="chips-hint">Choose Attribute or Template for up to three header chips.</p>
        <ha-form
          .hass=${this.hass}
          .data=${formData}
          .schema=${chipSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._handleValueChanged}
        ></ha-form>
      </div>
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
    const mergedFormValue: EditorFormData = {
      ...this._createFormData(),
      ...event.detail.value,
    };

    const chipTypesUpdate: Record<number, "attribute" | "template"> = { ...this._chipTypes };
    HEADER_CHIP_INDEXES.forEach(index => {
      const typeField = chipTypeFieldName(index);
      const typeValue = (mergedFormValue[typeField] as "attribute" | "template" | undefined) ?? "attribute";
      chipTypesUpdate[index] = typeValue === "template" ? "template" : "attribute";
    });
    this._chipTypes = chipTypesUpdate;

    const headerChips = this._extractHeaderChips(mergedFormValue);

    const configUpdate: Partial<WeatherForecastExtendedConfig> = {
      ...mergedFormValue,
      header_chips: headerChips,
      header_attributes: headerChips
        .filter(chip => chip.type === "attribute")
        .map(chip => chip.attribute),
    };

    CHIP_FORM_FIELD_NAMES.forEach(name => {
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
        if (typeof schema.name === "string" && schema.name.startsWith("header_chip_")) {
          const parts = schema.name.split("_");
          const indexStr = parts[2];
          const index = Number(indexStr);
          const labelIndex = Number.isFinite(index) && index > 0 ? index : 1;
          if (schema.name.endsWith("_type")) {
            return `Header chip ${labelIndex}: mode`;
          }
          if (schema.name.endsWith("_attribute")) {
            return `Header chip ${labelIndex}: attribute`;
          }
          if (schema.name.endsWith("_template")) {
            return `Header chip ${labelIndex}: template`;
          }
          return `Header chip ${labelIndex}`;
        }
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

    const formData: EditorFormData = {
      ...this._config,
    };

    const headerChips = this._config.header_chips ?? [];

    HEADER_CHIP_INDEXES.forEach(index => {
      const typeField = chipTypeFieldName(index);
      const attributeField = chipAttributeFieldName(index);
      const templateField = chipTemplateFieldName(index);
      const configuredChip = headerChips[index];
      const type = this._chipTypes[index] ?? configuredChip?.type ?? "attribute";

      formData[typeField] = type;

      if (type === "template") {
        formData[templateField] = configuredChip?.type === "template" ? configuredChip.template : "";
        formData[attributeField] = "";
      } else {
        formData[attributeField] = configuredChip?.type === "attribute" ? configuredChip.attribute : "";
        formData[templateField] = "";
      }
    });

    return formData;
  }

  private _extractHeaderChips(formValue: EditorFormData): HeaderChip[] {
    const chips: HeaderChip[] = [];

    HEADER_CHIP_INDEXES.forEach(index => {
      const typeField = chipTypeFieldName(index);
      const attributeField = chipAttributeFieldName(index);
      const templateField = chipTemplateFieldName(index);

      const type = (formValue[typeField] as "attribute" | "template" | undefined) ?? "attribute";

      if (type === "template") {
        const templateRaw = formValue[templateField];
        const templateValue = typeof templateRaw === "string" ? templateRaw.trim() : "";
        chips.push({ type: "template", template: templateValue });
        return;
      }

      const attributeRaw = formValue[attributeField];
      const attributeValue = typeof attributeRaw === "string" ? attributeRaw.trim() : "";
      chips.push({ type: "attribute", attribute: attributeValue });
    });

    return chips;
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

  private _buildSchemas(): { base: HaFormSchema[]; chips: HaFormSchema[] } {
    const baseSchema: HaFormSchema[] = [
      { name: "entity", selector: { entity: { domain: "weather" } } },
      {
        name: "header_temperature_entity",
        selector: { entity: { domain: "sensor", device_class: "temperature" } },
        optional: true,
      },
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

    baseSchema.push({
      name: "use_night_header_backgrounds",
      selector: { boolean: {} },
    });

    const attributeOptions = this._buildAttributeOptions();
    const chipsSchema: HaFormSchema[] = [];

    HEADER_CHIP_INDEXES.forEach(index => {
      const typeField = chipTypeFieldName(index);
      chipsSchema.push({
        name: typeField,
        selector: {
          select: {
            options: CHIP_TYPE_OPTIONS,
          },
        },
        optional: true,
      });

      const chipType = this._chipTypes[index] ?? "attribute";
      if (chipType === "template") {
        chipsSchema.push({
          name: chipTemplateFieldName(index),
          selector: { text: {} },
          optional: true,
        });
      } else {
        chipsSchema.push({
          name: chipAttributeFieldName(index),
          selector: {
            select: {
              options: attributeOptions,
              custom_value: true,
            },
          },
          optional: true,
          disabled: !this._config?.entity,
        });
      }
    });

    return { base: baseSchema, chips: chipsSchema };
  }

  private _isSectionEnabled(name: ToggleName, config: WeatherForecastExtendedConfig): boolean {
    const value = config[name];
    return value !== false;
  }

  private _normalizeHeaderChips(config: Partial<WeatherForecastExtendedConfig>): HeaderChip[] {
    const limit = HEADER_CHIP_INDEXES.length;
    const normalized: HeaderChip[] = [];

    if (Array.isArray(config.header_chips)) {
      for (const chip of config.header_chips) {
        if (normalized.length >= limit || !chip || typeof chip !== "object") {
          continue;
        }

        if (chip.type === "attribute") {
          const attribute = typeof chip.attribute === "string" ? chip.attribute.trim() : "";
          normalized.push({ type: "attribute", attribute });
          continue;
        }

        if (chip.type === "template") {
          const template = typeof chip.template === "string" ? chip.template.trim() : "";
          normalized.push({ type: "template", template });
        }
      }
    }

    if (normalized.length) {
      return normalized.slice(0, limit);
    }

    const attributeEntries = Array.isArray(config.header_attributes)
      ? config.header_attributes
        .filter((attr, index) => index < limit && typeof attr === "string")
        .map(attr => attr.trim())
        .filter(attr => attr.length > 0)
      : [];

    return attributeEntries.map(attribute => ({ type: "attribute", attribute }));
  }

  private _buildChipTypeState(chips: HeaderChip[]): Record<number, "attribute" | "template"> {
    const types: Record<number, "attribute" | "template"> = {
      0: "attribute",
      1: "attribute",
      2: "attribute",
    };

    chips.slice(0, HEADER_CHIP_INDEXES.length).forEach((chip, index) => {
      if (chip.type === "template") {
        types[index] = "template";
      }
    });

    return types;
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

    const normalizedChips = this._normalizeHeaderChips(updated);
    updated.header_chips = normalizedChips;
    updated.header_attributes = normalizedChips
      .filter(chip => chip.type === "attribute")
      .map(chip => chip.attribute);

    this._config = updated;
    fireEvent(this, "config-changed", { config: updated });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-forecast-extended-editor": WeatherForecastExtendedEditor;
  }
}
