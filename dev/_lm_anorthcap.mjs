// _lm_anorthcap.mjs — line-motion (cue/line frames) + anorthoscope (slit states + scroll frames).
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
const setter = (p) => async (id, v) => { await p.locator('#' + id).evaluate((el, val) => { el.value = val; el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(60); };
const shooter = (p) => async (t) => { await p.screenshot({ path: join(SHOTS, t + '.png'), fullPage: true }); console.log('shot ' + t); };

// line-motion: sample several frames across the cue/line cycle
let p = await open('line-motion.html', { width: 700, height: 520 });
let set = setter(p), shot = shooter(p);
for (let i = 0; i < 5; i++) { await shot('lm_' + i); await p.waitForTimeout(220); }
await set('cue', 0);
await p.waitForTimeout(250);
await shot('lm_nocue');
await p.close();

// anorthoscope: narrow slit at two scroll times + wide + ghost
p = await open('anorthoscope.html', { width: 640, height: 600 });
set = setter(p); shot = shooter(p);
await shot('an_a');
await p.waitForTimeout(500);
await shot('an_b');            // different sliver
await set('ghost', 100);
await shot('an_c_ghost');
await set('slit', 300);
await shot('an_d_wide');
await p.close();

await browser.close();
