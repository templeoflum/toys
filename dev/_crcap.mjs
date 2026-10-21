// _crcap.mjs — screenshot the cross-ratio toy windowless (canvas 2D).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 720 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'cross-ratio.html')).href);
await page.waitForTimeout(300);

async function shot(tag) {
  await page.waitForTimeout(70);
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  console.log('shot ' + tag);
}
async function setK(v) { await page.fill('#k', String(v)); await page.dispatchEvent('#k', 'input'); }

await shot('cr_0_flat');                    // k=0, identity baseline
await setK(400); await shot('cr_1_persp');  // strong perspective, cross-ratio holds
await setK(250); await shot('cr_2_persp_mid');
await page.click('#m-bend'); await setK(400); await shot('cr_3_bend'); // a bend breaks it

await browser.close();
