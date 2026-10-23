const { chromium } = require('playwright');
const path = require('path');

const routes = ['#/dashboard', '#/fluxos/editor', '#/revisao', '#/execucoes/ex-4821-1'];

(async () => {
  const browser = await chromium.launch();
  for (const vp of [{ w: 1280, h: 800 }, { w: 1920, h: 1080 }]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    for (const r of routes) {
      await page.goto('http://localhost:4173/' + r, { waitUntil: 'load' });
      await page.waitForTimeout(300);
      const name = vp.w + '-' + r.replace(/[#/]/g, '_').replace(/^_+/, '');
      await page.screenshot({ path: path.join(__dirname, 'shots', name + '.png') });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      console.log(vp.w, r, 'overflow-x:', overflow);
    }
    await page.close();
  }
  await browser.close();
})();
