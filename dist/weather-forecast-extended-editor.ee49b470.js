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
    })();
    setConfig(config) {
        this._config = {
            type: "custom:weather-forecast-extended-card",
            ...config,
            show_header: config.show_header ?? true,
            hourly_forecast: config.hourly_forecast ?? true,
            daily_forecast: config.daily_forecast ?? true,
            orientation: config.orientation ?? "vertical"
        };
    }
    render() {
        if (!this.hass || !this._config) return (0, $j0ZcV.html)``;
        const schema = this._buildSchema();
        return (0, $j0ZcV.html)`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
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
    _handleValueChanged(event) {
        event.stopPropagation();
        this._updateConfig(event.detail.value);
    }
    _handleSunToggleChange(event) {
        const target = event.currentTarget;
        if (!target) return;
        const key = target.name;
        this._updateConfig({
            [key]: target.checked
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
    _buildSchema() {
        const baseSchema = [
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
        const toggleSchemas = toggleNames.map((name)=>({
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
                toggleSchemas[index].disabled = enabledCount <= 1 && isEnabled;
            });
        }
        baseSchema.push(...toggleSchemas);
        baseSchema.push({
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
        baseSchema.push({
            name: "use_night_header_backgrounds",
            selector: {
                boolean: {}
            }
        });
        return baseSchema;
    }
    _isSectionEnabled(name, config) {
        const value = config[name];
        return value !== false;
    }
    _updateConfig(changes) {
        if (!this._config) return;
        const updated = {
            ...this._config,
            ...changes,
            type: "custom:weather-forecast-extended-card"
        };
        this._config = updated;
        $a37b5b928a2fc5d8$var$fireEvent(this, "config-changed", {
            config: updated
        });
    }
    constructor(...args){
        super(...args);
        this._computeLabel = (schema)=>{
            if (!this.hass) return schema.name;
            switch(schema.name){
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
$a37b5b928a2fc5d8$export$4f91f681c03a7b8b = (0, $39J5i.__decorate)([
    (0, $1ZxoT.customElement)("weather-forecast-extended-editor")
], $a37b5b928a2fc5d8$export$4f91f681c03a7b8b);

});


//# sourceMappingURL=weather-forecast-extended-editor.ee49b470.js.map
