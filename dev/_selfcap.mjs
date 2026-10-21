// _selfcap.mjs — screenshot the self-similar toy windowless (canvas 2D).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 820, height: 1100 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'self-similar.html')).href);
await page.waitForTimeout(300);

async function state(depth, zoom, tag) {
  await page.fill('#depth', String(depth)); await page.dispatchEvent('#depth', 'input');
  await page.fill('#zoom', String(zoom)); await page.dispatchEvent('#zoom', 'input');
  await page.waitForTimeout(80);
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  console.log('shot ' + tag);
}

await state(5, 0, 'ss_0_whole');       // the whole, detail 5
await state(2, 0, 'ss_1_construction');// low detail — see the 3-copies rule
await state(5, 200, 'ss_2_descend2');  // descended 2 levels (×4) — same triangle
await state(5, 400, 'ss_3_descend4');  // descended 4 levels (×16) — still same

await browser.close();
