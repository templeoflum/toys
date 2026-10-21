// _bfcap.mjs — screenshot the best-fraction toy windowless (plain DOM).
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

await page.goto(pathToFileURL(join(TOYS, 'best-fraction.html')).href);
await page.waitForTimeout(300);
async function pick(k, tag) { await page.click(`button[data-k="${k}"]`); await page.waitForTimeout(70); await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true }); console.log('shot ' + tag); }

await pick('pi', 'bf_0_pi');
await pick('phi', 'bf_1_phi');
await pick('sqrt2', 'bf_2_sqrt2');
await pick('e', 'bf_3_e');

await browser.close();
