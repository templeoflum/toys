import { readFileSync, writeFileSync } from 'fs';
const SHOTS = 'C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const OUT = 'C:/Users/User/Documents/0000000/mind not map/2.structure-maintains-order/21.labor-installs-practice/211.motion-builds-form/moveresize-ready.dj-class.f0.20260714-092536.html';
const shot = 'data:image/png;base64,' + readFileSync(SHOTS + '/dj_mr_after.png').toString('base64');
const RUNURL = 'file:///C:/Users/User/Documents/0000000/My%20Classes/DJ%20Foundations/present/move-resize-mock.html';
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>resize + move — mock</title>
<style>
  :root{--ground:#141b1a;--ground-2:#192322;--hairline:#2c3a38;--ink:#d9dfdc;--ink-dim:#8fa09b;--ink-faint:#5c6d68;
    --live:#6faf7c;--teach:#e8a13a;--aud:#4fa8b8;--mono:"JetBrains Mono",Consolas,monospace;--serif:"Newsreader",Georgia,serif;}
  *{box-sizing:border-box} body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--mono);font-size:13px;line-height:1.55;padding:22px 18px 60px;}
  .sheet{max-width:760px;margin:0 auto;}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;border-bottom:1px solid var(--hairline);padding-bottom:12px;}
  .top h1{font:600 21px/1.1 var(--serif);margin:0;} .top .sub{color:var(--ink-dim);font-size:11.5px;margin-top:4px;}
  .flag{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--live);border:1px solid color-mix(in srgb,var(--live) 45%,transparent);border-radius:5px;padding:5px 9px;white-space:nowrap;background:color-mix(in srgb,var(--live) 8%,transparent);}
  .openrow{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:18px 0 6px;}
  .openbtn{display:inline-flex;align-items:center;gap:10px;font:600 15px/1 var(--serif);color:#0d1413;background:var(--live);border:1px solid color-mix(in srgb,var(--live) 60%,#000);border-radius:9px;padding:14px 22px;text-decoration:none;box-shadow:0 4px 16px color-mix(in srgb,var(--live) 30%,transparent);}
  .openbtn:hover{filter:brightness(1.08);} .openbtn .ar{font-size:17px;}
  .openrow .oh{font-size:11px;color:var(--ink-faint);flex:1;min-width:180px;line-height:1.5;} .openrow .oh b{color:var(--ink-dim);}
  .shot{border:1px solid var(--hairline);border-radius:8px;overflow:hidden;background:#111;margin:8px 0 2px;} .shot img{width:100%;display:block;} .shot .cap{font-size:10px;color:var(--ink-faint);padding:7px 10px;background:var(--ground-2);border-top:1px solid var(--hairline);} .cap b{color:var(--ink-dim);}
  .band{display:flex;align-items:center;gap:12px;margin:22px 0 8px;padding:9px 0;border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline);}
  .band .num{font:600 15px/1 var(--serif);color:var(--ink-faint);} .band .name{font:600 15px/1.1 var(--serif);color:var(--ink);}
  .chk{display:flex;flex-direction:column;gap:5px;} .chk .c{font-size:11.5px;color:var(--ink-dim);display:flex;gap:9px;align-items:baseline;} .chk .c .m{color:var(--live);flex:0 0 auto;}
  .foot{margin-top:24px;border-top:1px solid var(--hairline);padding-top:12px;font-size:10.5px;color:var(--ink-faint);line-height:1.7;} .foot b{color:var(--ink-dim);}
</style></head>
<body><div class="sheet">
  <div class="top">
    <div><h1>Resize + Move &mdash; the last piece</h1><div class="sub">grab any item to move it, drag a corner handle to resize &mdash; then we put it all together</div></div>
    <span class="flag">mock &middot; render-verified</span>
  </div>

  <div class="openrow">
    <a class="openbtn" href="${RUNURL}" target="_blank" rel="noopener"><span class="ar">&#9654;</span> Open resize + move &mdash; new tab</a>
    <div class="oh">drag the image/text to move it, drag an orange corner to resize, add image/text/video, delete selected. if the link doesn't fire here, paste: <b>${RUNURL}</b></div>
  </div>

  <div class="shot"><img src="${shot}" alt="resize + move"><div class="cap">the image dragged to center + resized larger &mdash; cyan selection border + <b>orange corner handles</b>; text box is movable + editable too. all free-manipulation, in the class palette.</div></div>

  <div class="band"><span class="num">1</span><span class="name">what works (render-verified, my eye)</span></div>
  <div class="chk">
    <div class="c"><span class="m">&#10003;</span><b style="color:var(--ink)">move</b>: drag any item (image / text / video) to reposition, clamped to the slide</div>
    <div class="c"><span class="m">&#10003;</span><b style="color:var(--ink)">resize</b>: 4 corner handles, opposite corner anchored, min-size guarded</div>
    <div class="c"><span class="m">&#10003;</span>select (cyan + handles), add image/text/video, delete selected; text stays editable</div>
    <div class="c"><span class="m">&#10003;</span>caught + fixed 2 real bugs by rendering it (a dead click-handler + clipped handles) &mdash; the see-it gate earning its keep</div>
  </div>

  <div class="band"><span class="num">2</span><span class="name">the assemble step</span></div>
  <div class="chk">
    <div class="c"><span class="m">&#8227;</span>this folds into the template builder: templates give balanced blocks, resize+move nudges any content that needs it (the misfit slides).</div>
    <div class="c"><span class="m">&#8227;</span>we now have all the pieces: slides, videos, images, 5 layouts + multi-image blocks, and resize+move. ready to put it all together.</div>
  </div>

  <div class="foot">
    <b>your move</b> &mdash; open it, drag + resize a few things, and if it feels right say go and I assemble the full builder. (still holding your hot-cue route + printout spec for the tomorrow content.)<br>
    moveresize-ready.dj-class.f0 &middot; 20260714 UTC &middot; lantern &middot; render-verified (see-it gate)
  </div>
</div></body></html>`;
writeFileSync(OUT, html);
console.log('wrote:', OUT, '(' + (html.length/1024).toFixed(0) + ' KB)');
