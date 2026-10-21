// _thrcap.mjs — screenshot the threshold toy windowless (canvas 2D, no WebGPU).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 940, height: 760 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'threshold.html')).href);
await page.waitForTimeout(300);

async function set(id, v, tag) {
  await page.fill('#' + id, String(v));
  await page.dispatchEvent('#' + id, 'input');
  await page.waitForTimeout(70);
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  console.log('shot ' + tag);
}

// default (threshold in the overlap, both errors live)
await page.screenshot({ path: join(SHOTS, 'th_0_default.png'), fullPage: true });
console.log('shot th_0_default');
// low threshold: eager watcher — high false alarm, low miss
await set('thr', 20, 'th_1_eager');
// high threshold: cautious watcher — low false alarm, high miss
await set('thr', 320, 'th_2_cautious');
// strong signal: humps far apart, both errors small
await page.fill('#sep', '350'); await page.dispatchEvent('#sep', 'input');
await set('thr', 175, 'th_3_strong');
// weak signal: humps overlapping, both errors large
await page.fill('#sep', '60'); await page.dispatchEvent('#sep', 'input');
await set('thr', 30, 'th_4_weak');

await browser.close();
