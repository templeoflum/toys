import { pathToFileURL } from 'url';
import { chromium } from 'playwright';
const F='C:/Users/User/Documents/0000000/My Classes/DJ Foundations/present/dj-builder.html';
const S='C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1220,height:800}});
let errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('cerr:'+m.text());});
await p.goto(pathToFileURL(F).href,{waitUntil:'load'});await p.waitForTimeout(600);
const info=await p.evaluate(()=>({
  canvas:!!document.querySelector('[class*=canvas],#canvas,.slide'),
  deckRail:!!document.querySelector('[class*=deck],#deckRail'),
  buttons:[...document.querySelectorAll('button')].map(b=>b.textContent.trim()).slice(0,10),
  title:!!document.querySelector('[contenteditable]')
}));
console.log('pageerrors:',JSON.stringify(errs.slice(0,5)));
console.log('elements:',JSON.stringify(info));
// apply a layout (open the layout dropdown, click 2-over-1) - best effort
await p.evaluate(()=>{const d=document.querySelector('#layoutDrop,[class*=layout]');if(d&&d.tagName==='SELECT'){d.value=d.options[3]?.value;d.dispatchEvent(new Event('change'));}else if(d){d.click();}});
await p.waitForTimeout(400);
await p.screenshot({path:S+'/dj_builder_full.png',fullPage:false});
console.log('shot ok');await b.close();
