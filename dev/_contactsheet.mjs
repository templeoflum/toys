import { writeFileSync } from 'fs';
import { pathToFileURL } from 'url';
import { chromium } from 'playwright';
const SLIDES='file:///C:/Users/User/Documents/0000000/My%20Classes/DJ%20Foundations/source%20material/images/slides';
const S='C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
let cells='';
for(let i=1;i<=20;i++){const nn=(i<10?'0':'')+i;cells+=`<div class="c"><div class="n">${i}</div><img src="${SLIDES}/slide-${nn}.png"></div>`;}
const html=`<!doctype html><html><head><meta charset=utf-8><style>
body{margin:0;background:#111;font-family:monospace}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:8px}
.c{position:relative;border:1px solid #333;background:#000}
.c img{width:100%;display:block}
.n{position:absolute;top:4px;left:4px;background:#00FFFF;color:#000;font-weight:700;font-size:22px;padding:2px 9px;border-radius:4px;z-index:2}
</style></head><body><div class="grid">${cells}</div></body></html>`;
const F=S+'/_contactsheet.html';
writeFileSync(F,html);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:2000}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto(pathToFileURL(F).href,{waitUntil:'load'});
await p.waitForTimeout(1500);
const loaded=await p.evaluate(()=>[...document.querySelectorAll('img')].filter(i=>i.naturalWidth>0).length);
console.log('slides loaded:',loaded,'/20');
await p.screenshot({path:S+'/dj_contactsheet.png',fullPage:true});
console.log('contact sheet shot ok');await b.close();
