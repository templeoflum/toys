// _buildcard.mjs — assemble the self-contained "DJ presenter ready" card:
// embeds the render-verified shots as base64 so the served card is one file.
import { readFileSync, writeFileSync } from 'fs';
const SHOTS = 'C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const OUT = 'C:/Users/User/Documents/0000000/mind not map/2.structure-maintains-order/21.labor-installs-practice/211.motion-builds-form/present-ready.dj-class.f1.20260714-042838.html';
// the real presenter, absolute file:// so the link opens it in its OWN browser tab (outside the dispatch viewer)
const RUNURL = 'file:///C:/Users/User/Documents/0000000/My%20Classes/DJ%20Foundations/present/control.html';
const b64 = (p) => 'data:image/png;base64,' + readFileSync(p).toString('base64');
const control = b64(SHOTS + '/dj_control_synced.png');
const display = b64(SHOTS + '/dj_display_slide3.png');

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>DJ presenter — ready to run</title>
<style>
  :root{--ground:#141b1a;--ground-2:#192322;--panel:#1c2726;--hairline:#2c3a38;
    --ink:#d9dfdc;--ink-dim:#8fa09b;--ink-faint:#5c6d68;--live:#6faf7c;--teach:#e8a13a;--aud:#4fa8b8;--op:#c58bd6;
    --mono:"JetBrains Mono",Consolas,monospace;--serif:"Newsreader",Georgia,serif;}
  *{box-sizing:border-box}
  body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--mono);font-size:13px;line-height:1.55;padding:22px 18px 60px;}
  .sheet{max-width:760px;margin:0 auto;}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;border-bottom:1px solid var(--hairline);padding-bottom:12px;}
  .top h1{font:600 21px/1.1 var(--serif);margin:0;}
  .top .sub{color:var(--ink-dim);font-size:11.5px;margin-top:4px;}
  .flag{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--live);border:1px solid color-mix(in srgb,var(--live) 45%,transparent);border-radius:5px;padding:5px 9px;white-space:nowrap;background:color-mix(in srgb,var(--live) 8%,transparent);}
  .openrow{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:18px 0 4px;}
  .openbtn{display:inline-flex;align-items:center;gap:10px;font:600 15px/1 var(--serif);color:#0d1413;
    background:var(--live);border:1px solid color-mix(in srgb,var(--live) 60%,#000);border-radius:9px;
    padding:14px 22px;text-decoration:none;letter-spacing:.01em;box-shadow:0 4px 16px color-mix(in srgb,var(--live) 30%,transparent);}
  .openbtn:hover{filter:brightness(1.08);} .openbtn .ar{font-size:17px;}
  .openrow .oh{font-size:11px;color:var(--ink-faint);flex:1;min-width:180px;line-height:1.5;}
  .openrow .oh b{color:var(--ink-dim);}
  .band{display:flex;align-items:center;gap:12px;margin:28px 0 10px;padding:9px 0;border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline);}
  .band .num{font:600 15px/1 var(--serif);color:var(--ink-faint);}
  .band .name{font:600 15px/1.1 var(--serif);color:var(--ink);letter-spacing:.01em;}
  .shots{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:6px 0 4px;}
  @media(max-width:620px){.shots{grid-template-columns:1fr}}
  .shot{border:1px solid var(--hairline);border-radius:8px;overflow:hidden;background:#000;}
  .shot img{width:100%;display:block;}
  .shot .cap{font-size:10px;color:var(--ink-faint);padding:7px 10px;background:var(--ground-2);border-top:1px solid var(--hairline);letter-spacing:.03em;}
  .cap b{color:var(--ink-dim);}
  .steps{counter-reset:s;margin:4px 0 0;padding:0;list-style:none;}
  .steps li{counter-increment:s;position:relative;padding:9px 12px 9px 40px;border:1px solid var(--hairline);border-radius:8px;background:var(--ground-2);margin-bottom:7px;font-size:12.5px;color:var(--ink-dim);}
  .steps li::before{content:counter(s);position:absolute;left:11px;top:8px;width:20px;height:20px;border-radius:50%;background:color-mix(in srgb,var(--teach) 20%,transparent);border:1px solid color-mix(in srgb,var(--teach) 55%,transparent);color:var(--teach);font-size:11px;display:flex;align-items:center;justify-content:center;}
  .steps li b{color:var(--ink);} .steps code{color:var(--aud);background:color-mix(in srgb,var(--aud) 10%,transparent);padding:1px 5px;border-radius:4px;font-size:11.5px;}
  .path{font-size:11px;color:var(--ink-faint);border:1px dashed var(--hairline);border-radius:7px;padding:8px 11px;margin:2px 0 14px;word-break:break-all;}
  .path b{color:var(--ink-dim);}
  .chk{display:flex;flex-direction:column;gap:5px;margin:2px 0;}
  .chk .c{font-size:11.5px;color:var(--ink-dim);display:flex;gap:9px;align-items:baseline;}
  .chk .c .m{color:var(--live);flex:0 0 auto;}
  .pins{border:1px solid color-mix(in srgb,var(--op) 42%,transparent);border-radius:9px;background:color-mix(in srgb,var(--op) 6%,transparent);padding:14px 15px;margin-top:6px;}
  .pins .ph{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--op);margin:0 0 10px;}
  .pin{padding:9px 0;border-bottom:1px dashed var(--hairline);}
  .pin:last-child{border-bottom:none;}
  .pin .q{font-size:13px;color:var(--ink);} .pin .a{font-size:11.5px;color:var(--ink-faint);margin-top:3px;}
  .pin .a b{color:var(--ink-dim);}
  .foot{margin-top:26px;border-top:1px solid var(--hairline);padding-top:12px;font-size:10.5px;color:var(--ink-faint);line-height:1.7;}
  .foot b{color:var(--ink-dim);}
</style></head>
<body><div class="sheet">
  <div class="top">
    <div><h1>DJ Foundations — Presenter</h1><div class="sub">two paired browser windows: one display (projected), one control (your laptop) &mdash; over your 20 real slides</div></div>
    <span class="flag">built &middot; render-verified &middot; runnable</span>
  </div>

  <div class="openrow">
    <a class="openbtn" href="${RUNURL}" target="_blank" rel="noopener"><span class="ar">&#9654;</span> Open the Presenter &mdash; new tab</a>
    <div class="oh">opens the real <b>control.html</b> in its own full browser tab (not cramped in here). from there click <b>Open Display Window</b> &rarr; drag to the projector. <br>if the link doesn't fire, paste this into a browser: <b>${RUNURL}</b></div>
  </div>

  <div class="band"><span class="num">1</span><span class="name">what it looks like</span></div>
  <div class="shots">
    <div class="shot"><img src="${control}" alt="control console"><div class="cap"><b>CONTROL</b> (your laptop) &mdash; now/next preview, prev/next, live clock + session timer, 20-slide jump grid</div></div>
    <div class="shot"><img src="${display}" alt="display window"><div class="cap"><b>DISPLAY</b> (projected) &mdash; fullscreen, edge-to-edge, your real slide. no chrome</div></div>
  </div>

  <div class="band"><span class="num">2</span><span class="name">how to run it (tomorrow)</span></div>
  <div class="path"><b>the file:</b> My Classes\\DJ Foundations\\present\\<b>control.html</b></div>
  <ol class="steps">
    <li><a href="${RUNURL}" target="_blank" rel="noopener" style="color:var(--live);font-weight:600;">Open the control console</a> (the green button above, or double-click <b>control.html</b>) &mdash; no server, no install, just the browser.</li>
    <li>Click <b>&ldquo;Open Display Window&rdquo;</b> (top-left). A second window opens &mdash; that's the display.</li>
    <li>Drag the display window onto the <b>projector / second screen</b>, click it, press <code>f</code> for fullscreen.</li>
    <li>Drive from the control: <b>Next / Prev</b>, arrow keys, or click any slide in the <b>jump grid</b>. The display follows instantly.</li>
  </ol>

  <div class="band"><span class="num">3</span><span class="name">what I verified (with my eye, not a formula)</span></div>
  <div class="chk">
    <div class="c"><span class="m">&#10003;</span>all 20 slide PNGs load over file:// (the space in the folder name is handled)</div>
    <div class="c"><span class="m">&#10003;</span>display renders each slide fullscreen, edge-to-edge, letterboxes cleanly on any projector ratio</div>
    <div class="c"><span class="m">&#10003;</span>control &rarr; display sync: Next/Prev, arrow keys, and jump-grid all move the display live</div>
    <div class="c"><span class="m">&#10003;</span>display &rarr; control sync too (its own arrow keys drive the console back) &mdash; two sync paths, no desync</div>
    <div class="c"><span class="m">&#10003;</span>opens in either order and converges; instant advance (neighbor slides preloaded)</div>
  </div>

  <div class="band"><span class="num">4</span><span class="name">two pins for you</span></div>
  <div class="pins">
    <div class="ph">&#9670; your call &mdash; a word on the board is enough</div>
    <div class="pin">
      <div class="q">1 &middot; Placement &mdash; ok that it lives in the class repo?</div>
      <div class="a">I put it at <b>My Classes\\DJ Foundations\\present\\</b> (new folder, new files only &mdash; touched nothing existing). It ships with the class + can push to the live site later. Say the word if you'd rather it live elsewhere.</div>
    </div>
    <div class="pin">
      <div class="q">2 &middot; &ldquo;current&rdquo; &mdash; just the runnable presenter, or the stale bits too?</div>
      <div class="a">The census flagged two stale things in the class: the <b>flyer date</b> reads &ldquo;February 24&rdquo; (marketing only), and <b>2 genre cards</b> (Deconstructed Pop, Halftime) sit un-merged (9 vs 11). Those are separate from the presenter. Want them fixed as part of &ldquo;current,&rdquo; or is the runnable presenter the whole ask for today?</div>
    </div>
  </div>

  <div class="foot">
    <b>optional add I can build fast</b> &mdash; a genre-card pull-up on the control (call up any genre/label card mid-teach without leaving the slides). Not in v1 &mdash; say if you want it.<br>
    <b>what this card is</b> &mdash; the proof + the run steps + the two pins. The presenter itself is the two files above; open control.html to drive it.<br>
    present-ready.dj-class.f1 &middot; 20260714 UTC &middot; lantern &middot; render-verified (see-it gate) &middot; f1 adds the working open-link
  </div>
</div></body></html>`;

writeFileSync(OUT, html);
console.log('wrote card:', OUT, '(' + (html.length/1024).toFixed(0) + ' KB)');
