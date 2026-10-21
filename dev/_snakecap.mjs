// _snakecap.mjs — rotating snakes: pattern states (static).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 520, height: 740 } });
await page.goto(pathToFileURL(join(TOYS, 'rotating-snakes.html')).href);
await page.waitForTimeout(300);
const set = async (id, v) => {
  await page.locator('#' + id).evaluate((el, val) => {
    el.value = val; el.dispatchEvent(new Event('input', { bubbles: true }));
  }, v);
  await page.waitForTimeout(80);
};
const shot = async (tag) => { await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true }); console.log('shot ' + tag); };

await shot('rs_0_illusion');
await set('asym', 0);
await shot('rs_1_even');

await browser.close();
