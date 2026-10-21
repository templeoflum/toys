// _cscap.mjs — screenshot checker-shadow windowless (canvas 2D renders headless).
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

await page.goto(pathToFileURL(join(TOYS, 'checker-shadow.html')).href);
await page.waitForTimeout(400);
await page.screenshot({ path: join(SHOTS, 'cs_0_illusion.png'), fullPage: true });
console.log('shot cs_0_illusion');

// read A and B pixels NOW (proof=0), at a point inside the square but off the
// label glyph and above the bridge band — the honest equality check.
const px = await page.evaluate(() => {
  const ctx = document.getElementById('cv').getContext('2d');
  const read = (c, r) => {
    const x = Math.round(80 + (c + 0.5) * 125);
    const y = Math.round(150 + r * 125 + 0.14 * 125);   // near square top
    const d = ctx.getImageData(x, y, 1, 1).data;
    return [d[0], d[1], d[2]];
  };
  return { A: read(1, 2), B: read(6, 2) };
});
console.log('A pixel', px.A, ' B pixel', px.B);

// drag proof to 100
await page.locator('#proof').evaluate((el) => {
  el.value = 100;
  el.dispatchEvent(new Event('input', { bubbles: true }));
});
await page.waitForTimeout(200);
await page.screenshot({ path: join(SHOTS, 'cs_1_bridge.png'), fullPage: true });
console.log('shot cs_1_bridge');

await browser.close();
