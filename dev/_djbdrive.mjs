import { pathToFileURL } from 'url';
import { chromium } from 'playwright';
const F='C:/Users/User/Documents/0000000/My Classes/DJ Foundations/present/dj-builder.html';
const S='C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1220,height:800}});
let errs=[];p.on('pageerror',e=>errs.push(e.message));
// auto-accept confirm() dialogs (layout replace guard)
p.on('dialog',d=>d.accept());
await p.goto(pathToFileURL(F).href,{waitUntil:'load'});await p.waitForTimeout(400);
// apply 2-over-1 layout: open Layout menu, click the option
await p.evaluate(()=>{const btns=[...document.querySelectorAll('button')];const lay=btns.find(b=>/Layout/i.test(b.textContent));if(lay)lay.click();});
await p.waitForTimeout(200);
await p.evaluate(()=>{const btns=[...document.querySelectorAll('button,[role=menuitem],a,div')];const opt=btns.find(b=>/2-over-1/i.test(b.textContent)&&b.textContent.length<20);if(opt)opt.click();});
await p.waitForTimeout(400);
const afterLayout=await p.evaluate(()=>({items:document.querySelectorAll('[class*=item]').length,pickers:document.querySelectorAll('[class*=typepick],[class*=picker]').length}));
console.log('after 2-over-1:',JSON.stringify(afterLayout));
// type first block as image + sample
await p.evaluate(()=>{const im=[...document.querySelectorAll('button')].find(b=>/^image$/i.test(b.textContent.trim()));if(im)im.click();});
await p.waitForTimeout(200);
await p.evaluate(()=>{const s=[...document.querySelectorAll('a,button,span')].find(e=>/sample/i.test(e.textContent)&&e.textContent.length<12);if(s)s.click();});
await p.waitForTimeout(500);
// select an item + move it
const it=await p.evaluate(()=>{const el=document.querySelector('[class*=item]');if(!el)return null;const r=el.getBoundingClientRect();return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2),g:el._g||el.dataset.g||null};});
console.log('first item:',JSON.stringify(it));
if(it){await p.mouse.move(it.x,it.y);await p.mouse.down();await p.mouse.move(it.x+80,it.y+50,{steps:6});await p.mouse.up();await p.waitForTimeout(200);}
const moved=await p.evaluate(()=>{const el=document.querySelector('[class*=item]');const r=el.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y)};});
console.log('after move:',JSON.stringify(moved),'errs:',JSON.stringify(errs.slice(0,3)));
await p.screenshot({path:S+'/dj_builder_driven.png',fullPage:false});
console.log('shot ok');await b.close();
