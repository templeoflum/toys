import { chromium } from 'playwright';
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:680,height:900}});
await p.goto('http://localhost:8000/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/signoff.pinna.f0.20260711-080004.html');
await p.waitForTimeout(2600);  // let the heard poll fire
await p.screenshot({ path:'shots/pinna_signoff.png', fullPage:true });
console.log('shot pinna_signoff'); await b.close();
