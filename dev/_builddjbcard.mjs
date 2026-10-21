import { readFileSync, writeFileSync } from 'fs';
const SHOTS = 'C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const OUT = 'C:/Users/User/Documents/0000000/mind not map/2.structure-maintains-order/21.labor-installs-practice/211.motion-builds-form/dj-builder-ready.f0.20260714-103404.html';
const shot = 'data:image/png;base64,' + readFileSync(SHOTS + '/dj_builder_full.png').toString('base64');
const OPENPATH = '../My Classes/DJ Foundations/present/dj-builder.html';  // relative to lattice ROOT, clerk's /open spec
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>DJ Slide Builder — assembled</title>
<style>
  :root{--ground:#141b1a;--ground-2:#192322;--hairline:#2c3a38;--ink:#d9dfdc;--ink-dim:#8fa09b;--ink-faint:#5c6d68;
    --live:#6faf7c;--teach:#e8a13a;--aud:#4fa8b8;--stake:#d76a5b;--mono:"JetBrains Mono",Consolas,monospace;--serif:"Newsreader",Georgia,serif;}
  *{box-sizing:border-box} body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--mono);font-size:13px;line-height:1.55;padding:22px 18px 60px;}
  .sheet{max-width:760px;margin:0 auto;}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;border-bottom:1px solid var(--hairline);padding-bottom:12px;}
  .top h1{font:600 21px/1.1 var(--serif);margin:0;} .top .sub{color:var(--ink-dim);font-size:11.5px;margin-top:4px;}
  .flag{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--teach);border:1px solid color-mix(in srgb,var(--teach) 45%,transparent);border-radius:5px;padding:5px 9px;white-space:nowrap;background:color-mix(in srgb,var(--teach) 8%,transparent);}
  .openrow{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:18px 0 6px;}
  .openbtn{display:inline-flex;align-items:center;gap:10px;font:600 15px/1 var(--serif);color:#0d1413;background:var(--live);border:1px solid color-mix(in srgb,var(--live) 60%,#000);border-radius:9px;padding:14px 22px;cursor:pointer;font-family:var(--mono);}
  .openbtn:hover{filter:brightness(1.08);} .openbtn:disabled{opacity:.6;} .openbtn .ar{font-size:16px;}
  .ost{font-size:11px;color:var(--ink-faint);} .ost.ok{color:var(--live);} .ost.err{color:var(--stake);}
  .openrow .oh{font-size:11px;color:var(--ink-faint);flex:1;min-width:160px;line-height:1.5;}
  .shot{border:1px solid var(--hairline);border-radius:8px;overflow:hidden;background:#111;margin:8px 0 2px;} .shot img{width:100%;display:block;} .shot .cap{font-size:10px;color:var(--ink-faint);padding:7px 10px;background:var(--ground-2);border-top:1px solid var(--hairline);} .cap b{color:var(--ink-dim);}
  .foot{margin-top:22px;border-top:1px solid var(--hairline);padding-top:12px;font-size:10.5px;color:var(--ink-faint);line-height:1.7;} .foot b{color:var(--ink-dim);}
</style></head>
<body><div class="sheet">
  <div class="top">
    <div><h1>DJ Slide Builder &mdash; assembled</h1><div class="sub">all the pieces in one tool: 5 layouts + typed/multi-image blocks + resize/move + multi-slide deck</div></div>
    <span class="flag">assembling &middot; test the Open</span>
  </div>

  <div class="openrow">
    <button class="openbtn" id="openbtn"><span class="ar">&#9654;</span> Open the builder</button>
    <span class="ost" id="ost"></span>
    <div class="oh">this uses the new /open (opens in your REAL browser as a full tab, not the viewer). click it &mdash; the whole point is to confirm Open works now.</div>
  </div>

  <div class="shot"><img src="${shot}" alt="dj slide builder"><div class="cap">the assembled builder: top bar (＋ Item / Delete / Layout ▾), the slide canvas with editable title, and the multi-slide deck rail below. pick a Layout for balanced blocks, type + fill them, drag/resize any item.</div></div>

  <div class="foot">
    <b>test now</b> &mdash; click <b>Open the builder</b> above. if it opens dj-builder.html in a real browser tab, the Open fix works and I keep finishing the builder's interactions. if it errors, tell me what it says.<br>
    <b>note</b> &mdash; the builder's still mid-assembly (interactions being render-verified); this paperwork is here so you can confirm the OPEN button, per your ask.<br>
    dj-builder-ready.f0 &middot; 20260714 UTC &middot; lantern &middot; /open (clerk's endpoint)
  </div>
</div>
<script>
"use strict";
var btn = document.getElementById("openbtn"), st = document.getElementById("ost");
btn.addEventListener("click", function(){
  st.className = "ost"; st.textContent = "opening…"; btn.disabled = true;
  fetch("/open", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({path: "${OPENPATH}"})})
    .then(function(r){ return r.json(); })
    .then(function(j){
      if(j && j.opened){ st.className = "ost ok"; st.textContent = "opened ✓ (check your browser)"; }
      else { st.className = "ost err"; st.textContent = (j && j.error) ? ("error: " + j.error) : "no response"; }
      btn.disabled = false;
    })
    .catch(function(e){ st.className = "ost err"; st.textContent = "server not reachable"; btn.disabled = false; });
});
</script>
</body></html>`;
writeFileSync(OUT, html);
console.log('wrote:', OUT, '(' + (html.length/1024).toFixed(0) + ' KB)');
