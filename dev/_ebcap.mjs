// _ebcap.mjs — screenshot ebbinghaus windowless.
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
await page.goto(pathToFileURL(join(TOYS, 'ebbinghaus.html')).href);
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

await shot('eb_0_illusion');       // full surround
await set('match', 100);
await shot('eb_1_match');          // rings prove equal
await set('match', 0);
await set('surround', 0);
await shot('eb_2_bare');           // neighbours gone

await browser.close();
