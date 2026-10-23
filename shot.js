const { chromium } = require('playwright');
const path = require('path');

const routes = [
  ['dashboard', '#/dashboard'],
  ['agentes', '#/agentes'],
  ['fluxos', '#/fluxos'],
  ['editor', '#/fluxos/editor'],
  ['mesa', '#/revisao'],
  ['caso', '#/revisao/CRD-DGS777-1790691041'],
  ['execucoes', '#/execucoes'],
  ['execucao', '#/execucoes/ex-4821-1'],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  for (const [name, hash] of routes) {
    await page.goto('http://localhost:4173/' + hash, { waitUntil: 'load' });
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(__dirname, 'shots', name + '.png'), fullPage: true });
    const h = await page.evaluate(() => document.body.scrollHeight);
    console.log(name, 'ok | body height', h);
  }

  console.log('ERRORS:', errors.length ? JSON.stringify(errors, null, 2) : 'none');
  await browser.close();
})();
