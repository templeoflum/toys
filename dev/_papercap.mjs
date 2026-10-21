import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 680, height: 900 } });
await page.goto('http://localhost:8000/1.presence-minds-awareness/10.gaze-beholds-totality/102.chaos-untethers-finality/paperwork.frame-viz.f0.20260711-071720.html');
await page.waitForTimeout(900);
await page.screenshot({ path: 'shots/frameviz_paper.png', fullPage: true });
console.log('shot frameviz_paper');
await browser.close();
