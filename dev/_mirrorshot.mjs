// _mirrorshot.mjs — interaction render-check for the-mirror: click a rotation, verify the
// figure STAYS transformed (marked corner moved, on the ghost) instead of snapping back.
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const SHOTS = join(HERE, 'shots');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1000 } });
page.on('pageerror', e => console.log('PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(HERE, '..', 'the-mirror.html')).href, { waitUntil: 'load' });
await page.waitForTimeout(600);
await page.screenshot({ path: join(SHOTS, 'audit_the-mirror_pre.png'), fullPage: true });

// list the move buttons so we know what we clicked
const labels = await page.locator('#moverow button').allInnerTexts().catch(() => []);
console.log('move buttons:', JSON.stringify(labels));

// click a rotation (a button whose label carries "90"); fall back to first move button
let btn = page.locator('#moverow button', { hasText: '90' }).first();
if (!(await btn.count())) btn = page.locator('#moverow button').first();
const clicked = await btn.innerText().catch(() => '?');
await btn.click();
await page.waitForTimeout(1400); // let the move animate + settle
await page.screenshot({ path: join(SHOTS, 'audit_the-mirror_post.png'), fullPage: true });
console.log('clicked:', clicked, '-> shot audit_the-mirror_post.png');

await browser.close();
