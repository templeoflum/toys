import { pathToFileURL } from 'url';
import { chromium } from 'playwright';
const F='C:/Users/User/Documents/0000000/My Classes/DJ Foundations/present/builder-mock.html';
const S='C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1220,height:770}});
p.on('pageerror',e=>console.log('PAGEERROR:',e.message));
p.on('console',m=>{if(m.type()==='error')console.log('cerr:',m.text());});
await p.goto(pathToFileURL(F).href,{waitUntil:'load'});await p.waitForTimeout(400);
const cards=await p.evaluate(()=>[...document.querySelectorAll('.tpl-card')].map(c=>c.textContent.trim().slice(0,26)));
console.log('layouts:',JSON.stringify(cards));
// pick 2-over-1 (index 3)
await p.evaluate(()=>document.querySelectorAll('.tpl-card')[3].click());
await p.waitForTimeout(300);
const blocks2o1=await p.evaluate(()=>document.querySelectorAll('.zone.block, [class*=block]').length);
await p.screenshot({path:S+'/dj_builder3_2over1.png',fullPage:false});
// on the first block, pick Image, then add 2 samples
const r=await p.evaluate(()=>{
  const clickIn=(scope,rx)=>{const el=[...scope.querySelectorAll('button,a,span')].find(e=>rx.test(e.textContent.trim())&&e.textContent.trim().length<16);if(el){el.click();return true;}return false;};
  const blocks=[...document.querySelectorAll('.zone')].filter(z=>z.querySelector('button'));
  let log=[];
  if(blocks[0]){log.push('imgtype='+clickIn(blocks[0],/^image$/i));}
  return {blocks:blocks.length,log};
});
console.log('pick image:',JSON.stringify(r));
await p.waitForTimeout(300);
// click sample twice to add 2 images
await p.evaluate(()=>{const bs=[...document.querySelectorAll('a,button,span')].filter(e=>/sample/i.test(e.textContent)&&e.textContent.length<12);if(bs[0]){bs[0].click();}});
await p.waitForTimeout(500);
await p.evaluate(()=>{const bs=[...document.querySelectorAll('a,button,span')].filter(e=>/sample/i.test(e.textContent)&&e.textContent.length<12);if(bs[0]){bs[0].click();}});
await p.waitForTimeout(600);
const imgInfo=await p.evaluate(()=>({imgsLoaded:[...document.querySelectorAll('img')].filter(i=>i.naturalWidth>0).length,grids:document.querySelectorAll('[class*=img-grid],[class*=grid]').length}));
console.log('after 2 samples:',JSON.stringify(imgInfo));
await p.screenshot({path:S+'/dj_builder3_multiimg.png',fullPage:false});
await b.close();
