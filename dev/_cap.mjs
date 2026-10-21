// _cap.mjs — screenshot the toys windowless (plain DOM, no WebGPU).
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

async function open(name) {
  await page.goto(pathToFileURL(join(TOYS, name)).href);
  await page.waitForTimeout(400);
}
async function shot(tag) {
  await page.screenshot({ path: join(SHOTS, tag + '.png'), fullPage: true });
  console.log('shot ' + tag);
}

await open('divided-line.html');
await shot('line_0_open');
await page.locator('.strip').nth(0).locator('.cell').nth(1).click();
await page.waitForTimeout(150);
await page.locator('.strip').nth(1).locator('.cell').nth(1).click();
await page.waitForTimeout(150);
await page.locator('.strip').nth(2).locator('.cell').nth(2).click();
await page.waitForTimeout(150);
await shot('line_1_at-112');
await page.click('#mirror');
await page.waitForTimeout(150);
await shot('line_2_mirrored');

await open('grammar-crank.html');
await shot('crank_0_open');
await page.click('#why-btn');
await page.waitForTimeout(150);
await shot('crank_1_why');

await open('cast-and-spread.html');
await shot('cast_0_coins');
await page.click('button.sys[data-s="tarot"]');
await page.waitForTimeout(300);
await shot('cast_1_cards');
await page.click('button.sys[data-s="runes"]');
await page.waitForTimeout(300);
await shot('cast_2_lots');

await open('mock-river.html');
await shot('river_0_open');
await page.locator('#river .row').last().click();
await page.waitForTimeout(150);
await shot('river_1_expanded');
await page.click('#raise');
await page.waitForTimeout(150);
await shot('river_2_paper');

await browser.close();
