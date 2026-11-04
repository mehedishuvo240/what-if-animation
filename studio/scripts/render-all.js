const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const outDir = process.argv[2] || '/tmp/video-game-svg';
fs.mkdirSync(outDir, { recursive: true });

const tl = JSON.parse(fs.readFileSync(path.resolve('src/episodes/video-game/timeline.json'), 'utf8'));
const shotsMod = require('../dist/video-game-shots.js');
const engine = require('../dist/engine-defs.js');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Render every frame 0..5399 to SVG
let count = 0;
const t0 = Date.now();
for (let gf = 0; gf < 5400; gf++) {
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
  fs.writeFileSync(path.join(outDir, `frame-${String(gf).padStart(5,'0')}.svg`), svgDoc);
  count++;
  if (count % 500 === 0) {
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`Rendered ${count} SVGs (f=${gf}) in ${elapsed}s`);
  }
}
console.log(`DONE: rendered ${count} SVGs to ${outDir}`);
