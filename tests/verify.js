// Phase 5 verification: proves every stage is beatable with the game's own physics,
// smoke-tests every stage in the real loop, and saves screenshots.
// Usage: node tests/verify.js [--shots]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const shots = process.argv.includes('--shots');
  const out = path.join(__dirname, 'shots');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.g/.test(m.text()) && !/ERR_/.test(m.text())) errors.push('console: ' + m.text()); });
  await page.goto('file://' + path.join(__dirname, '..', 'index.html'));
  await page.waitForFunction(() => window.__HR);
  await page.waitForTimeout(800);
  if (shots) await page.screenshot({ path: path.join(out, '0-title.png') });

  let failed = 0;
  const n = await page.evaluate(() => window.__HR.LEVELS.length);
  for (let i = 0; i < n; i++) {
    const t0 = Date.now();
    const r = await page.evaluate(i => window.__HR.solve(i), i);
    const name = await page.evaluate(i => window.__HR.LEVELS[i].name, i);
    console.log(`Stage ${i + 1} ${name}: ${r.ok ? 'BEATABLE' : 'NOT PROVEN'} ${JSON.stringify(r)} (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
    if (!r.ok) failed++;
  }

  for (let i = 0; i < n; i++) {
    await page.evaluate(i => { const H = window.__HR; H.startLevel(i); H.IN.keys.clear(); H.IN.keys.add('right'); }, i);
    await page.waitForTimeout(1300);
    if (shots) await page.screenshot({ path: path.join(out, `${i + 1}-play.png`) });
    const st = await page.evaluate(() => { const G = window.__HR.G; return { scr: G.scr, x: Math.round(G.p.x), deaths: G.deaths }; });
    console.log(`Smoke stage ${i + 1}: screen=${st.scr} x=${st.x} deaths=${st.deaths}`);
    await page.evaluate(() => window.__HR.IN.keys.clear());
  }
  await browser.close();
  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'No page errors.');
  process.exit(failed || errors.length ? 1 : 0);
})();
