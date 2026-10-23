/* =========================================================
   Evidência · dados fictícios do protótipo
   ========================================================= */

const CLIENT = {
  tenant: 'CLI_A65KR8HNYA33GXVBM0E7',
  name: 'Douglas',
  email: 'dgs777@gmail.com',
  role: 'Master',
};

/* ---------- formatadores ---------- */

const brl = (n) => 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const brlShort = (n) => {
  if (n >= 1e6) return 'R$ ' + (n / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + ' mi';
  if (n >= 1e3) return 'R$ ' + (n / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil';
  return brl(n);
};
const pct = (n, d = 1) => Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }) + '%';

/* ---------- ícones ---------- */

const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
  receipt: '<path d="M5 3h14v18l-2.5-1.6L14 21l-2-1.6L10 21l-2.5-1.6L5 21V3Z"/><path d="M9 8h6M9 12h6"/>',
  gauge: '<path d="M12 21a9 9 0 1 0-9-9"/><path d="M3 12a9 9 0 0 1 9-9"/><path d="m12 12 4-4"/><circle cx="12" cy="12" r="1.4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  shield: '<path d="M12 3 5 6v6c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.2 2.7-5.4 6-5.4s6 2.2 6 5.4"/><path d="M16.5 5.2a3.2 3.2 0 0 1 0 6.1M18 14.9c2 .7 3.3 2.3 3.3 4.5"/>',
  link: '<path d="M10.6 13.4a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7L11.8 6.5"/><path d="M13.4 10.6a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.4-1.4"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  arrowLeft: '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  alert: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  mapPin: '<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  phone: '<path d="M6 3h3l1.6 4-2 1.4a12 12 0 0 0 6 6l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/><path d="M6 15h4"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M9.5 17.5h5"/>',
  scale: '<path d="M12 3v18M7 21h10"/><path d="M4 8h6l-3 5-3-5ZM14 8h6l-3 5-3-5Z"/><path d="M4 8 2 6M20 8l2-2"/>',
  database: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  zap: '<path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/>',
  activity: '<path d="M3 12h4l2.5-7 4.5 14 2.5-7h5"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  save: '<path d="M5 3h11l3 3v15H5V3Z"/><path d="M8 3v6h8V3"/><rect x="8" y="13" width="8" height="5"/>',
  upload: '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.6" r=".7" fill="currentColor"/>',
  grip: '<circle cx="9" cy="6" r="1.1" fill="currentColor"/><circle cx="15" cy="6" r="1.1" fill="currentColor"/><circle cx="9" cy="12" r="1.1" fill="currentColor"/><circle cx="15" cy="12" r="1.1" fill="currentColor"/><circle cx="9" cy="18" r="1.1" fill="currentColor"/><circle cx="15" cy="18" r="1.1" fill="currentColor"/>',
};

function icon(name, size = 16, extra = '') {
  const p = ICONS[name] || '';
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ' + extra + '>' + p + '</svg>';
}

/* =========================================================
   Navegação
   ========================================================= */

const NAV = [
  { kind: 'item', label: 'Dashboard', icon: 'grid', route: '#/dashboard' },
  { kind: 'item', label: 'Faturamento', icon: 'receipt', disabled: true },
  {
    kind: 'group', label: 'Motor de Crédito', icon: 'gauge', items: [
      { label: 'Política', disabled: true },
      { label: 'Score', disabled: true },
      { label: 'Listas', disabled: true },
      { label: 'Mesa', route: '#/revisao' },
      { label: 'Trilha', disabled: true },
    ],
  },
  {
    kind: 'group', label: 'Fluxos', icon: 'layers', items: [
      { label: 'Biblioteca', route: '#/fluxos' },
      { label: 'Agentes', route: '#/agentes' },
      { label: 'Simulador', disabled: true },
      { label: 'Documentação', disabled: true },
    ],
  },
  {
    kind: 'group', label: 'Execuções', icon: 'activity', items: [
      { label: 'Jornadas', route: '#/execucoes' },
      { label: 'Evidências', disabled: true },
    ],
  },
  {
    kind: 'group', label: 'Integrações', icon: 'link', items: [
      { label: 'Providers', disabled: true },
      { label: 'Webhooks', disabled: true },
      { label: 'Chaves de API', disabled: true },
    ],
  },
  { kind: 'item', label: 'Configurações', icon: 'settings', disabled: true },
];

/* =========================================================
   Dashboard
   ========================================================= */

const DASH = {
  kpis: [
    { label: 'Aprovação', value: '83,1%', note: '412 de 496 decisões' },
    { label: 'Valor decidido', value: 'R$ 7.752.924,86', note: 'no mês corrente' },
    { label: 'Análises', value: '3.459', note: '+12,4% vs. mês anterior', tone: 'good' },
    { label: 'Latência média', value: '250 ms', note: 'p95 em 1.034 ms' },
    { label: 'Custo médio', value: '2,0%', note: 'R$ 0,041 por análise' },
  ],
  kpis2: [
    { label: 'Taxa de erro', value: '0,7%', note: '24 de 3.459', tone: 'bad' },
    { label: 'Taxa de revisão', value: '16,9%', note: '584 casos para a Mesa' },
    { label: 'Latência máx.', value: '1.034 ms', note: 'agente de extração' },
    { label: 'Retentativas', value: '170', note: 'falhas recuperadas' },
    { label: 'Recuperadas', value: '158', note: 'aprovadas após nova tentativa', tone: 'good' },
  ],
  origens: [
    { nome: 'Portal', aprovacao: '100,0%', erro: '0,0%', latencia: '415 ms', amostra: 8 },
    { nome: 'API', aprovacao: '92,5%', erro: '0,6%', latencia: '352 ms', amostra: 559 },
    { nome: 'Lote', aprovacao: '82,1%', erro: '1,1%', latencia: '580 ms', amostra: 240 },
    { nome: 'Webhook', aprovacao: '81,1%', erro: '0,4%', latencia: '198 ms', amostra: 2652 },
  ],
  score: [
    { label: 'Análises', value: '496', note: 'no ciclo atual' },
    { label: 'Síncrono', value: '381', note: '77% do volume' },
    { label: 'Assíncrono', value: '115', note: '23% do volume' },
    { label: 'Score médio', value: '612', note: 'escala 0–1.000' },
    { label: 'Aprovação', value: '83,1%', note: 'política vigente' },
  ],
  score2: [
    { label: 'Desafio', value: '4,2%', note: 'step-up aplicado' },
    { label: 'Negado', value: '12,7%', note: 'regra determinística' },
    { label: 'Revisão', value: '16,9%', note: 'alçada humana' },
  ],
  decisao: [
    { label: 'Approve', value: '412', pct: '83,1%' },
    { label: 'Challenge', value: '21', pct: '4,2%' },
    { label: 'Deny', value: '63', pct: '12,7%' },
    { label: 'Review', value: '84', pct: '16,9%' },
  ],
};

/* =========================================================
   Agentes / capacidades
   ========================================================= */

const AGENTS = [
  { id: 'OCR', name: 'OCR AcertPix', kind: 'Extraição', portal: 'PORTAL', mark: 'OCR', tint: '#EAF2FE', ink: '#2257B8', desc: 'Texto e tabelas de PDFs e imagens.' },
  { id: 'DOCOSCOPIA', name: 'Documentoscopia', kind: 'Capacidade', portal: 'PORTAL', mark: 'AC', tint: '#E8F7F4', ink: '#087F72', desc: 'Adulteração, recorte e template.' },
  { id: 'FACEMATCH', name: 'Face Match', kind: 'Capacidade', portal: 'PORTAL', mark: 'FM', tint: '#EFF1FD', ink: '#4534C9', desc: 'Similaridade entre selfie e documento.' },
  { id: 'BIOMETRIA', name: 'Biometria', kind: 'Capacidade', portal: 'PORTAL', mark: 'BIO', tint: '#FDF0E6', ink: '#A85A00', desc: 'Prova de vida e captura facial.' },
  { id: 'EXTRATOR', name: 'Extrator de Contrato', kind: 'Agente LLM', portal: 'PORTAL', mark: 'LLM', tint: '#F3EFFD', ink: '#5A46D0', desc: 'Cláusulas, sócios e faturamento.' },
  { id: 'COMPROVANTE', name: 'Análise de Comprovante', kind: 'Agente LLM', portal: 'ASSÍNCRONO', mark: 'CV', tint: '#E9F6EA', ink: '#1F7A34', desc: 'Titularidade e endereço.' },
  { id: 'CNPJ', name: 'Consulta CNPJ', kind: 'Fonte externa', portal: 'PORTAL', mark: 'RF', tint: '#EAF3FE', ink: '#1B5FA8', desc: 'Receita Federal — situação e quadro.' },
  { id: 'BUREAU', name: 'Bureau de Crédito', kind: 'Fonte externa', portal: 'PORTAL', mark: 'SR', tint: '#FDECEC', ink: '#B42B30', desc: 'Score, restrições e protestos.' },
  { id: 'LISTAS', name: 'Listas Restritivas', kind: 'Fonte externa', portal: 'PORTAL', mark: 'LT', tint: '#FFF4E2', ink: '#A85C00', desc: 'PEP, sanções e cadastros.' },
  { id: 'SIMSWAP', name: 'SimSwap', kind: 'Sinal', portal: 'PORTAL', mark: 'SS', tint: '#F1F3F5', ink: '#4B555D', desc: 'Troca recente de chip.' },
  { id: 'SCORE', name: 'Score Interno', kind: 'Modelo', portal: 'PORTAL', mark: 'SC', tint: '#E7F6FA', ink: '#0A7C93', desc: 'Modelo de crédito da carteira.' },
];

/* =========================================================
   Fluxos
   ========================================================= */

const FLOWS = [
  { id: 'credito-pj', name: 'Decisão de Crédito PJ', status: 'PUBLICADO', version: 'v4', nodes: 10, updated: 'há 2 dias' },
  { id: 'credito-pf', name: 'Crédito PF', status: 'RASCUNHO', version: 'v2', nodes: 7, updated: 'há 5 horas' },
  { id: 'fornecedor', name: 'Onboarding de Fornecedor', status: 'RASCUNHO', version: 'v1', nodes: 6, updated: 'ontem' },
];

/* ---------- nós do canvas ---------- */

const NODE_KINDS = {
  inicio: { label: 'Início', color: '#7C8890', icon: 'play' },
  condicao: { label: 'Condição', color: '#F0A100', icon: 'scale' },
  decisao: { label: 'Decisão', color: '#0FB5A6', icon: 'check' },
  agente: { label: 'Agente IA', color: '#6C5BE8', icon: 'bot' },
  regra: { label: 'Regra', color: '#3D7DD8', icon: 'scale' },
  consulta: { label: 'Consulta', color: '#E5484D', icon: 'database' },
  score: { label: 'Score', color: '#0EA5C4', icon: 'gauge' },
  humano: { label: 'Humano', color: '#8B5CF6', icon: 'users' },
  doc: { label: 'Documento', color: '#5C666F', icon: 'doc' },
  fim: { label: 'Fim', color: '#7C8890', icon: 'check' },
};

const FLOW_NODES = [
  {
    id: 'inicio', kind: 'inicio', title: 'Solicitação recebida', sub: 'CRD · portal',
    x: 10, y: 300, w: 130, h: 76, out: [{ id: 'go', label: '' }],
  },
  {
    id: 'docs', kind: 'condicao', title: 'Documentos completos?', sub: 'regra determinística',
    x: 182, y: 286, w: 130, h: 94,
    in: [{ id: 'in' }],
    out: [{ id: 'true', label: 'TRUE', dy: -20 }, { id: 'false', label: 'FALSE', dy: 20, bad: true }],
  },
  {
    id: 'recusar', kind: 'decisao', title: 'Recusar automático', sub: 'DENY · regra objetiva',
    x: 354, y: 470, w: 130, h: 80, in: [{ id: 'in' }], out: [],
  },
  {
    id: 'agente', kind: 'agente', title: 'Extração de faturamento', sub: 'LLM · contrato social',
    x: 354, y: 286, w: 130, h: 94, in: [{ id: 'in' }],
    out: [{ id: 'done', label: 'DONE', dy: -20 }],
  },
  {
    id: 'consulta', kind: 'consulta', title: 'Consulta CNPJ + bureau', sub: 'CNPJ · Bureau · Listas',
    x: 526, y: 286, w: 130, h: 94, in: [{ id: 'in' }],
    out: [{ id: 'ok', label: 'READY', dy: -20 }, { id: 'err', label: 'ERROR', dy: 20, bad: true }],
  },
  {
    id: 'score', kind: 'score', title: 'Score completo', sub: 'alto ≥700 · médio 400–700 · baixo <400',
    x: 698, y: 280, w: 130, h: 108, in: [{ id: 'in' }],
    out: [
      { id: 'alto', label: 'ALTO', dy: -30 },
      { id: 'medio', label: 'MÉDIO', dy: 0 },
      { id: 'baixo', label: 'BAIXO', dy: 30, bad: true },
    ],
  },
  {
    id: 'aprovar', kind: 'decisao', title: 'Aprovar automático', sub: 'APPROVE · auto',
    x: 870, y: 108, w: 130, h: 78, in: [{ id: 'in' }],
  },
  {
    id: 'auto', kind: 'decisao', title: 'Auto médio', sub: 'AUTO · limite ajustado',
    x: 870, y: 286, w: 130, h: 78, in: [{ id: 'in' }],
  },
  {
    id: 'mesa', kind: 'humano', title: 'Mesa de revisão', sub: 'HITL · alçada humana',
    x: 870, y: 462, w: 130, h: 90, in: [{ id: 'in' }],
    flag: 'Etapa proposta',
  },
];

const FLOW_EDGES = [
  ['inicio', 'go', 'docs', 'in'],
  ['docs', 'true', 'agente', 'in'],
  ['docs', 'false', 'recusar', 'in'],
  ['agente', 'done', 'consulta', 'in'],
  ['consulta', 'ok', 'score', 'in'],
  ['score', 'alto', 'aprovar', 'in'],
  ['score', 'medio', 'auto', 'in'],
  ['score', 'baixo', 'mesa', 'in'],
];

const NODE_PROPS = {
  inicio: {
    name: 'Solicitação recebida', type: 'Início', kindLabel: 'Início',
    desc: 'Ponto de entrada do fluxo. Recebe o pacote de documentos e os dados cadastrais enviados pelo cliente.',
    note: { tone: 'info', title: 'Gatilho', body: ['Webhook /v1/analises', 'Portal do cliente', 'Importação em lote'] },
    rules: ['Aceita PDF, JPG e PNG até 10 MB', 'Exige CNPJ e ao menos 2 documentos', 'Deduplica por chave de idempotência'],
  },
  docs: {
    name: 'Documentos completos?', type: 'Condição', kindLabel: 'Condição',
    desc: 'Verifica se o pacote mínimo chegou. Regra objetiva, sem IA: se faltar documento, não faz sentido gastar token.',
    note: { tone: 'warn', title: 'Pense bem antes de usar IA aqui', body: ['Documento ausente é um critério objetivo. A regra determinística resolve em 3 ms e custa zero.'] },
    rules: ['Contrato social presente', 'Cartão CNPJ presente', 'Comprovante de endereço presente', 'Documento do sócio presente'],
  },
  recusar: {
    name: 'Recusar automático', type: 'Decisão', kindLabel: 'Decisão',
    desc: 'Encerra a análise com parecer negativo e registra a evidência da ausência.',
    note: { tone: 'info', title: 'Saída', body: ['status = DENY', 'motivo = documentos_incompletos'] },
    rules: ['Emite parecer estruturado', 'Notifica o cliente por webhook', 'Não consome crédito de IA'],
  },
  consulta: {
    name: 'Consulta CNPJ + bureau', type: 'Consulta', kindLabel: 'Consulta',
    desc: 'Busca situação cadastral, quadro societário, score de bureau e listas restritivas.',
    note: { tone: 'info', title: 'Cache', body: ['TTL de 24 h por CNPJ', 'Fallback para a base interna em caso de timeout'] },
    rules: ['Receita Federal — situação e CNAE', 'Bureau — score e restrições', 'Listas — PEP e sanções'],
  },
  agente: {
    name: 'Extração de faturamento', type: 'Agente IA', kindLabel: 'Agente IA',
    desc: 'Lê o contrato social e extrai faturamento declarado, sócios e capital. Roda com modelo pequeno e saída estruturada.',
    note: { tone: 'warn', title: 'Onde a IA faz sentido', body: ['O faturamento está em texto livre, no meio de cláusulas. Aqui a interpretação é inevitável.'] },
    rules: ['Modelo: gemini-flash', 'Temperatura 0', 'Saída JSON validada por schema', 'Confiança mínima 0,75'],
  },
  score: {
    name: 'Score completo', type: 'Score', kindLabel: 'Score',
    desc: 'Consolida sinais determinísticos e probabilísticos em um score de 0 a 1.000 e abre as faixas de decisão.',
    note: { tone: 'warn', title: 'Faixas de decisão', body: ['alto ≥ 700 → aprovação automática', 'médio 400–700 → limite ajustado', 'baixo < 400 → Mesa de revisão'] },
    rules: ['Score de bureau (40%)', 'Tempo de atividade (20%)', 'Faturamento extraído (25%)', 'Restrições ativas (15%)'],
    bands: [
      { name: 'alto', min: '700', max: '1000' },
      { name: 'médio', min: '400', max: '699' },
      { name: 'baixo', min: '0', max: '399' },
    ],
  },
  aprovar: {
    name: 'Aprovar automático', type: 'Decisão', kindLabel: 'Decisão',
    desc: 'Emite parecer positivo com o limite calculado e as evidências que sustentam a decisão.',
    note: { tone: 'info', title: 'Saída', body: ['status = APPROVE', 'limite = até 8× o faturamento mensal'] },
    rules: ['Registra trilha de evidências', 'Assina o parecer com hash', 'Publica no webhook do cliente'],
  },
  auto: {
    name: 'Auto médio', type: 'Decisão', kindLabel: 'Decisão',
    desc: 'Aprova com limite reduzido e exige garantia de recebíveis.',
    note: { tone: 'info', title: 'Saída', body: ['status = APPROVE_LIMIT', 'limite = 40% do solicitado'] },
    rules: ['Limite reduzido', 'Garantia obrigatória', 'Revisão em 30 dias'],
  },
  mesa: {
    name: 'Mesa de revisão', type: 'Humano', kindLabel: 'Humano (HITL)',
    desc: 'Encaminha o dossiê para um analista decidir. Etapa ainda não nativa na plataforma — aqui ela aparece como proposta de roadmap.',
    note: { tone: 'warn', title: 'Lacuna atual', body: ['A aprovação humana ainda não é nativa. Hoje isso é resolvido fora da plataforma, por fila manual.'] },
    rules: ['SLA de 4 h úteis', 'Alçada acima de R$ 150 mil', 'Analista vê o dossiê completo', 'Decisão volta para o fluxo'],
    flag: 'Proposta de roadmap',
  },
};

/* =========================================================
   Mesa de revisão
   ========================================================= */

const CASES = [
  {
    id: 'CRD-DGS777-1790691041',
    cliente: 'Douglas',
    doc: '39.018.274/0001-50',
    valor: 120500,
    motivo: 'Baixa confiança',
    prazo: 'Atrasado 548 h 0 min',
    entrada: '29/09/2026, 11:10',
    status: 'aberto',
    email: 'dgs777@gmail.com',
    telefone: '(11) 99999-0000',
    endereco: 'Rua A, 100',
    uf: '—',
    aparelho: 'web-chrome',
    ip: '—',
    solicitacao: 'CRD-DGS777-1790691041',
    score: '53,33',
    canal: 'API',
    tipo: 'PJ',
    garantia: 'Recebíveis',
    faturamento: 'R$ 1,9 mi',
    motivos: [
      'Baixa confiança',
      'Faturamento declarado 37% acima do extraído do contrato.',
      'Primeira solicitação deste CNPJ.',
      'Sócio com restrição em lista.',
    ],
    bureau: 'Serasa consultado em 29/09/2026, 11:09 — score 412, 2 restrições ativas.',
    listas: '1 ocorrência — protesto em 14/08/2026.',
    historico: 'Nenhuma solicitação anterior neste dossiê.',
    execucao: null,
  },
  {
    id: 'CRD-DGS777-NEW-1790691114',
    cliente: 'Douglas',
    doc: '47.328.190/0001-34',
    valor: 80000,
    motivo: 'Faturamento declarado diverge do contrato',
    prazo: 'Atrasado 547 h 59 min',
    entrada: '29/09/2026, 11:11',
    status: 'aberto',
    email: 'dgs777@gmail.com',
    telefone: '(11) 98888-0000',
    endereco: 'Rua B, 220',
    uf: 'SP',
    aparelho: 'android-chrome',
    ip: '177.42.10.8',
    solicitacao: 'CRD-DGS777-NEW-1790691114',
    score: '61,04',
    canal: 'Portal',
    tipo: 'PJ',
    garantia: '—',
    faturamento: 'R$ 640 mil',
    motivos: [
      'Primeira análise deste CNPJ nesta carteira.',
      'Faturamento declarado 22% acima do extraído do contrato.',
      'Comprovante de endereço emitido há mais de 90 dias.',
    ],
    bureau: 'Nenhum bureau foi consultado nesta análise.',
    listas: 'Nenhuma lista foi consultada.',
    historico: 'Nenhuma solicitação anterior neste dossiê.',
    execucao: null,
  },
  {
    id: 'CRD-ANS882-1790692055',
    cliente: 'Ana Souza',
    doc: '551.198.118-51',
    valor: 189000,
    motivo: 'Face match abaixo do limite',
    prazo: 'Atrasado 12 h 40 min',
    entrada: '15/10/2026, 15:23',
    status: 'aberto',
    email: 'ana@loja.test',
    telefone: '(11) 99118-5102',
    endereco: 'Rua das Flores, 10',
    uf: 'SP',
    aparelho: 'android-chrome',
    ip: '201.17.88.4',
    solicitacao: '4821',
    score: '58,20',
    canal: 'Portal',
    tipo: 'PJ',
    garantia: 'Recebíveis',
    faturamento: 'R$ 1,2 mi',
    motivos: [
      'Face match 0,71 — abaixo do limite de 0,82.',
      'Faturamento declarado 37% acima do extraído do contrato.',
      'Valor solicitado acima da alçada automática.',
    ],
    bureau: 'Serasa consultado em 15/10/2026, 15:22 — score 412, 2 restrições ativas.',
    listas: 'Nenhuma ocorrência.',
    historico: 'Nenhuma solicitação anterior neste dossiê.',
    execucao: 'ex-4821-a',
  },
];

/* =========================================================
   Execuções (jornadas)
   ========================================================= */

const EXEC_SEED = [
  ['4821', 'Ana Souza', '551.198.118-51', 'ana@loja.test', 189000, 'Capital de giro', 'Parou em: Mensagem visualizada', 'expirada', '16 de out, 16:40'],
  ['4821', 'Ana Souza', '551.198.118-51', 'ana@loja.test', 189000, 'Capital de giro', 'Parou em: Política de crédito', 'divergente', '15 de out, 15:23'],
  ['4821', 'Ana Souza', '551.198.118-51', 'ana@loja.test', 189000, 'Capital de giro', 'Parou em: Face match', 'divergente', '14 de out, 15:48'],
  ['4821', 'Ana Souza', '551.199.999-98', 'ana@loja.test', 189000, 'Capital de giro', 'Parou em: A Twilio recusou o envio (código 63024)', 'falha', '14 de out, 15:47'],
  ['4888', 'Ana Souza', '551.198.118-51', 'ana@loja.test', 189000, 'Capital de giro', 'Execução concluída', 'aprovada', '14 de out, 15:40'],
  ['4821', 'Ana Souza', '551.198.118-51', 'ana@loja.test', 189000, 'Capital de giro', 'Execução concluída', 'aprovada', '14 de out, 14:04'],
  ['4821', 'Ana Souza', '551.198.118-51', 'ana@loja.test', 189000, 'Capital de giro', 'Parou em: Documentoscopia', 'expirada', '14 de out, 13:46'],
  ['4821', 'Ana Souza', '551.198.118-51', 'ana@loja.test', 189000, 'Capital de giro', 'Parou em: Documentoscopia', 'expirada', '14 de out, 12:56'],
  ['4821', 'Ana Souza', '551.198.118-51', 'ana@loja.test', 189000, 'Capital de giro', 'Parou em: Mensagem visualizada', 'expirada', '14 de out, 12:01'],
  ['4821', 'Ana Souza', '551.198.118-51', 'ana@loja.test', 189000, 'Capital de giro', 'Parou em: Mensagem visualizada', 'expirada', '14 de out, 11:41'],
  ['4890', 'Bruno Lima', '72.441.905/0001-12', 'bruno@atlas.com', 45000, 'Antecipação', 'Execução concluída', 'aprovada', '13 de out, 17:08'],
  ['4891', 'Carla Mendes', '31.702.884/0001-77', 'carla@norte.com', 320000, 'Capital de giro', 'Parou em: Política de crédito', 'divergente', '13 de out, 16:31'],
  ['4892', 'Diego Rocha', '90.112.487/0001-05', 'diego@vega.com', 78000, 'Antecipação', 'Execução concluída', 'aprovada', '13 de out, 15:52'],
  ['4893', 'Elisa Prado', '44.876.301/0001-60', 'elisa@lumen.com', 150000, 'Capital de giro', 'Parou em: Face match', 'divergente', '13 de out, 14:19'],
  ['4894', 'Fábio Nunes', '18.223.774/0001-91', 'fabio@orion.com', 96000, 'Capital de giro', 'Execução concluída', 'aprovada', '13 de out, 11:47'],
  ['4895', 'Gabriela Alves', '55.908.112/0001-23', 'gabriela@sol.com', 240000, 'Capital de giro', 'Parou em: Documentos completos?', 'falha', '12 de out, 18:05'],
  ['4896', 'Henrique Dias', '63.447.209/0001-48', 'henrique@bravo.com', 61000, 'Antecipação', 'Execução concluída', 'aprovada', '12 de out, 16:22'],
  ['4897', 'Isabela Cruz', '27.530.661/0001-80', 'isabela@ponte.com', 132000, 'Capital de giro', 'Parou em: Política de crédito', 'divergente', '12 de out, 14:38'],
  ['4898', 'João Peixoto', '84.019.335/0001-11', 'joao@ferro.com', 190000, 'Capital de giro', 'Execução concluída', 'aprovada', '12 de out, 10:14'],
  ['4899', 'Karina Lopes', '39.771.208/0001-56', 'karina@azul.com', 27000, 'Antecipação', 'Parou em: Mensagem visualizada', 'expirada', '11 de out, 17:56'],
  ['4900', 'Lucas Freitas', '11.884.502/0001-39', 'lucas@riva.com', 305000, 'Capital de giro', 'Parou em: Face match', 'divergente', '11 de out, 15:12'],
  ['4901', 'Marina Reis', '50.226.719/0001-04', 'marina@cais.com', 88000, 'Capital de giro', 'Execução concluída', 'aprovada', '11 de out, 13:41'],
  ['4902', 'Nelson Braga', '76.310.448/0001-27', 'nelson@duo.com', 115000, 'Antecipação', 'Execução concluída', 'aprovada', '11 de out, 09:33'],
  ['4903', 'Olívia Castro', '22.667.993/0001-18', 'olivia@faro.com', 41000, 'Antecipação', 'Parou em: Documentoscopia', 'expirada', '10 de out, 18:20'],
  ['4904', 'Pedro Salles', '68.129.507/0001-72', 'pedro@mira.com', 260000, 'Capital de giro', 'Parou em: Política de crédito', 'divergente', '10 de out, 16:04'],
  ['4905', 'Renata Guerra', '35.884.120/0001-63', 'renata@viva.com', 73000, 'Capital de giro', 'Execução concluída', 'aprovada', '10 de out, 11:29'],
];

const STEPS = [
  { t: 'Solicitação recebida', d: 'O cliente enviou o pacote pelo portal.' },
  { t: 'Documentos recebidos', d: '4 arquivos: contrato, cartão CNPJ, comprovante e documento do sócio.' },
  { t: 'OCR concluído', d: 'Texto extraído de 4 documentos em 1,2 s.' },
  { t: 'Documentoscopia', d: 'Nenhum indício de adulteração nos documentos.' },
  { t: 'Face match', d: 'Similaridade 0,94 entre selfie e documento do sócio.' },
  { t: 'Consulta CNPJ', d: 'Situação ATIVA · 11 anos de fundação · CNAE 47.13-0.' },
  { t: 'Bureau de crédito', d: 'Score 412 · 2 restrições ativas · 1 protesto.' },
  { t: 'Extração de faturamento', d: 'Agente LLM extraiu R$ 1,2 mi/ano do contrato social.' },
  { t: 'Divergência de faturamento', d: 'Declarado R$ 1,9 mi × extraído R$ 1,2 mi (37% acima).' },
  { t: 'Política de crédito', d: 'Alçada acima de R$ 150 mil exige revisão humana.' },
  { t: 'Mesa de revisão', d: 'Aguardando decisão de um analista.' },
  { t: 'Parecer emitido', d: 'Decisão e evidências publicadas no webhook.' },
];

function buildTimeline(kind) {
  const mark = (upTo, stopAt) => STEPS.map((s, i) => ({
    t: s.t, d: s.d,
    state: i < upTo ? 'done' : (stopAt === i ? 'stop' : 'todo'),
  }));
  switch (kind) {
    case 'aprovada': return mark(STEPS.length);
    case 'divergente': return mark(9, 9);
    case 'face': {
      const arr = mark(4, 4);
      arr[4] = { t: 'Face match', d: 'Similaridade 0,71 — abaixo do limite de 0,82.', state: 'stop' };
      return arr;
    }
    case 'expirada_msg': return mark(1, 1);
    case 'expirada_doc': return mark(3, 3);
    case 'falha': {
      const arr = mark(0, 0);
      arr[0] = { t: 'Envio recusado', d: 'A Twilio recusou o envio (código 63024). Número inválido.', state: 'stop' };
      return arr;
    }
    default: return mark(2, -1);
  }
}

const EXEC_STATUS = {
  aprovada: { label: 'Aprovada', cls: 'b-aprovada' },
  expirada: { label: 'Expirada', cls: 'b-expirada' },
  divergente: { label: 'Rosto divergente', cls: 'b-divergente' },
  recusada: { label: 'Recusada', cls: 'b-divergente' },
  falha: { label: 'Falha no envio', cls: 'b-falha' },
  revisao: { label: 'Em revisão', cls: 'b-revisao' },
  andamento: { label: 'Em andamento', cls: 'b-andamento' },
};

const EXECUTIONS = EXEC_SEED.map((r, i) => {
  const [pedido, nome, doc, email, valor, fluxo, fase, status, quando] = r;
  const kind = status === 'divergente'
    ? (fase.indexOf('Face') >= 0 ? 'face' : 'divergente')
    : status === 'expirada'
      ? (fase.indexOf('Documentoscopia') >= 0 ? 'expirada_doc' : 'expirada_msg')
      : status === 'falha' ? 'falha' : 'aprovada';
  return {
    id: 'ex-' + pedido + '-' + i,
    pedido, nome, doc, email, valor, fluxo, fase, status, quando,
    timeline: buildTimeline(kind),
    caseId: (pedido === '4821' && fase === 'Parou em: Política de crédito') ? 'CRD-ANS882-1790692055' : null,
  };
});

const EXEC_DETAIL = {
  id: 'ex-4821-1',
  pedido: '4821',
  nome: 'Ana Souza',
  doc: '551.198.118-51',
  email: 'ana@loja.test',
  cpfInformado: '***.***.***-21',
  endereco: 'Rua das Flores, 10, São Paulo, SP',
  valor: 189000,
  fluxo: 'Decisão de Crédito PJ',
  produto: 'Capital de giro',
  garantia: 'Recebíveis',
  parcelas: '12x',
  origem: 'Portal',
  loja: 'MINHA LOJA',
  tipo: 'Documento',
  criado: '15 de out, 15:23',
  expirado: '15 de out, 15:24',
  concluido: '15 de out, 15:25',
  mensagem: 'Visualizada (25)',
  confianca: '—',
  reconheceu: 'Sim',
  titular: 'Sim',
  tempo: '75s',
  jornadaId: 'bd699ddf-fa14-44f5-a570-329632251733',
  fase: 'Parou em: Política de crédito',
  status: 'divergente',
  caseId: 'CRD-ANS882-1790692055',
  timeline: buildTimeline('divergente'),
  mapa: {
    end: 'Rua das Flores, 10',
    bairro: 'Centro - Atibaia / São Paulo - 12940-700',
    coord: '-23,1171 · -46,55043',
  },
  telemetria: [
    ['Aparelho', 'android-chrome'],
    ['Sistema', 'Android 14'],
    ['Operadora', 'Vivo'],
    ['IP', '201.17.88.4'],
    ['Latitude', '-23,1171'],
    ['Longitude', '-46,55043'],
    ['Confiança do dispositivo', '0,93'],
  ],
};
