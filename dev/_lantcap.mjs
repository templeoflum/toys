// _lantcap.mjs — screenshot troxler + pinna to SEE the format (operator: look before you fix).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
for (const [file, tag] of [['troxler.html','trox'], ['pinna-brelstaff.html','pinna']]) {
  // a roomy view AND a cramped iframe-like view to catch overlap/crowding
  for (const [w,h,sz] of [[640,760,'wide'],[360,560,'narrow']]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(pathToFileURL(join(TOYS, file)).href);
    await page.waitForTimeout(600);
    await page.screenshot({ path: join(SHOTS, tag + '_' + sz + '.png'), fullPage: true });
    console.log('shot ' + tag + '_' + sz);
    await page.close();
  }
}
await browser.close();
