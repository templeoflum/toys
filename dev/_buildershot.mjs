import { pathToFileURL } from 'url';
import { chromium } from 'playwright';
const F='C:/Users/User/Documents/0000000/My Classes/DJ Foundations/present/builder-mock.html';
const S='C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1220,height:770}});
p.on('pageerror',e=>console.log('PAGEERROR:',e.message));
p.on('console',m=>{if(m.type()==='error')console.log('cerr:',m.text());});
await p.goto(pathToFileURL(F).href,{waitUntil:'load'});
await p.waitForTimeout(500);
await p.screenshot({path:S+'/dj_builder_1.png',fullPage:false});
// dump structure: template cards (left rail) and their text
const struct=await p.evaluate(()=>{
  const rail=document.querySelector('aside')||document.querySelector('[class*=rail]')||document.body;
  const cards=[...rail.querySelectorAll('*')].filter(e=>e.onclick||e.getAttribute('data-tpl')!=null||/tpl|card|temp/i.test(e.className));
  return {
    railTag: rail.tagName,
    cardSample: cards.slice(0,6).map(c=>({cls:c.className, txt:c.textContent.trim().slice(0,24)})),
    editables: document.querySelectorAll('[contenteditable]').length,
    zones: document.querySelectorAll('[class*=zone]').length,
    dataTpls: document.querySelectorAll('[data-tpl]').length
  };
});
console.log(JSON.stringify(struct,null,1));
await b.close();
