// _tdcap.mjs — screenshot time-deals (wide/narrow/after-year-step) + its signoff paper before serving.
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const BASE = 'http://localhost:8000/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential';
const browser = await chromium.launch();

// toy — roomy and cramped
for (const [w, h, sz] of [[640, 900, 'wide'], [360, 640, 'narrow']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(BASE + '/toys/time-deals.html');
  await page.waitForTimeout(600);
  await page.screenshot({ path: join(SHOTS, 'td_' + sz + '.png'), fullPage: true });
  console.log('shot td_' + sz);
  await page.close();
}

// toy — after a +1 year step (year-wheel clicks one cell, day-wheels land 105 over)
{
  const page = await browser.newPage({ viewport: { width: 640, height: 900 } });
  await page.goto(BASE + '/toys/time-deals.html');
  await page.waitForTimeout(400);
  await page.click('text=+1 year');
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(SHOTS, 'td_yearstep.png'), fullPage: true });
  console.log('shot td_yearstep');
  await page.close();
}

// signoff paper (served, so the heard-poll runs for real)
{
  const page = await browser.newPage({ viewport: { width: 700, height: 900 } });
  await page.goto(BASE + '/toys/signoff.time-deals.f0.20260711-090527.html');
  await page.waitForTimeout(900);
  await page.screenshot({ path: join(SHOTS, 'td_signoff.png'), fullPage: true });
  console.log('shot td_signoff');
  await page.close();
}

await browser.close();
