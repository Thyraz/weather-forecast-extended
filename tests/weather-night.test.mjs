import assert from "node:assert/strict";
import { test } from "node:test";
import { templateText } from "./helpers/load-source.mjs";

const { WeatherForecastExtended } = await import("../src/weather-forecast-extended.ts");
const { WFEHourlyList } = await import("../src/components/wfe-hourly-list.ts");
const { WFEDailyList } = await import("../src/components/wfe-daily-list.ts");

const locale = { language: "de", time_format: "24", time_zone: "server" };
const config = { latitude: 48.137, longitude: 11.575, time_zone: "Europe/Berlin", components: ["weather"] };
const translations = { sunny: "Sonnig", "clear-night": "Klare Nacht", cloudy: "Bewölkt" };

const setupCard = (state, attributes = {}, options = {}) => {
  const entity = Object.freeze({
    entity_id: "weather.home",
    state,
    attributes: Object.freeze({ temperature: 12, temperature_unit: "°C", ...attributes }),
  });
  const formattedStates = [];
  const card = new WeatherForecastExtended();
  card.setConfig({
    type: "custom:weather-forecast-extended-card",
    entity: entity.entity_id,
    hourly_forecast: false,
    daily_forecast: false,
    ...options,
  });
  card.hass = {
    states: { [entity.entity_id]: entity },
    config,
    locale,
    formatEntityState(value) {
      formattedStates.push(value);
      return translations[value.state];
    },
  };
  return { card, entity, formattedStates };
};

const setupIcons = t => {
  const original = globalThis.getComputedStyle;
  globalThis.getComputedStyle = () => ({ getPropertyValue: () => "" });
  t.after(() => {
    if (original === undefined) delete globalThis.getComputedStyle;
    else globalThis.getComputedStyle = original;
  });
};

const forecast = (hour, extra = {}) => ({
  datetime: `2026-10-19T${hour}:00:00+02:00`,
  temperature: 12,
  condition: "sunny",
  ...extra,
});

test("header translates sunny at night without changing the HA entity", () => {
  const { card, entity, formattedStates } = setupCard("sunny", { is_daytime: false });
  assert.match(templateText(card.render()), /Klare Nacht/);
  const translated = formattedStates.find(value => value.state === "clear-night");
  assert.ok(translated);
  assert.equal(translated.entity_id, entity.entity_id);
  assert.equal(translated.attributes, entity.attributes);
  assert.equal(entity.state, "sunny");
});

test("header correction is independent of the image source and night-background setting", () => {
  for (const options of [
    { use_night_header_backgrounds: false },
    { header_image_source: "entity", header_image_entity: "image.weather" },
  ]) {
    const { card } = setupCard("sunny", { is_daytime: false }, options);
    assert.match(templateText(card.render()), /Klare Nacht/);
  }
});

test("header preserves daytime, other conditions, and clear-night during daytime", () => {
  for (const [state, is_daytime] of [["sunny", true], ["cloudy", false], ["clear-night", true]]) {
    const { card, entity, formattedStates } = setupCard(state, { is_daytime });
    assert.match(templateText(card.render()), new RegExp(translations[state]));
    assert.equal(formattedStates.at(-1), entity);
  }
});

test("header preserves sunny when day/night cannot be determined", () => {
  const { card } = setupCard("sunny", {}, { sun_use_home_coordinates: false });
  assert.match(templateText(card.render()), /Sonnig/);
});

test("header falls back to the corrected raw state without HA formatting", () => {
  const { card } = setupCard("sunny", { is_daytime: false });
  card._hass.formatEntityState = undefined;
  assert.match(templateText(card.render()), /clear-night/);
});

test("hourly sunny icons use each forecast time for day/night", t => {
  setupIcons(t);
  const list = new WFEHourlyList();
  list.hass = { locale, config };
  list.sunCoordinates = { latitude: config.latitude, longitude: config.longitude };
  list.forecast = [forecast("02"), forecast("14")];
  list.willUpdate(new Map([["forecast", undefined]]));
  const output = templateText(list.render());
  assert.equal((output.match(/class="moon"/g) ?? []).length, 1);
  assert.equal((output.match(/class="sun"/g) ?? []).length, 1);
  assert.deepEqual(list.forecast.map(item => item.condition), ["sunny", "sunny"]);
});

test("hourly icons honor is_daytime over calculated sun times", t => {
  setupIcons(t);
  const list = new WFEHourlyList();
  list.hass = { locale, config };
  list.sunCoordinates = { latitude: config.latitude, longitude: config.longitude };
  list.forecast = [forecast("02", { is_daytime: true }), forecast("14", { is_daytime: false })];
  list.willUpdate(new Map([["forecast", undefined]]));
  const output = templateText(list.render());
  assert.ok(output.indexOf('class="sun"') < output.indexOf('class="moon"'));
  assert.match(output, /class="moon"/);
});

test("night uses the clear-night override and otherwise the built-in moon", t => {
  setupIcons(t);
  const list = new WFEHourlyList();
  list.hass = { locale, config };
  list.forecast = [forecast("02", { is_daytime: false })];
  list.iconMap = { sunny: "custom:sun", "clear-night": "custom:moon" };
  assert.match(templateText(list.render()), /custom:moon/);
  assert.doesNotMatch(templateText(list.render()), /custom:sun/);
  list.iconMap = { sunny: "custom:sun" };
  assert.match(templateText(list.render()), /class="moon"/);
  assert.doesNotMatch(templateText(list.render()), /custom:sun/);
  list.forecast = [forecast("14", { is_daytime: true })];
  assert.match(templateText(list.render()), /custom:sun/);
});

test("hourly sunny stays sunny without day/night data; daily icons stay unchanged", t => {
  setupIcons(t);
  for (const List of [WFEHourlyList, WFEDailyList]) {
    const list = new List();
    list.hass = { locale, config };
    list.forecast = [forecast("02", List === WFEDailyList ? { is_daytime: false } : {})];
    assert.match(templateText(list.render()), /class="sun"/);
  }
});
