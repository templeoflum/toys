// _buildeditcard.mjs — assemble the editable-slide mock "ready" card (shot embedded).
import { readFileSync, writeFileSync } from 'fs';
const SHOTS = 'C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const OUT = 'C:/Users/User/Documents/0000000/mind not map/2.structure-maintains-order/21.labor-installs-practice/211.motion-builds-form/editmock-ready.dj-class.f0.20260714-054620.html';
const shot = 'data:image/png;base64,' + readFileSync(SHOTS + '/dj_editmock.png').toString('base64');
const RUNURL = 'file:///C:/Users/User/Documents/0000000/My%20Classes/DJ%20Foundations/present/edit-slide-mock.html';

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>editable slide — mock (video + edit)</title>
<style>
  :root{--ground:#141b1a;--ground-2:#192322;--hairline:#2c3a38;--ink:#d9dfdc;--ink-dim:#8fa09b;--ink-faint:#5c6d68;
    --live:#6faf7c;--teach:#e8a13a;--aud:#4fa8b8;--op:#c58bd6;--stake:#d76a5b;
    --mono:"JetBrains Mono",Consolas,monospace;--serif:"Newsreader",Georgia,serif;}
  *{box-sizing:border-box}
  body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--mono);font-size:13px;line-height:1.55;padding:22px 18px 60px;}
  .sheet{max-width:760px;margin:0 auto;}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;border-bottom:1px solid var(--hairline);padding-bottom:12px;}
  .top h1{font:600 21px/1.1 var(--serif);margin:0;}
  .top .sub{color:var(--ink-dim);font-size:11.5px;margin-top:4px;}
  .flag{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--teach);border:1px solid color-mix(in srgb,var(--teach) 45%,transparent);border-radius:5px;padding:5px 9px;white-space:nowrap;background:color-mix(in srgb,var(--teach) 8%,transparent);}
  .openrow{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:18px 0 6px;}
  .openbtn{display:inline-flex;align-items:center;gap:10px;font:600 15px/1 var(--serif);color:#0d1413;background:var(--live);
    border:1px solid color-mix(in srgb,var(--live) 60%,#000);border-radius:9px;padding:14px 22px;text-decoration:none;
    box-shadow:0 4px 16px color-mix(in srgb,var(--live) 30%,transparent);}
  .openbtn:hover{filter:brightness(1.08);} .openbtn .ar{font-size:17px;}
  .openrow .oh{font-size:11px;color:var(--ink-faint);flex:1;min-width:180px;line-height:1.5;} .openrow .oh b{color:var(--ink-dim);}
  .shot{border:1px solid var(--hairline);border-radius:8px;overflow:hidden;background:#000;margin:6px 0 2px;}
  .shot img{width:100%;display:block;} .shot .cap{font-size:10px;color:var(--ink-faint);padding:7px 10px;background:var(--ground-2);border-top:1px solid var(--hairline);}
  .cap b{color:var(--ink-dim);}
  .band{display:flex;align-items:center;gap:12px;margin:24px 0 8px;padding:9px 0;border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline);}
  .band .num{font:600 15px/1 var(--serif);color:var(--ink-faint);} .band .name{font:600 15px/1.1 var(--serif);color:var(--ink);}
  .chk{display:flex;flex-direction:column;gap:5px;} .chk .c{font-size:11.5px;color:var(--ink-dim);display:flex;gap:9px;align-items:baseline;}
  .chk .c .m{flex:0 0 auto;} .chk .c.yes .m{color:var(--live);} .chk .c.need .m{color:var(--teach);}
  .chk .c.need{color:var(--ink-dim);}
  .bar{border:1px solid color-mix(in srgb,var(--stake) 40%,transparent);border-radius:9px;background:color-mix(in srgb,var(--stake) 6%,transparent);padding:12px 14px;margin-top:6px;}
  .bar .bh{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--stake);margin:0 0 8px;}
  .bar .b{font-size:12px;color:var(--ink-dim);padding:5px 0;display:flex;gap:9px;align-items:baseline;} .bar .b .m{flex:0 0 auto;}
  .foot{margin-top:24px;border-top:1px solid var(--hairline);padding-top:12px;font-size:10.5px;color:var(--ink-faint);line-height:1.7;} .foot b{color:var(--ink-dim);}
</style></head>
<body><div class="sheet">
  <div class="top">
    <div><h1>Editable Slide &mdash; the shape</h1><div class="sub">one slide made fully editable, with the video PLAYING &mdash; mock to prove the shape before all 20</div></div>
    <span class="flag">mock &middot; render-verified</span>
  </div>

  <div class="openrow">
    <a class="openbtn" href="${RUNURL}" target="_blank" rel="noopener"><span class="ar">&#9654;</span> Open the editable slide &mdash; new tab</a>
    <div class="oh">opens the real mock in its own tab. <b>click any text to edit it</b>, hit <b>Replace image / Replace video</b>, press play on the clip. if the link doesn't fire in here, paste: <b>${RUNURL}</b></div>
  </div>

  <div class="shot"><img src="${shot}" alt="editable slide mock"><div class="cap">the hot-cue slide as <b>editable HTML</b> &mdash; title + bullets click-to-edit (cyan outline = editing), the beatgrid image (replaceable), and the <b>Boiler Room video embedded + playable</b> right in the slide</div></div>

  <div class="band"><span class="num">1</span><span class="name">what this proves (render-verified, my eye)</span></div>
  <div class="chk">
    <div class="c yes"><span class="m">&#10003;</span>the video LOADS + plays in the slide (readyState 4) &mdash; your tomorrow blocker, solved in principle</div>
    <div class="c yes"><span class="m">&#10003;</span>the hot-cue slide is now editable text &mdash; you can rewrite it into your better route inline</div>
    <div class="c yes"><span class="m">&#10003;</span>replace image / replace video by picking a file; text edits auto-save</div>
    <div class="c yes"><span class="m">&#10003;</span>slides become editable HTML (not flat PNGs) &mdash; this is the shape the other 19 follow</div>
  </div>

  <div class="band"><span class="num">2</span><span class="name">the tomorrow-ready bar (your words) &mdash; where each stands</span></div>
  <div class="bar">
    <div class="bh">&#9650; not ready to run until these land</div>
    <div class="b"><span class="m" style="color:var(--teach)">&#9679;</span><b style="color:var(--ink)">play the videos</b> &mdash; proven here on one slide; next: fold video into the real presenter across the deck</div>
    <div class="b"><span class="m" style="color:var(--teach)">&#9679;</span><b style="color:var(--ink)">fix the one slide (hot cue)</b> &mdash; it's editable now; I still need YOUR better route (what the new system is) to put the right content in</div>
    <div class="b"><span class="m" style="color:var(--teach)">&#9679;</span><b style="color:var(--ink)">resource printout</b> &mdash; noted, not started; tell me what the printout needs to be and it's next</div>
  </div>

  <div class="foot">
    <b>your move</b> &mdash; open it, try editing + the video, and tell me: (a) your better hot-cue route (rewrite it right in the slide if that's easiest), (b) what the resource printout should contain. then I fold video + editing into the real presenter for tomorrow.<br>
    editmock-ready.dj-class.f0 &middot; 20260714 UTC &middot; lantern &middot; render-verified (see-it gate)
  </div>
</div></body></html>`;
writeFileSync(OUT, html);
console.log('wrote:', OUT, '(' + (html.length/1024).toFixed(0) + ' KB)');
