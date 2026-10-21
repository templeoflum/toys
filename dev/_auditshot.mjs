// _auditshot.mjs — the render-pass gate. screenshot toys windowless (canvas 2D) so lantern
// actually SEES each one (bleed / overlap / spurious controls / broken render) before it lands.
// usage: node _auditshot.mjs <toy-name> [<toy-name> ...]   (names without .html)
// out: toys/dev/shots/audit_<name>.png  +  console/pageerror log per toy (catches broken toys).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const names = process.argv.slice(2);
if (!names.length) { console.log('usage: node _auditshot.mjs <toy-name> ...'); process.exit(1); }

const browser = await chromium.launch();
for (const name of names) {
  const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('console.error: ' + m.text()); });
  try {
    await page.goto(pathToFileURL(join(TOYS, name + '.html')).href, { waitUntil: 'load' });
    await page.waitForTimeout(1400); // let rAF / canvas draw settle
    const out = join(SHOTS, 'audit_' + name + '.png');
    await page.screenshot({ path: out, fullPage: true });
    // count sliders + buttons for the atomicity signal (cross-check keeper's scan)
    const sliders = await page.locator('input[type=range]').count().catch(() => -1);
    const buttons = await page.locator('button').count().catch(() => -1);
    console.log(`${name}: shot ok | sliders=${sliders} buttons=${buttons}${errs.length ? ' | ' + errs.join(' ; ') : ''}`);
  } catch (e) {
    console.log(`${name}: FAILED TO RENDER — ${e.message}${errs.length ? ' | ' + errs.join(' ; ') : ''}`);
  }
  await page.close();
}
await browser.close();
