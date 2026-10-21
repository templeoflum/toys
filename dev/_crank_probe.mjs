// _crank_probe.mjs — crank 500 chains, assert the grammar's constraints hold.
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(join(HERE, '..', 'grammar-crank.html')).href);

const bad = await page.evaluate(() => {
  const fails = [];
  for (let t = 0; t < 500; t++) {
    const ks = crank().map(m => m.k);
    const has = k => ks.includes(k);
    if (has('INTERDICTION') !== has('VIOLATION')) fails.push(t + ' interdiction pair');
    if (has('STRUGGLE') !== has('VICTORY')) fails.push(t + ' struggle pair');
    if (has('PURSUIT') !== has('RESCUE')) fails.push(t + ' pursuit pair');
    if (!(has('TEST') === has('REACTION') && has('TEST') === has('ACQUISITION'))) fails.push(t + ' donor triad');
    if (!has('LACK') || !has('LIQUIDATION') || !has('DEPARTURE')) fails.push(t + ' spine');
    const order = ks.map(k => MOVES.findIndex(m => m.k === k));
    if (order.some((v, i) => i && v < order[i - 1])) fails.push(t + ' ordering');
  }
  return fails;
});
console.log(bad.length ? 'FAIL\n' + bad.slice(0, 10).join('\n') : 'ok - 500 chains, all constraints hold');
await browser.close();
