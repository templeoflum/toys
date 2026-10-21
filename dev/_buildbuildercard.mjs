import { readFileSync, writeFileSync } from 'fs';
const SHOTS = 'C:/Users/User/Documents/0000000/mind not map/1.presence-minds-awareness/12.thought-grasps-sense/122.creativity-carries-potential/toys/dev/shots';
const OUT = 'C:/Users/User/Documents/0000000/mind not map/2.structure-maintains-order/21.labor-installs-practice/211.motion-builds-form/builder-ready.dj-class.f1.20260714-073834.html';
const b64 = p => 'data:image/png;base64,' + readFileSync(p).toString('base64');
const pick = b64(SHOTS + '/dj_builder2_1.png');
const pop = b64(SHOTS + '/dj_builder2_pop.png');
const RUNURL = 'file:///C:/Users/User/Documents/0000000/My%20Classes/DJ%20Foundations/present/builder-mock.html';
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>modular builder — mock</title>
<style>
  :root{--ground:#141b1a;--ground-2:#192322;--hairline:#2c3a38;--ink:#d9dfdc;--ink-dim:#8fa09b;--ink-faint:#5c6d68;
    --live:#6faf7c;--teach:#e8a13a;--aud:#4fa8b8;--op:#c58bd6;--mono:"JetBrains Mono",Consolas,monospace;--serif:"Newsreader",Georgia,serif;}
  *{box-sizing:border-box}
  body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--mono);font-size:13px;line-height:1.55;padding:22px 18px 60px;}
  .sheet{max-width:760px;margin:0 auto;}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;border-bottom:1px solid var(--hairline);padding-bottom:12px;}
  .top h1{font:600 21px/1.1 var(--serif);margin:0;} .top .sub{color:var(--ink-dim);font-size:11.5px;margin-top:4px;}
  .flag{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--aud);border:1px solid color-mix(in srgb,var(--aud) 45%,transparent);border-radius:5px;padding:5px 9px;white-space:nowrap;background:color-mix(in srgb,var(--aud) 8%,transparent);}
  .openrow{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:18px 0 6px;}
  .openbtn{display:inline-flex;align-items:center;gap:10px;font:600 15px/1 var(--serif);color:#0d1413;background:var(--live);border:1px solid color-mix(in srgb,var(--live) 60%,#000);border-radius:9px;padding:14px 22px;text-decoration:none;box-shadow:0 4px 16px color-mix(in srgb,var(--live) 30%,transparent);}
  .openbtn:hover{filter:brightness(1.08);} .openbtn .ar{font-size:17px;}
  .openrow .oh{font-size:11px;color:var(--ink-faint);flex:1;min-width:180px;line-height:1.5;} .openrow .oh b{color:var(--ink-dim);}
  .shot{border:1px solid var(--hairline);border-radius:8px;overflow:hidden;background:#000;margin:8px 0 2px;}
  .shot img{width:100%;display:block;} .shot .cap{font-size:10px;color:var(--ink-faint);padding:7px 10px;background:var(--ground-2);border-top:1px solid var(--hairline);} .cap b{color:var(--ink-dim);}
  .band{display:flex;align-items:center;gap:12px;margin:22px 0 6px;padding:9px 0;border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline);}
  .band .num{font:600 15px/1 var(--serif);color:var(--ink-faint);} .band .name{font:600 15px/1.1 var(--serif);color:var(--ink);}
  .chk{display:flex;flex-direction:column;gap:5px;} .chk .c{font-size:11.5px;color:var(--ink-dim);display:flex;gap:9px;align-items:baseline;} .chk .c .m{color:var(--live);flex:0 0 auto;}
  .foot{margin-top:24px;border-top:1px solid var(--hairline);padding-top:12px;font-size:10.5px;color:var(--ink-faint);line-height:1.7;} .foot b{color:var(--ink-dim);}
</style></head>
<body><div class="sheet">
  <div class="top">
    <div><h1>Modular Builder &mdash; the flow</h1><div class="sub">pick a template &rarr; balanced zones light up &rarr; click a zone to drop in content &mdash; mock of your builder idea</div></div>
    <span class="flag">mock &middot; render-verified</span>
  </div>

  <div class="openrow">
    <a class="openbtn" href="${RUNURL}" target="_blank" rel="noopener"><span class="ar">&#9654;</span> Open the builder &mdash; new tab</a>
    <div class="oh">pick a template, then in each block pick a TYPE (bullets / image / video) and fill it. try S/M/L on media, +/&minus; on bullets. if the link doesn't fire here, paste: <b>${RUNURL}</b></div>
  </div>

  <div class="shot"><img src="${pick}" alt="3 templates + a content block"><div class="cap">your model: <b>3 templates</b> (left) by block layout &mdash; Title+One Block / Title+Two Blocks / Full Content. each block is a generic <b>content slot</b> showing a type pick: Bullets / Image / Video</div></div>
  <div class="shot"><img src="${pop}" alt="two-block populated"><div class="cap">Title + Two Blocks, one block typed to Image (beatgrid) with S/M/L size + &ldquo;change type&rdquo; &mdash; the other still offering its type pick. balanced by the template</div></div>

  <div class="band"><span class="num">1</span><span class="name">your model, made real (render-verified)</span></div>
  <div class="chk">
    <div class="c"><span class="m">&#10003;</span>image / video / bullets are the SAME content slot &mdash; you pick the type. exactly your call.</div>
    <div class="c"><span class="m">&#10003;</span><b>3 templates</b> by block layout: Title + One Block / Title + Two Blocks / Full Content</div>
    <div class="c"><span class="m">&#10003;</span>each block: pick Bullets / Image / Video, fill it, &ldquo;change type&rdquo; to swap; media resizes S / M / L</div>
    <div class="c"><span class="m">&#10003;</span>bullets have explicit <b>+ / &minus;</b> add/remove (your ask) plus Enter/backspace; title editable; Full Content has an optional title overlay</div>
  </div>

  <div class="band"><span class="num">2</span><span class="name">what's still the next layer</span></div>
  <div class="chk">
    <div class="c"><span class="m">&#8227;</span>drag-resize + move content between slots (this mock uses fixed balanced slots + S/M/L).</div>
    <div class="c"><span class="m">&#8227;</span>then this becomes the REAL builder &mdash; and folds into fixing the hot-cue slide + the deck for tomorrow.</div>
  </div>

  <div class="foot">
    <b>your move</b> &mdash; open it, pick templates + type-and-fill some blocks, and tell me if this is the shape now. still need your hot-cue route + the printout spec for tomorrow (both signalled).<br>
    builder-ready.dj-class.f1 &middot; 20260714 UTC &middot; lantern &middot; render-verified (see-it gate) &middot; f1 = your 3-template / typed-block model
  </div>
</div></body></html>`;
writeFileSync(OUT, html);
console.log('wrote:', OUT, '(' + (html.length/1024).toFixed(0) + ' KB)');
