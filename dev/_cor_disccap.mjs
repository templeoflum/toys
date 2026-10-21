// _cor_disccap.mjs — corridor (states) + disc-size (frames to prove the rings expand).
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOYS = join(HERE, '..');
const SHOTS = join(HERE, 'shots');
await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch();
async function open(file, vp) { const p = await browser.newPage({ viewport: vp }); await p.goto(pathToFileURL(join(TOYS, file)).href); await p.waitForTimeout(300); return p; }
const setter = (p) => async (id, v) => { await p.locator('#' + id).evaluate((el, val) => { el.value = val; el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
const shooter = (p) => async (t) => { await p.screenshot({ path: join(SHOTS, t + '.png'), fullPage: true }); console.log('shot ' + t); };

let p = await open('corridor.html', { width: 900, height: 760 });
let set = setter(p), shot = shooter(p);
await shot('cor_0_illusion');
await set('match', 100);
await shot('cor_1_match');
await set('match', 0); await set('corridor', 0);
await shot('cor_2_flat');
await p.close();

p = await open('disc-size.html', { width: 520, height: 760 });
set = setter(p); shot = shooter(p);
await shot('disc_a');
await p.waitForTimeout(500);
await shot('disc_b');            // rings should have expanded
await set('ruler', 100);
await shot('disc_c_ruler');
await set('surround', 0);
await shot('disc_d_off');
await p.close();

await browser.close();
