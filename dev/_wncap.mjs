// _wncap.mjs — screenshot the winding-number toy windowless (canvas 2D).
// peg is placed by clicking the left pane, so we drive it with locator clicks.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 640 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'winding-number.html')).href);
await page.waitForTimeout(300);
const cvEl = page.locator('#cv');

async function clickAt(x, y) { await cvEl.click({ position: { x, y } }); await page.waitForTimeout(60); }
async function shot(tag) { await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true }); console.log('shot ' + tag); }

// element renders 860 CSS wide; scale = 860/1640 = 0.5244. loop centre ≈ (258,210) CSS.
await clickAt(258, 210); await shot('wn_0_round1');          // peg at centre → winding 1
await clickAt(452, 210); await shot('wn_1_outside0');        // peg outside loop → 0
await clickAt(258, 210);
await page.fill('#wob', '100'); await page.dispatchEvent('#wob', 'input'); await page.waitForTimeout(60);
await shot('wn_2_deform1');                                   // deformed, still 1
await page.fill('#wob', '0'); await page.dispatchEvent('#wob', 'input');
await page.click('#s-star'); await clickAt(258, 210); await shot('wn_3_star1'); // star, still 1
await page.click('#s-double'); await clickAt(300, 210); await shot('wn_4_double_a');
await clickAt(330, 210); await shot('wn_4_double_b');
await clickAt(360, 210); await shot('wn_4_double_c');

await browser.close();
