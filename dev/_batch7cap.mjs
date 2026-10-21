// _batch7cap.mjs — screenshot chevreul + jastrow windowless.
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

await run('chevreul.html', { width: 1000, height: 560 }, [
  ['cv_0_illusion', []],
  ['cv_1_flat', [['contrast', 0]]],
  ['cv_2_gap', [['contrast', 100], ['gap', 100]]],
]);

await run('jastrow.html', { width: 900, height: 780 }, [
  ['ja_0_illusion', []],
  ['ja_1_apart', [['stack', 0]]],
  ['ja_2_trace', [['stack', 100], ['trace', 100]]],
]);

await browser.close();
