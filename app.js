const STORAGE_KEY = "entomonProStats";
const app = document.getElementById("app");

const state = {
  route: "atlas",
  atlasTest: { active: false, current: null },
  key: { index: 0, answers: {}, start: null, done: false },
  lab: { current: null, answered: false },
  sim: { running: false, index: 0, score: 0, timer: 60, interval: null, questions: [], temaHits: {} }
};

const defaultStats = {
  totalRespostas: 0,
  porTema: { morfologia: { acertos: 0, total: 0 }, ordens: { acertos: 0, total: 0 }, familias: { acertos: 0, total: 0 }, diagnostico: { acertos: 0, total: 0 } },
  porOrdem: {},
  simulados: [],
  pontosFracos: []
};

function loadStats() {
  const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  return parsed ? parsed : structuredClone(defaultStats);
}
function saveStats(stats) { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); }
function updatePerformance({ tema, correct, ordem }) {
  const stats = loadStats();
  stats.totalRespostas += 1;
  if (stats.porTema[tema]) {
    stats.porTema[tema].total += 1;
    if (correct) stats.porTema[tema].acertos += 1;
  }
  if (ordem) {
    if (!stats.porOrdem[ordem]) stats.porOrdem[ordem] = { acertos: 0, total: 0 };
    stats.porOrdem[ordem].total += 1;
    if (correct) stats.porOrdem[ordem].acertos += 1;
  }
  stats.pontosFracos = Object.entries(stats.porTema)
    .map(([k, v]) => ({ tema: k, pct: v.total ? (100 * v.acertos / v.total) : 100 }))
    .filter(x => x.pct < 70)
    .sort((a, b) => a.pct - b.pct)
    .map(x => x.tema);
  saveStats(stats);
}

function navRoute(route) {
  state.route = route;
  document.querySelectorAll(".navbar button").forEach(btn => btn.classList.toggle("active", btn.dataset.route === route));
  render();
}

function render() {
  const routes = {
    atlas: renderAtlas,
    taxonomia: renderTaxonomia,
    chave: renderChave,
    laboratorio: renderLab,
    simulado: renderSimulado,
    dashboard: renderDashboard
  };
  routes[state.route]();
}

function insectSVG() {
  return `<svg viewBox="0 0 700 340" class="insect-svg" aria-label="atlas">
    <ellipse cx="130" cy="170" rx="70" ry="55" class="part" data-part="cabeca"/>
    <ellipse cx="300" cy="165" rx="110" ry="75" class="part" data-part="torax"/>
    <ellipse cx="500" cy="170" rx="120" ry="80" class="part" data-part="abdome"/>
    <ellipse cx="280" cy="100" rx="130" ry="36" class="part" data-part="elitros"/>
    <ellipse cx="280" cy="230" rx="130" ry="36" class="part" data-part="asaMembranosa"/>
    <circle cx="96" cy="165" r="16" class="part" data-part="olhos"/>
    <circle cx="164" cy="165" r="16" class="part" data-part="olhos"/>
    <circle cx="130" cy="132" r="8" class="part" data-part="ocelos"/>
    <rect x="111" y="183" width="38" height="12" class="part" data-part="labro"/>
    <rect x="102" y="196" width="56" height="12" class="part" data-part="clipeo"/>
    <line x1="90" y1="210" x2="70" y2="230" class="part-line" data-part="mandibulas"/>
    <line x1="170" y1="210" x2="190" y2="230" class="part-line" data-part="maxilas"/>
    <line x1="120" y1="215" x2="120" y2="240" class="part-line" data-part="labio"/>
    <line x1="90" y1="120" x2="40" y2="90" class="part-line" data-part="antena"/>
    <line x1="170" y1="120" x2="220" y2="90" class="part-line" data-part="antena"/>
    <rect x="245" y="120" width="40" height="22" class="part" data-part="pronoto"/>
    <rect x="292" y="120" width="40" height="22" class="part" data-part="mesonoto"/>
    <rect x="338" y="120" width="40" height="22" class="part" data-part="metanoto"/>
    <line x1="250" y1="230" x2="220" y2="280" class="part-line" data-part="coxa"/>
    <line x1="270" y1="230" x2="250" y2="280" class="part-line" data-part="trocanter"/>
    <line x1="290" y1="230" x2="290" y2="295" class="part-line" data-part="femur"/>
    <line x1="310" y1="230" x2="330" y2="295" class="part-line" data-part="tibia"/>
    <line x1="330" y1="230" x2="370" y2="290" class="part-line" data-part="tarso"/>
    <ellipse cx="448" cy="130" rx="30" ry="14" class="part" data-part="hemelitros"/>
    <ellipse cx="448" cy="210" rx="30" ry="14" class="part" data-part="halteres"/>
  </svg>`;
}

function atlasCard(partKey) {
  const d = MORPHOLOGY_DATA[partKey];
  return `<article class="card"><h3>${d.nome}</h3><p><b>Região:</b> ${d.regiao}</p><p>${d.descricao}</p><p><b>Ordens associadas:</b> ${d.ordens.join(", ")}</p><p><b>Importância diagnóstica:</b> ${d.diagnostico}</p></article>`;
}

function renderAtlas() {
  const testInfo = state.atlasTest.active ? `<p class="tip">Teste Anatômico: clique em <b>${MORPHOLOGY_DATA[state.atlasTest.current].nome}</b></p>` : "";
  app.innerHTML = `<section class="grid-2"><div class="card"><h2>Atlas Morfológico Interativo</h2><p>Mapa SVG clicável para prática de diagnóstico morfológico.</p>${testInfo}${insectSVG()}<div class="row"><button id="startAtlasTest">Iniciar Teste Anatômico</button><button id="stopAtlasTest" class="secondary">Encerrar</button></div></div><div id="atlasInfo" class="card"><h3>Selecione uma estrutura</h3><p>Clique no inseto para visualizar descrição técnica, ordens e relevância diagnóstica.</p></div></section>`;
  bindAtlas();
}

function bindAtlas() {
  app.querySelectorAll(".part,.part-line").forEach(el => {
    el.addEventListener("click", () => {
      const key = el.dataset.part;
      if (MORPHOLOGY_DATA[key]) document.getElementById("atlasInfo").innerHTML = atlasCard(key);
      if (state.atlasTest.active) {
        const ok = key === state.atlasTest.current;
        updatePerformance({ tema: "morfologia", correct: ok });
        alert(ok ? "Correto!" : `Incorreto. Estrutura correta: ${MORPHOLOGY_DATA[state.atlasTest.current].nome}`);
        state.atlasTest.current = randomKey(MORPHOLOGY_DATA);
        renderAtlas();
      }
    });
  });
  document.getElementById("startAtlasTest").onclick = () => { state.atlasTest.active = true; state.atlasTest.current = randomKey(MORPHOLOGY_DATA); renderAtlas(); };
  document.getElementById("stopAtlasTest").onclick = () => { state.atlasTest.active = false; renderAtlas(); };
}

function renderTaxonomia() {
  const listOrdens = Object.keys(TAXONOMY).map(o => `<option>${o}</option>`).join("");
  app.innerHTML = `<section class="card"><h2>Banco Taxonômico Completo</h2><div class="filters"><input id="searchTax" placeholder="Buscar ordem, família, dano, diagnóstico..." /><select id="filterOrdem"><option value="">Todas as ordens</option>${listOrdens}</select></div><div id="taxResults"></div></section>`;
  const draw = () => {
    const term = document.getElementById("searchTax").value.toLowerCase();
    const ordFilter = document.getElementById("filterOrdem").value;
    let html = "";
    for (const [ordem, dados] of Object.entries(TAXONOMY)) {
      if (ordFilter && ordem !== ordFilter) continue;
      const fams = Object.entries(dados.familias || {}).filter(([f, fd]) => (`${f} ${fd.morfologia} ${fd.dano} ${fd.diferencial}`).toLowerCase().includes(term));
      const ordemMatch = (`${ordem} ${dados.diagnostico} ${dados.importancia}`).toLowerCase().includes(term);
      if (!ordemMatch && fams.length === 0 && term) continue;
      html += `<article class="card"><h3>${ordem}</h3><p><b>Metamorfose:</b> ${dados.metamorfose}</p><p><b>Aparelho bucal:</b> ${dados.bucal}</p><p><b>Asas:</b> ${dados.asas}</p><p><b>Antena:</b> ${dados.antena}</p><p><b>Diagnóstico:</b> ${dados.diagnostico}</p><p><b>Importância agrícola:</b> ${dados.importancia}</p>${fams.map(([nome, fd]) => `<details><summary>${nome}</summary><p><b>Morfologia:</b> ${fd.morfologia}</p><p><b>Tipo de dano:</b> ${fd.dano}</p><p><b>Importância agrícola:</b> ${fd.importancia}</p><p><b>Diagnóstico diferencial:</b> ${fd.diferencial}</p></details>`).join("") || "<p class='tip'>Sem famílias cadastradas para esta ordem.</p>"}</article>`;
    }
    document.getElementById("taxResults").innerHTML = html || "<p>Nenhum resultado encontrado.</p>";
  };
  ["searchTax", "filterOrdem"].forEach(id => document.getElementById(id).addEventListener("input", draw));
  draw();
}

function renderChave() {
  const q = DICHOTOMIC_QUESTIONS[state.key.index];
  if (!state.key.start) state.key.start = Date.now();
  if (!q) {
    const result = inferTaxon(state.key.answers);
    const elapsed = ((Date.now() - state.key.start) / 1000).toFixed(1);
    const famList = Object.keys((TAXONOMY[result.ordem] || {}).familias || {});
    app.innerHTML = `<section class="card"><h2>Resultado da Chave Dicotômica</h2><p><b>Ordem provável:</b> ${result.ordem}</p><p><b>Família provável:</b> ${result.familia || "Requer caracteres adicionais"}</p><p><b>Precisão estimada:</b> ${result.score}%</p><p><b>Tempo:</b> ${elapsed}s</p><p class="tip">Famílias possíveis na ordem: ${famList.join(", ") || "Sem famílias específicas"}.</p><button id="restartKey">Reiniciar chave</button></section>`;
    updatePerformance({ tema: "ordens", correct: result.score >= 70, ordem: result.ordem });
    document.getElementById("restartKey").onclick = () => { state.key = { index: 0, answers: {}, start: null, done: false }; renderChave(); };
    return;
  }
  app.innerHTML = `<section class="card"><h2>Chave Dicotômica Dinâmica</h2><p>Passo ${state.key.index + 1}/${DICHOTOMIC_QUESTIONS.length}</p><h3>${q.pergunta}</h3><div class="option-list">${q.options.map(v => `<button class="option" data-v="${v}">${v}</button>`).join("")}</div></section>`;
  app.querySelectorAll(".option").forEach(btn => btn.onclick = () => {
    state.key.answers[q.id] = btn.dataset.v;
    state.key.index += 1;
    renderChave();
  });
}

function inferTaxon(ans) {
  const scored = Object.entries(TAXONOMY).map(([ordem, d]) => {
    let pts = 0;
    if ((d.metamorfose || "").includes((ans.metamorfose || "").split(" ")[0])) pts += 25;
    if ((d.asas || "").toLowerCase().includes((ans.asas || "").split(" ")[0].toLowerCase())) pts += 30;
    if ((d.bucal || "").toLowerCase().includes((ans.bucal || "").split(" ")[0].toLowerCase())) pts += 25;
    if ((d.antena || "").toLowerCase().includes((ans.antena || "").split(" ")[0].toLowerCase()) || ans.antena === "Variável") pts += 20;
    return { ordem, pts };
  }).sort((a, b) => b.pts - a.pts);
  const ordem = scored[0].ordem;
  const familia = Object.keys(TAXONOMY[ordem].familias || {})[0] || "";
  return { ordem, familia, score: scored[0].pts };
}

function generateLabCase() {
  const ordem = randomItem(Object.keys(TAXONOMY));
  const fams = Object.keys(TAXONOMY[ordem].familias || {});
  const familia = fams.length ? randomItem(fams) : "Sem família específica";
  const d = TAXONOMY[ordem];
  return {
    ordem, familia, metamorfose: d.metamorfose, bucal: d.bucal,
    descricao: `Exemplar com ${d.asas.toLowerCase()}, antena ${d.antena.toLowerCase()} e caracteres diagnósticos: ${d.diagnostico}`
  };
}

function renderLab() {
  if (!state.lab.current) state.lab.current = generateLabCase();
  const c = state.lab.current;
  const ordens = Object.keys(TAXONOMY).map(o => `<option>${o}</option>`).join("");
  const fams = Object.values(TAXONOMY).flatMap(o => Object.keys(o.familias || {}));
  app.innerHTML = `<section class="card"><h2>Modo Laboratório</h2><p class="tip">Descrição morfológica:</p><p>${c.descricao}</p><div class="grid-2"><label>Ordem<select id="labOrdem"><option></option>${ordens}</select></label><label>Família<select id="labFamilia"><option></option>${fams.map(f => `<option>${f}</option>`).join("")}</select></label><label>Metamorfose<input id="labMeta" placeholder="Ex.: Holometábola (completa)" /></label><label>Aparelho bucal<input id="labBucal" placeholder="Ex.: Mastigador" /></label></div><div class="row"><button id="corrigirLab">Corrigir</button><button id="novoLab" class="secondary">Novo caso</button></div><div id="labFeedback"></div></section>`;
  document.getElementById("corrigirLab").onclick = () => {
    const r = {
      ordem: document.getElementById("labOrdem").value,
      familia: document.getElementById("labFamilia").value,
      metamorfose: document.getElementById("labMeta").value,
      bucal: document.getElementById("labBucal").value
    };
    const checks = [
      ["ordem", r.ordem === c.ordem, "ordens"],
      ["familia", r.familia === c.familia, "familias"],
      ["metamorfose", c.metamorfose.toLowerCase().includes(r.metamorfose.toLowerCase().split(" ")[0] || "x"), "diagnostico"],
      ["bucal", c.bucal.toLowerCase().includes(r.bucal.toLowerCase().split(" ")[0] || "x"), "diagnostico"]
    ];
    checks.forEach(([_, ok, tema]) => updatePerformance({ tema, correct: !!ok, ordem: c.ordem }));
    const lines = checks.map(([nome, ok]) => `<li>${nome}: ${ok ? "✅ correto" : "❌ incorreto"}</li>`).join("");
    document.getElementById("labFeedback").innerHTML = `<article class="card"><h3>Correção</h3><ul>${lines}</ul><p><b>Gabarito:</b> ${c.ordem} / ${c.familia} / ${c.metamorfose} / ${c.bucal}</p></article>`;
  };
  document.getElementById("novoLab").onclick = () => { state.lab.current = generateLabCase(); renderLab(); };
}

function buildSimQuestions() {
  const q = [];
  for (let i = 0; i < 30; i++) {
    const tema = ["morfologia", "ordens", "familias", "diagnostico"][i % 4];
    if (tema === "morfologia") {
      const key = randomKey(MORPHOLOGY_DATA); const item = MORPHOLOGY_DATA[key];
      q.push({ tema, pergunta: `Qual estrutura é diagnóstica por: ${item.diagnostico}`, correta: item.nome, opcoes: shuffle([item.nome, "Pronoto", "Halteres", "Labro"]).slice(0, 4), ordem: item.ordens[0] });
    } else if (tema === "ordens") {
      const ordem = randomItem(Object.keys(TAXONOMY));
      q.push({ tema, pergunta: `Ordem com característica: ${TAXONOMY[ordem].asas}`, correta: ordem, opcoes: shuffle([ordem, ...pickDistinct(Object.keys(TAXONOMY), ordem, 3)]), ordem });
    } else if (tema === "familias") {
      const [ordem, d] = randomEntry(TAXONOMY);
      const fams = Object.keys(d.familias || {});
      if (!fams.length) continue;
      const fam = randomItem(fams);
      const allFams = Object.values(TAXONOMY).flatMap(o => Object.keys(o.familias || {}));
      q.push({ tema, pergunta: `Família associada a: ${d.familias[fam].diferencial}`, correta: fam, opcoes: shuffle([fam, ...pickDistinct(allFams, fam, 3)]), ordem });
    } else {
      const ordem = randomItem(Object.keys(TAXONOMY));
      q.push({ tema, pergunta: `Diagnóstico típico de ${ordem}?`, correta: TAXONOMY[ordem].diagnostico, opcoes: shuffle([TAXONOMY[ordem].diagnostico, "Larvas sem cabeça", "Ausência de olhos compostos", "Metamorfose ametábola"]), ordem });
    }
  }
  return q.slice(0, 30);
}

function renderSimulado() {
  if (!state.sim.running) {
    app.innerHTML = `<section class="card"><h2>Simulado Cronometrado</h2><p>30 questões automáticas, 60s por questão, com relatório por tema.</p><button id="startSim">Iniciar simulado</button></section>`;
    document.getElementById("startSim").onclick = startSim;
    return;
  }
  const q = state.sim.questions[state.sim.index];
  if (!q) return finishSim();
  app.innerHTML = `<section class="card"><h2>Simulado (${state.sim.index + 1}/30)</h2><p class="timer">⏱️ ${state.sim.timer}s</p><h3>${q.pergunta}</h3><div class="option-list">${q.opcoes.map(o => `<button class="option">${o}</button>`).join("")}</div></section>`;
  app.querySelectorAll(".option").forEach(btn => btn.onclick = () => answerSim(btn.textContent));
}

function startSim() {
  state.sim = { running: true, index: 0, score: 0, timer: 60, interval: null, questions: buildSimQuestions(), temaHits: {} };
  state.sim.interval = setInterval(() => {
    state.sim.timer -= 1;
    if (state.sim.timer <= 0) answerSim(null);
    else renderSimulado();
  }, 1000);
  renderSimulado();
}

function answerSim(choice) {
  const q = state.sim.questions[state.sim.index];
  if (!q) return;
  const ok = choice === q.correta;
  if (ok) state.sim.score += 1;
  if (!state.sim.temaHits[q.tema]) state.sim.temaHits[q.tema] = { acertos: 0, total: 0 };
  state.sim.temaHits[q.tema].total += 1;
  if (ok) state.sim.temaHits[q.tema].acertos += 1;
  updatePerformance({ tema: q.tema, correct: ok, ordem: q.ordem });
  state.sim.index += 1;
  state.sim.timer = 60;
  renderSimulado();
}

function finishSim() {
  clearInterval(state.sim.interval);
  const pct = Math.round((state.sim.score / 30) * 100);
  const classe = pct < 60 ? "Reprovado" : pct < 80 ? "Regular" : pct < 95 ? "Bom" : "Excelente";
  const stats = loadStats();
  stats.simulados.push({ data: new Date().toISOString(), score: state.sim.score, pct, classe, temaHits: state.sim.temaHits });
  saveStats(stats);
  app.innerHTML = `<section class="card"><h2>Resultado final</h2><p><b>Pontuação:</b> ${state.sim.score}/30 (${pct}%)</p><p><b>Classificação:</b> ${classe}</p><h3>Relatório por tema</h3>${Object.entries(state.sim.temaHits).map(([t, v]) => `<p>${t}: ${v.acertos}/${v.total} (${Math.round((v.acertos / v.total) * 100)}%)</p>`).join("")}<button id="restartSim">Novo simulado</button></section>`;
  state.sim.running = false;
  document.getElementById("restartSim").onclick = renderSimulado;
}

function renderDashboard() {
  const s = loadStats();
  app.innerHTML = `<section class="card"><h2>Dashboard de Desempenho</h2><p>Total de questões respondidas: <b>${s.totalRespostas}</b></p><h3>Desempenho por tema</h3>${Object.entries(s.porTema).map(([k, v]) => `<p>${k}: ${v.acertos}/${v.total} (${v.total ? Math.round(100 * v.acertos / v.total) : 0}%)</p>`).join("")}<h3>Desempenho por ordem</h3>${Object.entries(s.porOrdem).map(([k, v]) => `<p>${k}: ${v.acertos}/${v.total} (${Math.round(100 * v.acertos / v.total)}%)</p>`).join("") || "<p>Sem dados.</p>"}<h3>Histórico de simulados</h3>${s.simulados.slice(-5).reverse().map(sim => `<p>${new Date(sim.data).toLocaleString()} — ${sim.score}/30 (${sim.pct}%) ${sim.classe}</p>`).join("") || "<p>Nenhum simulado concluído.</p>"}<h3>Pontos fracos</h3><p>${s.pontosFracos.join(", ") || "Nenhum crítico no momento."}</p><button id="resetStats" class="secondary">Resetar histórico</button></section>`;
  document.getElementById("resetStats").onclick = () => { saveStats(structuredClone(defaultStats)); renderDashboard(); };
}

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomKey(obj) { return randomItem(Object.keys(obj)); }
function randomEntry(obj) { const k = randomKey(obj); return [k, obj[k]]; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function pickDistinct(pool, avoid, n) { return shuffle(pool.filter(p => p !== avoid)).slice(0, n); }

function setupPWA() {
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js");
  const updateOnline = () => document.getElementById("offlineStatus").textContent = navigator.onLine ? "Online" : "Offline";
  window.addEventListener("online", updateOnline); window.addEventListener("offline", updateOnline); updateOnline();
}

function init() {
  document.querySelectorAll("#mainNav button").forEach(btn => btn.addEventListener("click", () => navRoute(btn.dataset.route)));
  setupPWA();
  navRoute("atlas");
}

init();
