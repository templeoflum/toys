// _mlcap.mjs — screenshot muller-lyer windowless.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 760 } });
await page.goto(pathToFileURL(join(TOYS, 'muller-lyer.html')).href);
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

await shot('ml_0_illusion');       // full fins
await set('rule', 100);
await shot('ml_1_rule');           // guides prove equal
await set('rule', 0);
await set('fins', 0);
await shot('ml_2_bare');           // fins gone, equal

await browser.close();
