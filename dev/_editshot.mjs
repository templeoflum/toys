import { pathToFileURL } from 'url';
import { chromium } from 'playwright';
const F='C:/Users/User/Documents/0000000/My Classes/DJ Foundations/present/edit-slide-mock.html';
const SHOTS='C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:820}});
p.on('pageerror',e=>console.log('PAGEERROR:',e.message));
p.on('console',m=>{if(m.type()==='error')console.log('console.error:',m.text());});
await p.goto(pathToFileURL(F).href,{waitUntil:'load'});await p.waitForTimeout(800);
const info=await p.evaluate(()=>{
  const img=document.querySelector('img');
  const vid=document.querySelector('video');
  const editables=[...document.querySelectorAll('[contenteditable="true"]')].map(e=>e.id||e.tagName);
  const vsrc = vid ? (vid.currentSrc || (vid.querySelector('source')&&vid.querySelector('source').getAttribute('src')) || vid.getAttribute('src')) : null;
  return {
    imgSrc: img?img.getAttribute('src'):null, imgNW: img?img.naturalWidth:null,
    videoPresent: !!vid, videoSrc: vsrc, videoReadyState: vid?vid.readyState:null,
    editables,
    buttons: [...document.querySelectorAll('button')].map(b=>b.textContent.trim()).slice(0,6)
  };
});
console.log(JSON.stringify(info,null,1));
// try editing the title to confirm contenteditable works
await p.click('#title');
await p.keyboard.press('End');
await p.keyboard.type(' [edited]');
const titleNow=await p.evaluate(()=>document.getElementById('title').textContent);
console.log('title after edit:',titleNow);
await p.screenshot({path:SHOTS+'/dj_editmock.png',fullPage:true});
console.log('shot ok');await b.close();
