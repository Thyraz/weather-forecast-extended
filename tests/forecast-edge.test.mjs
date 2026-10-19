import assert from "node:assert/strict";
import { test } from "node:test";
import "./helpers/load-source.mjs";

const { WFEHourlyList } = await import("../src/components/wfe-hourly-list.ts");

const setupLayout = bottoms => {
  const list = new WFEHourlyList();
  const properties = new Map();
  const scroller = {
    getBoundingClientRect: () => ({ top: 100 }),
    style: { setProperty: (name, value) => properties.set(name, value) },
  };
  list.closest = () => scroller;
  list.querySelector = selector => ({ offsetHeight: selector === ".translate-container" ? 70 : 50 });
  list.querySelectorAll = () => bottoms.map(bottom => ({ getBoundingClientRect: () => ({ bottom }) }));
  return { list, properties, scroller };
};

test("hourly edge fade protects the full time and day-marker row", () => {
  const { list, properties } = setupLayout([129.2, 131.5]);
  list._recalculateTranslationHeights();
  assert.equal(properties.get("--forecast-label-height"), "32px");
  assert.equal(properties.get("--translate-container-height"), "70px");
  assert.equal(properties.get("--translate-content-height"), "50px");
});

test("hourly edge fade also protects the second AM/PM line", () => {
  const { list, properties } = setupLayout([131.5, 146.9, 129.2]);
  list._recalculateTranslationHeights();
  assert.equal(properties.get("--forecast-label-height"), "47px");
});

test("the protected row follows resized labels without a scroll listener", t => {
  const original = globalThis.ResizeObserver;
  let resize;
  globalThis.ResizeObserver = class {
    constructor(callback) { resize = callback; }
    observe() {}
  };
  t.after(() => {
    if (original === undefined) delete globalThis.ResizeObserver;
    else globalThis.ResizeObserver = original;
  });
  const bottoms = [131.5, 146.9];
  const { list, properties } = setupLayout(bottoms);
  list._setupResizeObserver();
  resize();
  assert.equal(properties.get("--forecast-label-height"), "47px");
  bottoms.splice(0, bottoms.length, 139.2, 167.8);
  resize();
  assert.equal(properties.get("--forecast-label-height"), "68px");
});
