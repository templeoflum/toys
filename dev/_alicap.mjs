// _alicap.mjs — screenshot the aliasing toy windowless (canvas 2D, no WebGPU).
// Static-verifiable states: the ghost-spoke trail + numeric apparent rate.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 880, height: 820 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'aliasing.html')).href);
await page.waitForTimeout(300);

async function state(rate, fs, step, tag) {
  await page.fill('#rate', String(rate)); await page.dispatchEvent('#rate', 'input');
  await page.fill('#fs', String(fs)); await page.dispatchEvent('#fs', 'input');
  await page.fill('#step', String(step)); await page.dispatchEvent('#step', 'input');
  await page.waitForTimeout(70);
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  console.log('shot ' + tag);
}

// default: really 12/s, 10 snapshots/s -> see +2 forward (below Nyquist, wrong)
await state(1200, 1000, 60, 'al_0_default');
// backward: really 9/s, 10/s -> see -1 (backward phantom)
await state(900, 1000, 60, 'al_1_backward');
// frozen: really 10/s, 10/s -> see 0 (spoke stands still)
await state(1000, 1000, 60, 'al_2_frozen');
// true: really 8/s, 40 snapshots/s -> see +8 (above Nyquist, honest)
await state(800, 4000, 60, 'al_3_true');

await browser.close();
