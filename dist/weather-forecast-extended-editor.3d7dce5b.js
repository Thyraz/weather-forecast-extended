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

var $aGwLT = parcelRequire("aGwLT");
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
const $a37b5b928a2fc5d8$var$SOLAR_FORECAST_OPTION = "solar_forecast";
const $a37b5b928a2fc5d8$var$FORECAST_OPTIONS_CACHE = new Map();
const $a37b5b928a2fc5d8$var$ICON_MAP_LABELS = {
    "clear-night": "Clear night",
    cloudy: "Cloudy",
    fog: "Fog",
    hail: "Hail",
    lightning: "Lightning",
    "lightning-rainy": "Lightning rainy",
    partlycloudy: "Partly cloudy",
    "partlycloudy-night": "Partly cloudy night",
    pouring: "Pouring",
    rainy: "Rainy",
    snowy: "Snowy",
    "snowy-rainy": "Snowy rainy",
    sunny: "Sunny",
    windy: "Windy",
    "windy-variant": "Windy variant",
    exceptional: "Exceptional"
};
const $a37b5b928a2fc5d8$var$fireEvent = (node, type, detail)=>{
    node.dispatchEvent(new CustomEvent(type, {
        detail: detail,
        bubbles: true,
        composed: true
    }));
};
const $a37b5b928a2fc5d8$var$WeatherEntityFeature = {
    FORECAST_DAILY: 1,
    FORECAST_HOURLY: 2,
    FORECAST_TWICE_DAILY: 4
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

    .group-card {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 12px;
      padding: 16px;
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

    .color-input-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .color-input-row input[type="color"] {
      padding: 0;
      width: 40px;
      height: 32px;
      border: none;
      background: none;
    }

    .color-input-row input[type="text"] {
      flex: 1 1 120px;
      min-width: 120px;
    }

    .icon-map-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .icon-map-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-map-row ha-selector {
      flex: 1 1 auto;
    }

    .clear-button {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));

      cursor: pointer;
      font: inherit;
      color: var(--primary-text-color);
    }

    .clear-button:hover {
      background: var(--secondary-background-color, #f5f5f5);
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

    .editor-expander {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color, #fff);
    }

    .editor-expander summary {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
    }

    .editor-expander summary::-webkit-details-marker {
      display: none;
    }

    .editor-expander > summary ha-icon {
      transition: transform 0.2s ease;
    }

    .editor-expander[open] > summary ha-icon {
      transform: rotate(180deg);
    }

    .editor-expander[open] summary {
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .editor-expander .summary-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .editor-expander.disabled summary {
      color: var(--secondary-text-color);
      cursor: default;
    }

    .editor-expander.disabled > summary ha-icon {
      opacity: 0.4;
    }

    .editor-expander .expander-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-expander.nested summary {
      padding: 10px 12px;
      font-size: 14px;
    }

    .editor-expander.nested .expander-content {
      padding: 12px;
    }
  `;
    })();
    setConfig(config) {
        const normalizedChips = this._normalizeHeaderChips(config);
        this._chipTypes = this._buildChipTypeState(normalizedChips);
        this._config = {
            type: "custom:weather-forecast-extended-card",
            ...config,
            nowcast_entity: config.nowcast_entity,
            nowcast_layout: config.nowcast_layout ?? "pager",
            nowcast_always_show: config.nowcast_always_show ?? false,
            show_header: config.show_header ?? true,
            hourly_forecast: config.hourly_forecast ?? true,
            daily_forecast: config.daily_forecast ?? true,
            orientation: config.orientation ?? "vertical",
            header_chips: normalizedChips,
            header_attributes: normalizedChips.filter((chip)=>chip.type === "attribute").map((chip)=>chip.attribute)
        };
        this._refreshForecastOptions();
        this._refreshSolarForecastOptions(true);
    }
    render() {
        if (!this.hass || !this._config) return (0, $j0ZcV.html)``;
        this._refreshForecastOptions();
        this._ensureSolarForecastOptions();
        const { general: generalSchema , layout: layoutSchema , header: headerSchema , nowcast: nowcastSchema , chips: chipSchema , hourly: hourlySchema , daily: dailySchema  } = this._buildSchemas();
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
        ${this._renderExpander("gps-coordinates", "GPS Coordinates", (0, $j0ZcV.html)`
            <p class="location-description">
              Needed for sunrise/sunset markers and day/night backgrounds
            </p>
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
          `)}
      </div>
      <div class="editor-section">
        ${this._renderExpander("solar-forecast", "Solar Forecast", (0, $j0ZcV.html)`
            <p class="location-description">
              The forecast needs to be assigned to a solar panel configuration in the Energy dashboard settings. Otherwise it can't be used here.
            </p>
            <ha-selector
              .hass=${this.hass}
              .selector=${{
            select: {
                options: this._solarForecastOptions,
                multiple: true
            }
        }}
              .value=${this._getSolarForecastSelection()}
              .label=${"Energy solar forecasts"}
              .required=${false}
              .disabled=${!this._solarForecastEntryIds.length}
              @value-changed=${this._handleSolarForecastSelectionChange}
            ></ha-selector>
            ${this._solarForecastOptionsLoaded && !this._solarForecastEntryIds.length ? (0, $j0ZcV.html)`<p class="location-description">No Energy solar forecasts configured.</p>` : (0, $j0ZcV.nothing)}
          `)}
      </div>
      <div class="editor-section">
        ${this._renderExpander("custom-icons", "Custom Icons", (0, $j0ZcV.html)`
            <p class="location-description">
              Override the default weather icons with any icon available in Home Assistant.
            </p>
            <div class="icon-map-list">
              ${(0, $aGwLT.WEATHER_CONDITIONS).map((condition)=>{
            const value = this._getIconMapValue(condition);
            return (0, $j0ZcV.html)`
                  <div class="icon-map-row">
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{
                icon: {}
            }}
                      .value=${value}
                      .label=${$a37b5b928a2fc5d8$var$ICON_MAP_LABELS[condition]}
                      .required=${false}
                      @value-changed=${(event)=>this._handleIconMapChange(condition, event)}
                    ></ha-selector>
                  </div>
                `;
        })}
            </div>
          `)}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander("header", "Header", "show_header", (0, $j0ZcV.html)`
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
            ${this._renderExpander("header-chips", "Chips", (0, $j0ZcV.html)`
                <p class="chips-hint">Choose Attribute or Template for up to three header chips.</p>
                <ha-form
                  .hass=${this.hass}
                  .data=${formData}
                  .schema=${chipSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._handleValueChanged}
                ></ha-form>
              `, {
            nested: true
        })}
            ${this._renderExpander("header-nowcast", "Nowcast", (0, $j0ZcV.html)`
                <p class="location-description">
                  Controls the minute-by-minute precipitation chart shown inside the header.
                </p>
                <ha-form
                  .hass=${this.hass}
                  .data=${formData}
                  .schema=${nowcastSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._handleValueChanged}
                ></ha-form>
              `, {
            nested: true
        })}
          `)}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander("daily-forecast", "Daily forecast", "daily_forecast", (0, $j0ZcV.html)`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${dailySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._forecastOptionsLoading.daily && !this._dailyExtraOptions.length ? (0, $j0ZcV.html)`<p class="location-description">Loading available weather attributes...</p>` : (0, $j0ZcV.nothing)}
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>Extra attribute color</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="daily_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.daily_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="daily_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(this._config.daily_extra_attribute_color ?? "")}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${()=>this._clearOptionalField("daily_extra_attribute_color")}
                  >
                    Clear
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>Dim values smaller than:</span>
                <input
                  type="number"
                  name="daily_extra_attribute_dim_below"
                  step="0.1"
                  placeholder="No threshold"
                  .value=${String(this._config.daily_extra_attribute_dim_below ?? "")}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
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
              </div>
            </div>
          `)}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander("hourly-forecast", "Hourly forecast", "hourly_forecast", (0, $j0ZcV.html)`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${hourlySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._forecastOptionsLoading.hourly && !this._hourlyExtraOptions.length ? (0, $j0ZcV.html)`<p class="location-description">Loading available weather attributes...</p>` : (0, $j0ZcV.nothing)}
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>Extra attribute color</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="hourly_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.hourly_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="hourly_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(this._config.hourly_extra_attribute_color ?? "")}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${()=>this._clearOptionalField("hourly_extra_attribute_color")}
                  >
                    Clear
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>Dim values smaller than:</span>
                <input
                  type="number"
                  name="hourly_extra_attribute_dim_below"
                  step="0.1"
                  placeholder="No threshold"
                  .value=${String(this._config.hourly_extra_attribute_dim_below ?? "")}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
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
            <div class="editor-subsection">
              <h5 class="section-subtitle">Forecast spacing</h5>
              <p class="location-description">
                Minimum distance between forecast items in pixels (10px or greater)
              </p>
              <div class="sun-coordinates">
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
          `)}
      </div>
      ${this._config.daily_forecast !== false && this._config.hourly_forecast !== false ? (0, $j0ZcV.html)`
            <div class="editor-section">
              <h4 class="section-title">Orientation</h4>
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
          ` : (0, $j0ZcV.nothing)}
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
    _handleExpanderToggle(event, id) {
        const target = event.currentTarget;
        if (!target) return;
        this._expandedSections = {
            ...this._expandedSections,
            [id]: target.open
        };
    }
    _handleExpanderSummaryClick(event, disabled) {
        if (!disabled) return;
        event.preventDefault();
    }
    _isToggleDisabled(name, config) {
        const toggleNames = [
            "show_header",
            "daily_forecast",
            "hourly_forecast"
        ];
        const enabledCount = toggleNames.reduce((count, key)=>this._isSectionEnabled(key, config) ? count + 1 : count, 0);
        return enabledCount <= 1 && this._isSectionEnabled(name, config);
    }
    _handleOptionalNumberInputChange(event) {
        const target = event.currentTarget;
        if (!target) return;
        const key = target.name;
        const raw = target.value.trim();
        const update = {};
        if (raw === "") update[key] = undefined;
        else {
            const numericValue = Number(raw);
            update[key] = Number.isFinite(numericValue) ? numericValue : undefined;
        }
        this._updateConfig(update);
    }
    _handleColorPickerChange(event) {
        const target = event.currentTarget;
        if (!target) return;
        const key = target.name;
        const value = target.value.trim();
        const update = {};
        update[key] = value === "" ? undefined : value;
        this._updateConfig(update);
    }
    _clearOptionalField(field) {
        this._updateConfig({
            [field]: undefined
        });
    }
    _getIconMapValue(condition) {
        const iconMap = this._config?.icon_map;
        if (!iconMap) return "";
        const value = iconMap[condition];
        return typeof value === "string" ? value : "";
    }
    _handleIconMapChange(condition, event) {
        event.stopPropagation();
        if (!this._config) return;
        const raw = event.detail?.value;
        const value = typeof raw === "string" ? raw.trim() : "";
        const nextMap = {
            ...this._config.icon_map ?? {}
        };
        if (!value) delete nextMap[condition];
        else nextMap[condition] = value;
        this._updateConfig({
            icon_map: Object.keys(nextMap).length ? nextMap : undefined
        });
    }
    _getColorPickerValue(value) {
        if (!value) return "#000000";
        const trimmed = value.trim();
        const hexMatch = /^#([0-9a-fA-F]{3}){1,2}$/.test(trimmed);
        if (!hexMatch) return "#000000";
        if (trimmed.length === 4) {
            const [r, g, b] = trimmed.slice(1).split("");
            return `#${r}${r}${g}${g}${b}${b}`;
        }
        return trimmed;
    }
    _handleHeaderActionChange(event, field) {
        event.stopPropagation();
        const value = event.detail?.value;
        const update = {
            [field]: value || undefined
        };
        this._updateConfig(update);
    }
    _handleSolarForecastSelectionChange(event) {
        event.stopPropagation();
        const raw = event.detail?.value;
        const selection = Array.isArray(raw) ? raw.filter((item)=>typeof item === "string") : [];
        const available = this._solarForecastEntryIds;
        const normalized = selection.filter((entryId)=>available.includes(entryId));
        const update = {};
        if (!normalized.length) update.solar_forecast_entries = [];
        else if (normalized.length === available.length) update.solar_forecast_entries = undefined;
        else update.solar_forecast_entries = normalized;
        this._updateConfig(update);
    }
    _getSolarForecastSelection() {
        if (this._config?.solar_forecast_entries) return this._config.solar_forecast_entries;
        return this._solarForecastEntryIds;
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
    _renderExpander(id, title, content, options = {}) {
        const className = options.nested ? "editor-expander nested" : "editor-expander";
        const isOpen = this._expandedSections[id] ?? options.open ?? false;
        return (0, $j0ZcV.html)`
      <details
        class=${className}
        ?open=${isOpen}
        @toggle=${(event)=>this._handleExpanderToggle(event, id)}
      >
        <summary>
          <span>${title}</span>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="expander-content">
          ${content}
        </div>
      </details>
    `;
    }
    _renderToggleExpander(id, title, toggleName, content, options = {}) {
        const config = this._config;
        if (!config) return 0, $j0ZcV.nothing;
        const isEnabled = this._isSectionEnabled(toggleName, config);
        const toggleDisabled = this._isToggleDisabled(toggleName, config);
        const isOpen = isEnabled && (this._expandedSections[id] ?? options.open ?? false);
        const className = `editor-expander${isEnabled ? "" : " disabled"}`;
        return (0, $j0ZcV.html)`
      <details
        class=${className}
        ?open=${isOpen}
        @toggle=${(event)=>this._handleExpanderToggle(event, id)}
      >
        <summary @click=${(event)=>this._handleExpanderSummaryClick(event, !isEnabled)}>
          <span>${title}</span>
          <span class="summary-actions">
            <ha-switch
              class="expander-toggle"
              name=${toggleName}
              .checked=${isEnabled}
              ?disabled=${toggleDisabled}
              @click=${(event)=>event.stopPropagation()}
              @change=${this._handleSunToggleChange}
            ></ha-switch>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </span>
        </summary>
        <div class="expander-content">
          ${content}
        </div>
      </details>
    `;
    }
    _ensureSolarForecastOptions() {
        this._refreshSolarForecastOptions(false);
    }
    _refreshSolarForecastOptions(force) {
        if (!this.hass || this._solarForecastOptionsPromise) return;
        if (!force && this._solarForecastOptionsLoaded) return;
        this._solarForecastOptionsPromise = this._fetchSolarForecastOptions().finally(()=>{
            this._solarForecastOptionsPromise = undefined;
        });
    }
    async _fetchSolarForecastOptions() {
        try {
            const prefs = await this.hass.callWS({
                type: "energy/get_prefs"
            });
            const entryIds = this._extractSolarForecastEntries(prefs);
            const entries = await this.hass.callWS({
                type: "config_entries/get"
            });
            const entryMap = new Map(entries.map((entry)=>[
                    entry.entry_id,
                    entry
                ]));
            const options = entryIds.map((entryId)=>{
                const entry = entryMap.get(entryId);
                const title = entry?.title?.trim();
                const domain = entry?.domain?.trim();
                const labelParts = [];
                if (title) labelParts.push(title);
                if (domain) labelParts.push(domain);
                const label = labelParts.length ? labelParts.join(" - ") : entryId;
                return {
                    value: entryId,
                    label: label
                };
            });
            this._solarForecastOptions = options;
            this._solarForecastEntryIds = entryIds;
        } catch (_err) {
            this._solarForecastOptions = [];
            this._solarForecastEntryIds = [];
        }
        this._solarForecastOptionsLoaded = true;
    }
    _extractSolarForecastEntries(prefs) {
        const energySources = prefs?.energy_sources ?? [];
        const entries = new Set();
        energySources.forEach((source)=>{
            if (source?.type !== "solar") return;
            const configured = source.config_entry_solar_forecast;
            if (!Array.isArray(configured)) return;
            configured.forEach((entryId)=>{
                if (typeof entryId === "string" && entryId.trim().length) entries.add(entryId);
            });
        });
        return Array.from(entries);
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
    _buildHourlyExtraAttributeOptions() {
        const disallowed = new Set([
            "datetime",
            "condition",
            "precipitation",
            "temperature",
            "templow"
        ]);
        const options = this._hourlyExtraOptions.length ? this._hourlyExtraOptions.filter((opt)=>!disallowed.has(opt)) : [];
        const solarOption = this._solarForecastEntryIds.length ? [
            {
                value: $a37b5b928a2fc5d8$var$SOLAR_FORECAST_OPTION,
                label: "Solar forecast"
            }
        ] : [];
        return [
            {
                value: "",
                label: "None"
            },
            ...solarOption,
            ...options.map((value)=>({
                    value: value,
                    label: value
                }))
        ];
    }
    _buildDailyExtraAttributeOptions() {
        const disallowed = new Set([
            "datetime",
            "condition",
            "precipitation",
            "temperature",
            "templow"
        ]);
        const options = this._dailyExtraOptions.length ? this._dailyExtraOptions.filter((opt)=>!disallowed.has(opt)) : [];
        const solarOption = this._solarForecastEntryIds.length ? [
            {
                value: $a37b5b928a2fc5d8$var$SOLAR_FORECAST_OPTION,
                label: "Solar forecast"
            }
        ] : [];
        return [
            {
                value: "",
                label: "None"
            },
            ...solarOption,
            ...options.map((value)=>({
                    value: value,
                    label: value
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
            }
        ];
        const layoutSchema = [
            {
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
            }
        ];
        const headerSchema = [
            {
                name: "header_temperature_entity",
                selector: {
                    entity: {
                        domain: "sensor",
                        device_class: "temperature"
                    }
                },
                optional: true
            },
            {
                name: "use_night_header_backgrounds",
                selector: {
                    boolean: {}
                }
            }
        ];
        const nowcastSchema = [
            {
                name: "nowcast_entity",
                selector: {
                    entity: {
                        domain: "weather"
                    }
                },
                optional: true
            },
            {
                name: "nowcast_layout",
                selector: {
                    select: {
                        options: [
                            {
                                value: "pager",
                                label: "Header pager"
                            },
                            {
                                value: "inline",
                                label: "Inline header"
                            }
                        ]
                    }
                },
                optional: true,
                disabled: !this._config?.nowcast_entity
            },
            {
                name: "nowcast_always_show",
                selector: {
                    boolean: {}
                },
                optional: true,
                disabled: !this._config?.nowcast_entity
            }
        ];
        const attributeOptions = this._buildAttributeOptions();
        const hourlySchema = [
            {
                name: "hourly_extra_attribute",
                selector: {
                    select: {
                        options: this._buildHourlyExtraAttributeOptions(),
                        custom_value: true
                    }
                },
                optional: true
            },
            {
                name: "hourly_extra_attribute_unit",
                selector: {
                    text: {}
                },
                optional: true
            }
        ];
        const dailySchema = [
            {
                name: "daily_extra_attribute",
                selector: {
                    select: {
                        options: this._buildDailyExtraAttributeOptions(),
                        custom_value: true
                    }
                },
                optional: true
            },
            {
                name: "daily_extra_attribute_unit",
                selector: {
                    text: {}
                },
                optional: true,
                disabled: this._config?.daily_extra_attribute === "precipitation_probability"
            }
        ];
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
            nowcast: nowcastSchema,
            chips: chipsSchema,
            hourly: hourlySchema,
            daily: dailySchema
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
        if ("solar_forecast_entries" in changes && changes.solar_forecast_entries === undefined) delete updated.solar_forecast_entries;
        const normalizedChips = this._normalizeHeaderChips(updated);
        updated.header_chips = normalizedChips;
        updated.header_attributes = normalizedChips.filter((chip)=>chip.type === "attribute").map((chip)=>chip.attribute).filter((attribute)=>typeof attribute === "string" && attribute.trim().length > 0);
        this._config = updated;
        $a37b5b928a2fc5d8$var$fireEvent(this, "config-changed", {
            config: updated
        });
    }
    _refreshForecastOptions() {
        try {
            if (!this.hass || !this._config?.entity) {
                this._teardownForecastOptionSubscriptions();
                if (this._hourlyExtraOptions.length || this._dailyExtraOptions.length) {
                    this._hourlyExtraOptions = [];
                    this._dailyExtraOptions = [];
                }
                this._forecastOptionsLoading = {
                    hourly: false,
                    daily: false,
                    twice_daily: false
                };
                this._forecastOptionsEntity = undefined;
                return;
            }
            const entityId = this._config.entity;
            if (this._forecastOptionsEntity !== entityId) {
                this._teardownForecastOptionSubscriptions();
                const cached = $a37b5b928a2fc5d8$var$FORECAST_OPTIONS_CACHE.get(entityId);
                if (cached) {
                    this._hourlyExtraOptions = cached.hourly;
                    this._dailyExtraOptions = cached.daily;
                    this._forecastOptionsLoading = {
                        hourly: false,
                        daily: false,
                        twice_daily: false
                    };
                } else this._forecastOptionsLoading = {
                    hourly: false,
                    daily: false,
                    twice_daily: false
                };
                this._forecastOptionsEntity = entityId;
            }
            const stateObj = this.hass.states[entityId];
            const supported = this._getSupportedForecastTypes(stateObj);
            const needed = new Set();
            if (supported.includes("hourly")) needed.add("hourly");
            if (supported.includes("daily") || supported.includes("twice_daily")) needed.add("daily");
            if (!needed.size) needed.add("daily");
            [
                "hourly",
                "daily"
            ].forEach((type)=>{
                if (!needed.has(type)) {
                    this._teardownForecastOptionSubscriptions([
                        type
                    ]);
                    this._forecastOptionsLoading = {
                        ...this._forecastOptionsLoading,
                        [type]: false
                    };
                } else if (!this._forecastOptionSubscriptions[type]) try {
                    this._forecastOptionSubscriptions[type] = this._subscribeForecast(entityId, type, (event)=>this._handleForecastOptionsEvent(type, event));
                    const hasOptions = type === "hourly" ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
                    if (!hasOptions) this._forecastOptionsLoading = {
                        ...this._forecastOptionsLoading,
                        [type]: true
                    };
                } catch (_err) {
                // ignore subscription errors to avoid breaking the editor
                }
                else {
                    const hasOptions = type === "hourly" ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
                    this._forecastOptionsLoading = {
                        ...this._forecastOptionsLoading,
                        [type]: !hasOptions
                    };
                }
            });
        } catch (_err) {
            // Fall back to attribute-based detection to keep the editor alive
            try {
                if (this.hass && this._config?.entity) this._applyForecastOptionsFromAttributes(this.hass.states[this._config.entity]);
            } catch (_e) {
            // ignore
            }
        }
    }
    _handleForecastOptionsEvent(type, event) {
        const entries = Array.isArray(event?.forecast) ? event.forecast : [];
        if (!entries.length) return;
        const disallowedHourly = new Set([
            "datetime",
            "condition",
            "precipitation",
            "temperature",
            "templow"
        ]);
        const disallowedDaily = disallowedHourly;
        const keys = new Set();
        entries.forEach((entry)=>{
            if (entry && typeof entry === "object") Object.keys(entry).forEach((key)=>{
                const block = type === "hourly" ? disallowedHourly : disallowedDaily;
                if (!block.has(key)) keys.add(key);
            });
        });
        const next = Array.from(keys).sort((a, b)=>a.localeCompare(b));
        if (type === "hourly") {
            if (next.join("|") !== this._hourlyExtraOptions.join("|")) this._hourlyExtraOptions = next;
            this._forecastOptionsLoading = {
                ...this._forecastOptionsLoading,
                hourly: false
            };
        } else {
            if (next.join("|") !== this._dailyExtraOptions.join("|")) this._dailyExtraOptions = next;
            this._forecastOptionsLoading = {
                ...this._forecastOptionsLoading,
                daily: false
            };
        }
        this._cacheForecastOptions();
    }
    _applyForecastOptionsFromAttributes(stateObj) {
        if (!stateObj?.attributes?.forecast) return;
        const entries = Array.isArray(stateObj.attributes.forecast) ? stateObj.attributes.forecast : [];
        if (!entries.length) return;
        const disallowed = new Set([
            "datetime",
            "condition",
            "precipitation",
            "temperature",
            "templow"
        ]);
        const keys = new Set();
        entries.forEach((entry)=>{
            if (entry && typeof entry === "object") Object.keys(entry).forEach((key)=>{
                if (!disallowed.has(key)) keys.add(key);
            });
        });
        const options = Array.from(keys).sort((a, b)=>a.localeCompare(b));
        if (options.join("|") !== this._hourlyExtraOptions.join("|")) this._hourlyExtraOptions = options;
        if (options.join("|") !== this._dailyExtraOptions.join("|")) this._dailyExtraOptions = options;
        this._forecastOptionsLoading = {
            ...this._forecastOptionsLoading,
            hourly: false,
            daily: false
        };
        this._cacheForecastOptions();
    }
    _cacheForecastOptions() {
        if (!this._forecastOptionsEntity) return;
        if (!this._hourlyExtraOptions.length && !this._dailyExtraOptions.length) return;
        $a37b5b928a2fc5d8$var$FORECAST_OPTIONS_CACHE.set(this._forecastOptionsEntity, {
            hourly: [
                ...this._hourlyExtraOptions
            ],
            daily: [
                ...this._dailyExtraOptions
            ]
        });
    }
    _getSupportedForecastTypes(stateObj) {
        if (!stateObj?.attributes) return [];
        const supported = [];
        const features = stateObj.attributes.supported_features ?? 0;
        if ((features & $a37b5b928a2fc5d8$var$WeatherEntityFeature.FORECAST_DAILY) !== 0) supported.push("daily");
        if ((features & $a37b5b928a2fc5d8$var$WeatherEntityFeature.FORECAST_TWICE_DAILY) !== 0) supported.push("twice_daily");
        if ((features & $a37b5b928a2fc5d8$var$WeatherEntityFeature.FORECAST_HOURLY) !== 0) supported.push("hourly");
        return supported;
    }
    _subscribeForecast(entityId, forecastType, callback) {
        if (!this.hass?.connection) {
            this._applyForecastOptionsFromAttributes(this.hass.states[entityId]);
            return undefined;
        }
        return this.hass.connection.subscribeMessage(callback, {
            type: "weather/subscribe_forecast",
            forecast_type: forecastType,
            entity_id: entityId
        }).catch(()=>undefined);
    }
    _teardownForecastOptionSubscriptions(types) {
        const targets = types ?? [
            "hourly",
            "daily"
        ];
        targets.forEach((type)=>{
            const sub = this._forecastOptionSubscriptions[type];
            sub?.then((unsub)=>unsub?.()).catch(()=>undefined);
            delete this._forecastOptionSubscriptions[type];
            this._forecastOptionsLoading = {
                ...this._forecastOptionsLoading,
                [type]: false
            };
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._teardownForecastOptionSubscriptions();
    }
    constructor(...args){
        super(...args);
        this._chipTypes = {
            0: "attribute",
            1: "attribute",
            2: "attribute"
        };
        this._hourlyExtraOptions = [];
        this._dailyExtraOptions = [];
        this._forecastOptionsLoading = {
            hourly: false,
            daily: false,
            twice_daily: false
        };
        this._solarForecastOptions = [];
        this._solarForecastEntryIds = [];
        this._expandedSections = {};
        this._forecastOptionSubscriptions = {};
        this._solarForecastOptionsLoaded = false;
        this._computeLabel = (schema)=>{
            if (!this.hass) return schema.name;
            switch(schema.name){
                case "entity":
                    return "Weather Entity";
                case "header_temperature_entity":
                    return "Local Temperature Sensor Entity (Overrides the current temperature value of the forecast)";
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
                case "nowcast_entity":
                    return "Nowcast Entity (For next-hour precipitation. The entity integration must provide a get_minute_forecast action to fetch the data.)";
                case "nowcast_layout":
                    return "Nowcast layout";
                case "nowcast_always_show":
                    return "Always show nowcast";
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
(0, $39J5i.__decorate)([
    (0, $1ZxoT.state)()
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b.prototype, "_hourlyExtraOptions", void 0);
(0, $39J5i.__decorate)([
    (0, $1ZxoT.state)()
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b.prototype, "_dailyExtraOptions", void 0);
(0, $39J5i.__decorate)([
    (0, $1ZxoT.state)()
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b.prototype, "_forecastOptionsLoading", void 0);
(0, $39J5i.__decorate)([
    (0, $1ZxoT.state)()
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b.prototype, "_solarForecastOptions", void 0);
(0, $39J5i.__decorate)([
    (0, $1ZxoT.state)()
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b.prototype, "_solarForecastEntryIds", void 0);
(0, $39J5i.__decorate)([
    (0, $1ZxoT.state)()
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b.prototype, "_expandedSections", void 0);
$a37b5b928a2fc5d8$export$4f91f681c03a7b8b = (0, $39J5i.__decorate)([
    (0, $1ZxoT.customElement)("weather-forecast-extended-editor")
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b);

});
parcelRequire.register("aGwLT", function(module, exports) {

$parcel$export(module.exports, "WEATHER_CONDITIONS", () => $c0977d1f14d5c39b$export$7f18ae76d74a6de0);
// Collection of types from HA frontend
const $c0977d1f14d5c39b$export$7f18ae76d74a6de0 = [
    "clear-night",
    "cloudy",
    "fog",
    "hail",
    "lightning",
    "lightning-rainy",
    "partlycloudy",
    "partlycloudy-night",
    "pouring",
    "rainy",
    "snowy",
    "snowy-rainy",
    "sunny",
    "windy",
    "windy-variant",
    "exceptional"
];

});



//# sourceMappingURL=weather-forecast-extended-editor.3d7dce5b.js.map
