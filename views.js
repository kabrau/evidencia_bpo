/* =========================================================
   Evidência · views
   ========================================================= */

/* ---------- helpers de apresentação ---------- */

function badge(label, cls) {
  return '<span class="badge ' + cls + '">' + label + '</span>';
}

function execBadge(e) {
  if (e.status === 'divergente') {
    return e.fase.indexOf('Face') >= 0
      ? badge('Face match', 'b-divergente')
      : badge('Em revisão', 'b-revisao');
  }
  const m = EXEC_STATUS[e.status] || EXEC_STATUS.expirada;
  return badge(m.label, m.cls);
}

function caseBadge(status) {
  if (status === 'aberto') return badge('Aberto', 'b-aberto');
  if (status === 'aprovado') return badge('Aprovado', 'b-aprovada');
  if (status === 'recusado') return badge('Recusado', 'b-divergente');
  return badge(status, 'b-neutral');
}

function pageHead(title, sub, right) {
  return '<div class="page-head">' +
    '<div><h1 class="page-title">' + title + '</h1>' +
    (sub ? '<p class="page-sub">' + sub + '</p>' : '') + '</div>' +
    '<div class="spacer"></div>' +
    (right || '') + '</div>';
}

function crumb(label, route) {
  return '<a class="crumb" data-nav="' + route + '">' + icon('arrowLeft', 13) + label + '</a>';
}

function field(label, inner) {
  return '<div class="field"><label>' + label + '</label>' + inner + '</div>';
}

function kv(label, value, extra) {
  return '<div class="kv"><div class="kv-label">' + label + '</div>' +
    '<div class="kv-value ' + (extra || '') + '">' + value + '</div></div>';
}

function docThumb(variant) {
  const id = 'g' + variant + Math.floor(Math.random() * 1000);
  if (variant === 'front') {
    return '<svg viewBox="0 0 132 118" preserveAspectRatio="xMidYMid slice">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#7E8C86"/><stop offset=".55" stop-color="#5E6C67"/><stop offset="1" stop-color="#3E4A46"/>' +
      '</linearGradient></defs>' +
      '<rect width="132" height="118" fill="url(#' + id + ')"/>' +
      '<rect x="14" y="8" width="104" height="108" rx="3" fill="#F4F3EE" transform="rotate(-5 66 62)" stroke="#D7D5CB"/>' +
      '<rect x="20" y="16" width="92" height="92" rx="2" fill="none" stroke="#E4E2D8" transform="rotate(-5 66 62)"/>' +
      '<rect x="26" y="22" width="24" height="28" rx="1.5" fill="#DEDCD2" transform="rotate(-5 66 62)"/>' +
      '<circle cx="38" cy="32" r="5" fill="#C9C6BA" transform="rotate(-5 66 62)"/>' +
      '<path d="M28 46c2-6 18-6 20 0" stroke="#C9C6BA" stroke-width="2" fill="none" transform="rotate(-5 66 62)"/>' +
      '<g fill="#C4C1B5" transform="rotate(-5 66 62)">' +
      '<rect x="56" y="24" width="46" height="3" rx="1.5"/><rect x="56" y="31" width="34" height="3" rx="1.5"/>' +
      '<rect x="26" y="58" width="76" height="2.4" rx="1.2"/><rect x="26" y="64" width="66" height="2.4" rx="1.2"/>' +
      '<rect x="26" y="70" width="72" height="2.4" rx="1.2"/><rect x="26" y="76" width="50" height="2.4" rx="1.2"/>' +
      '<rect x="26" y="88" width="76" height="2.4" rx="1.2"/><rect x="26" y="94" width="58" height="2.4" rx="1.2"/>' +
      '</g></svg>';
  }
  return '<svg viewBox="0 0 132 118" preserveAspectRatio="xMidYMid slice">' +
    '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#6E7C77"/><stop offset=".6" stop-color="#55635E"/><stop offset="1" stop-color="#39443F"/>' +
    '</linearGradient></defs>' +
    '<rect width="132" height="118" fill="url(#' + id + ')"/>' +
    '<rect x="16" y="6" width="102" height="108" rx="3" fill="#F2F1EC" transform="rotate(4 67 60)" stroke="#D7D5CB"/>' +
    '<g fill="#C6C3B7" transform="rotate(4 67 60)">' +
    '<rect x="24" y="16" width="52" height="3" rx="1.5"/><rect x="24" y="23" width="84" height="2.2" rx="1.1"/>' +
    '<rect x="24" y="28" width="78" height="2.2" rx="1.1"/><rect x="24" y="33" width="82" height="2.2" rx="1.1"/>' +
    '<rect x="24" y="42" width="84" height="2.2" rx="1.1"/><rect x="24" y="47" width="64" height="2.2" rx="1.1"/>' +
    '<rect x="24" y="56" width="84" height="2.2" rx="1.1"/><rect x="24" y="61" width="76" height="2.2" rx="1.1"/>' +
    '</g>' +
    '<g transform="rotate(4 67 60)">' +
    '<rect x="24" y="80" width="84" height="16" rx="2" fill="none" stroke="#BDB9AC" stroke-dasharray="2 2"/>' +
    '<rect x="24" y="82" width="84" height="4" fill="#B9B5A8" opacity=".55"/>' +
    '<rect x="24" y="90" width="84" height="4" fill="#B9B5A8" opacity=".35"/>' +
    '</g></svg>';
}

function mapSvg() {
  return '<svg viewBox="0 0 400 178" preserveAspectRatio="xMidYMid slice">' +
    '<rect width="400" height="178" fill="#EDF1EA"/>' +
    '<path d="M0 118 L96 96 L150 120 L150 178 L0 178Z" fill="#DDEBD2"/>' +
    '<path d="M292 0 L400 0 L400 44 L300 58Z" fill="#DDEBD2"/>' +
    '<path d="M226 0 L246 0 L222 178 L202 178Z" fill="#E3E9E0"/>' +
    /* ruas */
    '<g stroke="#FFFFFF" stroke-linecap="square" fill="none">' +
    '<path d="M-10 138 L410 96" stroke-width="13"/>' +
    '<path d="M-10 62 L410 20" stroke-width="9"/>' +
    '<path d="M120 -10 L150 188" stroke-width="9"/>' +
    '<path d="M262 -10 L282 188" stroke-width="7"/>' +
    '<path d="M-10 178 L410 150" stroke-width="6"/>' +
    '<path d="M330 -10 L352 188" stroke-width="5"/>' +
    '</g>' +
    /* via principal */
    '<path d="M60 -10 L118 188" stroke="#F4E4B4" stroke-width="11" fill="none"/>' +
    '<path d="M60 -10 L118 188" stroke="#FBEFC9" stroke-width="8" fill="none"/>' +
    /* quadras */
    '<g fill="#F7F8F4">' +
    '<rect x="156" y="34" width="52" height="46" rx="3"/><rect x="156" y="92" width="52" height="38" rx="3"/>' +
    '<rect x="292" y="72" width="54" height="34" rx="3"/><rect x="292" y="114" width="54" height="28" rx="3"/>' +
    '<rect x="18" y="4" width="34" height="46" rx="3"/>' +
    '</g>' +
    '<g fill="#C9C4B8" font-family="Segoe UI, sans-serif" font-size="5.2">' +
    '<text x="236" y="52" transform="rotate(-15 236 52)">Avenida São João</text>' +
    '<text x="122" y="160" transform="rotate(-14 122 160)">Rua José Alvim</text>' +
    '<text x="170" y="20" transform="rotate(-14 170 20)">Rua Benedito Alves Barbosa</text>' +
    '<text x="300" y="136">Rua das Flores</text>' +
    '</g>' +
    '<circle cx="200" cy="96" r="16" fill="#0FB5A6" opacity=".14"/>' +
    '<path d="M200 82c-6.6 0-12 5.2-12 11.7 0 8.3 12 19.3 12 19.3s12-11 12-19.3C212 87.2 206.6 82 200 82Z" fill="#0FB5A6"/>' +
    '<circle cx="200" cy="94" r="4.2" fill="#fff"/>' +
    '<g transform="translate(364,10)">' +
    '<rect width="26" height="44" rx="4" fill="#fff" opacity=".94" stroke="#E2E7E2"/>' +
    '<path d="M13 12v8M9 16h8" stroke="#8A938C" stroke-width="1.6" stroke-linecap="round"/>' +
    '<path d="M9 31h8" stroke="#8A938C" stroke-width="1.6" stroke-linecap="round"/>' +
    '</g></svg>';
}

/* =========================================================
   1 · Dashboard
   ========================================================= */

function viewDashboard() {
  const kpi = (k) => '<div class="kpi"><div class="kpi-label">' + k.label + '</div>' +
    '<div class="kpi-value">' + k.value + '</div>' +
    '<div class="kpi-note ' + (k.tone || '') + '">' + k.note + '</div></div>';

  const origRows = DASH.origens.map((o) =>
    '<tr><td class="strong">' + o.nome + '</td><td>' + o.aprovacao + '</td><td>' + o.erro + '</td>' +
    '<td>' + o.latencia + '</td><td class="num">' + o.amostra.toLocaleString('pt-BR') + '</td></tr>').join('');

  const dec = DASH.decisao.map((d) =>
    '<div class="kpi"><div class="kpi-label">' + d.label + '</div>' +
    '<div class="kpi-value">' + d.value + '</div><div class="kpi-note">' + d.pct + '</div></div>').join('');

  return pageHead('Olá, ' + CLIENT.name,
    'Um painel da conta, com os indicadores de decisões, aprovação, latência e custo.') +

    '<div class="row-between mb-10">' +
    '<div class="card-title" style="font-size:14px">Motor de Crédito</div>' +
    '<a class="link-btn" data-nav="#/fluxos">Abrir trilha ' + icon('chevronRight', 12) + '</a></div>' +

    '<div class="kpi-grid mb-10">' + DASH.kpis.map(kpi).join('') + '</div>' +
    '<div class="kpi-grid mb-14">' + DASH.kpis2.map(kpi).join('') + '</div>' +

    '<div class="card mb-18"><div class="table-wrap"><table class="data">' +
    '<thead><tr><th>Origem</th><th>Aprovação</th><th>Erro</th><th>Latência</th><th class="num">Amostra</th></tr></thead>' +
    '<tbody>' + origRows + '</tbody></table></div></div>' +

    '<div class="row-between mb-10">' +
    '<div class="card-title" style="font-size:14px">Evidência Score</div>' +
    '<a class="link-btn" data-nav="#/agentes">Abrir trilha ' + icon('chevronRight', 12) + '</a></div>' +

    '<div class="kpi-grid mb-10">' + DASH.score.map(kpi).join('') + '</div>' +
    '<div class="kpi-grid mb-10" style="grid-template-columns:repeat(3,minmax(0,1fr))">' + DASH.score2.map(kpi).join('') + '</div>' +
    '<div class="kpi-grid" style="grid-template-columns:repeat(4,minmax(0,1fr))">' + dec + '</div>';
}

/* =========================================================
   2 · Agentes
   ========================================================= */

function viewAgentes() {
  const cards = AGENTS.map((a, i) =>
    '<div class="agent-card' + (i === 0 ? ' is-active' : '') + '" data-agent="' + a.id + '">' +
    '<div class="agent-badge">' + a.portal + '</div>' +
    '<div class="agent-logo" style="background:' + a.tint + '"><span style="color:' + a.ink + '">' + a.mark + '</span></div>' +
    '<div class="agent-kind">' + a.kind + '</div>' +
    '<div class="agent-name">' + a.name + '</div>' +
    '<div class="agent-id">' + a.id + '</div>' +
    '<div class="agent-cta">Clique para ver o contrato de entrada e saída</div>' +
    '</div>').join('');

  return pageHead('Agentes',
    'Capacidades disponíveis para esta conta. O que não está habilitado não aparece aqui.') +
    '<div class="agent-grid">' + cards + '</div>';
}

/* =========================================================
   3 · Fluxos (biblioteca)
   ========================================================= */

function viewFluxos() {
  const curr = FLOWS.find((f) => f.id === state.flowId) || FLOWS[0];
  const list = FLOWS.map((f) =>
    '<div class="flow-item' + (f.id === curr.id ? ' active' : '') + '" data-flow="' + f.id + '">' +
    '<div class="flow-item-top"><span class="flow-name">' + f.name + '</span>' +
    (f.status === 'PUBLICADO' ? badge('Publicado', 'b-lime') : badge('Rascunho', 'b-neutral')) +
    '</div>' +
    '<div class="flow-meta">' + f.status + ' · ' + f.version + ' · ' + f.updated + '</div>' +
    '<span class="flow-edit" data-nav="#/fluxos/editor">Editor</span>' +
    '</div>').join('');

  const mini = '<div class="mini-canvas">' +
    '<div class="mini-stage">' +
    '<svg class="edges" width="440" height="392" viewBox="0 0 440 392">' +
    '<path d="M124 187 C142 187 144 175 160 175" stroke="#C9D1D7" stroke-width="1.3" fill="none"/>' +
    '<path d="M284 165 C302 165 298 104 316 104" stroke="#C9D1D7" stroke-width="1.3" fill="none"/>' +
    '<path d="M284 185 C302 185 298 252 316 252" stroke="#C9D1D7" stroke-width="1.3" fill="none"/>' +
    '</svg>' +

    '<div class="mini-node inicio" style="left:6px;top:158px;width:118px"><div class="mn-accent"></div>' +
    '<div class="mn-kicker">Início</div><div class="mn-title">Solicitação</div>' +
    '<div class="mn-sub">recebida</div></div>' +

    '<div class="mini-node condicao" style="left:160px;top:146px;width:124px"><div class="mn-accent"></div>' +
    '<div class="mn-kicker">Condição</div><div class="mn-title">Documentos completos?</div>' +
    '<div class="mn-sub">regra determinística</div></div>' +

    '<div class="mini-node fim" style="left:316px;top:74px;width:118px"><div class="mn-accent"></div>' +
    '<div class="mn-kicker">Fim</div><div class="mn-title">Aprovar crédito</div>' +
    '<div class="mn-sub">com limite calculado</div></div>' +

    '<div class="mini-node fim" style="left:316px;top:222px;width:118px"><div class="mn-accent"></div>' +
    '<div class="mn-kicker">Humano</div><div class="mn-title">Mesa de revisão</div>' +
    '<div class="mn-sub">alçada humana</div></div>' +

    '<div class="zoom-rail"><button>+</button><button>−</button><button>' + icon('expand', 11) + '</button></div>' +
    '</div></div>';

  return pageHead('Fluxos',
    'Desenhe e publique o fluxo desta conta. O rascunho é seu; o publicado vale na análise.',
    '<button class="btn btn-primary" data-toast="Rascunho novo criado para edição.">' + icon('plus', 14) + 'Novo rascunho</button>') +

    '<div class="flow-layout">' +
    '<div class="card"><div class="flow-list">' + list + '</div></div>' +
    '<div class="card preview-panel">' +
    '<div class="preview-head">' + curr.name + ' · ' + curr.nodes + ' componentes</div>' +
    mini +
    '</div></div>';
}

/* =========================================================
   4 · Editor de fluxo
   ========================================================= */

function nodePort(n, p, side) {
  const dy = p.dy || 0;
  const cls = 'port ' + side + (p.bad ? ' bad' : (p.label === 'READY' || p.label === 'TRUE' || p.label === 'DONE' || p.label === 'ALTO' ? ' ok' : ''));
  const label = p.label ? '<span>' + p.label + '</span>' : '';
  return '<div class="' + cls + '" style="top:calc(50% + ' + dy + 'px)">' +
    (side === 'out' ? label : '') + '<i class="dot"></i>' + (side === 'in' ? label : '') + '</div>';
}

function renderNode(n, selected) {
  const k = NODE_KINDS[n.kind];
  return '<div class="node node--' + n.kind + (selected === n.id ? ' selected' : '') + '" data-node="' + n.id + '" ' +
    'style="left:' + n.x + 'px;top:' + n.y + 'px;width:' + n.w + 'px">' +
    '<div class="node-accent"></div>' +
    (n.in || []).map((p) => nodePort(n, p, 'in')).join('') +
    (n.out || []).map((p) => nodePort(n, p, 'out')).join('') +
    '<div class="node-body">' +
    '<div class="node-kicker"><i class="nk-dot" style="background:' + k.color + '"></i>' + k.label + '</div>' +
    '<div class="node-title">' + n.title + '</div>' +
    '<div class="node-sub">' + n.sub + '</div>' +
    (n.flag ? '<div class="node-flag">' + icon('alert', 8) + n.flag + '</div>' : '') +
    '</div></div>';
}

function nodePoint(node, portId, side) {
  const ports = (side === 'out' ? node.out : node.in) || [];
  const p = ports.find((x) => x.id === portId) || { dy: 0 };
  const y = node.y + node.h / 2 + (p.dy || 0);
  const x = side === 'out' ? node.x + node.w : node.x;
  return [x, y];
}

function renderEdges() {
  const byId = {};
  FLOW_NODES.forEach((n) => { byId[n.id] = n; });
  const paths = FLOW_EDGES.map(([a, ap, b, bp]) => {
    const na = byId[a], nb = byId[b];
    if (!na || !nb) return '';
    const [x1, y1] = nodePoint(na, ap, 'out');
    const [x2, y2] = nodePoint(nb, bp, 'in');
    const dx = x2 - x1;
    const c = Math.max(24, Math.min(90, Math.abs(dx) * 0.55));
    return '<path d="M' + x1 + ' ' + y1 + ' C' + (x1 + c) + ' ' + y1 + ', ' + (x2 - c) + ' ' + y2 + ', ' + x2 + ' ' + y2 + '" ' +
      'stroke="#C6CFD6" stroke-width="1.35" fill="none"/>';
  }).join('');
  return '<svg class="edges">' + paths + '</svg>';
}

function nodeRail() {
  const order = ['inicio', 'condicao', 'decisao', 'regra', 'agente', 'consulta', 'score', 'doc', 'humano'];
  return order.map((k, i) =>
    (i === 4 || i === 7 ? '<div class="rail-sep"></div>' : '') +
    '<button class="rail-btn" title="' + NODE_KINDS[k].label + '" data-toast="Arraste para o canvas para adicionar um nó ' + NODE_KINDS[k].label + '.">' +
    icon(NODE_KINDS[k].icon, 15) + '</button>').join('');
}

function propsHtml(nodeId) {
  const n = FLOW_NODES.find((x) => x.id === nodeId) || FLOW_NODES[5];
  const p = NODE_PROPS[n.id] || NODE_PROPS.score;
  const k = NODE_KINDS[n.kind];

  return '<div class="props-head">' +
    '<span class="ph-title">Nó</span>' +
    '<span class="ph-badge">' + p.kindLabel + '</span>' +
    '<button class="ph-remove" data-toast="Remover nó exige salvar o rascunho.">' + icon('trash', 13) + '</button>' +
    '</div>' +

    '<div class="field"><label>Nome do nó</label>' +
    '<input class="input" value="' + p.name + '"></div>' +

    '<div class="field"><label>Descrição</label>' +
    '<div class="box">' + p.desc + '</div></div>' +

    (p.note ? '<div class="field"><div class="box warn">' +
      '<div style="font-weight:600;margin-bottom:4px">' + p.note.title + '</div>' +
      '<ul>' + p.note.body.map((b) => '<li>' + b + '</li>').join('') + '</ul></div></div>' : '') +

    '<div class="field"><label>' + (n.kind === 'agente' ? 'Instruções do agente' : 'Regras') + '</label>' +
    '<div class="box"><ul>' + p.rules.map((r) => '<li>' + r + '</li>').join('') + '</ul></div></div>' +

    (p.bands ? '<div class="field"><label>Bandas de decisão</label>' +
      '<div class="bands">' +
      '<div class="band-head"><span>Nome</span><span>Mín</span><span>Máx</span></div>' +
      p.bands.map((b) => '<div class="band-row">' +
        '<span class="band-name">' + b.name + '</span>' +
        '<input value="' + b.min + '"><input value="' + b.max + '">' +
        '</div>').join('') +
      '</div><div class="band-add">+ nova banda</div></div>' : '') +

    '<div class="field"><label>Saída</label>' +
    '<div class="box" style="font-family:ui-monospace,Consolas,monospace;font-size:10px;color:#5C666F">' +
    '{ "node": "' + n.id + '", "type": "' + n.kind + '", "status": "ok" }</div></div>';
}

function viewEditor(selected) {
  const nodes = FLOW_NODES.map((n) => renderNode(n, selected)).join('');

  return '<div class="editor-bar">' +
    '<div class="flow-crumb">' +
    '<span class="crumb" style="margin:0" data-nav="#/fluxos">' + icon('arrowLeft', 13) + 'Fluxos</span>' +
    '<span class="sep">–</span>' +
    '<span>Decisão de Crédito PJ</span>' +
    '<span class="vtag">RASCUNHO</span><span class="vtag">v4</span>' +
    '</div>' +
    '<div class="editor-actions">' +
    '<button class="icon-action" title="Recarregar" data-toast="Fluxo recarregado do rascunho salvo.">' + icon('refresh', 15) + '</button>' +
    '<button class="link-btn" data-toast="Nós reorganizados automaticamente.">' + icon('grip', 14) + 'Organizar</button>' +
    '<button class="link-btn" data-toast="Fluxo válido: 10 nós, 10 conexões, 0 nós órfãos.">' + icon('check', 14) + 'Validar</button>' +
    '<button class="link-btn" data-toast="Publicação exige aprovação de um administrador.">' + icon('upload', 14) + 'Publicar</button>' +
    '<button class="btn btn-primary btn-sm" data-toast="Rascunho salvo.">' + icon('save', 13) + 'Salvar</button>' +
    '<button class="link-btn" data-toast="Pré-visualização disponível apenas em produção.">' + icon('eye', 14) + 'Visualizar</button>' +
    '<button class="link-btn" style="color:#C0363B" data-toast="Excluir exige confirmação em duas etapas.">' + icon('trash', 14) + 'Excluir</button>' +
    '</div></div>' +

    '<div class="editor-shell">' +
    '<div class="node-rail">' + nodeRail() + '</div>' +
    '<div class="canvas-scroll"><div class="canvas-fit"><div class="canvas">' +
    '<div class="canvas-toolbar"><span class="tb-chip">' + FLOW_NODES.length + ' nós</span>' +
    '<span class="tb-chip">' + FLOW_EDGES.length + ' conexões</span></div>' +
    renderEdges() + nodes +
    '</div></div></div>' +
    '<div class="props">' +
    '<div class="props-tabs"><div class="props-tab active">Nó</div><div class="props-tab" data-toast="Teste do nó roda em sandbox isolado.">Testar</div></div>' +
    '<div class="props-body" id="props-body">' + propsHtml(selected) + '</div>' +
    '</div>' +
    '</div>';
}

/* =========================================================
   5 · Mesa de revisão
   ========================================================= */

function mesaRows(cases) {
  if (!cases.length) {
    return '<tr><td colspan="7"><div class="empty"><div class="e-title">Nenhum caso nesta aba</div>' +
      '<div class="e-sub">Quando um fluxo exigir alçada humana, o caso aparece aqui.</div></div></td></tr>';
  }
  return cases.map((c) =>
    '<tr class="rowlink" data-nav="#/revisao/' + c.id + '">' +
    '<td class="cell-mono strong">' + c.id + '</td>' +
    '<td><span class="strong">' + c.cliente + '</span><span class="sub">' + c.doc + '</span></td>' +
    '<td class="strong">' + brl(c.valor) + '</td>' +
    '<td class="cell-clip">' + c.motivo + '</td>' +
    '<td><span style="color:#C0363B;font-size:11.5px;font-weight:600">' + c.prazo + '</span></td>' +
    '<td class="muted">' + c.entrada + '</td>' +
    '<td>' + caseBadge(c.status) + '</td>' +
    '</tr>').join('');
}

function viewMesa(tab, q) {
  const counts = {
    aberto: CASES.filter((c) => c.status === 'aberto').length,
    aprovado: CASES.filter((c) => c.status === 'aprovado').length,
    recusado: CASES.filter((c) => c.status === 'recusado').length,
  };
  const list = CASES.filter((c) => c.status === tab).filter((c) => !q ||
    (c.cliente + ' ' + c.id + ' ' + c.motivo + ' ' + c.doc).toLowerCase().indexOf(q.toLowerCase()) >= 0);

  const tabHtml = (id, label) => '<div class="tab ' + (tab === id ? 'active' : '') + '" data-tab="' + id + '">' +
    label + '<span class="count">' + counts[id] + '</span></div>';

  return pageHead('Mesa de revisão',
    'Fila de casos que pedem análise humana. Abra um caso para ver o histórico do cliente e decidir.') +
    '<div class="card" style="padding:0 16px">' +
    '<div class="tabs">' + tabHtml('aberto', 'Abertos') + tabHtml('aprovado', 'Aprovados') + tabHtml('recusado', 'Negados') + '</div>' +
    '<div style="padding:14px 0 4px">' +
    '<div class="search-inline">' + icon('search', 14) +
    '<input class="input" id="mesa-search" placeholder="Pedido, CNPJ ou motivo" value="' + (q || '') + '">' +
    '</div></div>' +
    '<div class="table-wrap"><table class="data">' +
    '<thead><tr><th>Pedido</th><th>Cliente</th><th>Valor</th><th>Por que caiu aqui</th>' +
    '<th>Prazo</th><th>Entrada</th><th>Situação</th></tr></thead>' +
    '<tbody id="mesa-body">' + mesaRows(list) + '</tbody></table></div>' +
    '<div class="pager"><span>' + (list.length ? '1–' + list.length + ' de ' + list.length : '0 de 0') + '</span>' +
    '<span class="spacer"></span>' +
    '<span class="pager-btn" disabled>' + icon('chevronLeft', 12) + 'Anterior</span>' +
    '<span class="pager-pos">1<i>/1</i></span>' +
    '<span class="pager-btn" disabled>Próxima' + icon('chevronRight', 12) + '</span></div>' +
    '</div>';
}

/* =========================================================
   6 · Detalhe do caso
   ========================================================= */

function viewCaso(id) {
  const c = CASES.find((x) => x.id === id);
  if (!c) return '<div class="empty"><div class="e-title">Caso não encontrado</div></div>';

  const kv6 = [
    ['Nome', c.cliente], ['CNPJ', c.doc], ['Telefone', c.telefone],
    ['E-mail', c.email], ['Endereço', c.endereco], ['UF cadastro', c.uf],
    ['Aparelho', c.aparelho], ['IP', c.ip], ['Solicitação', c.solicitacao],
    ['Valor', brl(c.valor)], ['Score', c.score], ['Origem', c.canal],
    ['Tipo', c.tipo], ['Garantia', c.garantia], ['Endereço de entrega', c.endereco],
    ['UF entrega', c.uf], ['Faturamento declarado', c.faturamento], ['3DS', '—'],
  ].map(([k, v]) => kv(k, v, v === '—' ? 'dim' : '')).join('');

  const closed = c.status !== 'aberto';

  return crumb('Voltar à fila', '#/revisao') +
    '<div class="page-head">' +
    '<div><h1 class="page-title">Pedido ' + c.id + '</h1>' +
    '<p class="page-sub">Leia a empresa, a solicitação e o motivo da revisão antes de decidir.</p></div>' +
    '<div class="spacer"></div>' +
    '<div class="row">' + caseBadge(c.status) +
    (closed ? '' :
      '<button class="btn btn-primary" data-decide="aprovado" data-case="' + c.id + '">Aprovar</button>' +
      '<button class="btn btn-danger-ghost" data-decide="recusado" data-case="' + c.id + '">Recusar</button>') +
    '</div></div>' +

    (closed ? '' : '<div class="sla-banner">' + icon('clock', 14) + 'Prazo ' + c.prazo.toLowerCase() + '</div>') +

    '<div class="detail-grid">' +
    '<div class="detail-main">' +

    '<div class="card"><div class="card-head"><div class="card-title">' + icon('chevronDown', 12, 'class="chev"') +
    'Empresa e solicitação</div></div>' +
    '<div class="card-body"><div class="kv-grid" style="grid-template-columns:repeat(3,minmax(0,1fr))">' + kv6 + '</div></div></div>' +

    '<div class="card"><div class="card-head"><div class="card-title">' + icon('chevronDown', 12, 'class="chev"') +
    'Por que pediu revisão</div></div>' +
    '<div class="card-body"><div class="chips">' +
    c.motivos.map((m, i) => '<span class="chip' + (i === 0 ? ' risk' : '') + '">' + m + '</span>').join('') +
    '</div></div></div>' +

    '<div class="card"><div class="card-head"><div class="card-title">' + icon('chevronDown', 12, 'class="chev"') +
    'Fontes consultadas</div></div>' +
    '<div class="card-body">' +
    '<div class="kv-label">Bureau</div><div class="kv-value" style="margin-bottom:12px">' + c.bureau + '</div>' +
    '<div class="kv-label">Listas</div><div class="kv-value" style="margin-bottom:12px">' + c.listas + '</div>' +
    '<div class="kv-label">Solicitações do cliente</div><div class="kv-value dim">' + c.historico + '</div>' +
    '</div></div>' +

    '</div>' +

    '<div class="aside-stack">' +
    '<div class="card decision-card">' +
    '<div class="card-head"><div class="card-title">Sua decisão</div></div>' +
    '<div class="card-body">' +
    '<div class="kv-label">Entrada</div><div class="kv-value" style="margin-bottom:12px">' + c.entrada + '</div>' +
    '<div class="field"><label>Nota</label>' +
    '<textarea class="input" rows="4" id="nota-decisao" placeholder="O que você observou (opcional)"></textarea></div>' +
    (closed
      ? '<div class="decision-actions"><button class="btn btn-ghost" data-toast="Decisão já registrada para este caso.">' + icon('check', 14) + 'Decisão registrada</button></div>'
      : '<div class="decision-actions">' +
      '<button class="btn btn-primary" data-decide="aprovado" data-case="' + c.id + '">Aprovar crédito</button>' +
      '<button class="btn btn-danger-ghost" data-decide="recusado" data-case="' + c.id + '">Recusar crédito</button>' +
      '</div>') +
    '<div class="link-action" data-toast="Dado incluído nas listas internas da conta.">' + icon('plus', 11) + 'Incluir dado em listas</div>' +
    '</div></div>' +

    (c.execucao
      ? '<div class="card"><div class="card-body">' +
      '<div class="kv-label">Execução de origem</div>' +
      '<a class="link-btn" style="padding-left:0;margin-top:4px" data-nav="#/execucoes/' + c.execucao + '">' +
      icon('activity', 13) + 'Ver a execução completa</a></div></div>'
      : '') +
    '</div></div>';
}

/* =========================================================
   7 · Execuções
   ========================================================= */

function execRows(list) {
  return list.map((e) => {
    const f = e.fase;
    const tone = e.status === 'divergente' ? (f.indexOf('Face') >= 0 ? 'b-divergente' : 'b-revisao') : '';
    return '<tr class="rowlink" data-nav="#/execucoes/' + e.id + '">' +
      '<td class="cell-mono strong">' + e.pedido + '</td>' +
      '<td class="strong">' + e.nome + '</td>' +
      '<td class="cell-mono">' + e.doc + '</td>' +
      '<td class="strong">' + brl(e.valor) + '</td>' +
      '<td>' + f + '</td>' +
      '<td>' + execBadge(e) + '</td>' +
      '<td class="muted">' + e.quando + '</td>' +
      '</tr>';
  }).join('');
}

function execQuery(f, page) {
  const per = 10;
  const filtered = EXECUTIONS.filter((e) => {
    if (f.q) {
      const hay = (e.nome + ' ' + e.doc + ' ' + e.email + ' ' + e.pedido + ' ' + e.fluxo).toLowerCase();
      if (hay.indexOf(f.q.toLowerCase()) < 0) return false;
    }
    if (f.nome && e.nome.toLowerCase().indexOf(f.nome.toLowerCase()) < 0) return false;
    if (f.doc && e.doc.indexOf(f.doc) < 0) return false;
    if (f.email && e.email.toLowerCase().indexOf(f.email.toLowerCase()) < 0) return false;
    if (f.pedido && e.pedido.indexOf(f.pedido) < 0) return false;
    if (f.min && e.valor < Number(f.min)) return false;
    if (f.max && e.valor > Number(f.max)) return false;
    if (f.fluxo && f.fluxo !== 'todos' && e.fluxo !== f.fluxo) return false;
    if (f.status && f.status !== 'todos' && e.status !== f.status) return false;
    return true;
  });
  const pages = Math.max(1, Math.ceil(filtered.length / per));
  const p = Math.min(Math.max(1, page), pages);
  const slice = filtered.slice((p - 1) * per, p * per);
  const from = filtered.length ? (p - 1) * per + 1 : 0;
  const to = Math.min(p * per, filtered.length);
  return { slice: slice, pages: pages, page: p, from: from, to: to, total: filtered.length };
}

function viewExecucoes(f, page) {
  const res = execQuery(f, page);
  const slice = res.slice, pages = res.pages, p = res.page;
  const from = res.from, to = res.to, total = res.total;

  return pageHead('Execuções',
    'Pesquise pelo comprador, CNPJ, valor ou pedido. Abra uma linha para ver a execução.',
    '<button class="link-btn" id="simular-envio">' + icon('zap', 14) + 'Simular envio</button>') +

    '<div class="filters">' +
    field('Busca', '<input class="input" id="f-q" placeholder="Nome, CNPJ, e-mail" value="' + (f.q || '') + '">') +
    field('Nome do cliente', '<input class="input" id="f-nome" placeholder="" value="' + (f.nome || '') + '">') +
    field('CNPJ / CPF', '<input class="input" id="f-doc" placeholder="" value="' + (f.doc || '') + '">') +
    field('E-mail', '<input class="input" id="f-email" placeholder="" value="' + (f.email || '') + '">') +
    field('Pedido', '<input class="input" id="f-pedido" placeholder="" value="' + (f.pedido || '') + '">') +
    field('Valor mín.', '<input class="input" id="f-min" placeholder="0,00" value="' + (f.min || '') + '">') +
    field('Valor máx.', '<input class="input" id="f-max" placeholder="0,00" value="' + (f.max || '') + '">') +
    field('Fluxo', '<select class="select" id="f-fluxo">' +
      ['todos', 'Capital de giro', 'Antecipação'].map((o) =>
        '<option value="' + o + '"' + (f.fluxo === o ? ' selected' : '') + '>' + (o === 'todos' ? 'Todos' : o) + '</option>').join('') +
      '</select>') +
    field('Status', '<select class="select" id="f-status">' +
      [['todos', 'Todos'], ['aprovada', 'Aprovada'], ['divergente', 'Em revisão'], ['expirada', 'Expirada'], ['falha', 'Falha no envio']]
        .map(([v, l]) => '<option value="' + v + '"' + (f.status === v ? ' selected' : '') + '>' + l + '</option>').join('') +
      '</select>') +
    '</div>' +

    '<div class="card"><div class="table-wrap"><table class="data">' +
    '<thead><tr><th>Pedido</th><th>Nome</th><th>CNPJ / CPF</th><th>Valor</th><th>Fase</th><th>Status</th><th>Quando</th></tr></thead>' +
    '<tbody id="exec-body">' + execRows(slice) + '</tbody></table></div>' +
    '<div class="pager" style="padding:12px 16px 14px">' +
    '<span id="exec-count">' + from + '–' + to + ' de ' + total + '</span>' +
    '<span class="spacer"></span>' +
    '<span class="pager-btn" data-exec-page="' + (p - 1) + '"' + (p <= 1 ? ' disabled' : '') + '>' + icon('chevronLeft', 12) + 'Anterior</span>' +
    '<span class="pager-pos" id="exec-pos">' + p + '<i>/' + pages + '</i></span>' +
    '<span class="pager-btn" data-exec-page="' + (p + 1) + '"' + (p >= pages ? ' disabled' : '') + '>Próxima' + icon('chevronRight', 12) + '</span>' +
    '</div></div>';
}

/* =========================================================
   8 · Detalhe da execução
   ========================================================= */

function viewExecucao(id) {
  const e = EXECUTIONS.find((x) => x.id === id);
  if (!e) return '<div class="empty"><div class="e-title">Execução não encontrada</div></div>';

  const d = Object.assign({}, EXEC_DETAIL, {
    nome: e.nome,
    doc: e.doc,
    email: e.email,
    valor: e.valor,
    produto: e.fluxo,
    pedido: e.pedido,
    fase: e.fase,
    caseId: e.caseId,
    timeline: e.timeline,
  });
  const steps = d.timeline.map((s) => {
    const iconSvg = s.state === 'stop' ? icon('x', 8) : icon('check', 8);
    return '<div class="tl-item ' + s.state + '">' +
      '<span class="tl-dot">' + iconSvg + '</span>' +
      '<div class="tl-title">' + s.t + '</div>' +
      '<div class="tl-desc">' + s.d + '</div>' +
      (s.state === 'stop' ? '<span class="tl-tag">' + icon('alert', 9) + 'Parou aqui</span>' : '') +
      '</div>';
  }).join('');

  const kvs = [
    ['Nome', d.nome], ['CNPJ / CPF', d.doc], ['E-mail', d.email],
    ['CPF informado', d.cpfInformado], ['Endereço', d.endereco], ['Solicitação', d.pedido],
    ['Valor', brl(d.valor)], ['Produto', d.produto], ['Parcelas', d.parcelas],
    ['Garantia', d.garantia], ['Origem', d.origem], ['Loja', d.loja],
    ['Criado', d.criado], ['Expirado', d.expirado], ['Concluído', d.concluido],
    ['Mensagem', d.mensagem], ['Confiança', d.confianca], ['Reconheceu a solicitação', d.reconheceu],
    ['Titular confere', d.titular], ['Tempo de resposta', d.tempo], ['Tipo', d.tipo],
    ['Jornada', '<span class="cell-mono" style="font-size:10.5px">' + d.jornadaId.slice(0, 18) + '…</span> ' +
      '<span class="pill">Copiar</span>'],
  ];

  const kvHtml = kvs.map(([k, v]) => kv(k, v)).join('');

  const tele = d.telemetria.map(([k, v]) =>
    '<div class="kv"><div class="kv-label">' + k + '</div><div class="kv-value">' + v + '</div></div>').join('');

  return crumb('Voltar às jornadas', '#/execucoes') +
    '<div class="page-head">' +
    '<div><h1 class="page-title">Solicitação ' + d.pedido + '</h1>' +
    '<p class="page-sub">' + d.fase + '</p></div>' +
    '<div class="spacer"></div>' +
    '<div class="row">' +
    execBadge(e) +
    (d.caseId ? '<button class="btn btn-primary" data-nav="#/revisao/' + d.caseId + '">' + icon('users', 14) + 'Abrir caso na Mesa</button>' : '') +
    '<button class="btn btn-ghost" data-toast="Link da execução copiado.">' + icon('copy', 13) + 'Copiar link</button>' +
    '</div></div>' +

    '<div class="detail-grid">' +

    '<div class="detail-main">' +
    '<div class="card"><div class="card-head"><div class="card-title">' + icon('chevronDown', 12, 'class="chev"') +
    'Detalhes da solicitação</div></div>' +
    '<div class="card-body"><div class="kv-grid" style="grid-template-columns:repeat(4,minmax(0,1fr))">' + kvHtml + '</div></div></div>' +

    '<div class="detail-split">' +

    '<div class="card"><div class="card-head"><div class="card-title">' + icon('chevronDown', 12, 'class="chev"') +
    'Evidências</div>' +
    '<div class="card-actions">' +
    '<button class="icon-btn-round">' + icon('chevronLeft', 11) + '</button>' +
    '<button class="icon-btn-round">' + icon('chevronRight', 11) + '</button>' +
    '</div></div>' +
    '<div class="card-body" style="padding-top:6px">' +
    '<div class="evidence-row">' +
    '<div class="evidence">' + docThumb('front') + '<div class="evidence-cap">Frente do documento</div></div>' +
    '<div class="evidence">' + docThumb('back') + '<div class="evidence-cap">Verso do documento</div></div>' +
    '</div>' +
    '<div class="scroll-track"></div>' +
    '</div></div>' +

    '<div class="card map-card"><div class="card-head"><div class="card-title">' + icon('chevronDown', 12, 'class="chev"') +
    'Mapa</div></div>' +
    '<div class="map-img">' + mapSvg() + '</div>' +
    '<div class="map-meta"><span class="coord">' + d.mapa.coord + '</span>' +
    '<b style="margin-top:4px">Endereço aproximado</b>' +
    d.mapa.end + '<br>' + d.mapa.bairro +
    '<div class="map-links"><a>Ver no Google Maps</a><a>Abrir no OpenStreetMap</a></div>' +
    '</div></div>' +

    '</div>' +

    '<div class="card"><div class="card-head"><div class="card-title">' + icon('chevronDown', 12, 'class="chev"') +
    'Telemetria</div></div>' +
    '<div class="card-body"><div class="kv-grid" style="grid-template-columns:repeat(4,minmax(0,1fr))">' + tele + '</div></div></div>' +

    '</div>' +

    '<div class="aside-stack">' +
    '<div class="card">' +
    '<div class="card-body" style="padding-bottom:12px">' +
    '<div class="section-label" style="font-size:8px">Análise de crédito</div>' +
    '<div style="font-size:17px;font-weight:650;letter-spacing:-.02em;margin-top:4px">Política de crédito</div>' +
    '<div style="font-size:13px;font-weight:600;margin-top:6px">' + brl(d.valor) + '</div>' +
    '<div class="row" style="gap:6px;margin-top:6px">' +
    '<span class="pill">CNPJ ' + d.doc + '</span><span class="pill">' + d.loja + '</span></div>' +
    '</div>' +
    '<div style="height:1px;background:var(--line-soft)"></div>' +
    '<div class="card-body" style="padding-top:12px"><div class="timeline">' + steps + '</div></div>' +
    '</div>' +

    '<div class="card"><div class="card-body">' +
    '<div class="kv-label">Fluxo</div>' +
    '<div class="kv-value">' + d.fluxo + '</div>' +
    '<div class="divider"></div>' +
    '<div class="kv-label">Identificador</div>' +
    '<div class="kv-value cell-mono" style="font-size:10.5px;word-break:break-all">' + d.jornadaId + '</div>' +
    '</div></div>' +
    '</div></div>';
}
