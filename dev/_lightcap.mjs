// _lightcap.mjs — screenshot the lightness batch (simultaneous-contrast, cornsweet) windowless.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();

async function run(file, viewport, steps) {
  const page = await browser.newPage({ viewport });
  await page.goto(pathToFileURL(join(TOYS, file)).href);
  await page.waitForTimeout(350);
  const set = async (id, v) => {
    await page.locator('#' + id).evaluate((el, val) => {
      el.value = val; el.dispatchEvent(new Event('input', { bubbles: true }));
    }, v);
    await page.waitForTimeout(100);
  };
  for (const [tag, knobs] of steps) {
    for (const [id, v] of knobs) await set(id, v);
    await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
    console.log('shot ' + tag);
  }
  await page.close();
}

const VP = { width: 1000, height: 700 };

await run('simultaneous-contrast.html', VP, [
  ['sc_0_illusion', []],
  ['sc_1_flat', [['surround', 0]]],
  ['sc_2_bridge', [['surround', 100], ['bridge', 100]]],
]);

await run('cornsweet.html', VP, [
  ['cw2_0_illusion', []],
  ['cw2_1_flat', [['edge', 0]]],
  ['cw2_2_mask', [['edge', 100], ['mask', 100]]],
]);

await browser.close();
