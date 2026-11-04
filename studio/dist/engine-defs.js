"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/engine-defs.tsx
var engine_defs_exports = {};
__export(engine_defs_exports, {
  KitDefs: () => KitDefs,
  SetDefs: () => SetDefs
});
module.exports = __toCommonJS(engine_defs_exports);

// src/engine/kit.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var D = {
  skyTop: "#25184A",
  skyMid: "#6E3A6E",
  horizon: "#F2985A",
  sun: "#FFE7B3",
  warm: "#FFB45E",
  rim: "#FFB15A",
  night: "#120E26"
};
var N = {
  skyTop: "#060A1C",
  skyMid: "#111A3E",
  horizon: "#33305E",
  moon: "#F1F3FF",
  moonShade: "#C6CEEC",
  glow: "#9FC0FF",
  rim: "#A9C6FF"
};
var KitDefs = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", { id: "rimR", x: "-40%", y: "-40%", width: "180%", height: "180%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: 4, dy: -1, stdDeviation: 1.8, floodColor: D.rim, floodOpacity: 1 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: 0, dy: 0, stdDeviation: 14, floodColor: "#FF9A4A", floodOpacity: 0.35 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", { id: "rimL", x: "-40%", y: "-40%", width: "180%", height: "180%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: -4, dy: -1, stdDeviation: 1.8, floodColor: D.rim, floodOpacity: 1 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: 0, dy: 0, stdDeviation: 14, floodColor: "#FF9A4A", floodOpacity: 0.35 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", { id: "rimRed", x: "-40%", y: "-40%", width: "180%", height: "180%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: 0, dy: -2, stdDeviation: 2, floodColor: "#FF4A4A", floodOpacity: 1 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: 0, dy: 0, stdDeviation: 16, floodColor: "#FF2A3A", floodOpacity: 0.45 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", { id: "rimBlue", x: "-40%", y: "-40%", width: "180%", height: "180%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: 4, dy: -1, stdDeviation: 1.8, floodColor: N.rim, floodOpacity: 1 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: 0, dy: 0, stdDeviation: 14, floodColor: "#6A8CFF", floodOpacity: 0.3 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", { id: "rimBlueL", x: "-40%", y: "-40%", width: "180%", height: "180%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: -4, dy: -1, stdDeviation: 1.8, floodColor: N.rim, floodOpacity: 1 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: 0, dy: 0, stdDeviation: 14, floodColor: "#6A8CFF", floodOpacity: 0.3 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: "kitMoonBloom", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#E6EEFF", stopOpacity: 0.75 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "30%", stopColor: N.glow, stopOpacity: 0.25 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: N.glow, stopOpacity: 0 })
  ] }),
  [3, 6, 10, 16].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", { id: `blur${b}`, x: "-20%", y: "-20%", width: "140%", height: "140%", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: b }) }, b)),
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: "kitBloom", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: D.sun, stopOpacity: 0.9 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "35%", stopColor: D.warm, stopOpacity: 0.35 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: D.warm, stopOpacity: 0 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: "kitBloomRed", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#FF6A5A", stopOpacity: 0.8 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "35%", stopColor: "#C8102E", stopOpacity: 0.3 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: "#C8102E", stopOpacity: 0 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "kitShaft", x1: "0", y1: "0", x2: "0", y2: "1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#FFD9A0", stopOpacity: 0.32 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: "#FFD9A0", stopOpacity: 0 })
  ] })
] });

// src/engine/light.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var SetDefs = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("defs", { children: [
  [
    ["g3warm", "#FFD7A0"],
    ["g3cool", "#9FC0FF"],
    ["g3red", "#FF5A4A"]
  ].map(([id, c]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("radialGradient", { id, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "0%", stopColor: c, stopOpacity: 1 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "30%", stopColor: c, stopOpacity: 0.35 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "100%", stopColor: c, stopOpacity: 0 })
  ] }, id)),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "g3cone", x1: "0", y1: "0", x2: "0", y2: "1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "0%", stopColor: "#FFD7A0", stopOpacity: 0.55 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "100%", stopColor: "#FFD7A0", stopOpacity: 0 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("filter", { id: "g3wall", x: "0", y: "0", width: "100%", height: "100%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("feTurbulence", { type: "fractalNoise", baseFrequency: "0.006 0.012", numOctaves: 3, seed: 7, result: "n" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("feColorMatrix", { in: "n", type: "matrix", values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.28 -0.09", result: "a" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("feComposite", { in: "a", in2: "SourceGraphic", operator: "in" })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "g3aoUp", x1: "0", y1: "1", x2: "0", y2: "0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "0%", stopColor: "#000", stopOpacity: 0.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "100%", stopColor: "#000", stopOpacity: 0 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "g3aoDown", x1: "0", y1: "0", x2: "0", y2: "1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "0%", stopColor: "#000", stopOpacity: 0.45 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "100%", stopColor: "#000", stopOpacity: 0 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "g3aoRight", x1: "0", y1: "0", x2: "1", y2: "0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "0%", stopColor: "#000", stopOpacity: 0.4 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "100%", stopColor: "#000", stopOpacity: 0 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "g3aoLeft", x1: "1", y1: "0", x2: "0", y2: "0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "0%", stopColor: "#000", stopOpacity: 0.4 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "100%", stopColor: "#000", stopOpacity: 0 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("filter", { id: "g3drop", x: "-30%", y: "-30%", width: "160%", height: "160%", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("feDropShadow", { dx: 14, dy: 18, stdDeviation: 10, floodColor: "#000", floodOpacity: 0.45 }) }),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "g3fadeDown", x1: "0", y1: "0", x2: "0", y2: "1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "0%", stopColor: "#000", stopOpacity: 0 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "100%", stopColor: "#000", stopOpacity: 0.55 })
  ] })
] });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KitDefs,
  SetDefs
});
