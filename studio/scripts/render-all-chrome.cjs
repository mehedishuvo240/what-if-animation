const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const req = createRequire(path.resolve('package.json'));
const { bundle } = require('@remotion/bundler');
const { renderStill, selectComposition } = require('@remotion/renderer');

const outDir = process.argv[2] || '/tmp/video-game-png';
fs.mkdirSync(outDir, { recursive: true });
const start = Number(process.argv[3] || 0);
const end = Number(process.argv[4] || 5400);

(async () => {
  const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public') });
  const composition = await selectComposition({ serveUrl, id: 'VideoGame' });
  let count = 0;
  const t0 = Date.now();
  for (let f = start; f < end; f++) {
    const output = path.join(outDir, `f${String(f).padStart(5,'0')}.png`);
    await renderStill({ serveUrl, composition, frame: f, output, overwrite: true, scale: 1 });
    count++;
    if (count % 100 === 0) {
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`Rendered ${count} frames (f=${f}) in ${elapsed}s`);
    }
  }
  console.log(`DONE: rendered ${count} frames to ${outDir}`);
})().catch(e => { console.error(e); process.exit(1); });
