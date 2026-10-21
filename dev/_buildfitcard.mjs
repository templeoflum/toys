import { readFileSync, writeFileSync } from 'fs';
const SHOTS = 'C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const OUT = 'C:/Users/User/Documents/0000000/mind not map/2.structure-maintains-order/21.labor-installs-practice/211.motion-builds-form/slide-fit-audit.dj-class.f0.20260714-084607.html';
const sheet = 'data:image/png;base64,' + readFileSync(SHOTS + '/dj_contactsheet.png').toString('base64');
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>slide fit-audit — 20 slides vs the 3 templates</title>
<style>
  :root{--ground:#141b1a;--ground-2:#192322;--hairline:#2c3a38;--ink:#d9dfdc;--ink-dim:#8fa09b;--ink-faint:#5c6d68;
    --live:#6faf7c;--teach:#e8a13a;--aud:#4fa8b8;--op:#c58bd6;--stake:#d76a5b;--mono:"JetBrains Mono",Consolas,monospace;--serif:"Newsreader",Georgia,serif;}
  *{box-sizing:border-box} body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--mono);font-size:13px;line-height:1.55;padding:22px 18px 60px;}
  .sheet{max-width:800px;margin:0 auto;}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;border-bottom:1px solid var(--hairline);padding-bottom:12px;}
  .top h1{font:600 21px/1.1 var(--serif);margin:0;} .top .sub{color:var(--ink-dim);font-size:11.5px;margin-top:4px;}
  .flag{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--teach);border:1px solid color-mix(in srgb,var(--teach) 45%,transparent);border-radius:5px;padding:5px 9px;white-space:nowrap;background:color-mix(in srgb,var(--teach) 8%,transparent);}
  .verdict{border:1px solid color-mix(in srgb,var(--live) 40%,transparent);background:color-mix(in srgb,var(--live) 6%,transparent);border-radius:9px;padding:13px 15px;margin:16px 0;}
  .verdict b{color:var(--live);}
  .shot{border:1px solid var(--hairline);border-radius:8px;overflow:hidden;background:#111;margin:8px 0 2px;} .shot img{width:100%;display:block;} .shot .cap{font-size:10px;color:var(--ink-faint);padding:7px 10px;background:var(--ground-2);border-top:1px solid var(--hairline);}
  .band{display:flex;align-items:center;gap:12px;margin:22px 0 8px;padding:9px 0;border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline);}
  .band .num{font:600 15px/1 var(--serif);color:var(--ink-faint);} .band .name{font:600 15px/1.1 var(--serif);color:var(--ink);}
  .row{display:flex;gap:10px;padding:7px 0;border-bottom:1px dashed var(--hairline);font-size:12px;} .row:last-child{border-bottom:none;}
  .row .k{flex:0 0 96px;color:var(--ink-dim);font-weight:600;} .row .v{flex:1;color:var(--ink-dim);} .row .v b{color:var(--ink);}
  .tag{font-size:9px;letter-spacing:.08em;text-transform:uppercase;border-radius:10px;padding:2px 8px;white-space:nowrap;}
  .tag.fit{color:var(--live);border:1px solid color-mix(in srgb,var(--live) 50%,transparent);}
  .tag.mis{color:var(--stake);border:1px solid color-mix(in srgb,var(--stake) 50%,transparent);}
  .fix{border:1px solid color-mix(in srgb,var(--op) 42%,transparent);border-radius:9px;background:color-mix(in srgb,var(--op) 6%,transparent);padding:14px 15px;margin-top:6px;}
  .fix .fh{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--op);margin:0 0 10px;}
  .opt{padding:8px 0;border-bottom:1px dashed var(--hairline);} .opt:last-child{border-bottom:none;}
  .opt .t{font-size:13px;color:var(--ink);} .opt .d{font-size:11.5px;color:var(--ink-faint);margin-top:3px;} .opt .rec{color:var(--live);font-size:10px;letter-spacing:.1em;text-transform:uppercase;}
  .foot{margin-top:24px;border-top:1px solid var(--hairline);padding-top:12px;font-size:10.5px;color:var(--ink-faint);line-height:1.7;} .foot b{color:var(--ink-dim);}
</style></head>
<body><div class="sheet">
  <div class="top">
    <div><h1>Slide Fit-Audit</h1><div class="sub">all 20 real slides checked against your 3-template model &mdash; eyes on before we commit</div></div>
    <span class="flag">eyes-on &middot; before commit</span>
  </div>

  <div class="verdict">the good news: <b>~18 of 20 fit cleanly.</b> most are title + bullets + one image (= Title + Two Blocks), a few are one full image, one or two are title + bullets only. only <b>~2 slides truly don't fit</b> &mdash; and there's a clean fix that keeps your 3 templates.</div>

  <div class="shot"><img src="${sheet}" alt="20-slide contact sheet"><div class="cap">all 20 slides. cyan number = slide #. the misfits are <b>3</b> and <b>12</b> (below); a few that LOOK multi-image are actually one composite graphic (e.g. 10's HOT/MEMORY, 20's Q&amp;A) &mdash; those fit fine.</div></div>

  <div class="band"><span class="num">1</span><span class="name">the misfits (your concern, confirmed)</span></div>
  <div class="row"><span class="k">slide 12</span><span class="v"><b>Exporting to USB</b> &mdash; bullets + the USB photo + a SECOND image (the &ldquo;Remove USB Device&rdquo; UI screenshot, placed separately). bullets + <b>2 images</b> in different spots.</span><span class="tag mis">misfit</span></div>
  <div class="row"><span class="k">slide 3</span><span class="v"><b>What You'll Be Able to Do</b> &mdash; bullets + a main photo + a small circular INSET image on top of it. bullets + <b>2 images</b>.</span><span class="tag mis">misfit</span></div>
  <div class="row"><span class="k">everything else</span><span class="v">title + bullets + one image, or one full image, or bullets-only &mdash; all land in Title+One / Title+Two / Full Content.</span><span class="tag fit">fits</span></div>

  <div class="band"><span class="num">2</span><span class="name">the fix &mdash; your call</span></div>
  <div class="fix">
    <div class="fh">&#9670; which route? (a word is enough)</div>
    <div class="opt"><div class="t">A &middot; let an IMAGE block hold more than one image <span class="rec">&mdash; my rec</span></div><div class="d">an image-type block = 1..n images, auto-balanced inside its slot. then &ldquo;Title + Two Blocks&rdquo; (bullets + a 2-image block) covers 3 &amp; 12. keeps your 3 templates + the typed-block model, just makes image blocks flexible. cleanest.</div></div>
    <div class="opt"><div class="t">B &middot; bake the second image into one</div><div class="d">for just these ~2 slides, combine the two images into a single image beforehand &mdash; then they're plain Title+Two Blocks. no model change, but a manual step per oddball.</div></div>
    <div class="opt"><div class="t">C &middot; add a freeform / custom escape-hatch template</div><div class="d">a 4th &ldquo;custom&rdquo; layout for the rare slide that won't conform. most flexible, but reintroduces the free-placement you were avoiding.</div></div>
  </div>

  <div class="foot">
    <b>bottom line</b> &mdash; the format basically holds; only ~2 slides need help, and route A fixes them without breaking your model. say A / B / C and I build it. (still holding your hot-cue route + the printout spec, both signalled.)<br>
    slide-fit-audit.dj-class.f0 &middot; 20260714 UTC &middot; lantern &middot; eyes-on the real 20 slides
  </div>
</div></body></html>`;
writeFileSync(OUT, html);
console.log('wrote:', OUT, '(' + (html.length/1024).toFixed(0) + ' KB)');
