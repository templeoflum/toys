// _sscap.mjs — vet shots: shepard-stair (static + playing) + its signoff + the comb paper.
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const T = 'http://localhost:8000/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential';
const C = 'http://localhost:8000/1.presence-minds-awareness/10.gaze-beholds-totality/102.chaos-untethers-finality';
const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });

// shepard-stair: static frame, then press play, let it run, shoot again
{
  const page = await browser.newPage({ viewport: { width: 640, height: 900 } });
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(T + '/toys/shepard-stair.html');
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(SHOTS, 'ss_static.png'), fullPage: true });
  await page.click('text=play');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: join(SHOTS, 'ss_playing.png'), fullPage: true });
  await page.click('text=follow one voice');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: join(SHOTS, 'ss_follow.png'), fullPage: true });
  const probe = await page.evaluate(() => {
    const cv = document.querySelector('canvas');
    return { canvas: !!cv, w: cv && cv.width, readout: document.querySelector('#readout').textContent.slice(0, 90) };
  });
  console.log('shepard: errors=' + errs.length + (errs.length ? ' :: ' + errs[0] : '') + ' · probe=', JSON.stringify(probe));
  await page.close();
}

// signoff + comb paper: full-page shots + blank-target/link probes
for (const [url, tag] of [
  [T + '/toys/signoff.shepard-stair.f0.20260711-095210.html', 'ss_signoff'],
  [C + '/paperwork.miroglyph-comb.f0.20260711-095210.html', 'comb_paper'],
]) {
  const page = await browser.newPage({ viewport: { width: 720, height: 1100 } });
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(url);
  await page.waitForTimeout(900);
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  const probe = await page.evaluate(() => ({
    blanks: document.querySelectorAll('a[target=_blank]').length,
    radios: [...document.querySelectorAll('.radios')].length,
    href: (document.querySelector('a.open') || {}).getAttribute ? document.querySelector('a.open').getAttribute('href') : 'none',
  }));
  console.log(tag + ': errors=' + errs.length + (errs.length ? ' :: ' + errs[0] : '') + ' · probe=', JSON.stringify(probe));
  await page.close();
}

await browser.close();
