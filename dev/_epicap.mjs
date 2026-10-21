// _epicap.mjs — screenshot the epicycles toy windowless (canvas 2D, no WebGPU).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'epicycles.html')).href);
await page.waitForTimeout(300);
await page.screenshot({ path: join(SHOTS, 'ep_0_square1.png'), fullPage: true });
console.log('shot ep_0_square1');

for (let i = 0; i < 5; i++) { await page.click('#more'); await page.waitForTimeout(60); }
await page.screenshot({ path: join(SHOTS, 'ep_1_square6.png'), fullPage: true });
console.log('shot ep_1_square6');

// sweep to a NONZERO-value point so the tip dot must sit on the drawn line
await page.fill('#sweep', '130');
await page.dispatchEvent('#sweep', 'input');
await page.waitForTimeout(80);
await page.screenshot({ path: join(SHOTS, 'ep_2_square6_at13.png'), fullPage: true });
console.log('shot ep_2_square6_at13');

await page.fill('#sweep', '300');
await page.dispatchEvent('#sweep', 'input');
await page.waitForTimeout(80);
await page.screenshot({ path: join(SHOTS, 'ep_2b_square6_at30.png'), fullPage: true });
console.log('shot ep_2b_square6_at30');

await page.fill('#sweep', '1000');
await page.dispatchEvent('#sweep', 'input');
await page.click('#t-saw');
await page.waitForTimeout(80);
await page.screenshot({ path: join(SHOTS, 'ep_3_saw6.png'), fullPage: true });
console.log('shot ep_3_saw6');

await page.click('#t-tri');
await page.waitForTimeout(80);
await page.screenshot({ path: join(SHOTS, 'ep_4_tri6.png'), fullPage: true });
console.log('shot ep_4_tri6');

await browser.close();
