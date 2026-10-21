// _cwcap.mjs — screenshot cafe-wall windowless.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
await page.goto(pathToFileURL(join(TOYS, 'cafe-wall.html')).href);
await page.waitForTimeout(400);

const set = async (id, v) => {
  await page.locator('#' + id).evaluate((el, val) => {
    el.value = val; el.dispatchEvent(new Event('input', { bubbles: true }));
  }, v);
  await page.waitForTimeout(120);
};
const shot = async (tag) => {
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  console.log('shot ' + tag);
};

await shot('cw_0_illusion');           // offset 50, mortar 7
await set('offset', 0);
await shot('cw_1_aligned');            // straight
await set('offset', 50);
await set('mortar', 0);
await shot('cw_2_nomortar');           // starved

await browser.close();
