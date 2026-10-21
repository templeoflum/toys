// _batch8cap.mjs — screenshot shepard-tables + judd windowless.
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

await run('shepard-tables.html', { width: 920, height: 720 }, [
  ['sh_0_illusion', []],
  ['sh_1_turned', [['turn', 100]]],
  ['sh_2_stacked', [['turn', 100], ['over', 100]]],
]);

await run('judd.html', { width: 900, height: 560 }, [
  ['jd_0_illusion', []],
  ['jd_1_flat', [['fins', 0]]],
  ['jd_2_rule', [['fins', 100], ['rule', 100]]],
]);

await browser.close();
