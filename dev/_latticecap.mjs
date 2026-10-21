// _latticecap.mjs — the-lattice: default + click two nodes to check meet/join.
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 540, height: 760 } });
await page.goto(pathToFileURL(join(TOYS, 'the-lattice.html')).href);
await page.waitForTimeout(300);
const shot = async (t) => { await page.screenshot({ path: join(SHOTS, t + '.png'), fullPage: true }); console.log('shot ' + t); };

await shot('lat_0_default');

// click node 4 (160,210) then node 6 (340,210) -> meet 2, join 12
const cv = page.locator('#cv');
const box = await cv.boundingBox();
const sx = box.width / 500, sy = box.height / 520;
const clickAt = async (cx, cy) => { await page.mouse.click(box.x + cx * sx, box.y + cy * sy); await page.waitForTimeout(120); };
await clickAt(160, 210);
await clickAt(340, 210);
await shot('lat_1_meet_join');

await browser.close();
