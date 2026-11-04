const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

// Bundle the video-game shots + engine for Node, externalizing react.
// Usage: node render-frames.js <shotId> <globalFrame> <outSvg> [scale]
// Shot components are imported from ../src/episodes/video-game/shots

const shotId = process.argv[2];
const globalFrame = Number(process.argv[3]);
const outSvg = process.argv[4];
const scale = process.argv[5] ? Number(process.argv[5]) : 1;

// We need the shot's t (shot clock) and len. We look these up from timeline.json + episode.json.
const ep = JSON.parse(fs.readFileSync(path.resolve('src/episodes/video-game/episode.json'), 'utf8'));
const tl = JSON.parse(fs.readFileSync(path.resolve('src/episodes/video-game/timeline.json'), 'utf8'));

const shotInfo = tl.shots.find((s) => s.id === shotId);
if (!shotInfo) { console.error(`Shot ${shotId} not found`); process.exit(1); }

// Find which segment this global frame belongs to (it's the shot's own segment)
const seg = tl.segments.find((s) => s.shot === shotId && globalFrame >= s.a && globalFrame < s.b);
const t = seg ? (globalFrame - seg.a) : 0;
const len = shotInfo.len;
const f = globalFrame;

// Dynamically require the bundled shots module AND the defs components
const shots = require('../dist/video-game-shots.js');
const Shot = shots[shotId];
if (!Shot) { console.error(`Shot component ${shotId} not exported`); process.exit(1); }

// Render the shared defs (filters, gradients) once
const { KitDefs, SetDefs } = require('../dist/video-game-shots.js');
// defs are not exported from shots bundle; instead render them inline from engine
const engine = require('../dist/engine-defs.js');

const element = React.createElement(Shot, { t, len, f });
const inner = ReactDOMServer.renderToStaticMarkup(element);
const defsHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(engine.KitDefs)) + ReactDOMServer.renderToStaticMarkup(React.createElement(engine.SetDefs));
// Write a pure SVG document so ImageMagick can rasterize at 1920x1080
const svgDoc = `<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">${defsHtml}${inner}</svg>`;
fs.writeFileSync(outSvg, svgDoc);
console.log(`RENDERED ${shotId} frame f=${globalFrame} t=${t} len=${len} -> ${outSvg}`);
