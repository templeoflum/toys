// _batch3cap.mjs — screenshot the static-geometric batch (poggendorff, delboeuf, ehrenstein, kanizsa) windowless.
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

const VP = { width: 900, height: 820 };

await run('poggendorff.html', VP, [
  ['pog_0_illusion', []],
  ['pog_1_flat', [['bar', 0]]],
  ['pog_2_guide', [['bar', 100], ['guide', 100]]],
]);

await run('delboeuf.html', { width: 1000, height: 760 }, [
  ['del_0_illusion', []],
  ['del_1_flat', [['rings', 0]]],
  ['del_2_match', [['rings', 100], ['match', 100]]],
]);

await run('ehrenstein.html', VP, [
  ['ehr_0_illusion', []],
  ['ehr_1_flat', [['spokes', 0]]],
  ['ehr_2_probe', [['spokes', 100], ['probe', 100]]],
]);

await run('kanizsa.html', VP, [
  ['kan_0_illusion', []],
  ['kan_1_turn', [['turn', 100]]],
  ['kan_2_edge', [['turn', 0], ['edge', 100]]],
]);

await browser.close();
