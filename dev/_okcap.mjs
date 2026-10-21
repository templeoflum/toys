// _okcap.mjs — screenshot oppel-kundt windowless.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 640 } });
await page.goto(pathToFileURL(join(TOYS, 'oppel-kundt.html')).href);
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

await shot('ok_0_illusion');       // filled left, empty right
await set('fill', 0);
await shot('ok_1_flat');           // both bare, equal
await set('fill', 12);
await set('match', 100);
await shot('ok_2_match');          // measured, same width

await browser.close();
