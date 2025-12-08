function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var parcelRequire = $parcel$global["parcelRequire94c2"];
parcelRequire.register("bwZCh", function(module, exports) {

$parcel$export(module.exports, "WeatherForecastExtendedEditor", () => $a37b5b928a2fc5d8$export$4f91f681c03a7b8b);

var $39J5i = parcelRequire("39J5i");

var $j0ZcV = parcelRequire("j0ZcV");

var $1ZxoT = parcelRequire("1ZxoT");
const $a37b5b928a2fc5d8$var$HEADER_CHIP_INDEXES = [
    0,
    1,
    2
];
const $a37b5b928a2fc5d8$var$chipTypeFieldName = (index)=>`header_chip_${index + 1}_type`;
const $a37b5b928a2fc5d8$var$chipAttributeFieldName = (index)=>`header_chip_${index + 1}_attribute`;
const $a37b5b928a2fc5d8$var$chipTemplateFieldName = (index)=>`header_chip_${index + 1}_template`;
const $a37b5b928a2fc5d8$var$chipIconFieldName = (index)=>`header_chip_${index + 1}_icon`;
const $a37b5b928a2fc5d8$var$chipActionFieldName = (index)=>`header_chip_${index + 1}_tap_action`;
const $a37b5b928a2fc5d8$var$CHIP_FORM_FIELD_NAMES = $a37b5b928a2fc5d8$var$HEADER_CHIP_INDEXES.reduce((names, index)=>{
    names.push($a37b5b928a2fc5d8$var$chipTypeFieldName(index), $a37b5b928a2fc5d8$var$chipAttributeFieldName(index), $a37b5b928a2fc5d8$var$chipTemplateFieldName(index), $a37b5b928a2fc5d8$var$chipIconFieldName(index), $a37b5b928a2fc5d8$var$chipActionFieldName(index));
    return names;
}, []);
const $a37b5b928a2fc5d8$var$CHIP_TYPE_OPTIONS = [
    {
        value: "attribute",
        label: "Attribute"
    },
    {
        value: "template",
        label: "Template"
    }
];
const $a37b5b928a2fc5d8$var$fireEvent = (node, type, detail)=>{
    node.dispatchEvent(new CustomEvent(type, {
        detail: detail,
        bubbles: true,
        composed: true
    }));
};
let $a37b5b928a2fc5d8$export$4f91f681c03a7b8b = class WeatherForecastExtendedEditor extends (0, $j0ZcV.LitElement) {
    static #_ = (()=>{
        this.styles = (0, $j0ZcV.css)`
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
    })();
    setConfig(config) {
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
            header_attributes: normalizedChips.filter((chip)=>chip.type === "attribute").map((chip)=>chip.attribute)
        };
    }
    render() {
        if (!this.hass || !this._config) return (0, $j0ZcV.html)``;
        const { general: generalSchema , layout: layoutSchema , header: headerSchema , chips: chipSchema  } = this._buildSchemas();
        const formData = this._createFormData();
        return (0, $j0ZcV.html)`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${generalSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
      <div class="editor-section">
        <h4 class="section-title">Layout</h4>
        <ha-form
          .hass=${this.hass}
          .data=${formData}
          .schema=${layoutSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._handleValueChanged}
        ></ha-form>
      </div>
      ${this._config.show_header !== false ? (0, $j0ZcV.html)`
            <div class="editor-section">
              <h4 class="section-title">Header options</h4>
              <ha-form
                .hass=${this.hass}
                .data=${formData}
                .schema=${headerSchema}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._handleValueChanged}
              ></ha-form>
              <div class="editor-subsection">
                <h5 class="section-subtitle">Header tap actions</h5>
                <p class="chips-hint">Tap-only actions for the temperature and condition pills.</p>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{
            ui_action: {}
        }}
                  .value=${this._config.header_tap_action_temperature}
                  .label=${"Temperature tap action"}
                  .required=${false}
                  .disabled=${this._config.show_header === false}
                  @value-changed=${(event)=>this._handleHeaderActionChange(event, "header_tap_action_temperature")}
                ></ha-selector>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{
            ui_action: {}
        }}
                  .value=${this._config.header_tap_action_condition}
                  .label=${"Condition tap action"}
                  .required=${false}
                  .disabled=${this._config.show_header === false}
                  @value-changed=${(event)=>this._handleHeaderActionChange(event, "header_tap_action_condition")}
                ></ha-selector>
              </div>
              <div class="chips-section">
                <h5 class="section-subtitle">Header chips</h5>
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
          ` : (0, $j0ZcV.nothing)}
      <div class="editor-section">
        <h4 class="section-title">Forecast options</h4>
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
    `;
    }
    _handleValueChanged(event) {
        event.stopPropagation();
        const mergedFormValue = {
            ...this._createFormData(),
            ...event.detail.value
        };
        const chipTypesUpdate = {
            ...this._chipTypes
        };
        $a37b5b928a2fc5d8$var$HEADER_CHIP_INDEXES.forEach((index)=>{
            const typeField = $a37b5b928a2fc5d8$var$chipTypeFieldName(index);
            const typeValue = mergedFormValue[typeField] ?? "attribute";
            chipTypesUpdate[index] = typeValue === "template" ? "template" : "attribute";
        });
        this._chipTypes = chipTypesUpdate;
        const headerChips = this._extractHeaderChips(mergedFormValue);
        const configUpdate = {
            ...mergedFormValue,
            header_chips: headerChips,
            header_attributes: headerChips.filter((chip)=>chip.type === "attribute").map((chip)=>chip.attribute).filter((attribute)=>typeof attribute === "string" && attribute.trim().length > 0)
        };
        $a37b5b928a2fc5d8$var$CHIP_FORM_FIELD_NAMES.forEach((name)=>{
            delete configUpdate[name];
        });
        this._updateConfig(configUpdate);
    }
    _handleSunToggleChange(event) {
        const target = event.currentTarget;
        if (!target) return;
        const name = target.getAttribute("name") ?? target.name;
        if (!name) return;
        const key = name;
        const isChecked = typeof target.checked === "boolean" ? target.checked : false;
        this._updateConfig({
            [key]: isChecked
        });
    }
    _handleSunInputChange(event) {
        const target = event.currentTarget;
        if (!target) return;
        const key = target.name;
        const value = target.value.trim();
        const update = {};
        update[key] = value === "" ? undefined : value;
        this._updateConfig(update);
    }
    _handleHeaderActionChange(event, field) {
        event.stopPropagation();
        const value = event.detail?.value;
        const update = {
            [field]: value || undefined
        };
        this._updateConfig(update);
    }
    _createFormData() {
        if (!this._config) return {};
        const formData = {
            ...this._config
        };
        const headerChips = this._config.header_chips ?? [];
        $a37b5b928a2fc5d8$var$HEADER_CHIP_INDEXES.forEach((index)=>{
            const typeField = $a37b5b928a2fc5d8$var$chipTypeFieldName(index);
            const attributeField = $a37b5b928a2fc5d8$var$chipAttributeFieldName(index);
            const templateField = $a37b5b928a2fc5d8$var$chipTemplateFieldName(index);
            const iconField = $a37b5b928a2fc5d8$var$chipIconFieldName(index);
            const actionField = $a37b5b928a2fc5d8$var$chipActionFieldName(index);
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
    _extractHeaderChips(formValue) {
        const chips = [];
        $a37b5b928a2fc5d8$var$HEADER_CHIP_INDEXES.forEach((index)=>{
            const typeField = $a37b5b928a2fc5d8$var$chipTypeFieldName(index);
            const attributeField = $a37b5b928a2fc5d8$var$chipAttributeFieldName(index);
            const templateField = $a37b5b928a2fc5d8$var$chipTemplateFieldName(index);
            const actionField = $a37b5b928a2fc5d8$var$chipActionFieldName(index);
            const iconField = $a37b5b928a2fc5d8$var$chipIconFieldName(index);
            const type = formValue[typeField] ?? "attribute";
            const tapAction = formValue[actionField];
            const iconRaw = formValue[iconField];
            const iconValue = typeof iconRaw === "string" ? iconRaw.trim() : "";
            if (type === "template") {
                const templateRaw = formValue[templateField];
                const templateValue = typeof templateRaw === "string" ? templateRaw.trim() : "";
                const chip = {
                    type: "template",
                    template: templateValue
                };
                if (tapAction) chip.tap_action = tapAction;
                if (iconValue) chip.icon = iconValue;
                chips.push(chip);
                return;
            }
            const attributeRaw = formValue[attributeField];
            const attributeValue = typeof attributeRaw === "string" ? attributeRaw.trim() : "";
            const chip = {
                type: "attribute",
                attribute: attributeValue
            };
            if (tapAction) chip.tap_action = tapAction;
            if (iconValue) chip.icon = iconValue;
            chips.push(chip);
        });
        return chips;
    }
    _buildAttributeOptions() {
        if (!this.hass) return [
            {
                value: "",
                label: "None"
            }
        ];
        const entityId = this._config?.entity;
        if (!entityId) return [
            {
                value: "",
                label: "None"
            }
        ];
        const entityState = this.hass.states[entityId];
        if (!entityState) return [
            {
                value: "",
                label: "None"
            }
        ];
        const attributeNames = Object.keys(entityState.attributes ?? {}).sort((a, b)=>a.localeCompare(b));
        return [
            {
                value: "",
                label: "None"
            },
            ...attributeNames.map((attribute)=>({
                    value: attribute,
                    label: attribute
                }))
        ];
    }
    _buildSchemas() {
        const generalSchema = [
            {
                name: "entity",
                selector: {
                    entity: {
                        domain: "weather"
                    }
                }
            },
            {
                name: "header_temperature_entity",
                selector: {
                    entity: {
                        domain: "sensor",
                        device_class: "temperature"
                    }
                },
                optional: true
            }
        ];
        const toggleNames = [
            "show_header",
            "hourly_forecast",
            "daily_forecast"
        ];
        const layoutSchema = toggleNames.map((name)=>({
                name: name,
                selector: {
                    boolean: {}
                }
            }));
        const config = this._config;
        if (config) {
            const enabledCount = toggleNames.reduce((count, name)=>this._isSectionEnabled(name, config) ? count + 1 : count, 0);
            toggleNames.forEach((name, index)=>{
                const isEnabled = this._isSectionEnabled(name, config);
                layoutSchema[index].disabled = enabledCount <= 1 && isEnabled;
            });
        }
        layoutSchema.push({
            name: "orientation",
            selector: {
                select: {
                    options: [
                        {
                            value: "vertical",
                            label: "Vertical"
                        },
                        {
                            value: "horizontal",
                            label: "Horizontal"
                        }
                    ]
                }
            },
            optional: true
        });
        const headerSchema = [
            {
                name: "use_night_header_backgrounds",
                selector: {
                    boolean: {}
                }
            }
        ];
        const attributeOptions = this._buildAttributeOptions();
        const chipsSchema = [];
        $a37b5b928a2fc5d8$var$HEADER_CHIP_INDEXES.forEach((index)=>{
            const typeField = $a37b5b928a2fc5d8$var$chipTypeFieldName(index);
            chipsSchema.push({
                name: typeField,
                selector: {
                    select: {
                        options: $a37b5b928a2fc5d8$var$CHIP_TYPE_OPTIONS
                    }
                },
                optional: true
            });
            const chipType = this._chipTypes[index] ?? "attribute";
            if (chipType === "template") chipsSchema.push({
                name: $a37b5b928a2fc5d8$var$chipTemplateFieldName(index),
                selector: {
                    text: {}
                },
                optional: true
            });
            else chipsSchema.push({
                name: $a37b5b928a2fc5d8$var$chipAttributeFieldName(index),
                selector: {
                    select: {
                        options: attributeOptions,
                        custom_value: true
                    }
                },
                optional: true,
                disabled: !this._config?.entity
            });
            chipsSchema.push({
                name: $a37b5b928a2fc5d8$var$chipIconFieldName(index),
                selector: {
                    icon: {}
                },
                optional: true
            });
            chipsSchema.push({
                name: $a37b5b928a2fc5d8$var$chipActionFieldName(index),
                selector: {
                    ui_action: {}
                },
                optional: true
            });
        });
        return {
            general: generalSchema,
            layout: layoutSchema,
            header: headerSchema,
            chips: chipsSchema
        };
    }
    _isSectionEnabled(name, config) {
        const value = config[name];
        return value !== false;
    }
    _normalizeHeaderChips(config) {
        const limit = $a37b5b928a2fc5d8$var$HEADER_CHIP_INDEXES.length;
        const normalized = [];
        if (Array.isArray(config.header_chips)) for (const chip of config.header_chips){
            if (normalized.length >= limit || !chip || typeof chip !== "object") continue;
            if (chip.type === "attribute") {
                const attribute = typeof chip.attribute === "string" ? chip.attribute.trim() : "";
                const tap_action = chip.tap_action;
                const icon = typeof chip.icon === "string" ? chip.icon.trim() : undefined;
                normalized.push({
                    type: "attribute",
                    attribute: attribute,
                    tap_action: tap_action,
                    icon: icon
                });
                continue;
            }
            if (chip.type === "template") {
                const template = typeof chip.template === "string" ? chip.template.trim() : "";
                const tap_action = chip.tap_action;
                const icon = typeof chip.icon === "string" ? chip.icon.trim() : undefined;
                normalized.push({
                    type: "template",
                    template: template,
                    tap_action: tap_action,
                    icon: icon
                });
            }
        }
        if (normalized.length) return normalized.slice(0, limit);
        const attributeEntries = Array.isArray(config.header_attributes) ? config.header_attributes.filter((attr, index)=>index < limit && typeof attr === "string").map((attr)=>attr.trim()).filter((attr)=>attr.length > 0) : [];
        return attributeEntries.map((attribute)=>({
                type: "attribute",
                attribute: attribute
            }));
    }
    _buildChipTypeState(chips) {
        const types = {
            0: "attribute",
            1: "attribute",
            2: "attribute"
        };
        chips.slice(0, $a37b5b928a2fc5d8$var$HEADER_CHIP_INDEXES.length).forEach((chip, index)=>{
            if (chip.type === "template") types[index] = "template";
        });
        return types;
    }
    _updateConfig(changes) {
        if (!this._config) return;
        const updated = {
            ...this._config,
            ...changes,
            type: "custom:weather-forecast-extended-card"
        };
        const normalizedChips = this._normalizeHeaderChips(updated);
        updated.header_chips = normalizedChips;
        updated.header_attributes = normalizedChips.filter((chip)=>chip.type === "attribute").map((chip)=>chip.attribute).filter((attribute)=>typeof attribute === "string" && attribute.trim().length > 0);
        this._config = updated;
        $a37b5b928a2fc5d8$var$fireEvent(this, "config-changed", {
            config: updated
        });
    }
    constructor(...args){
        super(...args);
        this._chipTypes = {
            0: "attribute",
            1: "attribute",
            2: "attribute"
        };
        this._computeLabel = (schema)=>{
            if (!this.hass) return schema.name;
            switch(schema.name){
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
                default:
                    if (typeof schema.name === "string" && schema.name.startsWith("header_chip_")) {
                        const parts = schema.name.split("_");
                        const indexStr = parts[2];
                        const index = Number(indexStr);
                        const labelIndex = Number.isFinite(index) && index > 0 ? index : 1;
                        if (schema.name.endsWith("_type")) return `Header chip ${labelIndex}: mode`;
                        if (schema.name.endsWith("_attribute")) return `Header chip ${labelIndex}: attribute`;
                        if (schema.name.endsWith("_template")) return `Header chip ${labelIndex}: template`;
                        if (schema.name.endsWith("_icon")) return `Header chip ${labelIndex}: icon`;
                        if (schema.name.endsWith("_tap_action")) return `Header chip ${labelIndex}: tap action`;
                        return `Header chip ${labelIndex}`;
                    }
                    return schema.name;
            }
        };
    }
};
(0, $39J5i.__decorate)([
    (0, $1ZxoT.property)({
        attribute: false
    })
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b.prototype, "hass", void 0);
(0, $39J5i.__decorate)([
    (0, $1ZxoT.state)()
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b.prototype, "_config", void 0);
(0, $39J5i.__decorate)([
    (0, $1ZxoT.state)()
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b.prototype, "_chipTypes", void 0);
$a37b5b928a2fc5d8$export$4f91f681c03a7b8b = (0, $39J5i.__decorate)([
    (0, $1ZxoT.customElement)("weather-forecast-extended-editor")
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b);

});


//# sourceMappingURL=weather-forecast-extended-editor.55ad15a7.js.map
