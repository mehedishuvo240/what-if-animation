const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const start = Number(process.argv[2]);
const end = Number(process.argv[3]);
const outDir = process.argv[4] || '/tmp/video-game-frames';
const step = Number(process.argv[5] || 1); // render every `step` frame

fs.mkdirSync(outDir, { recursive: true });

// All shot ids in order
const shots = ['V1','V2','V3','V4','V5','V6','V7','V8','V9','V10','V11','V12','V13','V14','V15','V16'];
const tl = JSON.parse(fs.readFileSync(path.resolve('src/episodes/video-game/timeline.json'), 'utf8'));

// Bundle once (already done); require here
const shotsMod = require('../dist/video-game-shots.js');
const engine = require('../dist/engine-defs.js');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

let count = 0;
for (let gf = start; gf < end; gf += step) {
  const seg = tl.segments.find((s) => gf >= s.a && gf < s.b);
  if (!seg) continue;
  const Shot = shotsMod[seg.shot];
  if (!Shot) continue;
  const t = gf - seg.a;
  const len = tl.shots.find((s) => s.id === seg.shot).len;
  const element = React.createElement(Shot, { t, len, f: gf });
  const inner = ReactDOMServer.renderToStaticMarkup(element);
  const defsHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(engine.KitDefs)) + ReactDOMServer.renderToStaticMarkup(React.createElement(engine.SetDefs));
  const svgDoc = `<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">${defsHtml}${inner}</svg>`;
  const svgPath = path.join(outDir, `frame-${String(gf).padStart(5,'0')}.svg`);
  fs.writeFileSync(svgPath, svgDoc);
  // Convert to PNG
  const pngPath = path.join(outDir, `f${String(gf).padStart(5,'0')}.png`);
  try {
    execSync(`convert -density 96 "${svgPath}" "${pngPath}"`, { stdio: 'pipe' });
    // remove svg to save space
    fs.unlinkSync(svgPath);
  } catch (e) {
    console.error(`Failed converting frame ${gf}:`, e.message);
  }
  count++;
  if (count % 50 === 0) console.log(`Rendered ${count} frames (up to f=${gf})`);
}
console.log(`DONE: rendered ${count} frames to ${outDir}`);
