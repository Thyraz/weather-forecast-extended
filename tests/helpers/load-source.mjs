import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import ts from "typescript";

const sourceRoot = new URL("../../src/", import.meta.url).href;

// Load the real card/components without Parcel or a browser DOM.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("bundle-text:")) {
      return { url: new URL(specifier.slice("bundle-text:".length), context.parentURL).href, shortCircuit: true };
    }
    if (context.parentURL?.startsWith(sourceRoot) && specifier.startsWith(".") && !/\.(?:ts|js|jpg|css)$/.test(specifier)) {
      return { url: new URL(`${specifier}.ts`, context.parentURL).href, shortCircuit: true };
    }
    if (specifier === "lit/decorators" || specifier === "lit/directives/style-map") {
      specifier += ".js";
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith(sourceRoot)) {
      if (url.endsWith(".ts")) {
        const { outputText } = ts.transpileModule(readFileSync(new URL(url), "utf8"), {
          compilerOptions: {
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.ES2020,
            experimentalDecorators: true,
            useDefineForClassFields: false,
          },
        });
        return { format: "module", source: outputText, shortCircuit: true };
      }
      if (url.endsWith(".jpg") || url.endsWith(".css")) {
        const value = url.endsWith(".css") ? readFileSync(new URL(url), "utf8") : url;
        return { format: "module", source: `export default ${JSON.stringify(value)};`, shortCircuit: true };
      }
    }
    return nextLoad(url, context);
  },
});

globalThis.customElements ??= { define() {} };

export const templateText = value => {
  if (Array.isArray(value)) return value.map(templateText).join("");
  if (value?.strings) {
    return value.strings.reduce((text, part, index) => text + part + templateText(value.values[index]), "");
  }
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
};
