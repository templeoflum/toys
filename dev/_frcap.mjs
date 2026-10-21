// _frcap.mjs — screenshot fraser spiral windowless.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 620, height: 820 } });
await page.goto(pathToFileURL(join(TOYS, 'fraser-spiral.html')).href);
await page.waitForTimeout(400);
const set = async (id, v) => {
  await page.locator('#' + id).evaluate((el, val) => {
    el.value = val; el.dispatchEvent(new Event('input', { bubbles: true }));
  }, v);
  await page.waitForTimeout(120);
};
const shot = async (tag) => { await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true }); console.log('shot ' + tag); };

await shot('fr_0_illusion');
await set('twist', 0);
await shot('fr_1_flat');
await set('twist', 100);
await set('trace', 100);
await shot('fr_2_trace');

await browser.close();
