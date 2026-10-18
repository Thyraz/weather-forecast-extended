import assert from "node:assert/strict";
import { test } from "node:test";
import { HeaderImageLoader } from "../src/utils/header-image.ts";

const entity = (state = "2026-10-18T12:00:00+00:00", overrides = {}) => ({
  entity_id: "image.weather",
  state,
  attributes: { access_token: "image-token" },
  ...overrides,
});

const setup = t => {
  const originalImage = globalThis.Image;
  const images = [];
  globalThis.Image = class {
    onload = null;
    onerror = null;
    src = "";
    constructor() {
      images.push(this);
    }
  };
  let displayed;
  const loader = new HeaderImageLoader(url => { displayed = url; });
  t.after(() => {
    loader.clear();
    if (originalImage === undefined) delete globalThis.Image;
    else globalThis.Image = originalImage;
  });
  return {
    images,
    get displayed() { return displayed; },
    update: value => loader.update(value, path => `https://ha.example${path}`),
    clear: () => loader.clear(),
  };
};

test("initially shows no image and uses HA's authenticated, versioned image proxy", t => {
  const view = setup(t);
  const source = entity(undefined, { attributes: { access_token: "token&value" } });
  view.update(source);
  assert.equal(view.displayed, undefined);
  const url = new URL(view.images[0].src);
  assert.equal(url.pathname, "/api/image_proxy/image.weather");
  assert.equal(url.searchParams.get("token"), "token&value");
  assert.equal(url.searchParams.get("state"), source.state);
  view.images[0].onload();
  assert.equal(view.displayed, view.images[0].src);
});

test("keeps the previous image while the next version loads", t => {
  const view = setup(t);
  view.update(entity("first"));
  view.images[0].onload();
  const first = view.displayed;
  view.update(entity("second"));
  assert.equal(view.displayed, first);
  view.images[1].onload();
  assert.equal(view.displayed, view.images[1].src);
  assert.notEqual(view.displayed, first);
});

test("clears the image on load failure and recovers on the next entity update", t => {
  const view = setup(t);
  view.update(entity("first"));
  view.images[0].onload();
  view.update(entity("second"));
  view.images[1].onerror();
  assert.equal(view.displayed, undefined);
  view.update(entity("third"));
  view.images[2].onload();
  assert.equal(view.displayed, view.images[2].src);
});

test("missing, unavailable, unknown, and invalid image entities clear the header", t => {
  const view = setup(t);
  for (const invalid of [
    undefined,
    entity("unavailable"),
    entity("unknown"),
    entity("first", { attributes: {} }),
    entity("first", { entity_id: "camera.weather" }),
  ]) {
    view.update(entity("first"));
    view.images.at(-1).onload();
    assert.ok(view.displayed);
    view.update(invalid);
    assert.equal(view.displayed, undefined);
  }
  view.update(entity("first"));
  view.images.at(-1).onload();
  assert.ok(view.displayed);
});

test("ignores older load results after a newer image was requested", t => {
  const view = setup(t);
  view.update(entity("first"));
  const oldLoad = view.images[0].onload;
  const oldError = view.images[0].onerror;
  view.update(entity("second"));
  view.images[1].onload();
  const displayed = view.displayed;
  oldLoad();
  oldError();
  assert.equal(view.displayed, displayed);
});

test("changing the selected entity clears the old image while the new one loads", t => {
  const view = setup(t);
  view.update(entity());
  view.images[0].onload();
  view.update(entity(undefined, { entity_id: "image.other" }));
  assert.equal(view.displayed, undefined);
  view.images[1].onload();
  assert.match(view.displayed, /image\.other/);
});

test("clearing the source cancels pending results, including after reconnect", t => {
  const view = setup(t);
  view.update(entity());
  const oldLoad = view.images[0].onload;
  const oldError = view.images[0].onerror;
  view.clear();
  oldLoad();
  assert.equal(view.displayed, undefined);
  view.update(entity());
  view.images[1].onload();
  const displayed = view.displayed;
  oldLoad();
  oldError();
  assert.equal(view.displayed, displayed);
});

test("unchanged HA updates do not reload images; rotated access tokens do", t => {
  const view = setup(t);
  const source = entity();
  view.update(source);
  view.update({ ...source });
  assert.equal(view.images.length, 1);
  view.images[0].onload();
  view.update({ ...source });
  assert.equal(view.images.length, 1);
  view.update({ ...source, attributes: { access_token: "rotated-token" } });
  assert.equal(view.images.length, 2);
  assert.equal(new URL(view.images[1].src).searchParams.get("token"), "rotated-token");
});
