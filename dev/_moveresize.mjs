import { pathToFileURL } from 'url';
import { chromium } from 'playwright';
const F='C:/Users/User/Documents/0000000/My Classes/DJ Foundations/present/move-resize-mock.html';
const S='C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:760}});
p.on('pageerror',e=>console.log('PAGEERROR:',e.message));
p.on('console',m=>{if(m.type()==='error')console.log('cerr:',m.text());});
await p.goto(pathToFileURL(F).href,{waitUntil:'load'});await p.waitForTimeout(500);
await p.screenshot({path:S+'/dj_mr_before.png'});
// find the image item element + its geometry
const items=await p.evaluate(()=>[...document.querySelectorAll('.item')].map((el,i)=>{const r=el.getBoundingClientRect();return {i,cls:el.className,x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),g:el._g};}));
console.log('items:',JSON.stringify(items));
if(!items.length){console.log('NO ITEMS');await b.close();process.exit(0);}
const img=items[0];
// MOVE: click center to select, then drag body +140,+90
const cx=img.x+img.w/2, cy=img.y+img.h/2;
await p.mouse.move(cx,cy); await p.mouse.down(); await p.mouse.move(cx+40,cy+30,{steps:5}); await p.mouse.move(cx+140,cy+90,{steps:8}); await p.mouse.up();
await p.waitForTimeout(200);
const afterMove=await p.evaluate(()=>{const el=document.querySelector('.item');const r=el.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),g:el._g};});
console.log('after MOVE:',JSON.stringify(afterMove));
// RESIZE: item should be selected; find its SE handle
const handle=await p.evaluate(()=>{const el=document.querySelector('.item.selected')||document.querySelector('.item');const h=el.querySelector('.handle.se, .handle[data-c=se], .se');if(!h)return null;const r=h.getBoundingClientRect();return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};});
console.log('SE handle:',JSON.stringify(handle));
if(handle){await p.mouse.move(handle.x,handle.y);await p.mouse.down();await p.mouse.move(handle.x+50,handle.y+40,{steps:6});await p.mouse.move(handle.x+90,handle.y+70,{steps:6});await p.mouse.up();await p.waitForTimeout(200);}
const afterResize=await p.evaluate(()=>{const el=document.querySelector('.item');const r=el.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height),g:el._g};});
console.log('after RESIZE:',JSON.stringify(afterResize));
await p.screenshot({path:S+'/dj_mr_after.png'});
await b.close();
