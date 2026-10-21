// _batch4cap.mjs — screenshot the length/orientation batch (fick, bourdon, baldwin) windowless.
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

await run('fick.html', VP, [
  ['fk_0_illusion', []],
  ['fk_1_flat', [['stand', 0]]],
  ['fk_2_arc', [['stand', 100], ['arc', 100]]],
]);

await run('bourdon.html', { width: 820, height: 860 }, [
  ['bd_0_illusion', []],
  ['bd_1_flat', [['wedge', 0]]],
  ['bd_2_rule', [['wedge', 100], ['rule', 100]]],
]);

await run('baldwin.html', { width: 1000, height: 720 }, [
  ['bw_0_illusion', []],
  ['bw_1_flat', [['squares', 0]]],
  ['bw_2_match', [['squares', 100], ['match', 100]]],
]);

await browser.close();
