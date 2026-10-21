// _surpcap.mjs — screenshot the surprise toy windowless (plain DOM, no WebGPU).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 820 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'surprise.html')).href);
await page.waitForTimeout(300);
await page.screenshot({ path: join(SHOTS, 'sp_0_rep_context.png'), fullPage: true });
console.log('shot sp_0_rep_context');

await page.click('#m-uniform');
await page.waitForTimeout(80);
await page.screenshot({ path: join(SHOTS, 'sp_1_rep_uniform.png'), fullPage: true });
console.log('shot sp_1_rep_uniform');

await page.click('#m-0');
await page.waitForTimeout(80);
await page.screenshot({ path: join(SHOTS, 'sp_2_rep_freq.png'), fullPage: true });
console.log('shot sp_2_rep_freq');

await page.click('#m-1');
await page.click('#s-eng');
await page.waitForTimeout(80);
await page.screenshot({ path: join(SHOTS, 'sp_3_eng_context.png'), fullPage: true });
console.log('shot sp_3_eng_context');

await page.click('#s-noise');
await page.waitForTimeout(80);
await page.screenshot({ path: join(SHOTS, 'sp_4_noise_context.png'), fullPage: true });
console.log('shot sp_4_noise_context');

await browser.close();
