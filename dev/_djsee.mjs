import { pathToFileURL } from 'url';
import { join } from 'path';
import { chromium } from 'playwright';
const HERE = 'C:/Users/User/Documents/0000000/My Classes/DJ Foundations/present';
const SHOTS = join('C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots');
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const control = await ctx.newPage();
await control.goto(pathToFileURL(join(HERE, 'control.html')).href, { waitUntil: 'load' });
await control.waitForTimeout(300);
const [display] = await Promise.all([
  ctx.waitForEvent('page'),
  control.evaluate(() => window.open('display.html', 'dj-display')),
]);
await display.setViewportSize({ width: 1280, height: 720 });
await display.waitForLoadState('load');
await display.waitForTimeout(400);

// drive to slide 3 via control keyboard
await control.bringToFront();
await control.keyboard.press('ArrowRight');
await control.keyboard.press('ArrowRight');
await control.waitForTimeout(500);
await display.waitForTimeout(300);
await display.screenshot({ path: join(SHOTS, 'dj_display_slide3.png') });

// test jump grid: click grid button for slide 12 on control
await control.evaluate(() => document.querySelectorAll('.grid button')[11].click());
await control.waitForTimeout(500);
const dSrc = await display.evaluate(() => document.querySelector('img').getAttribute('src'));
console.log('after grid-jump to 12 -> display img =', dSrc);
await display.screenshot({ path: join(SHOTS, 'dj_display_slide12.png') });

// test display's OWN keyboard backup drives control back
await display.bringToFront();
await display.keyboard.press('ArrowLeft');
await control.waitForTimeout(400);
const cCur = await control.evaluate(() => current);
console.log('after display ArrowLeft -> control.current =', cCur, '(expect 10)');
await control.screenshot({ path: join(SHOTS, 'dj_control_synced.png'), fullPage: true });
await browser.close();
