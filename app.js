/* =========================================================
   Evidência · app (shell, rotas, interações)
   ========================================================= */

const state = {
  open: { 'Motor de Crédito': true, Fluxos: true, Execuções: true, Integrações: false },
  execFilters: { q: '', nome: '', doc: '', email: '', pedido: '', min: '', max: '', fluxo: 'todos', status: 'todos' },
  execPage: 1,
  mesaTab: 'aberto',
  mesaQ: '',
  selectedNode: 'score',
  flowId: 'credito-pj',
};

/* ---------- shell ---------- */

function isActive(route) {
  const cur = location.hash || '#/dashboard';
  if (route === '#/fluxos') return cur.indexOf('#/fluxos') === 0;
  if (route === '#/revisao') return cur.indexOf('#/revisao') === 0;
  if (route === '#/execucoes') return cur.indexOf('#/execucoes') === 0;
  return cur === route;
}

function renderSidebar() {
  const nav = NAV.map((entry) => {
    if (entry.kind === 'item') {
      const cls = 'nav-item' + (entry.route && isActive(entry.route) ? ' active' : '') + (entry.disabled ? ' is-disabled' : '');
      return '<div class="' + cls + '"' + (entry.route ? ' data-nav="' + entry.route + '"' : '') +
        (entry.disabled ? ' title="Não incluído neste protótipo"' : '') + '>' +
        icon(entry.icon, 16) + '<span>' + entry.label + '</span></div>';
    }
    const open = state.open[entry.label] !== false;
    const subs = entry.items.map((s) => {
      const cls = 'nav-sub-item' + (s.route && isActive(s.route) ? ' active' : '') + (s.disabled ? ' is-disabled' : '');
      return '<div class="' + cls + '"' + (s.route ? ' data-nav="' + s.route + '"' : '') +
        (s.disabled ? ' title="Não incluído neste protótipo"' : '') + '><span>' + s.label + '</span></div>';
    }).join('');
    return '<div class="nav-group" data-open="' + (open ? '1' : '0') + '">' +
      '<div class="nav-group-head" data-group="' + entry.label + '">' +
      icon(entry.icon, 16) + '<span>' + entry.label + '</span>' +
      '<span class="chev">' + icon('chevronDown', 13) + '</span></div>' +
      '<div class="nav-sub">' + subs + '</div></div>';
  }).join('');

  return '<div class="brand">' +
    '<div class="brand-mark"></div>' +
    '<div class="brand-text"><div class="brand-name">Evidência</div>' +
    '<div class="brand-sub">Portal do cliente</div></div></div>' +
    '<nav class="nav">' + nav + '</nav>';
}

function renderTopbar() {
  return '<div class="client-chip">' + icon('shield', 12) + 'Cliente: <b>' + CLIENT.tenant + '</b></div>' +
    '<div class="topbar-right">' +
    '<span class="tb-email">' + CLIENT.email + '</span>' +
    '<span class="pill-master">' + CLIENT.role + '</span>' +
    '<span class="tb-link" data-toast="Central de ajuda em construção.">Ajuda</span>' +
    '<span class="tb-sep"></span>' +
    '<div class="who"><div class="avatar">' + CLIENT.name.charAt(0) + '</div>' +
    '<div><div class="who-name">' + CLIENT.name + '</div>' +
    '<div class="who-mail">' + CLIENT.email + '</div></div></div>' +
    '</div>';
}

/* ---------- rotas ---------- */

function route() {
  const raw = location.hash || '#/dashboard';
  const path = raw.split('?')[0];
  const parts = path.replace(/^#\/?/, '').split('/').filter(Boolean);
  return { raw, path, parts };
}

function render() {
  const r = route();
  const view = document.getElementById('view');
  let html = '';

  /* nó selecionado persiste enquanto estiver no editor */
  if (r.parts[0] === 'fluxos' && r.parts[1] === 'editor') {
    html = viewEditor(state.selectedNode);
  } else if (r.parts[0] === 'fluxos') {
    html = viewFluxos();
  } else if (r.parts[0] === 'agentes') {
    html = viewAgentes();
  } else if (r.parts[0] === 'revisao' && r.parts[1]) {
    html = viewCaso(r.parts[1]);
  } else if (r.parts[0] === 'revisao') {
    html = viewMesa(state.mesaTab, state.mesaQ);
  } else if (r.parts[0] === 'execucoes' && r.parts[1]) {
    html = viewExecucao(r.parts[1]);
  } else if (r.parts[0] === 'execucoes') {
    html = viewExecucoes(state.execFilters, state.execPage);
  } else {
    html = viewDashboard();
  }

  view.innerHTML = html;
  document.getElementById('sidebar').innerHTML = renderSidebar();
  document.getElementById('topbar').innerHTML = renderTopbar();
  window.scrollTo(0, 0);

  bindView(r);
}

/* ---------- toasts ---------- */

function toast(msg) {
  const root = document.getElementById('toasts');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = '<span class="ti">' + icon('check', 14) + '</span><span>' + msg + '</span>';
  root.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 220);
  }, 2800);
}

/* ---------- modal ---------- */

function openModal(html, wide) {
  const root = document.getElementById('modal-root');
  root.innerHTML = '<div class="modal-backdrop" data-close="1"></div>' +
    '<div class="modal' + (wide ? ' wide' : '') + '">' + html + '</div>';
  root.classList.add('open');
}

function openSimular() {
  openModal(
    '<div class="modal-head"><div class="modal-title">Simular envio</div>' +
    '<div class="modal-sub">Cria uma execução de teste. Nenhum cliente real é impactado.</div></div>' +
    '<div class="modal-body">' +
    '<div class="field"><label>Nome do solicitante</label><input class="input" id="sim-nome" value="Novo Cliente"></div>' +
    '<div class="field"><label>CNPJ / CPF</label><input class="input" id="sim-doc" value="00.000.000/0001-00"></div>' +
    '<div class="field"><label>Valor solicitado</label><input class="input" id="sim-valor" value="50000"></div>' +
    '<div class="field"><label>Fluxo</label><select class="select" id="sim-fluxo">' +
    '<option>Capital de giro</option><option>Antecipação</option></select></div>' +
    '</div>' +
    '<div class="modal-foot">' +
    '<button class="btn btn-ghost" data-close="1">Cancelar</button>' +
    '<button class="btn btn-primary" id="sim-submit">Iniciar execução</button>' +
    '</div>', false);
}

const AGENT_IO = {
  OCR: {
    in: '{\n  "documento": "https://cdn/contrato.pdf",\n  "tipo": "contrato_social",\n  "paginas": "1-8"\n}',
    out: '{\n  "texto": "…",\n  "paginas": 8,\n  "confianca": 0.98\n}',
    lat: '412 ms', cost: 'R$ 0,004', uptime: '99,98%',
  },
  DOCOSCOPIA: {
    in: '{\n  "imagem": "frente.jpg",\n  "tipo": "rg"\n}',
    out: '{\n  "adulterado": false,\n  "score": 0.97,\n  "achados": []\n}',
    lat: '680 ms', cost: 'R$ 0,012', uptime: '99,95%',
  },
  FACEMATCH: {
    in: '{\n  "selfie": "selfie.jpg",\n  "documento": "rg.jpg"\n}',
    out: '{\n  "similaridade": 0.94,\n  "aprovado": true,\n  "limite": 0.82\n}',
    lat: '940 ms', cost: 'R$ 0,018', uptime: '99,90%',
  },
  BIOMETRIA: {
    in: '{\n  "captura": "video.webm",\n  "prova_de_vida": true\n}',
    out: '{\n  "vivo": true,\n  "score": 0.96\n}',
    lat: '1,2 s', cost: 'R$ 0,021', uptime: '99,90%',
  },
  EXTRATOR: {
    in: '{\n  "texto": "<ocr>",\n  "schema": "faturamento_v2"\n}',
    out: '{\n  "faturamento_anual": 1200000,\n  "socios": ["Ana Souza"],\n  "confianca": 0.91\n}',
    lat: '1,8 s', cost: 'R$ 0,031', uptime: '99,80%',
  },
  COMPROVANTE: {
    in: '{\n  "imagem": "comprovante.jpg",\n  "endereco_esperado": "Rua das Flores, 10"\n}',
    out: '{\n  "titular": "Ana Souza",\n  "endereco_confere": true,\n  "emitido_em": "2026-09-02"\n}',
    lat: '1,1 s', cost: 'R$ 0,022', uptime: '99,80%',
  },
  CNPJ: {
    in: '{\n  "cnpj": "55119811851"\n}',
    out: '{\n  "situacao": "ATIVA",\n  "fundacao": "2015-03-11",\n  "cnae": "47.13-0"\n}',
    lat: '320 ms', cost: 'R$ 0,002', uptime: '99,99%',
  },
  BUREAU: {
    in: '{\n  "cnpj": "55119811851",\n  "produto": "score_pj"\n}',
    out: '{\n  "score": 412,\n  "restricoes": 2,\n  "protestos": 1\n}',
    lat: '520 ms', cost: 'R$ 0,009', uptime: '99,95%',
  },
  LISTAS: {
    in: '{\n  "documento": "55119811851"\n}',
    out: '{\n  "pep": false,\n  "sancionado": false,\n  "ocorrencias": 1\n}',
    lat: '260 ms', cost: 'R$ 0,001', uptime: '99,99%',
  },
  SIMSWAP: {
    in: '{\n  "telefone": "+5511991185102"\n}',
    out: '{\n  "trocou_chip_72h": false,\n  "operadora": "Vivo"\n}',
    lat: '180 ms', cost: 'R$ 0,001', uptime: '99,97%',
  },
  SCORE: {
    in: '{\n  "bureau": 412,\n  "faturamento": 1200000,\n  "restricoes": 2\n}',
    out: '{\n  "score": 582,\n  "faixa": "médio",\n  "limite_sugerido": 76000\n}',
    lat: '90 ms', cost: 'R$ 0,001', uptime: '100%',
  },
};

function openAgent(id) {
  const a = AGENTS.find((x) => x.id === id) || AGENTS[0];
  const io = AGENT_IO[a.id] || AGENT_IO.SCORE;
  openModal(
    '<div class="modal-head">' +
    '<div class="row" style="gap:11px;align-items:flex-start">' +
    '<div class="agent-logo" style="background:' + a.tint + ';margin:0"><span style="color:' + a.ink + '">' + a.mark + '</span></div>' +
    '<div><div class="modal-title">' + a.name + '</div>' +
    '<div class="modal-sub">' + a.kind + ' · ' + a.desc + '</div></div></div></div>' +
    '<div class="modal-body">' +
    '<div class="grid2">' +
    '<div><div class="kv-label">Entrada</div><pre class="code">' + io.in + '</pre></div>' +
    '<div><div class="kv-label">Saída</div><pre class="code">' + io.out + '</pre></div>' +
    '</div>' +
    '<div class="agent-stats">' +
    '<div><div class="kv-label">Latência média</div><div class="kv-value">' + io.lat + '</div></div>' +
    '<div><div class="kv-label">Custo por chamada</div><div class="kv-value">' + io.cost + '</div></div>' +
    '<div><div class="kv-label">Disponibilidade</div><div class="kv-value">' + io.uptime + '</div></div>' +
    '</div>' +
    '</div>' +
    '<div class="modal-foot">' +
    '<button class="btn btn-ghost" data-close="1">Fechar</button>' +
    '<button class="btn btn-primary" id="use-agent" data-agent-name="' + a.name + '">Usar no fluxo</button>' +
    '</div>', true);
}

function closeModal() {
  const root = document.getElementById('modal-root');
  root.classList.remove('open');
  root.innerHTML = '';
}

function submitSimular() {
  const nome = (document.getElementById('sim-nome') || {}).value || 'Novo Cliente';
  const doc = (document.getElementById('sim-doc') || {}).value || '00.000.000/0001-00';
  const valor = Number((document.getElementById('sim-valor') || {}).value || 0);
  const fluxo = (document.getElementById('sim-fluxo') || {}).value || 'Capital de giro';

  const exec = {
    id: 'ex-sim-' + Date.now(),
    pedido: '49' + String(EXECUTIONS.length + 10).slice(-2),
    nome: nome,
    doc: doc,
    email: 'simulacao@evidencia.test',
    valor: valor,
    fluxo: fluxo,
    fase: 'Rodando: Solicitação recebida',
    status: 'andamento',
    quando: 'agora',
    timeline: buildTimeline('default'),
    caseId: null,
  };
  EXECUTIONS.unshift(exec);

  closeModal();
  state.execFilters = { q: '', nome: '', doc: '', email: '', pedido: '', min: '', max: '', fluxo: 'todos', status: 'todos' };
  state.execPage = 1;
  location.hash = '#/execucoes';
  render();
  toast('Execução criada. O fluxo começou a rodar.');
  runSimulation(exec.id);
}

const SIM_STEPS = ['OCR concluído', 'Documentoscopia', 'Consulta CNPJ + bureau', 'Score completo'];

function runSimulation(execId) {
  const exec = EXECUTIONS.find((x) => x.id === execId);
  if (!exec) return;
  let i = 0;
  const tick = () => {
    if (!EXECUTIONS.some((x) => x.id === execId)) return;
    if (i >= SIM_STEPS.length) { finishSimulation(exec); return; }
    exec.fase = 'Rodando: ' + SIM_STEPS[i];
    i += 1;
    paintExec();
    setTimeout(tick, 1300);
  };
  setTimeout(tick, 900);
}

function finishSimulation(exec) {
  const aprovado = Math.random() > 0.4;
  exec.status = aprovado ? 'aprovada' : 'revisao';
  exec.fase = aprovado ? 'Execução concluída' : 'Parou em: Política de crédito';
  exec.timeline = buildTimeline(aprovado ? 'aprovada' : 'divergente');

  if (!aprovado) {
    const id = 'CRD-SIM-' + String(Date.now()).slice(-8);
    CASES.unshift({
      id: id, cliente: exec.nome, doc: exec.doc, valor: exec.valor,
      motivo: 'Alçada acima do limite automático',
      prazo: 'Atrasado 0 h 3 min', entrada: 'agora', status: 'aberto',
      email: exec.email, telefone: '—', endereco: '—', uf: '—',
      aparelho: '—', ip: '—', solicitacao: exec.pedido, score: '—',
      canal: 'Portal', tipo: 'PJ', garantia: '—', faturamento: '—',
      motivos: ['Alçada acima do limite automático.', 'O fluxo exigiu revisão humana.'],
      bureau: 'Consulta não executada para esta simulação.',
      listas: 'Consulta não executada para esta simulação.',
      historico: 'Nenhuma solicitação anterior neste dossiê.',
      execucao: exec.id,
    });
    exec.caseId = id;
  }

  paintExec();
  paintMesa();
  toast(aprovado
    ? 'Execução concluída: crédito aprovado automaticamente.'
    : 'Execução concluída: o caso caiu na Mesa de revisão.');
}

/* ---------- decisão da mesa ---------- */

function decidir(caseId, status) {
  const c = CASES.find((x) => x.id === caseId);
  if (!c) return;
  c.status = status;

  if (c.execucao) {
    const e = EXECUTIONS.find((x) => x.id === c.execucao);
    if (e) {
      e.status = status === 'aprovado' ? 'aprovada' : 'recusada';
      e.fase = status === 'aprovado' ? 'Execução concluída' : 'Parou em: Política de crédito';
      e.timeline = buildTimeline(status === 'aprovado' ? 'aprovada' : 'divergente');
    }
  }

  render();
  toast(status === 'aprovado'
    ? 'Crédito aprovado. Parecer e evidências publicados no webhook.'
    : 'Crédito recusado. O cliente foi notificado e o dossiê foi arquivado.');
}

/* ---------- listeners por tela ---------- */

function fitCanvas() {
  const scroll = document.querySelector('.canvas-scroll');
  const fit = document.querySelector('.canvas-fit');
  if (!scroll || !fit) return;
  const availW = scroll.clientWidth - 20;
  const availH = scroll.clientHeight - 20;
  const k = Math.min(1, availW / 1000, availH / 680);
  const scale = Math.max(0.55, k);
  fit.style.transform = 'scale(' + scale + ')';
  fit.style.width = (1000 * scale) + 'px';
  fit.style.height = (680 * scale) + 'px';
}

function paintExec() {
  const res = execQuery(state.execFilters, state.execPage);
  state.execPage = res.page;
  const body = document.getElementById('exec-body');
  if (!body) return;
  body.innerHTML = execRows(res.slice);
  document.getElementById('exec-count').textContent = res.from + '–' + res.to + ' de ' + res.total;
  document.getElementById('exec-pos').innerHTML = res.page + '<i>/' + res.pages + '</i>';
  document.querySelectorAll('[data-exec-page]').forEach((btn) => {
    const p = Number(btn.getAttribute('data-exec-page'));
    btn.setAttribute('data-exec-page', p);
    if (p < 1 || p > res.pages) btn.setAttribute('disabled', '');
    else btn.removeAttribute('disabled');
  });
}

function paintMesa() {
  const body = document.getElementById('mesa-body');
  if (!body) return;
  const q = state.mesaQ;
  const list = CASES.filter((c) => c.status === state.mesaTab).filter((c) => !q ||
    (c.cliente + ' ' + c.id + ' ' + c.motivo + ' ' + c.doc).toLowerCase().indexOf(q.toLowerCase()) >= 0);
  body.innerHTML = mesaRows(list);
}

function bindView(r) {
  /* editor: encaixa o canvas na área visível */
  fitCanvas();

  /* editor: seleção de nó */
  const canvas = document.querySelector('.canvas');
  if (canvas) {
    canvas.addEventListener('click', (ev) => {
      const el = ev.target.closest('[data-node]');
      if (!el) return;
      const id = el.getAttribute('data-node');
      state.selectedNode = id;
      canvas.querySelectorAll('.node').forEach((n) => n.classList.remove('selected'));
      el.classList.add('selected');
      const body = document.getElementById('props-body');
      if (body) body.innerHTML = propsHtml(id);
    });
  }

  /* jornadas: filtros */
  const map = [
    ['f-q', 'q'], ['f-nome', 'nome'], ['f-doc', 'doc'], ['f-email', 'email'],
    ['f-pedido', 'pedido'], ['f-min', 'min'], ['f-max', 'max'], ['f-fluxo', 'fluxo'], ['f-status', 'status'],
  ];
  map.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (!el) return;
    const evName = el.tagName === 'SELECT' ? 'change' : 'input';
    el.addEventListener(evName, () => {
      state.execFilters[key] = el.value;
      state.execPage = 1;
      paintExec();
    });
  });

  /* mesa: busca */
  const search = document.getElementById('mesa-search');
  if (search) {
    search.addEventListener('input', () => {
      state.mesaQ = search.value;
      paintMesa();
    });
  }

  /* modal */
  const sim = document.getElementById('simular-envio');
  if (sim) sim.addEventListener('click', openSimular);
}

/* ---------- delegação global ---------- */

document.addEventListener('click', (ev) => {
  const group = ev.target.closest('[data-group]');
  if (group) {
    const key = group.getAttribute('data-group');
    state.open[key] = state.open[key] === false;
    document.getElementById('sidebar').innerHTML = renderSidebar();
    return;
  }

  const closeEl = ev.target.closest('[data-close]');
  if (closeEl) { closeModal(); return; }

  const submit = ev.target.closest('#sim-submit');
  if (submit) { submitSimular(); return; }

  const node = ev.target.closest('[data-node]');
  if (node) return; /* tratado no canvas */

  const tab = ev.target.closest('[data-tab]');
  if (tab) {
    state.mesaTab = tab.getAttribute('data-tab');
    state.mesaQ = '';
    render();
    return;
  }

  const decide = ev.target.closest('[data-decide]');
  if (decide) {
    decidir(decide.getAttribute('data-case'), decide.getAttribute('data-decide'));
    return;
  }

  const page = ev.target.closest('[data-exec-page]');
  if (page && !page.hasAttribute('disabled')) {
    state.execPage = Number(page.getAttribute('data-exec-page'));
    paintExec();
    return;
  }

  const nav = ev.target.closest('[data-nav]');
  if (nav) {
    const href = nav.getAttribute('data-nav');
    if (location.hash === href) render(); else location.hash = href;
    return;
  }

  const useAgent = ev.target.closest('#use-agent');
  if (useAgent) {
    closeModal();
    toast(useAgent.getAttribute('data-agent-name') + ' adicionado ao rascunho do fluxo.');
    return;
  }

  const flowEl = ev.target.closest('[data-flow]');
  if (flowEl) {
    state.flowId = flowEl.getAttribute('data-flow');
    render();
    return;
  }

  const agentEl = ev.target.closest('[data-agent]');
  if (agentEl) {
    openAgent(agentEl.getAttribute('data-agent'));
    return;
  }

  const tip = ev.target.closest('[data-toast]');
  if (tip) {
    toast(tip.getAttribute('data-toast'));
    return;
  }
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') closeModal();
});

window.addEventListener('hashchange', render);
window.addEventListener('resize', fitCanvas);

/* ---------- boot ---------- */

if (!location.hash) location.hash = '#/dashboard';
render();
