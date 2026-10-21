// _forkcap.mjs — screenshot the-fork toy windowless (canvas 2D).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 940, height: 1120 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'the-fork.html')).href);
await page.waitForTimeout(400);

async function set(r, tag) {
  await page.fill('#r', String(r)); await page.dispatchEvent('#r', 'input');
  await page.waitForTimeout(80);
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  console.log('shot ' + tag);
}

await set(2800, 'fk_0_steady');   // one fixed point
await set(3200, 'fk_1_two');      // 2-cycle
await set(3500, 'fk_2_four');     // 4-cycle
await set(3900, 'fk_3_chaos');    // chaos

await browser.close();
