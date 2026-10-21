// _sscap2.mjs — screenshot the story-shapes toy windowless (canvas 2D).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 720 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'story-shapes.html')).href);
await page.waitForTimeout(300);

async function shape(s, tag) {
  await page.click(`button[data-s="${s}"]`);
  await page.waitForTimeout(70);
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  console.log('shot ' + tag);
}
await shape('hole', 'ss2_0_hole');
await shape('rags', 'ss2_1_rags');
await shape('icarus', 'ss2_2_icarus');
await shape('boy', 'ss2_3_boy');
await shape('tragedy', 'ss2_4_tragedy');

// custom: from 'hole' shape, drag point 3 (the low, at ~437,345 CSS) up to ~180
await page.click('button[data-s="hole"]'); await page.waitForTimeout(60);
const cvEl = page.locator('#cv');
await cvEl.dragTo(cvEl, { sourcePosition: { x: 437, y: 345 }, targetPosition: { x: 437, y: 175 } });
await page.waitForTimeout(70);
await page.screenshot({ path: join(SHOTS, 'ss2_5_custom.png'), fullPage: true });
console.log('shot ss2_5_custom');

await browser.close();
