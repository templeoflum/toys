// _barbercap.mjs — barberpole: capture frames at intervals to prove it animates + knob states.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 620, height: 720 } });
await page.goto(pathToFileURL(join(TOYS, 'barberpole.html')).href);
await page.waitForTimeout(300);
const set = async (id, v) => {
  await page.locator('#' + id).evaluate((el, val) => {
    el.value = val; el.dispatchEvent(new Event('input', { bubbles: true }));
  }, v);
  await page.waitForTimeout(80);
};
const shot = async (tag) => { await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true }); console.log('shot ' + tag); };

await shot('bp_a_t0');            // tall aperture, frame 1
await page.waitForTimeout(450);
await shot('bp_b_t1');            // tall aperture, frame 2 — stripes should have shifted
await set('aperture', 100);
await shot('bp_c_wide');         // wide aperture
await set('reveal', 100);
await shot('bp_d_reveal');       // mask off, true diagonal grating

await browser.close();
