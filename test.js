const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:4173/';
const log = [];
const ok = (m) => log.push('OK   ' + m);
const fail = (m) => log.push('FAIL ' + m);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  await page.goto(BASE + '#/dashboard', { waitUntil: 'load' });

  // 1. dashboard
  (await page.locator('.page-title').innerText()).includes('Olá')
    ? ok('dashboard renderiza saudação') : fail('dashboard');

  // 2. navegação pelo menu
  await page.locator('.nav-sub-item', { hasText: 'Mesa' }).click();
  await page.waitForTimeout(250);
  page.url().endsWith('#/revisao') ? ok('menu navega para a Mesa') : fail('menu mesa: ' + page.url());

  // 3. abrir caso
  await page.locator('tbody tr').first().click();
  await page.waitForTimeout(250);
  const casoTitle = await page.locator('.page-title').innerText();
  casoTitle.includes('CRD-DGS777-1790691041') ? ok('caso abre pelo id') : fail('caso: ' + casoTitle);

  // 4. decidir
  await page.locator('button[data-decide="aprovado"]').first().click();
  await page.waitForTimeout(300);
  const badgeTxt = await page.locator('.badge').first().innerText();
  badgeTxt.includes('Aprovado') ? ok('decisão aprova e atualiza o caso') : fail('decisão: ' + badgeTxt);
  (await page.locator('.toast').count()) > 0 ? ok('toast de confirmação aparece') : fail('toast');

  // 5. voltar e conferir abas
  await page.locator('.crumb').click();
  await page.waitForTimeout(200);
  const abertos = await page.locator('.tab').first().innerText();
  abertos.includes('2') ? ok('aba Abertos cai para 2') : fail('aba abertos: ' + abertos);
  await page.locator('.tab', { hasText: 'Aprovados' }).click();
  await page.waitForTimeout(200);
  (await page.locator('tbody tr').count()) === 1 ? ok('aba Aprovados lista o caso decidido') : fail('aba aprovados');

  // 6. filtros de execuções
  await page.locator('.nav-sub-item', { hasText: 'Jornadas' }).click();
  await page.waitForTimeout(250);
  const totalAntes = await page.locator('tbody tr').count();
  await page.locator('#f-nome').fill('Bruno');
  await page.waitForTimeout(250);
  const totalDepois = await page.locator('tbody tr').count();
  totalDepois === 1 && totalAntes === 10 ? ok('filtro por nome funciona') : fail('filtro nome: ' + totalAntes + ' -> ' + totalDepois);
  await page.locator('#f-nome').fill('');
  await page.waitForTimeout(200);

  // 7. paginação
  const p1 = await page.locator('#exec-count').innerText();
  await page.locator('[data-exec-page="2"]').click();
  await page.waitForTimeout(250);
  const p2 = await page.locator('#exec-count').innerText();
  p1.startsWith('1–10') && p2.startsWith('11–20') ? ok('paginação avança') : fail('paginação: ' + p1 + ' / ' + p2);

  // 8. simular envio
  await page.locator('#simular-envio').click();
  await page.waitForTimeout(250);
  (await page.locator('.modal').count()) === 1 ? ok('modal de simulação abre') : fail('modal simular');
  await page.locator('#sim-nome').fill('Teste Diretor');
  await page.locator('#sim-submit').click();
  await page.waitForTimeout(400);
  const firstRow = await page.locator('tbody tr').first().innerText();
  firstRow.includes('Teste Diretor') ? ok('execução simulada entra no topo') : fail('simulação row: ' + firstRow);

  await page.waitForTimeout(6500);
  const firstRow2 = await page.locator('tbody tr').first().innerText();
  /Aprovada|Em revisão/.test(firstRow2) ? ok('simulação termina com status') : fail('simulação fim: ' + firstRow2);

  // 9. detalhe da execução
  await page.locator('tbody tr').nth(2).click();
  await page.waitForTimeout(300);
  (await page.locator('.timeline .tl-item').count()) > 5 ? ok('detalhe da execução mostra timeline') : fail('timeline execução');
  (await page.locator('.evidence').count()) === 2 ? ok('evidências aparecem') : fail('evidências');

  // 10. link cruzado para a Mesa
  const linkMesa = await page.locator('button[data-nav^="#/revisao/"]').count();
  linkMesa > 0 ? ok('execução tem link para a Mesa') : fail('link cruzado');

  // 11. agente
  await page.locator('.nav-sub-item', { hasText: 'Agentes' }).click();
  await page.waitForTimeout(250);
  await page.locator('[data-agent="FACEMATCH"]').click();
  await page.waitForTimeout(250);
  const modalTxt = await page.locator('.modal').innerText();
  modalTxt.includes('Face Match') && modalTxt.includes('similaridade')
    ? ok('modal do agente mostra contrato de I/O') : fail('modal agente: ' + modalTxt.slice(0, 60));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  (await page.locator('.modal').count()) === 0 ? ok('Esc fecha o modal') : fail('fechar modal');

  // 12. fluxos: troca de seleção
  await page.locator('.nav-sub-item', { hasText: 'Biblioteca' }).click();
  await page.waitForTimeout(250);
  await page.locator('[data-flow="credito-pf"]').click();
  await page.waitForTimeout(250);
  const prev = (await page.locator('.preview-head').innerText()).toLowerCase();
  prev.includes('crédito pf') ? ok('biblioteca troca o fluxo em prévia') : fail('prévia: ' + prev);

  // 13. editor: seleção de nó
  await page.locator('.flow-edit').first().click();
  await page.waitForTimeout(350);
  await page.locator('[data-node="consulta"]').click();
  await page.waitForTimeout(250);
  const propTitle = await page.locator('.props-body input').first().inputValue();
  propTitle.includes('Consulta') ? ok('editor troca o painel ao clicar no nó') : fail('props nó: ' + propTitle);

  // 14. canvas cabe na área
  const fit = await page.locator('.canvas-fit').boundingBox();
  const scroll = await page.locator('.canvas-scroll').boundingBox();
  fit && scroll && fit.width <= scroll.width && fit.height <= scroll.height
    ? ok('canvas se ajusta à área sem cortar') : fail('fit canvas ' + JSON.stringify(fit) + ' / ' + JSON.stringify(scroll));

  await page.screenshot({ path: path.join(__dirname, 'shots', 'editor-final.png') });
  await page.locator('.nav-sub-item', { hasText: 'Agentes' }).click();
  await page.waitForTimeout(200);
  await page.locator('[data-agent="FACEMATCH"]').click();
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(__dirname, 'shots', 'modal-agente.png') });

  console.log(log.join('\n'));
  console.log('\nERROS DE CONSOLE: ' + (errors.length ? JSON.stringify(errors, null, 2) : 'nenhum'));
  const fails = log.filter((l) => l.startsWith('FAIL')).length;
  console.log('\nRESULTADO: ' + (log.length - fails) + '/' + log.length + ' testes ok');
  await browser.close();
})();
