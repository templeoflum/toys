// _stepcap.mjs — stepping-feet: frames at intervals to prove motion + knob states.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 720, height: 560 } });
await page.goto(pathToFileURL(join(TOYS, 'stepping-feet.html')).href);
await page.waitForTimeout(300);
const set = async (id, v) => {
  await page.locator('#' + id).evaluate((el, val) => {
    el.value = val; el.dispatchEvent(new Event('input', { bubbles: true }));
  }, v);
  await page.waitForTimeout(80);
};
const shot = async (tag) => { await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true }); console.log('shot ' + tag); };

await shot('sf_a_t0');
await page.waitForTimeout(450);
await shot('sf_b_t1');           // bars should have advanced
await set('rail', 100);
await shot('sf_c_rail');
await set('stripes', 0);
await shot('sf_d_flat');

await browser.close();
