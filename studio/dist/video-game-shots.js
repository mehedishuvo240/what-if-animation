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

// src/episodes/video-game/shots.tsx
var shots_exports = {};
__export(shots_exports, {
  V1: () => V1,
  V10: () => V10,
  V11: () => V11,
  V12: () => V12,
  V13: () => V13,
  V14: () => V14,
  V15: () => V15,
  V16: () => V16,
  V2: () => V2,
  V3: () => V3,
  V4: () => V4,
  V5: () => V5,
  V6: () => V6,
  V7: () => V7,
  V8: () => V8,
  V9: () => V9
});
module.exports = __toCommonJS(shots_exports);

// src/engine/anim.ts
var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
var lerp = (a, b, t) => a + (b - a) * t;
var easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
var easeIn = (t) => t * t * t;
var kf = (f, keys, ease = easeInOut) => {
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [f0, v0] = keys[i];
    const [f1, v1] = keys[i + 1];
    if (f <= f1) return lerp(v0, v1, ease((f - f0) / Math.max(1e-6, f1 - f0)));
  }
  return keys[keys.length - 1][1];
};
var rnd = (seed, i) => Math.abs(Math.sin(seed * 31.7 + i * 12.9898) * 43758.5453) % 1;
var camT = (cx, cy, s) => `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`;

// src/engine/rig.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var C = {
  skin: "#F6EFE3",
  skinShade: "#E2D3BE",
  ink: "#1D2033",
  jacket: "#F2B33D",
  jacketShade: "#D4922A",
  shoe: "#2FB7A6",
  orange: "#FF8A3D",
  limb: "#EFE2CC"
};
var LOOKS = {
  // A: Pip as built
  pip: { skin: C.skin, skinShade: C.skinShade, hand: C.skin, jacket: C.jacket, jacketShade: C.jacketShade, accent: C.jacketShade, limb: C.limb, line: C.ink, shoe: C.shoe, face: C.ink, hair: C.ink },
  // B: Pip in a dark hoodie with mustard drawstrings: the body goes dark and catches the rim light, the head stays the brightest thing
  pipHood: { skin: C.skin, skinShade: C.skinShade, hand: C.skin, jacket: "#2E2B3D", jacketShade: "#24212F", accent: C.jacket, limb: "#2E2B3D", line: "#121019", shoe: C.shoe, face: C.ink, hair: C.ink, extra: "hood" },
  // C: a dark head with light features, the genre's high-contrast convention, in Pip's mustard
  pipInk: { skin: "#26232F", skinShade: "#1C1A24", hand: "#26232F", jacket: C.jacket, jacketShade: C.jacketShade, accent: C.jacketShade, limb: "#26232F", line: "#121019", shoe: C.shoe, face: "#F6EFE3", hair: "#26232F" },
  // Mo, Pip's friend: a second recurring character with his own costume (curly hair, headphones round his neck)
  mo: { skin: "#C98E68", skinShade: "#B07A58", hand: "#C98E68", jacket: "#5E6E46", jacketShade: "#4C5A38", accent: "#E9C46A", limb: "#3A3446", line: "#1A1622", shoe: "#D9534F", face: C.ink, hair: "#2A1C18", extra: "curls" },
  // the formula's recurring cast (beats 5 and 6): Pip's little sister (draw her at about 0.7 of Pip's scale), his mum,
  // and the man in a suit who notices the power. All three are ours: plain shapes, no famous silhouettes.
  sis: { skin: C.skin, skinShade: C.skinShade, hand: C.skin, jacket: "#3E8C86", jacketShade: "#2F6E69", accent: "#F28C6A", limb: "#3A3446", line: "#14121C", shoe: "#F28C6A", face: C.ink, hair: "#3A2620", extra: "bunches" },
  mom: { skin: C.skin, skinShade: C.skinShade, hand: C.skin, jacket: "#8A5A6A", jacketShade: "#704858", accent: "#E9C46A", limb: "#3A3446", line: "#14121C", shoe: "#5A4A6A", face: C.ink, hair: "#5A3226", extra: "bob" },
  suit: { skin: "#D9C6AE", skinShade: "#C2AE96", hand: "#D9C6AE", jacket: "#2B2F3A", jacketShade: "#20232C", accent: "#A8323E", limb: "#2B2F3A", line: "#0E0F14", shoe: "#14151A", face: C.ink, hair: "#17141A", extra: "suit" }
};
var THIGH = 72;
var SHIN = 68;
var LEG_LEN = THIGH + SHIN;

// src/engine/fonts.ts
var import_fonts = require("@remotion/fonts");
var import_remotion = require("remotion");
var import_BricolageGrotesque = require("@remotion/google-fonts/BricolageGrotesque");
var import_FragmentMono = require("@remotion/google-fonts/FragmentMono");
var import_Kalam = require("@remotion/google-fonts/Kalam");

// src/studio.config.ts
var STUDIO = {
  fps: 30,
  width: 1920,
  height: 1080,
  /**
   * A local display face for titles, as a file in public/ (your brand font, say). null uses Bricolage Grotesque
   * from Google Fonts. Example: { family: 'My Brand Font', file: 'fonts/MyBrandFont.woff2', weight: '200 700' }
   */
  titleFont: null
};

// src/engine/fonts.ts
(async () => {
  try {
    await (0, import_BricolageGrotesque.loadFont)("normal", { weights: ["600", "700", "800"], subsets: ["latin"] });
  } catch {
  }
  try {
    await (0, import_FragmentMono.loadFont)("normal", { weights: ["400"], subsets: ["latin"] });
  } catch {
  }
  try {
    await (0, import_Kalam.loadFont)("normal", { weights: ["400", "700"], subsets: ["latin"] });
  } catch {
  }
  if (STUDIO.titleFont) {
    try {
      await (0, import_fonts.loadFont)({ family: STUDIO.titleFont.family, url: (0, import_remotion.staticFile)(STUDIO.titleFont.file), weight: STUDIO.titleFont.weight });
    } catch {
    }
  }
})();
var FONT = {
  title: STUDIO.titleFont ? STUDIO.titleFont.family : "Bricolage Grotesque",
  ui: "Fragment Mono",
  hand: "Kalam"
};

// src/engine/props.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");

// src/engine/kit.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Foreground = ({ children, blur = 10 }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { filter: `url(#blur${blur})`, children });

// src/engine/light.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var WallTexture = ({ d, points, rect }) => rect ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: rect[0], y: rect[1], width: rect[2], height: rect[3], fill: "#000", filter: "url(#g3wall)" }) : points ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("polygon", { points, fill: "#000", filter: "url(#g3wall)" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d, fill: "#000", filter: "url(#g3wall)" });
var RoomCorners = ({ x0, x1, y0, y1 }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("g", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: x0, y: y1 - 70, width: x1 - x0, height: 70, fill: "url(#g3aoUp)" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: x0, y: y0, width: x1 - x0, height: 60, fill: "url(#g3aoDown)" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: x0, y: y0, width: 60, height: y1 - y0, fill: "url(#g3aoRight)" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: x1 - 60, y: y0, width: 60, height: y1 - y0, fill: "url(#g3aoLeft)" })
] });
var Glow = ({ x, y, r, kind = "warm", o = 0.6 }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: x, cy: y, r, fill: `url(#g3${kind})`, opacity: o, style: { mixBlendMode: "screen" } });

// src/engine/mascot.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var MASCOT = {
  skin: "#F6EFE3",
  skinShade: "#E2D3BE",
  ink: "#1D2033",
  // oversized orange hoodie
  hoodie: "#FF7A3D",
  hoodieShade: "#E85A2A",
  hoodieLining: "#FFB46A",
  // dark navy trousers
  trousers: "#1E2A44",
  trousersShade: "#151F34",
  // large white sneakers
  shoe: "#FFFFFF",
  shoeSole: "#EDE5D8",
  shoeLace: "#1D2033",
  // drawstrings match the hoodie's bright side
  drawstring: "#FFD96A",
  line: "#121019",
  // big bright white eyes
  eye: "#FFFFFF",
  eyeShade: "#E8E2D6",
  pupil: "#1D2033"
};
var baseMascotPose = {
  x: 960,
  y: 700,
  scale: 1,
  facing: 1,
  tilt: 0,
  spin: 0,
  headTilt: 0,
  armL: { a: 10, b: -8 },
  armR: { a: 10, b: -8 },
  legL: { a: 5, b: 0 },
  legR: { a: -5, b: 0 },
  expr: "neutral",
  blink: 0,
  look: 0,
  yaw: 0,
  squash: 0,
  handL: "open",
  handR: "open",
  sway: 0
};
var MHEAD = { x: 0, y: -150, r: 80 };
var MLEG_LEN = 115;
var MSHOULDER = { x: 46, y: -102 };
var MHIP = { x: 16, y: 0 };
var MUPPER_ARM = 56;
var MFORE_ARM = 52;
var MTHIGH = 62;
var MSHIN = 53;
var rad = (d) => d * Math.PI / 180;
var rot = (p, deg, c = { x: 0, y: 0 }) => {
  const r = rad(deg);
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return { x: c.x + dx * Math.cos(r) - dy * Math.sin(r), y: c.y + dx * Math.sin(r) + dy * Math.cos(r) };
};
var mascotJoints = (pose) => {
  const side = (s, limb, root, l1, l2, isLeg) => {
    const dir = isLeg ? pose.facing : s;
    const d1 = { x: dir * Math.sin(rad(limb.a)), y: Math.cos(rad(limb.a)) };
    const mid = { x: root.x + d1.x * l1, y: root.y + d1.y * l1 };
    const a2 = limb.a + limb.b;
    const d2 = { x: dir * Math.sin(rad(a2)), y: Math.cos(rad(a2)) };
    return { root, mid, end: { x: mid.x + d2.x * l2, y: mid.y + d2.y * l2 } };
  };
  const torsoRot = (p) => rot(p, pose.tilt);
  const sp = 1 - 0.85 * Math.min(1, Math.abs(pose.yaw));
  const shL = { x: -MSHOULDER.x * sp + pose.yaw * 6, y: MSHOULDER.y };
  const shR = { x: MSHOULDER.x * sp + pose.yaw * 6, y: MSHOULDER.y };
  const armL = side(-1, pose.armL, shL, MUPPER_ARM, MFORE_ARM, false);
  const armR = side(1, pose.armR, shR, MUPPER_ARM, MFORE_ARM, false);
  const legL = side(-1, pose.legL, { x: -MHIP.x * sp, y: 0 }, MTHIGH, MSHIN, true);
  const legR = side(1, pose.legR, { x: MHIP.x * sp, y: 0 }, MTHIGH, MSHIN, true);
  const r = (o) => ({ root: torsoRot(o.root), mid: torsoRot(o.mid), end: torsoRot(o.end) });
  return { armL: r(armL), armR: r(armR), legL, legR, head: torsoRot(MHEAD) };
};
var mascotTurnWidth = (yaw) => 1 - 0.4 * Math.min(1, Math.abs(yaw));
var mascotFaceAt = (f, keys) => {
  let expr = keys[0][1];
  let blink = 0;
  for (let i = 0; i < keys.length; i++) {
    const [k, e] = keys[i];
    if (f >= k) expr = e;
    if (i > 0 && f >= k - 2 && f < k + 1) blink = 1;
  }
  return { expr, blink };
};
var mascotPoseAt = (f, keys, from = baseMascotPose) => {
  const full = [];
  let cur = from;
  for (const k of keys) {
    cur = { ...cur, ...k.p };
    full.push({ f: k.f, p: cur, ease: k.ease });
  }
  if (f <= full[0].f) return full[0].p;
  for (let i = 0; i < full.length - 1; i++) {
    const A = full[i];
    const B = full[i + 1];
    if (f <= B.f) {
      const t = (B.ease ?? easeInOut)((f - A.f) / Math.max(1e-6, B.f - A.f));
      return {
        x: lerp(A.p.x, B.p.x, t),
        y: lerp(A.p.y, B.p.y, t),
        scale: lerp(A.p.scale, B.p.scale, t),
        facing: t < 0.5 ? A.p.facing : B.p.facing,
        tilt: lerp(A.p.tilt, B.p.tilt, t),
        spin: lerp(A.p.spin, B.p.spin, t),
        headTilt: lerp(A.p.headTilt, B.p.headTilt, t),
        armL: { a: lerp(A.p.armL.a, B.p.armL.a, t), b: lerp(A.p.armL.b, B.p.armL.b, t) },
        armR: { a: lerp(A.p.armR.a, B.p.armR.a, t), b: lerp(A.p.armR.b, B.p.armR.b, t) },
        legL: { a: lerp(A.p.legL.a, B.p.legL.a, t), b: lerp(A.p.legL.b, B.p.legL.b, t) },
        legR: { a: lerp(A.p.legR.a, B.p.legR.a, t), b: lerp(A.p.legR.b, B.p.legR.b, t) },
        expr: A.p.expr,
        handL: A.p.handL,
        handR: A.p.handR,
        blink: lerp(A.p.blink, B.p.blink, t),
        look: lerp(A.p.look, B.p.look, t),
        yaw: lerp(A.p.yaw, B.p.yaw, t),
        squash: lerp(A.p.squash, B.p.squash, t),
        sway: lerp(A.p.sway, B.p.sway, t)
      };
    }
  }
  return full[full.length - 1].p;
};
var MascotFace = ({ expr, blink, look, yaw = 0, ink = MASCOT.ink, glint = 0, glintColor = "#8FF0FF" }) => {
  const ex = look * 7;
  const ay = Math.min(1, Math.abs(yaw));
  const farHidden = ay > 0.72;
  const farSide = yaw > 0 ? -1 : 1;
  const eyeY = MHEAD.y - 2;
  const lid = expr === "smug" || expr === "cool" ? 0.45 : expr === "tired" ? 0.58 : 0;
  const open = Math.max(0.08, 1 - Math.max(blink, lid));
  const eye = (cx) => {
    if (farHidden && Math.sign(cx) === farSide) return null;
    if (expr === "happy")
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M ${cx - 10} ${eyeY + 3} Q ${cx} ${eyeY - 9} ${cx + 10} ${eyeY + 3}`, stroke: ink, strokeWidth: 6, fill: "none", strokeLinecap: "round" });
    if (expr === "oops")
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "path",
        {
          d: `M ${cx - 9} ${eyeY - 6} L ${cx + 4} ${eyeY} L ${cx - 9} ${eyeY + 6}`,
          transform: cx > 0 ? `translate(${2 * cx},0) scale(-1,1)` : void 0,
          stroke: ink,
          strokeWidth: 6,
          fill: "none",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      );
    if (expr === "dizzy")
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { stroke: ink, strokeWidth: 5, strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M ${cx - 7} ${eyeY - 7} L ${cx + 7} ${eyeY + 7} M ${cx + 7} ${eyeY - 7} L ${cx - 7} ${eyeY + 7}` }) });
    if (blink >= 0.95)
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M ${cx - 12} ${eyeY + 1} Q ${cx} ${eyeY + 8} ${cx + 12} ${eyeY + 1}`, stroke: ink, strokeWidth: 5, fill: "none", strokeLinecap: "round" }),
        expr === "tired" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M ${cx - 12} ${eyeY + 15} Q ${cx} ${eyeY + 22} ${cx + 12} ${eyeY + 15}`, stroke: "#8C7AA6", strokeWidth: 4.5, fill: "none", strokeLinecap: "round", opacity: 0.85 }) : null
      ] });
    const big = expr === "shock";
    const rx = big ? 13 : 9;
    const ry = (big ? 16 : 13) * open;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: cx + ex, cy: eyeY + (lid ? 3 : 0), rx, ry, fill: MASCOT.eye }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: cx + ex, cy: eyeY + (lid ? 3 : 0), rx: rx * 0.9, ry: ry * 0.85, fill: MASCOT.eyeShade, opacity: 0.35 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: cx + ex, cy: eyeY, r: big ? 4.5 : 3.2, fill: MASCOT.pupil }),
      big && open > 0.5 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: cx + ex + 3.5, cy: eyeY - 4, r: 3.4, fill: "#fff" }) : null,
      lid ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: expr === "tired" ? `M ${cx - 13} ${eyeY - 1} Q ${cx} ${eyeY - 5} ${cx + 13} ${eyeY - 1}` : `M ${cx - 12} ${eyeY - 4} L ${cx + 12} ${eyeY - 2}`, stroke: ink, strokeWidth: 4, strokeLinecap: "round", fill: "none" }) : null,
      expr === "tired" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M ${cx - 12} ${eyeY + 14} Q ${cx} ${eyeY + 21} ${cx + 12} ${eyeY + 14}`, stroke: "#8C7AA6", strokeWidth: 4.5, fill: "none", strokeLinecap: "round", opacity: 0.85 }) : null
    ] });
  };
  const brows = {
    neutral: "",
    happy: "",
    smug: `M -34 ${eyeY - 22} L -12 ${eyeY - 20} M 12 ${eyeY - 26} L 34 ${eyeY - 30}`,
    shock: `M -32 ${eyeY - 28} Q -21 ${eyeY - 36} -10 ${eyeY - 29} M 10 ${eyeY - 29} Q 21 ${eyeY - 36} 32 ${eyeY - 28}`,
    worried: `M -32 ${eyeY - 18} L -12 ${eyeY - 26} M 12 ${eyeY - 26} L 32 ${eyeY - 18}`,
    oops: `M -32 ${eyeY - 20} L -12 ${eyeY - 16} M 12 ${eyeY - 16} L 32 ${eyeY - 20}`,
    cool: "",
    tired: `M -33 ${eyeY - 17} Q -22 ${eyeY - 21} -11 ${eyeY - 19} M 11 ${eyeY - 19} Q 22 ${eyeY - 21} 33 ${eyeY - 17}`,
    dizzy: `M -33 ${eyeY - 17} Q -22 ${eyeY - 21} -11 ${eyeY - 19} M 11 ${eyeY - 19} Q 22 ${eyeY - 21} 33 ${eyeY - 17}`
  };
  const mY = MHEAD.y + 34;
  const mouth = {
    neutral: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -12 ${mY} Q 0 ${mY + 5} 12 ${mY}`, stroke: ink, strokeWidth: 5, fill: "none", strokeLinecap: "round" }),
    happy: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -20 ${mY - 4} Q 0 ${mY + 24} 20 ${mY - 4} Z`, fill: ink }),
    smug: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -14 ${mY + 2} Q 4 ${mY + 10} 18 ${mY - 6}`, stroke: ink, strokeWidth: 5, fill: "none", strokeLinecap: "round" }),
    shock: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: 0, cy: mY + 4, rx: 12, ry: 16, fill: ink }),
    worried: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -18 ${mY + 4} Q -9 ${mY - 4} 0 ${mY + 4} Q 9 ${mY + 14} 18 ${mY + 4}`, stroke: ink, strokeWidth: 5, fill: "none", strokeLinecap: "round" }),
    oops: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: -20, y: mY - 6, width: 40, height: 18, rx: 7, fill: ink }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -16 ${mY + 3} L 16 ${mY + 3}`, stroke: "#fff", strokeWidth: 3 })
    ] }),
    cool: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -14 ${mY + 2} Q 4 ${mY + 10} 18 ${mY - 6}`, stroke: ink, strokeWidth: 5, fill: "none", strokeLinecap: "round" }),
    dizzy: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -16 ${mY + 4} Q -8 ${mY - 4} 0 ${mY + 4} Q 8 ${mY + 14} 16 ${mY + 4}`, stroke: ink, strokeWidth: 5, fill: "none", strokeLinecap: "round" }),
    tired: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -12 ${mY + 4} Q 0 ${mY} 12 ${mY + 4}`, stroke: ink, strokeWidth: 5, fill: "none", strokeLinecap: "round" })
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { transform: `translate(${yaw * 30} 0) scale(${1 - 0.28 * ay} 1)`, children: [
    eye(-24),
    eye(24),
    brows[expr] ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: brows[expr], stroke: ink, strokeWidth: 5, fill: "none", strokeLinecap: "round" }) : null,
    mouth[expr],
    glint > 0.01 && blink < 0.95 ? [-24, 24].map(
      (cx) => farHidden && Math.sign(cx) === farSide ? null : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { opacity: Math.min(1, glint), children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: cx + ex, cy: eyeY, r: 19, fill: glintColor, opacity: 0.2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: cx + ex, cy: eyeY, r: 14, fill: glintColor, opacity: 0.28 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: cx + ex, cy: eyeY, rx: 9, ry: Math.max(2, 12 * open), fill: glintColor }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: cx + ex + 2.5, cy: eyeY - 3, r: 2.6, fill: "#FFFFFF" })
      ] }, `gl${cx}`)
    ) : null
  ] });
};
var MascotLimb = ({ root, mid, end, w }) => {
  const d = `M ${root.x} ${root.y} L ${mid.x} ${mid.y} L ${end.x} ${end.y}`;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d, stroke: MASCOT.line, strokeWidth: w + 6, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d, stroke: MASCOT.skinShade, strokeWidth: w, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
};
var MascotShoe = ({ root, mid, end }, side) => {
  const ang = Math.atan2(end.x - mid.x, end.y - mid.y) * 180 / Math.PI;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { transform: `translate(${end.x} ${end.y}) rotate(${side * -90 - ang})`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: 0, cy: 4, rx: 26, ry: 14, fill: MASCOT.shoeSole, stroke: MASCOT.line, strokeWidth: 3 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: 0, cy: 2, rx: 22, ry: 11, fill: MASCOT.shoe, stroke: MASCOT.line, strokeWidth: 3 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: -10, y: -9, width: 20, height: 3, rx: 1, fill: MASCOT.shoeSole }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -6 0 Q 0 4 6 0`, stroke: MASCOT.line, strokeWidth: 2, fill: "none", strokeLinecap: "round", opacity: 0.5 })
  ] });
};
var MascotHand = ({ mid, end, side, kind }) => {
  const ang = Math.atan2(end.x - mid.x, end.y - mid.y) * 180 / Math.PI;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { transform: `translate(${end.x} ${end.y}) rotate(${-ang})`, children: kind === "point" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: -4, y: 10, width: 7, height: 22, rx: 3, fill: MASCOT.skin, stroke: MASCOT.line, strokeWidth: 3 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M -9 -2 Q -12 12 -5 16 L 6 16 Q 12 12 9 -2 Z", fill: MASCOT.skin, stroke: MASCOT.line, strokeWidth: 3.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: side * 9, cy: 5, rx: 4, ry: 6, fill: MASCOT.skin, stroke: MASCOT.line, strokeWidth: 3 })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: side * 9, cy: 2, rx: 5, ry: 8, transform: `rotate(${side * -28} ${side * 9} 2)`, fill: MASCOT.skin, stroke: MASCOT.line, strokeWidth: 3.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: 0, cy: 9, rx: 9, ry: 13, fill: MASCOT.skin, stroke: MASCOT.line, strokeWidth: 3.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M -3 15 L -3 21 M 2 16 L 2 22", stroke: MASCOT.line, strokeWidth: 2, opacity: 0.45, strokeLinecap: "round" })
  ] }) });
};
var MascotHood = ({ tilt, headTilt, sway }) => {
  const sw = sway * 0.7 - tilt * 0.6;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { transform: `rotate(${tilt}) rotate(${headTilt * 0.5} 0 ${MHEAD.y + 40})`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -78 ${MHEAD.y + 18} Q -90 ${MHEAD.y - 78} 0 ${MHEAD.y - 86} Q 90 ${MHEAD.y - 78} 78 ${MHEAD.y + 18} Q 58 -104 0 -110 Q -58 -104 -78 ${MHEAD.y + 18} Z`, fill: MASCOT.hoodie, stroke: MASCOT.line, strokeWidth: 4 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -10 ${MHEAD.y - 80} Q -16 ${MHEAD.y - 100} 0 ${MHEAD.y - 106} Q 16 ${MHEAD.y - 100} 10 ${MHEAD.y - 80} Z`, fill: MASCOT.hoodieShade, opacity: 0.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -56 ${MHEAD.y + 14} Q -60 ${MHEAD.y - 64} 0 ${MHEAD.y - 68} Q 60 ${MHEAD.y - 64} 56 ${MHEAD.y + 14} Q 42 ${MHEAD.y - 30} 14 ${MHEAD.y - 38} Q 0 ${MHEAD.y - 44} -14 ${MHEAD.y - 38} Q -42 ${MHEAD.y - 30} -56 ${MHEAD.y + 14} Z`, fill: "#121019" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M -13 ${MHEAD.y - 104} Q ${-15 + sw * 0.3} ${MHEAD.y - 84} ${-17 + sw} ${MHEAD.y - 62}`, stroke: MASCOT.drawstring, strokeWidth: 5, strokeLinecap: "round", fill: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: -17 + sw, cy: MHEAD.y - 60, r: 5, fill: MASCOT.drawstring }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M 13 ${MHEAD.y - 104} Q ${15 + sw * 0.3} ${MHEAD.y - 84} ${17 + sw} ${MHEAD.y - 62}`, stroke: MASCOT.drawstring, strokeWidth: 5, strokeLinecap: "round", fill: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: 17 + sw, cy: MHEAD.y - 60, r: 5, fill: MASCOT.drawstring })
    ] })
  ] });
};
var MascotTorso = ({ tilt, yaw }) => {
  const kw = mascotTurnWidth(yaw);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { transform: `rotate(${tilt}) translate(${yaw * 6} 0) scale(${kw} 1)`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M -56 -102 Q 0 -116 56 -102 L 50 4 Q 0 16 -50 4 Z", fill: MASCOT.hoodie, stroke: MASCOT.line, strokeWidth: 4, strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M 12 -106 Q 34 -104 56 -102 L 50 4 Q 30 12 14 13 Z", fill: MASCOT.hoodieShade, opacity: 0.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M 0 -102 L 0 4", stroke: MASCOT.hoodieShade, strokeWidth: 4 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M -26 -104 Q 0 -88 26 -104", stroke: MASCOT.hoodieLining, strokeWidth: 5, fill: "none", strokeLinecap: "round" })
  ] });
};
var MascotTrousers = ({ tilt }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { transform: `rotate(${tilt})`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M -34 0 Q 0 8 34 0 L 32 62 Q 0 70 -32 62 Z", fill: MASCOT.trousers, stroke: MASCOT.line, strokeWidth: 3, strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M 10 0 Q 24 6 34 0 L 32 62 Q 22 68 12 4 Z", fill: MASCOT.trousersShade, opacity: 0.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M 0 0 L 0 62", stroke: MASCOT.trousersShade, strokeWidth: 3 })
  ] });
};
var Mascot = ({ pose, shadow = 1, rimId = "rimR" }) => {
  const j = mascotJoints(pose);
  const L = MASCOT;
  const limb = (o, w) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MascotLimb, { root: o.root, mid: o.mid, end: o.end, w });
  const shoe = (o) => MascotShoe(o, pose.facing);
  const hand = (o, side, kind) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MascotHand, { mid: o.mid, end: o.end, side, kind });
  const kw = mascotTurnWidth(pose.yaw);
  const torso = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MascotTorso, { tilt: pose.tilt, yaw: pose.yaw });
  const head = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { transform: `rotate(${pose.tilt}) rotate(${pose.headTilt} 0 ${MHEAD.y + 40})`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: MHEAD.x, cy: MHEAD.y, r: MHEAD.r, fill: MASCOT.skin, stroke: MASCOT.line, strokeWidth: 4 }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M ${MHEAD.x + 16} ${MHEAD.y + 68} A ${MHEAD.r} ${MHEAD.r} 0 0 0 ${MHEAD.x + 72} ${MHEAD.y + 16} A 82 82 0 0 1 ${MHEAD.x + 16} ${MHEAD.y + 68} Z`, fill: MASCOT.skinShade }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MascotFace, { expr: pose.expr, blink: pose.blink, look: pose.look, yaw: pose.yaw, ink: MASCOT.ink, glint: pose.glint, glintColor: pose.glintColor })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { children: [
    shadow > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ellipse", { cx: pose.x, cy: pose.y + MLEG_LEN * pose.scale + 10, rx: 70 * pose.scale, ry: 12 * pose.scale, fill: "#000", opacity: 0.25 * shadow }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { transform: `translate(${pose.x} ${pose.y}) scale(${pose.scale}) rotate(${pose.spin} 0 -90)`, filter: `url(#${rimId})`, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { transform: `translate(0 ${MLEG_LEN}) scale(${1 + 0.6 * pose.squash} ${1 - pose.squash}) translate(0 ${-MLEG_LEN})`, children: [
      pose.yaw < 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        limb(j.legR, 12),
        shoe(j.legR),
        limb(j.legL, 12),
        shoe(j.legL),
        limb(j.armR, 11),
        hand(j.armR, -1, pose.handR)
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        limb(j.legL, 12),
        shoe(j.legL),
        limb(j.legR, 12),
        shoe(j.legR),
        limb(j.armL, 11),
        hand(j.armL, 1, pose.handL)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MascotTrousers, { tilt: pose.tilt }),
      torso,
      pose.yaw < 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        limb(j.armL, 11),
        hand(j.armL, 1, pose.handL)
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        limb(j.armR, 11),
        hand(j.armR, -1, pose.handR)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MascotHood, { tilt: pose.tilt, headTilt: pose.headTilt, sway: pose.sway }),
      head
    ] }) })
  ] });
};

// src/engine/room.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var pts = (a) => a.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
var makeRoom = (vp, back, S = 3.5) => {
  const s = (w) => 1 / lerp(1, 1 / S, w);
  const P = (u, v, w) => {
    const k = s(w);
    return { x: vp.x + (lerp(back.x0, back.x1, u) - vp.x) * k, y: vp.y + (lerp(back.y0, back.y1, v) - vp.y) * k };
  };
  const Q = (a) => pts(a.map(([u, v, w]) => P(u, v, w)));
  return { vp, back, s, P, Q };
};

// src/engine/furnish.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");

// src/engine/ui.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");

// src/engine/episode.tsx
var import_remotion2 = require("remotion");
var import_jsx_runtime9 = require("react/jsx-runtime");

// src/engine/sets/study.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var STUDY = makeRoom({ x: 980, y: 500 }, { x0: 530, x1: 1430, y0: 335, y1: 740 }, 3.5);

// src/engine/sets/stairwell.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");

// src/engine/sets/classroom.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var CLS = makeRoom({ x: 900, y: 470 }, { x0: 300, x1: 1500, y0: 130, y1: 720 }, 3.2);

// src/engine/sets/rooftop.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");

// src/engine/sets/kitchen.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var KITCHEN = makeRoom({ x: 960, y: 500 }, { x0: 500, x1: 1420, y0: 330, y1: 745 }, 3.4);

// src/engine/sets/schematic.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");

// src/engine/sets/bedroom.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var BEDROOM = makeRoom({ x: 940, y: 500 }, { x0: 480, x1: 1440, y0: 320, y1: 742 }, 3.4);
var LAMP = (() => {
  const p = BEDROOM.P(0.505, 0.78, 0.05);
  return { x: p.x, y: p.y - 96 };
})();

// src/episodes/video-game/shots.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var LR = makeRoom({ x: 960, y: 500 }, { x0: 520, x1: 1400, y0: 320, y1: 740 }, 3.4);
var LR_FLOOR_Y = 740;
var LivingRoomWalls = ({ t }) => {
  const { P, Q } = LR;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("polygon", { points: Q([[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]]), fill: "#1A1220" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("polygon", { points: Q([[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]]), fill: "#3A2E40" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(WallTexture, { rect: [520, 320, 880, 420] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("polygon", { points: Q([[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]]), fill: "#2E2434" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("polygon", { points: Q([[1, 0, 0], [1, 0, 1], [1, 1, 1], [1, 1, 0]]), fill: "#2E2434" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RoomCorners, { x0: 520, x1: 1400, y0: 320, y1: 740 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("polygon", { points: Q([[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]]), fill: "#2A1E26" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(WallTexture, { rect: [520, 720, 880, 20] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 520, y: 716, width: 880, height: 24, fill: "#1A1220" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("polygon", { points: Q([[0, 0.965, 0], [0, 0.965, 1], [0, 1, 1], [0, 1, 0]]), fill: "#1A1220" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("polygon", { points: Q([[1, 0.965, 0], [1, 0.965, 1], [1, 1, 1], [1, 1, 0]]), fill: "#1A1220" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ellipse", { cx: 960, cy: 736, rx: 60, ry: 16, fill: "#000", opacity: 0.35 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ellipse", { cx: 960, cy: 734, rx: 44, ry: 12, fill: "#FFD96A", stroke: "#B87A10", strokeWidth: 3 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 960, cy: 734, r: 22, fill: "#FFD96A" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 960, cy: 734, r: 14, fill: "#FFF3DC" }),
    Math.sin(t / 10) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 960, cy: 734, r: 10, fill: "#FFD96A", opacity: 0.6 }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 960, y: 734, r: 260, o: 0.3 })
  ] });
};
var Fridge = ({ x, y }) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: x - 70, y: y - 300, width: 140, height: 300, rx: 6, fill: "#242030", stroke: "#121019", strokeWidth: 3 }),
  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: x - 56, y: y - 286, width: 112, height: 24, rx: 4, fill: "#8A8EA6" }),
  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x, y: y - 150, r: 200, o: 0.25, kind: "cool" })
] });
var Couch = ({ x, y }) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: x - 140, y: y - 90, width: 280, height: 90, rx: 12, fill: "#2A2434", stroke: "#121019", strokeWidth: 3 }),
  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: x - 132, y: y - 98, width: 264, height: 16, rx: 8, fill: "#3A3446" }),
  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: x - 120, y: y - 70, width: 240, height: 40, rx: 10, fill: "#242030" }),
  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x, y: y - 40, r: 180, o: 0.15 })
] });
var standPose = (x, yaw = 0, look = 0) => ({
  ...baseMascotPose,
  x,
  y: LR_FLOOR_Y - MLEG_LEN,
  scale: 1,
  yaw,
  look,
  armL: { a: 10, b: -8 },
  armR: { a: 10, b: -8 },
  legL: { a: 5, b: 0 },
  legR: { a: -5, b: 0 },
  expr: "neutral",
  handL: "open",
  handR: "open"
});
var V1 = ({ t, len }) => {
  const pose = mascotPoseAt(t, [
    { f: 0, p: { ...standPose(960, 0, 0), squash: 0.15 } },
    { f: 8, p: { ...standPose(960, 0, 0), squash: 0 } },
    { f: 16, p: { ...standPose(960, 0.1, 0.3), armR: { a: 14, b: -6 } } },
    { f: 30, p: { ...standPose(960, 0.1, 0.3), armR: { a: 14, b: -6 } } }
  ]);
  const face = mascotFaceAt(t, [[0, "shock"], [10, "worried"]]);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 960], [len, 940]]), kf(t, [[0, 500], [len, 520]]), kf(t, [[0, 1.15], [len, 1.3]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(LivingRoomWalls, { t }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 1080, y: 470, r: 600, o: 0.35 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Fridge, { x: 1260, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Couch, { x: 740, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...pose, ...face }, shadow: 0.7, rimId: "rimR" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Foreground, { blur: 10, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: -400, y: 780, width: 2720, height: 300, fill: "#0E0A16" }) })
  ] });
};
var V2 = ({ t, len }) => {
  const bounce = Math.min(t / 8, 1);
  const lift = Math.sin(bounce * Math.PI) * 110;
  const pose = mascotPoseAt(t, [
    { f: 0, p: { ...standPose(740, 0.2, 0.4), y: LR_FLOOR_Y - MLEG_LEN - lift } },
    { f: 6, p: { ...standPose(740, 0.2, 0.4), y: LR_FLOOR_Y - MLEG_LEN - lift, armL: { a: 100, b: 20 }, armR: { a: 100, b: 20 } } },
    { f: 14, p: { ...standPose(740, 0.2, 0.4), y: LR_FLOOR_Y - MLEG_LEN - lift } },
    { f: 24, p: { ...standPose(740, 0.2, 0.4), y: LR_FLOOR_Y - MLEG_LEN } }
  ]);
  const face = mascotFaceAt(t, [[0, "happy"], [12, "shock"]]);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 740], [len, 760]]), kf(t, [[0, 520], [len, 500]]), kf(t, [[0, 1.7], [len, 1.9]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(LivingRoomWalls, { t }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Fridge, { x: 1260, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Couch, { x: 740, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...pose, ...face }, shadow: 0.6, rimId: "rimR" })
  ] });
};
var cookiePulse = (t) => 1 + 0.15 * Math.sin(t / 6);
var V3 = ({ t }) => {
  const cx = 960, cy = 540;
  const s = cookiePulse(t);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 960], [22, 960]]), kf(t, [[0, 540], [22, 540]]), kf(t, [[0, 3.2], [22, 3.6]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#14101C" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: cx, y: cy, r: 500, o: 0.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ellipse", { cx, cy, rx: 110 * s, ry: 66 * s, fill: "#3A2E40", stroke: "#121019", strokeWidth: 4 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ellipse", { cx, cy, rx: 86 * s, ry: 52 * s, fill: "#F6EFE3" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx, cy: cy - 8, r: 34 * s, fill: "#FFD96A" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: cx + 10 * s, cy: cy - 14, r: 14 * s, fill: "#FFF3DC" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ellipse", { cx, cy: cy + 4, rx: 44 * s, ry: 10, fill: "#E8C46A", opacity: 0.6 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(960, 860, 1), children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M 860 720 Q 960 540 1060 720", stroke: "#121019", strokeWidth: 70, fill: "none", strokeLinecap: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M 860 720 Q 960 540 1060 720", stroke: "#E2D3BE", strokeWidth: 54, fill: "none", strokeLinecap: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 960, cy: 540, r: 42, fill: "#F6EFE3", stroke: "#121019", strokeWidth: 3 })
    ] })
  ] });
};
var V4 = ({ t, len }) => {
  const phase = Math.min(t / 14, 1);
  const arc = Math.sin(phase * Math.PI);
  const x = lerp(960, 1260, phase);
  const y = lerp(740 - MLEG_LEN, 740 - MLEG_LEN - 160 * arc, phase);
  const pose = mascotPoseAt(t, [
    { f: 0, p: { ...standPose(960, 0.2, 0.3), y } },
    { f: 8, p: { ...standPose(1120, 0.4, 0.2), y, armL: { a: 140, b: 30 }, armR: { a: 140, b: 30 }, squash: -0.06 } },
    { f: 14, p: { ...standPose(1260, 0.6, 0.1), y: 740 - MLEG_LEN } }
  ]);
  const face = mascotFaceAt(t, [[0, "happy"], [8, "shock"]]);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 1e3], [len, 1260]]), kf(t, [[0, 520], [len, 460]]), kf(t, [[0, 1.5], [len, 1.6]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(LivingRoomWalls, { t }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Fridge, { x: 1260, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Couch, { x: 740, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...pose, ...face }, shadow: 0.6, rimId: "rimR" })
  ] });
};
var V5 = ({ t, len }) => {
  const frozen = t > 10;
  const pose = mascotPoseAt(t, [
    { f: 0, p: { ...standPose(960, 0.1, 0.2) } },
    { f: 10, p: { ...standPose(960, 0.1, 0.2), look: 0.8 } },
    { f: 30, p: { ...standPose(960, 0.1, 0.8), armR: { a: 20, b: -10 } } }
  ]);
  const face = mascotFaceAt(t, [[0, "worried"], [12, "smug"]]);
  const freezeTint = frozen ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#00FFFF", opacity: 0.12 }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 520], [len, 520]]), kf(t, [[0, 1.8], [len, 1.85]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(LivingRoomWalls, { t }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Fridge, { x: 1260, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Couch, { x: 740, y: 700 }),
    Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 500 + rnd(i, 1) * 920, cy: 400 + rnd(i, 2) * 340, r: 1.2 + rnd(i, 3) * 2, fill: "#E2D3BE", opacity: 0.5 }, i)),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...pose, ...face }, shadow: 0.6, rimId: "rimR" }),
    freezeTint
  ] });
};
var V6 = ({ t, len }) => {
  const falling = t < 12;
  const p = clamp(t / 12);
  const y = falling ? lerp(100, 740 - MLEG_LEN, easeIn(p)) : 740 - MLEG_LEN;
  const spin = falling ? lerp(0, 720, p) : 0;
  const squash = t >= 12 && t < 18 ? 0.12 * Math.sin((t - 12) / 6 * Math.PI) : 0;
  const pose = {
    ...baseMascotPose,
    x: 960,
    y,
    scale: 1,
    facing: 1,
    tilt: 0,
    spin,
    headTilt: 0,
    armL: { a: 100, b: 20 },
    armR: { a: 100, b: 20 },
    legL: { a: 40, b: -30 },
    legR: { a: -40, b: -30 },
    expr: falling ? "shock" : "neutral",
    blink: 0,
    look: 0,
    yaw: 0,
    squash,
    handL: "open",
    handR: "open",
    sway: 0
  };
  const face = mascotFaceAt(t, [[0, "shock"], [14, "neutral"]]);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: `translate(960 540) rotate(${t * 0.05}) scale(${1 + t * 1e-3}) translate(-960 -540)`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#14101C" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("g", { filter: "url(#blur10)", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(LivingRoomWalls, { t: t + 200 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...pose, ...face }, shadow: 0, rimId: "rimR" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 960, y: 740 - MLEG_LEN, r: 120, o: 0.4 })
  ] });
};
var V7 = ({ t, len }) => {
  const talking = Math.sin(t / 4) > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 1060], [len, 1080]]), kf(t, [[0, 540], [len, 520]]), kf(t, [[0, 1.9], [len, 2]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(LivingRoomWalls, { t }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Fridge, { x: 1260, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Couch, { x: 740, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: "translate(1200 640)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ellipse", { cx: 0, cy: 0, rx: 70, ry: 50, fill: "#2A2434", stroke: "#121019", strokeWidth: 4 }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: -24, y: -18, width: 48, height: 34, rx: 8, fill: "#121019" }),
      talking ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: -10, y: -4, width: 20, height: 10, rx: 4, fill: "#FFD96A" }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: -20, cy: -10, r: 6, fill: "#F6EFE3" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 20, cy: -10, r: 6, fill: "#F6EFE3" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: -20, cy: -10, r: 2.5, fill: "#121019" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 20, cy: -10, r: 2.5, fill: "#121019" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Foreground, { blur: 16, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...standPose(1060, -0.3, 0.8), scale: 1.1 }, shadow: 0, rimId: "rimR" }) })
  ] });
};
var V8 = ({ t }) => {
  const sc = 5;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(960, 540, kf(t, [[0, 1], [14, 1.05]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#14101C" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { filter: "url(#blur16)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 700, y: 300, width: 520, height: 480, fill: "#3A2E40" }),
      Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 740 + i * 70, y: 380, width: 48, height: 48, rx: 4, fill: "#2E2434", stroke: "#121019", strokeWidth: 2 }, i))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#07040C", opacity: 0.25 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...standPose(960, 0.2, 0.4), scale: sc, x: 960, y: 740 - MLEG_LEN * sc }, shadow: 0, rimId: "rimR" })
  ] });
};
var V9 = ({ t, len }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 500], [len, 520]]), kf(t, [[0, 1], [len, 1.05]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(LivingRoomWalls, { t }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Fridge, { x: 1260, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Couch, { x: 740, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...standPose(960, 0, 0), armL: { a: 160, b: 100 }, armR: { a: 160, b: 100 } }, shadow: 0.7, rimId: "rimR" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 960, y: 340, r: 400, o: 0.15 })
  ] });
};
var glitchOffset = (t) => Math.sin(t * 7) * (t % 10 > 5 ? 8 : -8);
var V10 = ({ t, len }) => {
  const gx = glitchOffset(t);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 960], [len, 960 + gx]]), kf(t, [[0, 620], [len, 600]]), kf(t, [[0, 1.6], [len, 1.7]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(LivingRoomWalls, { t }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Fridge, { x: 1260, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Couch, { x: 740, y: 700 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: `translate(700 640) scale(${0.9 + 0.02 * Math.sin(t / 3)})`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ellipse", { cx: 0, cy: 0, rx: 60, ry: 50, fill: "#121019" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: -20, y: -16, width: 40, height: 28, rx: 6, fill: "#0A080E" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: -18, cy: -8, r: 7, fill: "#00FF41" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 18, cy: -8, r: 7, fill: "#00FF41" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: -18, cy: -8, r: 2.5, fill: "#121019" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 18, cy: -8, r: 2.5, fill: "#121019" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: -24, y: 4, width: 48, height: 4, rx: 2, fill: "#00FF41", opacity: 0.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 0, y: -10, r: 120, o: 0.4, kind: "cool" }),
      t % 6 < 1 ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: -60, y: -80, width: 120, height: 40, fill: "#FF0000", opacity: 0.3 }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...standPose(960, 0.2, 0.6), expr: "worried" }, shadow: 0.6, rimId: "rimR" })
  ] });
};
var V11 = ({ t }) => {
  const pulse = 1 + 0.05 * Math.sin(t / 5);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(960, 540, kf(t, [[0, 4], [18, 4.4]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0A080E" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ellipse", { cx: 960, cy: 540, rx: 220 * pulse, ry: 150 * pulse, fill: "#121019" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 960, cy: 540, r: 90 * pulse, fill: "#00FF41" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 960 + 12, cy: 540, r: 34 * pulse, fill: "#121019" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 960 + 14, cy: 540 - 4, r: 8, fill: "#FFF3DC" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 960, y: 540, r: 300, o: 0.35, kind: "cool" })
  ] });
};
var V12 = ({ t, len }) => {
  const p = clamp((t - 10) / 20);
  const barW = lerp(0, 700, p);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 500], [len, 520]]), kf(t, [[0, 1], [len, 1.05]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0A080E" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 610, y: 500, width: 700, height: 6, rx: 3, fill: "#242030" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 610, y: 500, width: barW, height: 6, rx: 3, fill: "#FFD96A" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 610 + barW, y: 503, r: 100, o: 0.6 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("text", { x: 960, y: 440, textAnchor: "middle", fontFamily: "monospace", fontSize: 28, fill: "#E2D3BE", letterSpacing: 4, children: [
      "LOADING... ",
      Math.floor(p * 100),
      "%"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: "translate(960 620)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ellipse", { cx: 0, cy: -40, rx: 70, ry: 55, fill: "#F6EFE3", stroke: "#121019", strokeWidth: 3 }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: -28, y: -12, width: 56, height: 26, rx: 6, fill: "#121019" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: -22, cy: -6, r: 7, fill: "#F6EFE3" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 22, cy: -6, r: 7, fill: "#F6EFE3" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: -22, cy: -6, r: 2.5, fill: "#121019" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 22, cy: -6, r: 2.5, fill: "#121019" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 80, width: 120, height: 160, rx: 10, fill: "#0A080E", stroke: "#121019", strokeWidth: 3 }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 0, y: -40, r: 140, o: 0.3 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...standPose(700, 0.5, 0.2), expr: "worried" }, shadow: 0.7, rimId: "rimR" })
  ] });
};
var V13 = ({ t, len }) => {
  const secs = Math.max(0, 10 - Math.floor(t / 6));
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 520], [len, 500]]), kf(t, [[0, 1.7], [len, 1.8]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0A080E" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 610, y: 500, width: 700, height: 6, rx: 3, fill: "#242030" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 610, y: 500, width: 700, height: 6, rx: 3, fill: "#FF3344" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 960, y: 503, r: 120, o: 0.7 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("text", { x: 960, y: 430, textAnchor: "middle", fontFamily: "monospace", fontSize: 64, fill: "#FF3344", letterSpacing: 8, children: [
      "00:",
      secs < 10 ? "0" : "",
      secs
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...standPose(960, 0.1, -0.2), expr: "shock", armL: { a: 150, b: 60 }, armR: { a: 150, b: 60 } }, shadow: 0.7, rimId: "rimR" })
  ] });
};
var V14 = ({ t, len }) => {
  const open = clamp((t - 10) / 20);
  const doorW = lerp(0, 340, open);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 700], [len, 600]]), kf(t, [[0, 1], [len, 1.35]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0A080E" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 790, y: 300, width: 340, height: 500, rx: 6, fill: "#1A1220", stroke: "#121019", strokeWidth: 4 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 790, y: 300, width: 340, height: 8, rx: 4, fill: "#FF3344" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 960, y: 550, r: 400, o: 0.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: `translate(960 550)`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: -doorW / 2, y: -250, width: doorW, height: 500, rx: 6, fill: "#050408" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: -doorW / 2, y: -250, width: doorW, height: 6, rx: 3, fill: "#FF3344" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...standPose(960, -0.1, 0.4), expr: "worried", scale: 1.2 }, shadow: 0, rimId: "rimR" })
  ] });
};
var V15 = ({ t }) => {
  const beat = 1 + 0.1 * Math.sin(t / 3);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(960, 540, kf(t, [[0, 5], [12, 5.4]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0A080E" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 960, y: 540, r: 260, o: 0.5 }),
    [-34, 0, 34].map((dx, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: `translate(${960 + dx * beat} ${540})`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M 0 -26 L 16 4 L 0 10 L -16 4 Z", fill: i === 0 ? "#FF3344" : "#2A1212" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("circle", { cx: 0, cy: 0, r: 6, fill: i === 0 ? "#FF5A5A" : "#1A0A0A" })
    ] }, i)),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("text", { x: 960, y: 700, textAnchor: "middle", fontFamily: "monospace", fontSize: 26, fill: "#E2D3BE", letterSpacing: 3, children: "1 LIFE LEFT" })
  ] });
};
var V16 = ({ t, len }) => {
  const fade = clamp(t / 12);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { transform: camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 500], [len, 520]]), kf(t, [[0, 1], [len, 1.05]])), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0A080E" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 790, y: 300, width: 340, height: 500, rx: 6, fill: "#1A1220", stroke: "#121019", strokeWidth: 4 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glow, { x: 960, y: 550, r: 300, o: 0.4 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Mascot, { pose: { ...standPose(960, -0.1, 0.4), expr: "shock", scale: 1.2 }, shadow: 0, rimId: "rimR" }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#000000", opacity: fade * 0.95 }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("text", { x: 960, y: 540, textAnchor: "middle", fontFamily: "monospace", fontSize: 40, fill: "#FFF3DC", letterSpacing: 6, opacity: 1 - fade * 0.5, children: "PART 1 OF 2" })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  V1,
  V10,
  V11,
  V12,
  V13,
  V14,
  V15,
  V16,
  V2,
  V3,
  V4,
  V5,
  V6,
  V7,
  V8,
  V9
});
