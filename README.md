# Evidência — protótipo do portal

Protótipo navegável do **Evidência**, a plataforma da AcertPix para montar e executar
fluxos inteligentes de decisão. O caso de uso demonstrado é um **motor de decisão de crédito PJ**.

Interface estática (HTML/CSS/JS puro, sem dependências), servida por um servidor Node mínimo.
Todos os dados são fictícios e vivem em memória — recarregar a página volta ao estado inicial.

## Rodar local

```bash
npm start
# abre em http://localhost:4173
```

Ou simplesmente abra o `index.html` no navegador.

## Deploy no Railway

O projeto já está pronto: `package.json` com `start`, servidor lendo `PORT` e sem dependências
(o build não precisa de `npm install`).

**Opção A — CLI (mais rápido)**

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

Ao terminar, gere o domínio público:

```bash
railway domain
```

**Opção B — GitHub**

1. `git init && git add . && git commit -m "protótipo evidência"`
2. Crie o repositório e faça push.
3. No Railway: **New Project → Deploy from GitHub repo**.
4. O Railway detecta Node pelo `package.json` e roda `npm start`.
5. **Settings → Networking → Generate Domain**.

Não é preciso configurar variável nenhuma. O servidor escuta em `0.0.0.0:$PORT`.

## Telas

| Rota | Tela |
|---|---|
| `#/dashboard` | Indicadores do motor: aprovação, valor decidido, latência, custo |
| `#/fluxos` | Biblioteca de fluxos + prévia do canvas |
| `#/fluxos/editor` | Editor do fluxo: nós por natureza, portas, painel de configuração |
| `#/agentes` | Catálogo de capacidades (OCR, documentoscopia, face match, LLMs, consultas) |
| `#/revisao` | Mesa de revisão (HITL) com fila, abas e SLA |
| `#/revisao/:id` | Dossiê do caso + painel de decisão |
| `#/execucoes` | Execuções com filtros e paginação |
| `#/execucoes/:id` | Trace da execução: documentos, mapa, timeline e telemetria |

## O que está funcional

- Navegação por rotas (hash), menu com grupos recolhíveis e item ativo.
- **Editor**: clicar num nó troca o painel de propriedades (regras, faixas, saída);
  o canvas se ajusta à área visível.
- **Agentes**: cada cartão abre o contrato de entrada/saída, latência, custo e disponibilidade.
- **Mesa**: abas por situação, busca, e decisão (aprovar/recusar) que atualiza o caso,
  dispara a execução de origem e emite aviso.
- **Execuções**: filtros combinados (nome, documento, e-mail, pedido, faixa de valor, fluxo, status),
  paginação, e **simulação de envio** que roda o fluxo passo a passo até aprovar ou cair na Mesa —
  criando o caso automaticamente.
- **Cruzamento** execução ↔ caso da Mesa nos dois sentidos.

## Estrutura

```
index.html     shell da aplicação
styles.css     design system (casca Omni, marca Evidência)
data.js        dados fictícios, ícones e navegação
views.js       renderização das 8 telas
app.js         rotas, estado e interações
serve.js       servidor estático de produção (zero dependências)
```

## Limitações conhecidas

- Sem backend: estado em memória, sem persistência nem autenticação real.
- A etapa de aprovação humana aparece como **proposta de roadmap** no fluxo (nó `HITL`),
  refletindo que ela ainda não é nativa na plataforma.
- Dados e textos são ilustrativos.
