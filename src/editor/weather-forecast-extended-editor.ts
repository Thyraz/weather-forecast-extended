import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import type { HeaderChip, WeatherForecastExtendedConfig } from "../types";
import type { ForecastEvent } from "../weather";

const HEADER_CHIP_INDEXES = [0, 1, 2] as const;

type HeaderChipFieldName =
  | `header_chip_${1 | 2 | 3}_type`
  | `header_chip_${1 | 2 | 3}_attribute`
  | `header_chip_${1 | 2 | 3}_template`
  | `header_chip_${1 | 2 | 3}_icon`
  | `header_chip_${1 | 2 | 3}_tap_action`;

type EditorFormData = WeatherForecastExtendedConfig & Partial<Record<HeaderChipFieldName, any>>;

const chipTypeFieldName = (index: number): HeaderChipFieldName =>
  `header_chip_${index + 1}_type` as HeaderChipFieldName;
const chipAttributeFieldName = (index: number): HeaderChipFieldName =>
  `header_chip_${index + 1}_attribute` as HeaderChipFieldName;
const chipTemplateFieldName = (index: number): HeaderChipFieldName =>
  `header_chip_${index + 1}_template` as HeaderChipFieldName;
const chipIconFieldName = (index: number): HeaderChipFieldName =>
  `header_chip_${index + 1}_icon` as HeaderChipFieldName;
const chipActionFieldName = (index: number): HeaderChipFieldName =>
  `header_chip_${index + 1}_tap_action` as HeaderChipFieldName;

const CHIP_FORM_FIELD_NAMES = HEADER_CHIP_INDEXES.reduce<HeaderChipFieldName[]>((names, index) => {
  names.push(
    chipTypeFieldName(index),
    chipAttributeFieldName(index),
    chipTemplateFieldName(index),
    chipIconFieldName(index),
    chipActionFieldName(index),
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
  | { icon: {} }
  | { ui_action: { actions?: Array<"tap" | "hold" | "double_tap"> } }
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

type ModernForecastType = "hourly" | "daily" | "twice_daily";
const WeatherEntityFeature = {
  FORECAST_DAILY: 1,
  FORECAST_HOURLY: 2,
  FORECAST_TWICE_DAILY: 4,
} as const;

@customElement("weather-forecast-extended-editor")
export class WeatherForecastExtendedEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: WeatherForecastExtendedConfig;
  @state() private _chipTypes: Record<number, "attribute" | "template"> = {
    0: "attribute",
    1: "attribute",
    2: "attribute",
  };
  @state() private _hourlyExtraOptions: string[] = [];
  @state() private _dailyExtraOptions: string[] = [];

  private _forecastOptionSubscriptions: Partial<Record<ModernForecastType, Promise<() => void> | undefined>> = {};
  private _forecastOptionsEntity?: string;

  static styles = css`
    .editor-section {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-section:first-of-type {
      margin-top: 16px;
    }

    .section-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .section-subtitle {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }

    .group-card {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 12px;
      padding: 16px;
      background: var(--ha-card-background, #fff);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-subsection {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .chips-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .chips-hint {
      margin: 0;
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .location-description {
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .sun-coordinates {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .coordinate-field {
      display: flex;
      flex: 1 1 120px;
      flex-direction: column;
      gap: 4px;
      font-size: 14px;
    }

    .coordinate-field input {
      font: inherit;
      padding: 6px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      background: var(--ha-card-background, #fff);
      color: var(--primary-text-color);
    }

    .coordinate-field input:disabled {
      opacity: 0.6;
    }

    .forecast-switch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .forecast-switch span {
      font-size: 14px;
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

    this._refreshForecastOptions();
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    this._refreshForecastOptions();

    const {
      general: generalSchema,
      layout: layoutSchema,
      header: headerSchema,
      chips: chipSchema,
      hourly: hourlySchema,
      daily: dailySchema,
    } = this._buildSchemas();
    const formData = this._createFormData();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${generalSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
      <div class="editor-section">
        <h4 class="section-title">Layout</h4>
        <div class="group-card">
          <ha-form
            .hass=${this.hass}
            .data=${formData}
            .schema=${layoutSchema}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._handleValueChanged}
          ></ha-form>
        </div>
      </div>
      ${this._config.show_header !== false
        ? html`
            <div class="editor-section">
              <h4 class="section-title">Header options</h4>
              <div class="group-card">
                <ha-form
                  .hass=${this.hass}
                  .data=${formData}
                  .schema=${headerSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._handleValueChanged}
                ></ha-form>
                <div class="editor-subsection">
                  <h5 class="section-subtitle">Tap actions</h5>
                  <p class="chips-hint">Tap-only actions for the temperature and condition pills.</p>
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ ui_action: {} }}
                    .value=${this._config.header_tap_action_temperature}
                    .label=${"Temperature tap action"}
                    .required=${false}
                    .disabled=${this._config.show_header === false}
                    @value-changed=${(event: CustomEvent) =>
                      this._handleHeaderActionChange(event, "header_tap_action_temperature")}
                  ></ha-selector>
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ ui_action: {} }}
                    .value=${this._config.header_tap_action_condition}
                    .label=${"Condition tap action"}
                    .required=${false}
                    .disabled=${this._config.show_header === false}
                    @value-changed=${(event: CustomEvent) =>
                      this._handleHeaderActionChange(event, "header_tap_action_condition")}
                  ></ha-selector>
                </div>
                <div class="chips-section">
                  <h5 class="section-subtitle">Chips</h5>
                  <p class="chips-hint">Choose Attribute or Template for up to three header chips.</p>
                  <ha-form
                    .hass=${this.hass}
                    .data=${formData}
                    .schema=${chipSchema}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._handleValueChanged}
                  ></ha-form>
                </div>
              </div>
            </div>
          `
        : nothing}
      <div class="editor-section">
        <h4 class="section-title">Forecast options</h4>
        <div class="group-card">
          <div class="editor-subsection">
            <div>
              <h5 class="section-subtitle">Location</h5>
              <p class="location-description">
                Needed for sunrise/sunset markers and day/night backgrounds
              </p>
            </div>
            <div class="forecast-switch">
              <span>Use Home Assistant location</span>
              <ha-switch
                name="sun_use_home_coordinates"
                .checked=${this._config.sun_use_home_coordinates ?? true}
                @change=${this._handleSunToggleChange}
              ></ha-switch>
            </div>
            <div class="sun-coordinates">
              <label class="coordinate-field">
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
              <label class="coordinate-field">
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
          <div class="editor-subsection">
            <h5 class="section-subtitle">Forecast spacing</h5>
            <p class="location-description">
              Minimum distance between forecast items in pixels (10px or greater)
            </p>
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>Daily min gap (px)</span>
                <input
                  type="number"
                  name="daily_min_gap"
                  min="10"
                  step="1"
                  placeholder="Default 30"
                  .value=${String(this._config.daily_min_gap ?? "")}
                  @input=${this._handleSunInputChange}
                />
              </label>
              <label class="coordinate-field">
                <span>Hourly min gap (px)</span>
                <input
                  type="number"
                  name="hourly_min_gap"
                  min="10"
                  step="1"
                  placeholder="Default 16"
                  .value=${String(this._config.hourly_min_gap ?? "")}
                  @input=${this._handleSunInputChange}
                />
              </label>
            </div>
          </div>
          <div class="editor-subsection">
            <h5 class="section-subtitle">Hourly forecast options</h5>
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${hourlySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
          </div>
          <div class="editor-subsection">
            <h5 class="section-subtitle">Daily forecast options</h5>
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${dailySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
          </div>
          <div class="editor-subsection">
            <h5 class="section-subtitle">Sunrise & Sunset</h5>
            <div class="forecast-switch">
              <span>Show sunrise & sunset</span>
              <ha-switch
                name="show_sun_times"
                .checked=${this._config.show_sun_times ?? false}
                @change=${this._handleSunToggleChange}
              ></ha-switch>
            </div>
          </div>
        </div>
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
        .map(chip => chip.attribute)
        .filter(attribute => typeof attribute === "string" && attribute.trim().length > 0),
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
        return "Weather Entity";
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
      case "hourly_extra_attribute":
        return "Hourly extra attribute (third line)";
      case "hourly_extra_attribute_unit":
        return "Unit for hourly extra attribute";
      case "daily_extra_attribute":
        return "Daily extra attribute (third line)";
      case "daily_extra_attribute_unit":
        return "Unit for daily extra attribute";
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
          if (schema.name.endsWith("_icon")) {
            return `Header chip ${labelIndex}: icon`;
          }
          if (schema.name.endsWith("_tap_action")) {
            return `Header chip ${labelIndex}: tap action`;
          }
          return `Header chip ${labelIndex}`;
        }
        return schema.name;
    }
  };

  private _handleSunToggleChange(event: Event) {
    const target = event.currentTarget as (HTMLElement & { name?: string; checked?: boolean }) | null;
    if (!target) {
      return;
    }
    const name = target.getAttribute("name") ?? target.name;
    if (!name) {
      return;
    }
    const key = name as keyof WeatherForecastExtendedConfig;
    const isChecked = typeof target.checked === "boolean" ? target.checked : false;
    this._updateConfig({ [key]: isChecked } as Partial<WeatherForecastExtendedConfig>);
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

  private _handleHeaderActionChange(
    event: CustomEvent<{ value?: unknown }>,
    field: "header_tap_action_temperature" | "header_tap_action_condition",
  ) {
    event.stopPropagation();
    const value = event.detail?.value;
    const update: Partial<WeatherForecastExtendedConfig> = {
      [field]: value || undefined,
    };
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
      const iconField = chipIconFieldName(index);
      const actionField = chipActionFieldName(index);
      const configuredChip = headerChips[index];
      const type = this._chipTypes[index] ?? configuredChip?.type ?? "attribute";

      formData[typeField] = type;
      formData[actionField] = configuredChip?.tap_action;
      formData[iconField] = configuredChip?.icon ?? "";

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
      const actionField = chipActionFieldName(index);
      const iconField = chipIconFieldName(index);

      const type = (formValue[typeField] as "attribute" | "template" | undefined) ?? "attribute";
      const tapAction = formValue[actionField];
      const iconRaw = formValue[iconField];
      const iconValue = typeof iconRaw === "string" ? iconRaw.trim() : "";

      if (type === "template") {
        const templateRaw = formValue[templateField];
        const templateValue = typeof templateRaw === "string" ? templateRaw.trim() : "";
        const chip: HeaderChip = { type: "template", template: templateValue };
        if (tapAction) {
          (chip as any).tap_action = tapAction;
        }
        if (iconValue) {
          (chip as any).icon = iconValue;
        }
        chips.push(chip);
        return;
      }

      const attributeRaw = formValue[attributeField];
      const attributeValue = typeof attributeRaw === "string" ? attributeRaw.trim() : "";
      const chip: HeaderChip = { type: "attribute", attribute: attributeValue };
      if (tapAction) {
        (chip as any).tap_action = tapAction;
      }
      if (iconValue) {
        (chip as any).icon = iconValue;
      }
      chips.push(chip);
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

  private _buildHourlyExtraAttributeOptions(): Array<{ value: string; label: string }> {
    const disallowed = new Set([
      "datetime",
      "condition",
      "precipitation",
      "temperature",
      "templow",
    ]);

    const options = this._hourlyExtraOptions.length
      ? this._hourlyExtraOptions.filter(opt => !disallowed.has(opt))
      : [];

    return [{ value: "", label: "None" }, ...options.map(value => ({ value, label: value }))];
  }

  private _buildDailyExtraAttributeOptions(): Array<{ value: string; label: string }> {
    const disallowed = new Set([
      "datetime",
      "condition",
      "precipitation",
      "temperature",
      "templow",
    ]);

    const options = this._dailyExtraOptions.length
      ? this._dailyExtraOptions.filter(opt => !disallowed.has(opt))
      : [];

    return [{ value: "", label: "None" }, ...options.map(value => ({ value, label: value }))];
  }

  private _buildSchemas(): {
    general: HaFormSchema[];
    layout: HaFormSchema[];
    header: HaFormSchema[];
    chips: HaFormSchema[];
    hourly: HaFormSchema[];
    daily: HaFormSchema[];
  } {
    const generalSchema: HaFormSchema[] = [
      { name: "entity", selector: { entity: { domain: "weather" } } },
      {
        name: "header_temperature_entity",
        selector: { entity: { domain: "sensor", device_class: "temperature" } },
        optional: true,
      },
    ];

    const toggleNames: ToggleName[] = ["show_header", "hourly_forecast", "daily_forecast"];
    const layoutSchema: HaFormSchema[] = toggleNames.map(name => ({ name, selector: { boolean: {} } }));

    const config = this._config;
    if (config) {
      const enabledCount = toggleNames.reduce((count, name) =>
        this._isSectionEnabled(name, config) ? count + 1 : count,
      0);

      toggleNames.forEach((name, index) => {
        const isEnabled = this._isSectionEnabled(name, config);
        layoutSchema[index].disabled = enabledCount <= 1 && isEnabled;
      });
    }

    layoutSchema.push({
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

    const headerSchema: HaFormSchema[] = [
      {
        name: "use_night_header_backgrounds",
        selector: { boolean: {} },
      },
    ];

    const attributeOptions = this._buildAttributeOptions();
    const hourlySchema: HaFormSchema[] = [
      {
        name: "hourly_extra_attribute",
        selector: {
          select: {
            options: this._buildHourlyExtraAttributeOptions(),
            custom_value: true,
          },
        },
        optional: true,
      },
      {
        name: "hourly_extra_attribute_unit",
        selector: { text: {} },
        optional: true,
      },
    ];
    const dailySchema: HaFormSchema[] = [
      {
        name: "daily_extra_attribute",
        selector: {
          select: {
            options: this._buildDailyExtraAttributeOptions(),
            custom_value: true,
          },
        },
        optional: true,
      },
      {
        name: "daily_extra_attribute_unit",
        selector: { text: {} },
        optional: true,
        disabled: this._config?.daily_extra_attribute === "precipitation_probability",
      },
    ];
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

      chipsSchema.push({
        name: chipIconFieldName(index),
        selector: { icon: {} },
        optional: true,
      });

      chipsSchema.push({
        name: chipActionFieldName(index),
        selector: { ui_action: {} },
        optional: true,
      });
    });

    return { general: generalSchema, layout: layoutSchema, header: headerSchema, chips: chipsSchema, hourly: hourlySchema, daily: dailySchema };
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
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === "string" ? chip.icon.trim() : undefined;
          normalized.push({ type: "attribute", attribute, tap_action, icon });
          continue;
        }

        if (chip.type === "template") {
          const template = typeof chip.template === "string" ? chip.template.trim() : "";
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === "string" ? chip.icon.trim() : undefined;
          normalized.push({ type: "template", template, tap_action, icon });
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
      .map(chip => chip.attribute)
      .filter(attribute => typeof attribute === "string" && attribute.trim().length > 0);

    this._config = updated;
    fireEvent(this, "config-changed", { config: updated });
  }

  private _refreshForecastOptions() {
    try {
      if (!this.hass || !this._config?.entity) {
        this._teardownForecastOptionSubscriptions();
        if (this._hourlyExtraOptions.length || this._dailyExtraOptions.length) {
          this._hourlyExtraOptions = [];
          this._dailyExtraOptions = [];
        }
        this._forecastOptionsEntity = undefined;
        return;
      }

      const entityId = this._config.entity;
      if (this._forecastOptionsEntity !== entityId) {
        this._teardownForecastOptionSubscriptions();
        this._hourlyExtraOptions = [];
        this._dailyExtraOptions = [];
        this._forecastOptionsEntity = entityId;
      }

      const stateObj = this.hass.states[entityId];

      const supported = this._getSupportedForecastTypes(stateObj as any);
      const needed = new Set<ModernForecastType>();
      if (supported.includes("hourly")) {
        needed.add("hourly");
      }
      if (supported.includes("daily") || supported.includes("twice_daily")) {
        needed.add("daily");
      }
      if (!needed.size) {
        needed.add("daily");
      }

      (["hourly", "daily"] as ModernForecastType[]).forEach(type => {
        if (!needed.has(type)) {
          this._teardownForecastOptionSubscriptions([type]);
        } else if (!this._forecastOptionSubscriptions[type]) {
          try {
            this._forecastOptionSubscriptions[type] = this._subscribeForecast(
              entityId,
              type,
              event => this._handleForecastOptionsEvent(type, event),
            );
          } catch (_err) {
            // ignore subscription errors to avoid breaking the editor
          }
        }
      });
    } catch (_err) {
      // Fall back to attribute-based detection to keep the editor alive
      try {
        if (this.hass && this._config?.entity) {
          this._applyForecastOptionsFromAttributes(this.hass.states[this._config.entity] as any);
        }
      } catch (_e) {
        // ignore
      }
    }
  }

  private _handleForecastOptionsEvent(type: ModernForecastType, event: ForecastEvent) {
    const entries = Array.isArray(event?.forecast) ? event.forecast : [];
    if (!entries.length) {
      return;
    }

    const disallowedHourly = new Set(["datetime", "condition", "precipitation", "temperature", "templow"]);
    const disallowedDaily = disallowedHourly;
    const keys = new Set<string>();

    entries.forEach(entry => {
      if (entry && typeof entry === "object") {
        Object.keys(entry).forEach(key => {
          const block = type === "hourly" ? disallowedHourly : disallowedDaily;
          if (!block.has(key)) {
            keys.add(key);
          }
        });
      }
    });

    const next = Array.from(keys).sort((a, b) => a.localeCompare(b));
    if (type === "hourly") {
      if (next.join("|") !== this._hourlyExtraOptions.join("|")) {
        this._hourlyExtraOptions = next;
      }
    } else {
      if (next.join("|") !== this._dailyExtraOptions.join("|")) {
        this._dailyExtraOptions = next;
      }
    }
  }

  private _applyForecastOptionsFromAttributes(stateObj: any) {
    if (!stateObj?.attributes?.forecast) {
      return;
    }
    const entries = Array.isArray(stateObj.attributes.forecast) ? stateObj.attributes.forecast : [];
    if (!entries.length) {
      return;
    }

    const disallowed = new Set(["datetime", "condition", "precipitation", "temperature", "templow"]);
    const keys = new Set<string>();
    entries.forEach(entry => {
      if (entry && typeof entry === "object") {
        Object.keys(entry).forEach(key => {
          if (!disallowed.has(key)) {
            keys.add(key);
          }
        });
      }
    });

    const options = Array.from(keys).sort((a, b) => a.localeCompare(b));
    if (options.join("|") !== this._hourlyExtraOptions.join("|")) {
      this._hourlyExtraOptions = options;
    }
    if (options.join("|") !== this._dailyExtraOptions.join("|")) {
      this._dailyExtraOptions = options;
    }
  }

  private _getSupportedForecastTypes(stateObj: any): ModernForecastType[] {
    if (!stateObj?.attributes) {
      return [];
    }
    const supported: ModernForecastType[] = [];
    const features = stateObj.attributes.supported_features ?? 0;
    if ((features & WeatherEntityFeature.FORECAST_DAILY) !== 0) {
      supported.push("daily");
    }
    if ((features & WeatherEntityFeature.FORECAST_TWICE_DAILY) !== 0) {
      supported.push("twice_daily");
    }
    if ((features & WeatherEntityFeature.FORECAST_HOURLY) !== 0) {
      supported.push("hourly");
    }
    return supported;
  }

  private _subscribeForecast(
    entityId: string,
    forecastType: ModernForecastType,
    callback: (event: ForecastEvent) => void,
  ): Promise<() => void> | undefined {
    if (!this.hass?.connection) {
      this._applyForecastOptionsFromAttributes(this.hass.states[entityId] as any);
      return undefined;
    }

    return this.hass.connection
      .subscribeMessage<ForecastEvent>(callback, {
        type: "weather/subscribe_forecast",
        forecast_type: forecastType,
        entity_id: entityId,
      })
      .catch(() => undefined);
  }

  private _teardownForecastOptionSubscriptions(types?: ModernForecastType[]) {
    const targets = types ?? (["hourly", "daily"] as ModernForecastType[]);
    targets.forEach(type => {
      const sub = this._forecastOptionSubscriptions[type];
      sub?.then(unsub => unsub?.()).catch(() => undefined);
      delete this._forecastOptionSubscriptions[type];
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._teardownForecastOptionSubscriptions();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-forecast-extended-editor": WeatherForecastExtendedEditor;
  }
}
