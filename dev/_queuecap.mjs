// _queuecap.mjs — screenshot the-queue toy windowless (canvas 2D, live sim).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 940, height: 1180 } });
page.on('console', m => console.log('  console:', m.text()));
page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

await page.goto(pathToFileURL(join(TOYS, 'the-queue.html')).href);
await page.waitForTimeout(400);

async function setRates(lam, mu) {
  await page.fill('#lam', String(lam)); await page.dispatchEvent('#lam', 'input');
  await page.fill('#mu', String(mu)); await page.dispatchEvent('#mu', 'input');
}

async function shoot(tag, settleMs) {
  await page.waitForTimeout(settleMs);
  const readout = (await page.textContent('#readout')).replace(/\s+/g, ' ').trim();
  console.log(tag + '  ::  ' + readout);
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  console.log('shot ' + tag);
}

// settled: default λ=0.80 μ=1.40 → ρ≈0.57 — let a short line breathe
await setRates(80, 140);
await shoot('q_0_settled', 4500);

// straining: λ=1.30 μ=1.40 → ρ≈0.93 — line piles near the cliff
await setRates(130, 140);
await shoot('q_1_straining', 7000);

// unstable: λ=2.50 μ=0.80 → ρ≈3.1 — the line runs away, overflow tally
await setRates(250, 80);
await shoot('q_2_unstable', 10000);

await browser.close();
