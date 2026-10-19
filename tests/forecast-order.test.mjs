import assert from "node:assert/strict";
import { test } from "node:test";
import { templateText } from "./helpers/load-source.mjs";

const { WeatherForecastExtended } = await import("../src/weather-forecast-extended.ts");
const { WeatherForecastExtendedEditor } = await import("../src/editor/weather-forecast-extended-editor.ts");

const baseConfig = { type: "custom:weather-forecast-extended-card", entity: "weather.home" };
const setupCard = options => {
  const card = new WeatherForecastExtended();
  card.setConfig({ ...baseConfig, ...options });
  card.hass = {
    states: { "weather.home": { entity_id: "weather.home", state: "cloudy", attributes: { temperature: 12 } } },
    config: { components: ["weather"] },
  };
  return card;
};

test("forecast order defaults to daily first and can put hourly first in both orientations", () => {
  for (const orientation of ["vertical", "horizontal"]) {
    const card = setupCard({ orientation });
    const grid = card.getGridOptions();
    for (const hourly_first of [undefined, true, false]) {
      card.setConfig({ ...baseConfig, orientation, hourly_first });
      const output = templateText(card.render());
      const first = output.indexOf(hourly_first ? "<wfe-hourly-list" : "<wfe-daily-list");
      const divider = output.indexOf('class="divider forecast-divider"');
      const second = output.indexOf(hourly_first ? "<wfe-daily-list" : "<wfe-hourly-list");
      assert.ok(first >= 0 && first < divider && divider < second);
      assert.equal((output.match(/forecast-divider/g) ?? []).length, 1);
      assert.deepEqual(card.getGridOptions(), grid);
    }
  }
});

test("order leaves a single enabled forecast intact without a divider", () => {
  for (const hourly_first of [false, true]) {
    for (const hourly_forecast of [false, true]) {
      const card = setupCard({ hourly_first, hourly_forecast, daily_forecast: !hourly_forecast });
      const output = templateText(card.render());
      assert.ok(output.includes("<wfe-hourly-list") === hourly_forecast);
      assert.ok(output.includes("<wfe-daily-list") === !hourly_forecast);
      assert.doesNotMatch(output, /forecast-divider/);
    }
    const card = setupCard({ hourly_first, hourly_forecast: false, daily_forecast: false });
    assert.doesNotMatch(templateText(card.render()), /<wfe-(hourly|daily)-list|forecast-divider/);
  }
});

test("editor exposes the optional hourly-first toggle next to orientation", () => {
  const editor = new WeatherForecastExtendedEditor();
  editor.setConfig(baseConfig);
  assert.equal(editor._createFormData().hourly_first, false);
  const layout = editor._buildSchemas().layout;
  assert.deepEqual(layout.map(field => field.name), ["orientation", "hourly_first"]);
  assert.deepEqual(layout.find(field => field.name === "hourly_first").selector, { boolean: {} });
});

test("editor order changes preserve other selections and survive unrelated edits", () => {
  const editor = new WeatherForecastExtendedEditor();
  const header_chips = [{ type: "attribute", attribute: "humidity", icon: "mdi:water-percent" }];
  editor.setConfig({ ...baseConfig, orientation: "horizontal", header_chips, hourly_extra_attribute: "wind_speed" });
  const events = [];
  editor.dispatchEvent = event => { events.push(event); return true; };
  editor._handleValueChanged(new CustomEvent("value-changed", { detail: { value: { hourly_first: true } } }));
  editor._handleValueChanged(new CustomEvent("value-changed", { detail: { value: { orientation: "vertical" } } }));
  const updated = events.at(-1).detail.config;
  assert.equal(events.at(-1).type, "config-changed");
  assert.equal(updated.hourly_first, true);
  assert.equal(updated.entity, baseConfig.entity);
  assert.equal(updated.orientation, "vertical");
  assert.equal(updated.hourly_extra_attribute, "wind_speed");
  assert.equal(updated.header_chips[0].attribute, header_chips[0].attribute);
  assert.equal(updated.header_chips[0].icon, header_chips[0].icon);
});
