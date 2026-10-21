// _am_chubbcap.mjs — apparent-motion (frames) + chubb (states).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();

async function open(file, vp) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(pathToFileURL(join(TOYS, file)).href);
  await page.waitForTimeout(300);
  return page;
}
const setter = (page) => async (id, v) => {
  await page.locator('#' + id).evaluate((el, val) => { el.value = val; el.dispatchEvent(new Event('input', { bubbles: true })); }, v);
  await page.waitForTimeout(80);
};
const shooter = (page) => async (tag) => { await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true }); console.log('shot ' + tag); };

// apparent-motion: slow the rate so the alternation is catchable frame to frame
let p = await open('apparent-motion.html', { width: 620, height: 560 });
let set = setter(p), shot = shooter(p);
await set('rate', 10);          // slow: one dot lit at a time, catchable
await shot('am_a');
await p.waitForTimeout(700);
await shot('am_b');             // the OTHER dot should be lit now
await set('both', 100);
await shot('am_c_both');
await p.close();

// chubb
p = await open('chubb.html', { width: 820, height: 640 });
set = setter(p); shot = shooter(p);
await shot('ch_0_illusion');
await set('surround', 0);
await shot('ch_1_flat');
await set('surround', 100);
await set('bridge', 100);
await shot('ch_2_bridge');
await p.close();

await browser.close();
