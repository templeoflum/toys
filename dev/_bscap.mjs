// _bscap.mjs — screenshot the base-shift toy windowless (plain DOM).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 820, height: 720 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'base-shift.html')).href);
await page.waitForTimeout(300);
async function shot(tag) { await page.waitForTimeout(60); await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true }); console.log('shot ' + tag); }
async function setN(v) { await page.fill('#n', String(v)); await page.dispatchEvent('#n', 'input'); }

await shot('bs_0_bal3_142');                                   // default: balanced-3 place value of 142
await page.locator('.base').nth(1).click(); await shot('bs_1_base3_142');  // base three place value
await setN(728); await shot('bs_2_max');                       // 728 = all-max digits
await setN(0); await shot('bs_3_zero');                        // edge

await browser.close();
