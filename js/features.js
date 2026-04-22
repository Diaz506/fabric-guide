/* ============================================
   Feature Enhancement Layer
   Dark mode, i18n, reading progress, bookmarks,
   capacity calculator, architecture wizard,
   migration recommender, readiness quiz.
   ============================================ */

(function() {
'use strict';

let translations = null;
let translationsLoading = false;

async function loadTranslations() {
  if (translations) return translations;
  if (translationsLoading) {
    while (!translations) await new Promise(r => setTimeout(r, 50));
    return translations;
  }
  translationsLoading = true;
  try {
    const resp = await fetch('js/translations-es.json');
    translations = await resp.json();
  } catch (e) {
    console.error('Failed to load translations:', e);
    translations = {};
  }
  translationsLoading = false;
  return translations;
}

function initFeatures() {
  initDarkMode();
  initLanguageToggle();
  initReadingProgress();
  initBookmarks();
  initAutoCopyButtons();
  if (document.getElementById('capacity-calculator')) initCapacityCalculator();
  if (document.getElementById('tco-calc')) initTCOCalculator();
  if (document.getElementById('arch-wizard')) initArchWizard();
  if (document.getElementById('migration-recommender')) initMigrationRecommender();
  if (document.getElementById('readiness-quiz')) initReadinessQuiz();
  if (document.getElementById('governance-assessment')) initGovernanceAssessment();
  if (document.getElementById('export-md')) initChecklistExport();
  if (document.getElementById('scenario-filter')) initScenarioFilter();
  if (document.getElementById('migration-scorer')) initMigrationScorer();
  if (document.getElementById('migration-tools')) initMigrationTools();
  initInteractiveArch();
  initRoleFilter();
}

/* ============================================
   1. DARK MODE
   ============================================ */
function initDarkMode() {
  const saved = localStorage.getItem('fabric-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Wait for nav to inject header, then add button
  setTimeout(() => {
    const controls = document.querySelector('.header-controls');
    if (!controls) return;

    const btn = controls.querySelector('#dark-mode-toggle');
    if (!btn) return;

    const updateIcon = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.innerHTML = isDark
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg><span class="btn-label">Light</span>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg><span class="btn-label">Dark</span>';
    };

    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('fabric-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('fabric-theme', 'dark');
      }
      updateIcon();
    });

    updateIcon();
  }, 100);
}

/* ============================================
   2. LANGUAGE TOGGLE (English / Spanish)
   ============================================ */
let currentLang= localStorage.getItem('fabric-lang') || 'en';

function initLanguageToggle() {
  setTimeout(() => {
    const btn = document.querySelector('#lang-toggle');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      currentLang = currentLang === 'en' ? 'es' : 'en';
      localStorage.setItem('fabric-lang', currentLang);
      updateLangButton();
      await applyTranslations();
    });

    if (currentLang === 'es') applyTranslations();
    updateLangButton();
  }, 100);
}

function updateLangButton() {
  const btn = document.querySelector('#lang-toggle');
  if (!btn) return;
  btn.innerHTML = currentLang === 'en'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg><span class="btn-label">ES</span>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg><span class="btn-label">EN</span>';
}

async function applyTranslations() {
  await loadTranslations();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(node => {
    const text = node.textContent.trim();
    if (!text) return;

    if (currentLang === 'es') {
      if (translations[text]) {
        if (!node._originalText) node._originalText = text;
        node.textContent = node.textContent.replace(text, translations[text]);
      }
    } else {
      if (node._originalText) {
        node.textContent = node.textContent.replace(node.textContent.trim(), node._originalText);
        delete node._originalText;
      }
    }
  });

  // Translate placeholders
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    if (currentLang === 'es') {
      searchInput.setAttribute('placeholder', 'Buscar en la guía…');
    } else {
      searchInput.setAttribute('placeholder', 'Search guide…');
    }
  }


  // Translate select options
  document.querySelectorAll('select option').forEach(opt => {
    const text = opt.textContent.trim();
    if (currentLang === 'es') {
      if (translations[text]) {
        if (!opt._originalText) opt._originalText = text;
        opt.textContent = translations[text];
      }
    } else {
      if (opt._originalText) {
        opt.textContent = opt._originalText;
        delete opt._originalText;
      }
    }
  });
}


/* ============================================
   3. READING PROGRESS
   ============================================ */
function initReadingProgress() {
  // Inject progress bar
  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  bar.innerHTML = '<div class="reading-progress-fill" id="reading-progress-fill"></div>';
  document.body.appendChild(bar);

  const fill = document.getElementById('reading-progress-fill');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  // Track visited sections (for internal use only, no visual indicator)
  const VISITED_KEY = 'fabric-visited-sections';
  const visited = JSON.parse(localStorage.getItem(VISITED_KEY) || '{}');
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';

  const sections = document.querySelectorAll('.section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const key = page + '#' + entry.target.id;
        visited[key] = true;
        localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}


/* ============================================
   4. BOOKMARKS
   ============================================ */
function initBookmarks() {
  const BOOKMARKS_KEY = 'fabric-bookmarks';
  let bookmarks = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
  const page = location.pathname.split('/').pop() || 'index.html';
  const pageTitle = document.title.split('—')[0].trim();

  // Add bookmark buttons to section headers
  document.querySelectorAll('.section-header h2').forEach(h2 => {
    const section = h2.closest('.section');
    if (!section || !section.id) return;

    const btn = document.createElement('button');
    btn.className = 'bookmark-btn';
    btn.title = 'Bookmark this section';
    const bId = page + '#' + section.id;
    btn.textContent = bookmarks.some(b => b.id === bId) ? '★' : '☆';
    if (bookmarks.some(b => b.id === bId)) btn.classList.add('bookmarked');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const exists = bookmarks.findIndex(b => b.id === bId);
      if (exists >= 0) {
        bookmarks.splice(exists, 1);
        btn.textContent = '☆';
        btn.classList.remove('bookmarked');
      } else {
        bookmarks.push({ id: bId, title: h2.textContent.replace('☆', '').replace('★', '').trim(), page: pageTitle, href: page + '#' + section.id });
        btn.textContent = '★';
        btn.classList.add('bookmarked');
      }
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      updateBookmarksPanel();
    });

    h2.appendChild(btn);
  });

  // Bookmarks panel
  const panel = document.createElement('div');
  panel.className = 'bookmarks-panel';
  panel.id = 'bookmarks-panel';
  document.body.appendChild(panel);

  // Bookmarks button added via header controls in nav.js
  setTimeout(() => {
    const btn = document.querySelector('#bookmarks-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        panel.classList.toggle('open');
        updateBookmarksPanel();
      });
    }
  }, 100);

  function updateBookmarksPanel() {
    const current = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
    if (current.length === 0) {
      panel.innerHTML = '<h3>Bookmarks <button class="close-panel" onclick="this.closest(\'.bookmarks-panel\').classList.remove(\'open\')">✕</button></h3><p style="color:var(--text-muted);font-size:14px;">No bookmarks yet. Click ☆ on any section header to save it here.</p>';
    } else {
      panel.innerHTML = '<h3>Bookmarks <button class="close-panel" onclick="this.closest(\'.bookmarks-panel\').classList.remove(\'open\')">✕</button></h3>' +
        current.map(b => `<a class="bookmark-item" href="${b.href}"><strong>${b.title}</strong><small>${b.page}</small></a>`).join('');
    }
  }
}


/* ============================================
   5. AUTO COPY BUTTONS
   ============================================ */
function initAutoCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.code-block')) return; // Already has copy button
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'code-copy-auto';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      } catch { btn.textContent = 'Failed'; setTimeout(() => { btn.textContent = 'Copy'; }, 2000); }
    });
    wrapper.appendChild(btn);
  });
}


/* ============================================
   6. CAPACITY COST CALCULATOR
   ============================================ */
function initCapacityCalculator() {
  const container = document.getElementById('capacity-calculator');
  if (!container) return;

  const sliders = container.querySelectorAll('input[type="range"]');
  const resultEl = container.querySelector('.calc-result');

  function calculate() {
    const sparkHours = parseInt(container.querySelector('#calc-spark').value) || 0;
    const biUsers = parseInt(container.querySelector('#calc-bi').value) || 0;
    const pipelineRuns = parseInt(container.querySelector('#calc-pipelines').value) || 0;
    const dwQueries = parseInt(container.querySelector('#calc-dw').value) || 0;
    const rtStreams = parseInt(container.querySelector('#calc-rt').value) || 0;

    // CU estimation model (simplified)
    const sparkCU = sparkHours * 8;
    const biCU = biUsers * 0.5;
    const pipelineCU = pipelineRuns * 0.3;
    const dwCU = dwQueries * 0.4;
    const rtCU = rtStreams * 4;
    const totalCU = sparkCU + biCU + pipelineCU + dwCU + rtCU;

    // Determine SKU
    const skus = [
      { name: 'F2', cu: 2, cost: 262 },
      { name: 'F4', cu: 4, cost: 525 },
      { name: 'F8', cu: 8, cost: 1050 },
      { name: 'F16', cu: 16, cost: 2100 },
      { name: 'F32', cu: 32, cost: 4200 },
      { name: 'F64', cu: 64, cost: 8400 },
      { name: 'F128', cu: 128, cost: 16800 },
      { name: 'F256', cu: 256, cost: 33600 },
      { name: 'F512', cu: 512, cost: 67200 }
    ];

    const needed = Math.max(2, Math.ceil(totalCU * 1.15)); // 15% headroom
    const sku = skus.find(s => s.cu >= needed) || skus[skus.length - 1];

    resultEl.innerHTML = `
      <h4>Recommended SKU</h4>
      <div class="sku-recommendation">${sku.name}</div>
      <div class="sku-details">
        Estimated CU need: <strong>${Math.round(totalCU)} CU</strong> (with 15% headroom: ${needed} CU)<br>
        Capacity: <strong>${sku.cu} CU</strong> · ~$${sku.cost.toLocaleString()}/month (pay-as-you-go)
      </div>`;

    // Update displayed values
    container.querySelector('#val-spark').textContent = sparkHours + 'h';
    container.querySelector('#val-bi').textContent = biUsers;
    container.querySelector('#val-pipelines').textContent = pipelineRuns;
    container.querySelector('#val-dw').textContent = dwQueries + '/h';
    container.querySelector('#val-rt').textContent = rtStreams;
  }

  sliders.forEach(s => s.addEventListener('input', calculate));
  calculate();
}


/* ============================================
   7. ARCHITECTURE DECISION WIZARD
   ============================================ */
function initArchWizard() {
  const container = document.getElementById('arch-wizard');
  if (!container) return;

  let currentStep = 0;
  const answers = {};
  const steps = container.querySelectorAll('.wizard-step');
  const dots = container.querySelectorAll('.wizard-progress-dot');

  container.addEventListener('click', (e) => {
    const option = e.target.closest('.wizard-option');
    if (option) {
      const step = option.closest('.wizard-step');
      step.querySelectorAll('.wizard-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      answers[option.dataset.question] = option.dataset.value;
    }

    if (e.target.closest('.wizard-next')) {
      if (!answers['q' + currentStep] && currentStep < steps.length - 1) return;
      if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
      } else {
        showResult();
      }
    }
    if (e.target.closest('.wizard-back')) {
      if (currentStep > 0) showStep(currentStep - 1);
    }
    if (e.target.closest('.wizard-restart')) {
      Object.keys(answers).forEach(k => delete answers[k]);
      container.querySelectorAll('.wizard-option').forEach(o => o.classList.remove('selected'));
      const resultEl = container.querySelector('.wizard-result');
      if (resultEl) resultEl.style.display = 'none';
      showStep(0);
    }
  });

  function showStep(idx) {
    steps.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => {
      d.classList.toggle('current', i === idx);
      d.classList.toggle('completed', i < idx);
    });
    currentStep = idx;
  }

  function showResult() {
    steps.forEach(s => s.classList.remove('active'));
    const resultEl = container.querySelector('.wizard-result');
    resultEl.style.display = 'block';

    const teamSize = answers.q0;
    const workload = answers.q1;
    const sharing = answers.q2;

    let pattern, desc, links;

    if (sharing === 'critical' || (teamSize === 'large' && sharing === 'somewhat')) {
      pattern = '🏗️ Data Mesh + Medallion Hybrid';
      desc = 'Your multi-team environment with strong data sharing needs calls for a <strong>Data Mesh</strong> approach. Each domain team owns their data products using medallion layers (Bronze/Silver/Gold) internally, and publishes certified Gold datasets via OneLake shortcuts for cross-domain consumption.';
      links = '<a href="data-mesh.html" class="journey-link">Data Mesh Guide →</a><a href="architecture.html#medallion" class="journey-link">Medallion Architecture →</a><a href="governance.html" class="journey-link">Governance →</a>';
    } else if (teamSize === 'small') {
      pattern = '📐 Simple Medallion (Lakehouse)';
      desc = 'For a small team, a straightforward <strong>Medallion Architecture</strong> in a single Lakehouse is ideal. Organize your data in Bronze → Silver → Gold layers. Keep it simple — you can evolve toward Data Mesh as you grow.';
      links = '<a href="architecture.html#medallion" class="journey-link">Medallion Architecture →</a><a href="best-practices.html" class="journey-link">Best Practices →</a><a href="checklist.html" class="journey-link">Getting Started →</a>';
    } else if (workload === 'realtime') {
      pattern = '⚡ Real-Time Intelligence + Medallion';
      desc = 'Your focus on streaming requires <strong>Real-Time Intelligence</strong> (Eventhouse + KQL) for ingestion and live queries, feeding into a medallion lakehouse for historical analytics and BI.';
      links = '<a href="architecture.html#real-time" class="journey-link">Real-Time Intelligence →</a><a href="best-practices.html#realtime" class="journey-link">Real-Time Best Practices →</a>';
    } else {
      pattern = '🏛️ Enterprise Medallion';
      desc = 'A well-structured <strong>Enterprise Medallion Architecture</strong> with dedicated workspaces per environment (Dev/Test/Prod), strong governance, and Git-based CI/CD is the right fit. Consider domain workspaces as your team grows.';
      links = '<a href="architecture.html" class="journey-link">Core Architecture →</a><a href="operations.html" class="journey-link">Operations & CI/CD →</a><a href="governance.html" class="journey-link">Governance →</a>';
    }

    resultEl.innerHTML = `
      <h4>${pattern}</h4>
      <p style="color:var(--text-secondary);line-height:1.7;margin-bottom:16px;">${desc}</p>
      <div style="margin-top:12px;">${links}</div>
      <div style="margin-top:16px;"><button class="wizard-btn wizard-restart">Start Over</button></div>`;
  }

  showStep(0);
}


/* ============================================
   8. MIGRATION PATH RECOMMENDER
   ============================================ */
function initMigrationRecommender() {
  const container = document.getElementById('migration-recommender');
  if (!container) return;

  const paths = {
    synapse: {
      title: '🔄 Synapse → Fabric Migration',
      steps: [
        { phase: 'Assess', desc: 'Inventory Synapse dedicated SQL pools, Spark pools, and pipelines. Map each to Fabric equivalents (Data Warehouse, Lakehouse, Data Factory).' },
        { phase: 'Connect', desc: 'Create OneLake shortcuts to your existing ADLS Gen2 storage. This lets Fabric read Synapse data without moving it.' },
        { phase: 'Parallel Run', desc: 'Recreate key pipelines and notebooks in Fabric. Run both platforms side-by-side to compare performance and CU usage.' },
        { phase: 'Migrate', desc: 'Move workloads in priority order: ETL first, then SQL workloads, then BI. Use Fabric\'s Data Warehouse for T-SQL compatibility.' },
        { phase: 'Cutover', desc: 'Redirect applications and reports to Fabric endpoints. Decommission Synapse resources after validation period.' }
      ]
    },
    adf: {
      title: '🔄 Azure Data Factory → Fabric',
      steps: [
        { phase: 'Assess', desc: 'Catalog all ADF pipelines, linked services, datasets, and triggers. Identify which use Integration Runtime (IR).' },
        { phase: 'Map', desc: 'ADF pipelines map to Data Factory in Fabric. Most activities have direct equivalents. Dataflows map to Dataflows Gen2.' },
        { phase: 'Recreate', desc: 'Rebuild pipelines in Fabric Data Factory. Use Copy Activity for data movement, notebooks for complex transforms.' },
        { phase: 'Test', desc: 'Run migrated pipelines on a schedule. Compare output data quality and performance metrics.' },
        { phase: 'Switch', desc: 'Update triggers and schedules to point to Fabric pipelines. Disable ADF pipelines after validation.' }
      ]
    },
    pbi: {
      title: '🔄 Power BI Premium → Fabric',
      steps: [
        { phase: 'Enable', desc: 'Enable Fabric on your existing P-SKU capacity (P1→F64, P2→F128, etc.). No new purchase needed — same capacity pool.' },
        { phase: 'Keep BI', desc: 'All existing Power BI content (reports, dashboards, datasets) continues to work unchanged on the Fabric-enabled capacity.' },
        { phase: 'Add Lakehouse', desc: 'Create Lakehouses in Fabric workspaces. Start moving import-mode datasets to Direct Lake for better performance.' },
        { phase: 'Optimize', desc: 'Migrate large import-mode datasets to Direct Lake. Create Gold layer tables with V-Order for blazing-fast BI.' },
        { phase: 'Expand', desc: 'Leverage Fabric\'s full capabilities: Spark notebooks, Data Factory, Real-Time Intelligence on the same capacity.' }
      ]
    },
    databricks: {
      title: '🔄 Databricks → Fabric',
      steps: [
        { phase: 'Assess', desc: 'Inventory Databricks workspaces, notebooks, jobs, and Unity Catalog assets. Note Delta table locations in ADLS/S3.' },
        { phase: 'Shortcut', desc: 'Create OneLake shortcuts to your existing Delta tables in ADLS. Fabric can read them directly — no data movement.' },
        { phase: 'Notebooks', desc: 'Port PySpark notebooks to Fabric. Most PySpark code runs without changes. Adjust for Fabric-specific APIs where needed.' },
        { phase: 'MLflow', desc: 'Fabric has built-in MLflow. Migrate experiment tracking and model registry to Fabric\'s MLflow integration.' },
        { phase: 'Cutover', desc: 'Gradually shift job schedules to Fabric. Compare CU costs vs Databricks DBU costs to optimize.' }
      ]
    },
    onprem: {
      title: '🔄 On-Premises → Fabric',
      steps: [
        { phase: 'Inventory', desc: 'Document SQL Server databases, SSIS packages, SSRS reports, and SSAS models. Measure peak CPU, memory, and storage.' },
        { phase: 'Mirror', desc: 'Use Fabric Mirroring to replicate on-prem SQL databases to OneLake in real-time. This creates a live copy without ETL.' },
        { phase: 'Rebuild ETL', desc: 'Convert SSIS packages to Fabric Data Factory pipelines or Spark notebooks. Start with the simplest, highest-value pipelines.' },
        { phase: 'BI Migration', desc: 'Move SSRS reports to Power BI. Migrate SSAS models to Fabric Semantic Models with Direct Lake connections.' },
        { phase: 'Decommission', desc: 'Once all workloads run on Fabric, plan on-prem server retirement. Keep mirroring as backup during transition.' }
      ]
    }
  };

  container.addEventListener('click', (e) => {
    const option = e.target.closest('.wizard-option');
    if (option) {
      showMigrationPath(option.dataset.value);
    }
    if (e.target.closest('.wizard-restart')) {
      container.querySelector('.migration-question').style.display = 'block';
      container.querySelector('.migration-result').style.display = 'none';
    }
  });

  function showMigrationPath(platform) {
    const path = paths[platform];
    if (!path) return;

    container.querySelector('.migration-question').style.display = 'none';
    const resultEl = container.querySelector('.migration-result');
    resultEl.style.display = 'block';
    resultEl.innerHTML = `
      <h4 style="margin-bottom:20px;">${path.title}</h4>
      <div class="pipeline-flow" style="flex-wrap:wrap;justify-content:center;gap:8px;">
        ${path.steps.map((s, i) => `
          <div class="pipeline-stage" style="min-width:120px;max-width:160px;">
            <div class="stage-box">
              <div class="stage-name">${s.phase}</div>
            </div>
            <div class="stage-desc" style="font-size:12px;">${s.desc}</div>
          </div>
          ${i < path.steps.length - 1 ? '<span class="pipeline-arrow">→</span>' : ''}
        `).join('')}
      </div>
      <div style="margin-top:20px;text-align:center;"><button class="wizard-btn wizard-restart">← Choose Different Platform</button></div>`;
  }
}


/* ============================================
   9. READINESS QUIZ
   ============================================ */
function initReadinessQuiz() {
  const container = document.getElementById('readiness-quiz');
  if (!container) return;

  const questions = [
    { q: 'Does your organization have a defined data strategy?', scores: [0, 1, 3] , options: ['No', 'Partially', 'Yes, documented & active'] },
    { q: 'How is your data currently stored?', scores: [1, 2, 3], options: ['Siloed across many systems', 'Partially consolidated (data lake)', 'Unified data platform'] },
    { q: 'Do you have data governance policies in place?', scores: [0, 1, 3], options: ['No formal policies', 'Some policies, not enforced', 'Yes, with tools & enforcement'] },
    { q: 'What is your team\'s cloud experience level?', scores: [0, 1, 3], options: ['New to cloud', 'Some Azure experience', 'Strong Azure/cloud skills'] },
    { q: 'How do you handle data security & compliance?', scores: [0, 1, 3], options: ['Ad-hoc / not formalized', 'Basic controls in place', 'Comprehensive (RLS, sensitivity labels, auditing)'] },
    { q: 'Do you have CI/CD for data pipelines?', scores: [0, 1, 3], options: ['No version control', 'Git for some assets', 'Full CI/CD with automated deployment'] },
    { q: 'How mature is your BI / reporting practice?', scores: [1, 2, 3], options: ['Spreadsheets & ad-hoc', 'Some Power BI usage', 'Enterprise BI with governed datasets'] },
    { q: 'Do teams share data across departments?', scores: [0, 1, 3], options: ['No, each team has its own copy', 'Some sharing via exports', 'Governed data products / catalog'] },
    { q: 'How do you manage capacity & costs?', scores: [0, 1, 3], options: ['No visibility into costs', 'Basic monitoring', 'Active cost management & optimization'] },
    { q: 'Is executive sponsorship in place for data initiatives?', scores: [0, 1, 3], options: ['No', 'Informal support', 'Yes, with budget & roadmap'] }
  ];

  let currentQ = 0;
  let userAnswers = [];

  function renderQuestion() {
    const qData = questions[currentQ];
    const qEls = container.querySelectorAll('.quiz-question');
    qEls.forEach((el, i) => el.classList.toggle('active', i === currentQ));

    // Update progress dots
    container.querySelectorAll('.wizard-progress-dot').forEach((d, i) => {
      d.classList.toggle('current', i === currentQ);
      d.classList.toggle('completed', i < currentQ);
    });
  }

  container.addEventListener('click', (e) => {
    const option = e.target.closest('.quiz-option');
    if (option) {
      const step = option.closest('.quiz-question');
      step.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      userAnswers[currentQ] = parseInt(option.dataset.score);

      // Auto-advance after short delay
      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          currentQ++;
          renderQuestion();
        } else {
          showQuizResult();
        }
      }, 300);
    }

    if (e.target.closest('.wizard-restart')) {
      currentQ = 0;
      userAnswers = [];
      container.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      container.querySelector('.quiz-result').style.display = 'none';
      container.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
      renderQuestion();
    }
  });

  function showQuizResult() {
    container.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
    const total = userAnswers.reduce((a, b) => a + b, 0);
    const maxScore = questions.length * 3;
    const pct = Math.round((total / maxScore) * 100);
    const resultEl = container.querySelector('.quiz-result');

    let level, color, advice;
    if (pct >= 75) {
      level = '🟢 Ready for Fabric';
      color = 'var(--accent-green)';
      advice = 'Your organization has strong foundations. You can adopt Fabric confidently. Focus on architecture planning and start with a pilot project.';
    } else if (pct >= 45) {
      level = '🟡 Getting There';
      color = '#FFB900';
      advice = 'Good progress, but some areas need attention before full adoption. Prioritize governance, CI/CD practices, and team cloud skills training.';
    } else {
      level = '🔴 Foundation Needed';
      color = 'var(--accent-red)';
      advice = 'Your organization needs foundational work before adopting Fabric. Start with data strategy, governance policies, and cloud skills training.';
    }

    resultEl.style.display = 'block';
    resultEl.style.borderLeftColor = color;
    resultEl.innerHTML = `
      <div class="quiz-score-label">Readiness Score</div>
      <div class="quiz-score" style="color:${color}">${pct}%</div>
      <h4>${level}</h4>
      <p style="color:var(--text-secondary);line-height:1.7;margin:12px 0;">${advice}</p>
      <div style="margin-top:12px;">
        <strong>Score breakdown:</strong> ${total}/${maxScore} points across ${questions.length} areas
      </div>
      <div style="margin-top:16px;">
        <a href="checklist.html" class="journey-link">Getting Started Checklist →</a>
        <a href="governance.html" class="journey-link">Governance Guide →</a>
      </div>
      <div style="margin-top:16px;"><button class="wizard-btn wizard-restart">Retake Assessment</button></div>`;
  }

  renderQuestion();
}


/* ============================================
   9b. GOVERNANCE-FIRST ASSESSMENT
   ============================================ */
function initGovernanceAssessment() {
  const container = document.getElementById('governance-assessment');
  if (!container) return;

  const categories = {
    domains:    { label: 'Domains & Ownership', max: 9, score: 0 },
    devprocess: { label: 'Development Process', max: 9, score: 0 },
    security:   { label: 'Security & Access',   max: 9, score: 0 },
    workspaces: { label: 'Logical Workspaces',  max: 9, score: 0 }
  };

  const questionEls = container.querySelectorAll('.quiz-question');
  const totalQuestions = questionEls.length;
  let currentQ = 0;
  let userAnswers = [];

  function renderQuestion() {
    questionEls.forEach((el, i) => el.classList.toggle('active', i === currentQ));
    container.querySelectorAll('.wizard-progress-dot').forEach((d, i) => {
      d.classList.toggle('current', i === currentQ);
      d.classList.toggle('completed', i < currentQ);
    });
  }

  container.addEventListener('click', (e) => {
    const option = e.target.closest('.quiz-option');
    if (option) {
      const step = option.closest('.quiz-question');
      step.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      userAnswers[currentQ] = {
        score: parseInt(option.dataset.score),
        category: option.dataset.category
      };

      setTimeout(() => {
        if (currentQ < totalQuestions - 1) {
          currentQ++;
          renderQuestion();
        } else {
          showResult();
        }
      }, 300);
    }

    if (e.target.closest('.wizard-restart')) {
      currentQ = 0;
      userAnswers = [];
      Object.keys(categories).forEach(k => { categories[k].score = 0; });
      container.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      container.querySelector('.quiz-result').style.display = 'none';
      questionEls.forEach(q => q.classList.remove('active'));
      renderQuestion();
    }
  });

  function showResult() {
    questionEls.forEach(q => q.classList.remove('active'));

    // Reset category scores
    Object.keys(categories).forEach(k => { categories[k].score = 0; });
    userAnswers.forEach(a => {
      if (a && categories[a.category]) {
        categories[a.category].score += a.score;
      }
    });

    const total = userAnswers.reduce((s, a) => s + (a ? a.score : 0), 0);
    const maxScore = totalQuestions * 3;
    const pct = Math.round((total / maxScore) * 100);

    let level, color, summary;
    if (pct >= 75) {
      level = '🟢 Governance-First';
      color = 'var(--accent-green)';
      summary = 'Your organization demonstrates strong governance maturity. You\'re well-positioned to scale Fabric confidently. Focus on continuous improvement: automate access reviews, refine domain policies, and expand OneLake security roles.';
    } else if (pct >= 45) {
      level = '🟡 Developing';
      color = '#FFB900';
      summary = 'You have governance foundations in place but gaps remain. Prioritize the weakest categories below before scaling further — ungoverned growth creates technical debt that\'s costly to fix later.';
    } else {
      level = '🔴 Ad-hoc';
      color = 'var(--accent-red)';
      summary = 'Governance is mostly informal or absent. Before expanding your Fabric environment, invest in defining domains, workspace structure, security groups, and a basic CI/CD pipeline. Start with the guidance section below.';
    }

    // Per-category recommendations
    const recommendations = {
      domains: {
        low: 'Define your business domains in Fabric and assign domain admins. Map at least your top 3–5 business units as domains with clear ownership.',
        mid: 'Formalize data stewards per domain. Enable Microsoft Purview for catalog and endorsement. Use subdomains to organize large business units.',
        high: 'Excellent domain governance. Consider expanding to a full data mesh model with self-service data products per domain.'
      },
      devprocess: {
        low: 'Stop editing production directly. Connect your Dev workspace to Git (Azure DevOps or GitHub) and create at least Dev and Prod workspaces.',
        mid: 'Add a Test environment and configure Fabric deployment pipelines. Establish branch policies requiring pull requests before merging to main.',
        high: 'Strong development lifecycle. Consider adding automated testing, variable libraries for environment config, and GitHub Actions/Azure Pipelines orchestration.'
      },
      security: {
        low: 'Create Entra ID security groups for each workspace role. Implement least-privilege: default to Viewer, grant Contributor/Member only where justified.',
        mid: 'Expand RLS to all consumer-facing reports. Configure OneLake data access roles for lakehouse folder-level security. Apply sensitivity labels with auto-labeling policies.',
        high: 'Comprehensive security posture. Focus on dynamic data masking for PII columns, quarterly access reviews, and network security (private endpoints, managed VNets).'
      },
      workspaces: {
        low: 'Establish a naming convention ([Domain]-[Product]-[Env]) and restructure existing workspaces. Assign production workspaces to dedicated Fabric/Premium capacity.',
        mid: 'Enable the Fabric domains feature to logically group workspaces. Separate capacity for dev vs production. Set up the admin monitoring workspace for utilization tracking.',
        high: 'Well-organized workspace topology. Consider automating workspace provisioning via APIs and adding automated governance policies per domain.'
      }
    };

    let categoryHTML = '';
    Object.keys(categories).forEach(key => {
      const cat = categories[key];
      const catPct = Math.round((cat.score / cat.max) * 100);
      let catLevel, catColor, rec;
      if (catPct >= 75) {
        catLevel = '🟢'; catColor = 'var(--accent-green)'; rec = recommendations[key].high;
      } else if (catPct >= 40) {
        catLevel = '🟡'; catColor = '#FFB900'; rec = recommendations[key].mid;
      } else {
        catLevel = '🔴'; catColor = 'var(--accent-red)'; rec = recommendations[key].low;
      }
      categoryHTML += `
        <div style="margin:12px 0;padding:12px 16px;border-left:3px solid ${catColor};background:var(--bg-card);border-radius:0 8px 8px 0;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <strong>${catLevel} ${cat.label}</strong>
            <span style="color:${catColor};font-weight:600;">${cat.score}/${cat.max} (${catPct}%)</span>
          </div>
          <p style="color:var(--text-secondary);margin:0;line-height:1.6;font-size:0.92em;">${rec}</p>
        </div>`;
    });

    const resultEl = container.querySelector('.quiz-result');
    resultEl.style.display = 'block';
    resultEl.style.borderLeftColor = color;
    resultEl.innerHTML = `
      <div class="quiz-score-label">Governance Maturity</div>
      <div class="quiz-score" style="color:${color}">${pct}%</div>
      <h4>${level}</h4>
      <p style="color:var(--text-secondary);line-height:1.7;margin:12px 0;">${summary}</p>
      <div style="margin-top:8px;">
        <strong>Overall:</strong> ${total}/${maxScore} points across ${totalQuestions} areas
      </div>
      <h4 style="margin-top:20px;margin-bottom:4px;">Category Breakdown &amp; Recommendations</h4>
      ${categoryHTML}
      <div style="margin-top:20px;">
        <a href="#governance-first-guide" class="journey-link">📘 Governance-First Guide ↓</a>
        <a href="checklist.html" class="journey-link">Getting Started Checklist →</a>
      </div>
      <div style="margin-top:16px;"><button class="wizard-btn wizard-restart">Retake Assessment</button></div>`;
  }

  renderQuestion();
}

/* ============================================
   10. INTERACTIVE ARCHITECTURE DIAGRAM
   ============================================ */
function initInteractiveArch() {
  const archCards = document.querySelectorAll('.arch-comp[data-tooltip]');
  archCards.forEach(card => {
    card.classList.add('arch-tooltip-trigger');

    const popover = document.createElement('div');
    popover.className = 'arch-popover';
    popover.innerHTML = `<h5>${card.dataset.tooltipTitle || ''}</h5><p>${card.dataset.tooltip}</p>`;
    card.style.position = 'relative';
    card.appendChild(popover);

    card.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.arch-popover.visible').forEach(p => p.classList.remove('visible'));
      popover.classList.toggle('visible');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.arch-popover.visible').forEach(p => p.classList.remove('visible'));
  });
}


/* ============================================
   11. CHECKLIST EXPORT
   ============================================ */
function initChecklistExport() {
  const mdBtn = document.getElementById('export-md');
  const pdfBtn = document.getElementById('export-pdf');

  function buildMarkdown() {
    let md = '# Microsoft Fabric — Getting Started Checklist\n';
    md += `Exported: ${new Date().toLocaleDateString()}\n\n`;

    let currentSection = '';
    document.querySelectorAll('.checklist-item').forEach(item => {
      const heading = item.closest('ul')?.previousElementSibling;
      if (heading && heading.tagName === 'H3' && heading.textContent !== currentSection) {
        currentSection = heading.textContent;
        md += `\n## ${currentSection}\n\n`;
      }

      const cb = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('.checklist-label');
      const title = label ? label.childNodes[0].textContent.trim() : '';
      const small = label ? label.querySelector('small') : null;
      const desc = small ? small.textContent.trim() : '';
      const checked = cb && cb.checked;

      md += `- [${checked ? 'x' : ' '}] **${title}**`;
      if (desc) md += `\n  _${desc}_`;
      md += '\n';
    });

    // Progress
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
      md += `\n---\n📊 Progress: ${progressText.textContent}\n`;
    }

    return md;
  }

  if (mdBtn) {
    mdBtn.addEventListener('click', () => {
      const md = buildMarkdown();
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fabric-checklist.md';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      window.print();
    });
  }
}


/* ============================================
   12. TCO / ROI CALCULATOR
   ============================================ */
function initTCOCalculator() {
  const container = document.getElementById('tco-calc');
  if (!container) return;

  const sliders = container.querySelectorAll('input[type="range"]');
  const resultEl = document.getElementById('tco-result');

  const skus = [
    { name: 'F2', cu: 2, cost: 262 },
    { name: 'F4', cu: 4, cost: 525 },
    { name: 'F8', cu: 8, cost: 1050 },
    { name: 'F16', cu: 16, cost: 2100 },
    { name: 'F32', cu: 32, cost: 4200 },
    { name: 'F64', cu: 64, cost: 8400 },
    { name: 'F128', cu: 128, cost: 16800 },
    { name: 'F256', cu: 256, cost: 33600 },
    { name: 'F512', cu: 512, cost: 67200 }
  ];

  function fmt(n) { return '$' + n.toLocaleString(); }

  function calculate() {
    const dwCost = parseInt(container.querySelector('#tco-dw').value) || 0;
    const etlCost = parseInt(container.querySelector('#tco-etl').value) || 0;
    const biCost = parseInt(container.querySelector('#tco-bi').value) || 0;
    const storageCost = parseInt(container.querySelector('#tco-storage').value) || 0;
    const volume = parseInt(container.querySelector('#tco-volume').value) || 1;
    const users = parseInt(container.querySelector('#tco-users').value) || 10;

    const currentTotal = dwCost + etlCost + biCost + storageCost;

    // Fabric cost estimation based on published pricing and typical migration benchmarks
    const fabricDW = Math.round(dwCost * 0.50);       // ~40-60% savings on warehouse
    const fabricETL = Math.round(etlCost * 0.60);      // ~30-50% savings on pipelines
    const fabricBI = users >= 50 ? Math.round(biCost * 0.35) : Math.round(biCost * 0.55); // F64+ includes free PBI viewers
    const fabricStorage = Math.round(volume * 23);      // OneLake ~$0.023/GB/month
    const fabricTotal = fabricDW + fabricETL + fabricBI + fabricStorage;

    const sku = skus.find(s => s.cost >= fabricTotal) || skus[skus.length - 1];

    const savings = currentTotal - fabricTotal;
    const savingsPct = currentTotal > 0 ? Math.round((savings / currentTotal) * 100) : 0;
    const annualSavings = savings * 12;

    // Update slider labels
    container.querySelector('#tco-val-dw').textContent = fmt(dwCost);
    container.querySelector('#tco-val-etl').textContent = fmt(etlCost);
    container.querySelector('#tco-val-bi').textContent = fmt(biCost);
    container.querySelector('#tco-val-storage').textContent = fmt(storageCost);
    container.querySelector('#tco-val-volume').textContent = volume + ' TB';
    container.querySelector('#tco-val-users').textContent = users;

    const maxBar = Math.max(currentTotal, fabricTotal, 1);

    resultEl.innerHTML = `
      <h4 style="margin:0 0 16px;">Cost Comparison</h4>
      <div class="tco-bars">
        <div class="tco-bar-row">
          <span class="tco-bar-label">Current Platform</span>
          <div class="tco-bar-track">
            <div class="tco-bar-fill tco-bar-current" style="width:${(currentTotal/maxBar)*100}%"></div>
          </div>
          <span class="tco-bar-value">${fmt(currentTotal)}/mo</span>
        </div>
        <div class="tco-bar-row">
          <span class="tco-bar-label">Microsoft Fabric</span>
          <div class="tco-bar-track">
            <div class="tco-bar-fill tco-bar-fabric" style="width:${(fabricTotal/maxBar)*100}%"></div>
          </div>
          <span class="tco-bar-value">${fmt(fabricTotal)}/mo</span>
        </div>
      </div>
      <div class="tco-summary">
        <div class="tco-savings-badge" style="color:${savings > 0 ? 'var(--accent-green)' : 'var(--accent-red)'}">
          ${savings > 0 ? '↓' : '↑'} ${Math.abs(savingsPct)}% ${savings > 0 ? 'savings' : 'increase'}
        </div>
        <div class="tco-detail-grid">
          <div class="tco-detail-item">
            <div class="tco-detail-label">Monthly Savings</div>
            <div class="tco-detail-value">${fmt(Math.abs(savings))}</div>
          </div>
          <div class="tco-detail-item">
            <div class="tco-detail-label">Annual Savings</div>
            <div class="tco-detail-value">${fmt(Math.abs(annualSavings))}</div>
          </div>
          <div class="tco-detail-item">
            <div class="tco-detail-label">Recommended SKU</div>
            <div class="tco-detail-value">${sku.name}</div>
          </div>
          <div class="tco-detail-item">
            <div class="tco-detail-label">SKU Cost</div>
            <div class="tco-detail-value">${fmt(sku.cost)}/mo</div>
          </div>
        </div>
        <div class="tco-breakdown">
          <div class="tco-breakdown-title">Fabric Cost Breakdown</div>
          <div class="tco-breakdown-row"><span>Data Warehouse</span><span>${fmt(fabricDW)}</span></div>
          <div class="tco-breakdown-row"><span>Data Pipelines</span><span>${fmt(fabricETL)}</span></div>
          <div class="tco-breakdown-row"><span>BI &amp; Reporting</span><span>${fmt(fabricBI)}</span></div>
          <div class="tco-breakdown-row"><span>OneLake Storage (${volume} TB)</span><span>${fmt(fabricStorage)}</span></div>
        </div>
      </div>
      <button class="wizard-btn tco-copy-btn" style="margin-top:16px;">📋 Copy Summary for Proposal</button>`;

    resultEl.querySelector('.tco-copy-btn').addEventListener('click', function() {
      const text = `TCO/ROI Summary — Microsoft Fabric Migration
Current Monthly Spend: ${fmt(currentTotal)}
  • Data Warehouse: ${fmt(dwCost)}
  • ETL / Pipelines: ${fmt(etlCost)}
  • BI & Reporting: ${fmt(biCost)}
  • Storage: ${fmt(storageCost)}

Estimated Fabric Cost: ${fmt(fabricTotal)}/month
  • Data Warehouse: ${fmt(fabricDW)}
  • Data Pipelines: ${fmt(fabricETL)}
  • BI & Reporting: ${fmt(fabricBI)}
  • OneLake Storage (${volume} TB): ${fmt(fabricStorage)}

Savings: ${fmt(Math.abs(savings))}/month (${Math.abs(savingsPct)}%) | ${fmt(Math.abs(annualSavings))}/year
Recommended SKU: ${sku.name} (${sku.cu} CU, ${fmt(sku.cost)}/mo)
Data Volume: ${volume} TB | Report Consumers: ${users}

Note: Estimates based on published Fabric pricing and typical migration benchmarks.
Official SKU Estimator: https://aka.ms/fabricskuestimator`;

      navigator.clipboard.writeText(text).then(() => {
        this.textContent = '✅ Copied!';
        setTimeout(() => { this.textContent = '📋 Copy Summary for Proposal'; }, 2000);
      }).catch(() => {
        this.textContent = '❌ Failed';
        setTimeout(() => { this.textContent = '📋 Copy Summary for Proposal'; }, 2000);
      });
    });
  }

  sliders.forEach(s => s.addEventListener('input', calculate));
  calculate();
}


/* ============================================
   13. SCENARIO TEMPLATE FILTER
   ============================================ */
function initScenarioFilter() {
  const filter = document.getElementById('scenario-filter');
  const grid = document.getElementById('scenario-cards');
  if (!filter || !grid) return;

  filter.addEventListener('click', (e) => {
    const tag = e.target.closest('.scenario-tag');
    if (!tag) return;

    const filterVal = tag.dataset.filter;
    filter.querySelectorAll('.scenario-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');

    grid.querySelectorAll('.scenario-card').forEach(card => {
      card.style.display = (filterVal === 'all' || card.dataset.industry === filterVal) ? '' : 'none';
    });
  });
}


/* ============================================
   14. ROLE-BASED CONTENT FILTER
   ============================================ */
function initRoleFilter() {
  const roles = [
    { id: 'data-engineer', label: 'Data Engineer', icon: '⚙️' },
    { id: 'data-architect', label: 'Data Architect', icon: '🏗️' },
    { id: 'bi-developer', label: 'BI Developer', icon: '📊' },
    { id: 'data-scientist', label: 'Data Scientist', icon: '🧪' },
    { id: 'it-admin', label: 'IT Admin', icon: '🔐' },
    { id: 'business-leader', label: 'Business Leader', icon: '💼' }
  ];

  let activeRole = localStorage.getItem('fabric-role') || '';

  const controls = document.querySelector('.header-controls');
  if (!controls) return;

  const activeRoleObj = roles.find(r => r.id === activeRole);
  const badge = document.createElement('div');
  badge.className = 'role-filter-badge';
  badge.innerHTML = `
    <button class="header-btn role-btn" title="Filter by role" aria-label="Filter content by role">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span class="btn-label role-label">${activeRoleObj ? activeRoleObj.label : 'Role'}</span>
    </button>
    <div class="role-dropdown" style="display:none;">
      <div class="role-dropdown-title">View as Role</div>
      ${roles.map(r => `<div class="role-dropdown-item${r.id === activeRole ? ' active' : ''}" data-role="${r.id}">${r.icon} ${r.label}</div>`).join('')}
      <div class="role-dropdown-divider"></div>
      <div class="role-dropdown-item role-clear" data-role="">👁️ Show All Content</div>
    </div>`;

  controls.prepend(badge);

  badge.querySelector('.role-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const dd = badge.querySelector('.role-dropdown');
    dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
  });

  badge.addEventListener('click', (e) => {
    const item = e.target.closest('.role-dropdown-item');
    if (!item) return;

    activeRole = item.dataset.role;
    if (activeRole) {
      localStorage.setItem('fabric-role', activeRole);
    } else {
      localStorage.removeItem('fabric-role');
    }

    applyFilter();
    badge.querySelector('.role-dropdown').style.display = 'none';

    const label = badge.querySelector('.role-label');
    const roleObj = roles.find(r => r.id === activeRole);
    label.textContent = roleObj ? roleObj.label : 'Role';

    badge.querySelectorAll('.role-dropdown-item').forEach(i => {
      i.classList.toggle('active', i.dataset.role === activeRole);
    });
  });

  document.addEventListener('click', () => {
    badge.querySelector('.role-dropdown').style.display = 'none';
  });

  function applyFilter() {
    const sections = document.querySelectorAll('[data-roles]');
    if (!activeRole || sections.length === 0) {
      sections.forEach(el => el.classList.remove('role-dimmed'));
      document.body.setAttribute('data-active-role', activeRole);
      return;
    }
    // If every section would be dimmed, skip dimming so the page stays readable
    const anyMatch = [...sections].some(el =>
      el.dataset.roles.split(',').map(r => r.trim()).includes(activeRole)
    );
    sections.forEach(el => {
      if (!anyMatch) {
        el.classList.remove('role-dimmed');
      } else {
        const elRoles = el.dataset.roles.split(',').map(r => r.trim());
        el.classList.toggle('role-dimmed', !elRoles.includes(activeRole));
      }
    });
    document.body.setAttribute('data-active-role', activeRole);
  }

  // Wire journey cards on index.html — double-click sets role
  document.querySelectorAll('.journey-card[data-role]').forEach(card => {
    card.addEventListener('dblclick', () => {
      activeRole = card.dataset.role;
      localStorage.setItem('fabric-role', activeRole);
      applyFilter();
      const label = badge.querySelector('.role-label');
      const roleObj = roles.find(r => r.id === activeRole);
      label.textContent = roleObj ? roleObj.label : 'Role';
      badge.querySelectorAll('.role-dropdown-item').forEach(i => {
        i.classList.toggle('active', i.dataset.role === activeRole);
      });
    });
  });

  applyFilter();
}

/* ============================================
   MIGRATION COMPLEXITY SCORER
   ============================================ */
function initMigrationScorer() {
  const container = document.getElementById('migration-scorer');
  if (!container) return;

  const questions = [
    { q: 'What is your primary source platform?', cat: 'platform', opts: [
      { text: '☁️ Azure Synapse Analytics', score: 1, risk: [] },
      { text: '☁️ Azure Data Factory + SQL', score: 2, risk: ['Pipeline refactoring'] },
      { text: '☁️ Databricks + Delta Lake', score: 2, risk: ['Spark config differences'] },
      { text: '🏢 On-premises SQL Server / SSIS', score: 4, risk: ['Network connectivity', 'Legacy package conversion'] },
      { text: '☁️ AWS / GCP / Snowflake', score: 3, risk: ['Cross-cloud data transfer', 'Proprietary feature mapping'] }
    ]},
    { q: 'How many data pipelines do you have?', cat: 'scale', opts: [
      { text: '1–10 pipelines', score: 1, risk: [] },
      { text: '11–50 pipelines', score: 2, risk: [] },
      { text: '51–200 pipelines', score: 3, risk: ['Pipeline dependency mapping'] },
      { text: '200+ pipelines', score: 5, risk: ['Pipeline dependency mapping', 'Phased migration required'] }
    ]},
    { q: 'What is your total data volume?', cat: 'scale', opts: [
      { text: 'Under 100 GB', score: 1, risk: [] },
      { text: '100 GB – 1 TB', score: 2, risk: [] },
      { text: '1 TB – 10 TB', score: 3, risk: ['Data transfer planning'] },
      { text: '10 TB+', score: 5, risk: ['Data transfer planning', 'Capacity sizing critical'] }
    ]},
    { q: 'How many reports and dashboards?', cat: 'bi', opts: [
      { text: '1–20 reports', score: 1, risk: [] },
      { text: '21–100 reports', score: 2, risk: ['Semantic model consolidation'] },
      { text: '100+ reports', score: 4, risk: ['Semantic model consolidation', 'Report usage analysis needed'] }
    ]},
    { q: 'What is your team\'s Fabric / cloud experience?', cat: 'team', opts: [
      { text: '🟢 Experienced — team has used Fabric or Synapse', score: 1, risk: [] },
      { text: '🟡 Moderate — cloud experience, new to Fabric', score: 2, risk: ['Training investment'] },
      { text: '🔴 Limited — mostly on-premises experience', score: 4, risk: ['Training investment', 'Change management'] }
    ]},
    { q: 'Do you have regulatory compliance requirements?', cat: 'compliance', opts: [
      { text: 'No special requirements', score: 1, risk: [] },
      { text: 'Standard (SOC 2, ISO 27001)', score: 2, risk: ['Compliance validation'] },
      { text: 'Strict (HIPAA, PCI-DSS, FedRAMP)', score: 4, risk: ['Compliance validation', 'Data residency planning', 'Private networking'] }
    ]},
    { q: 'Do you need real-time / streaming analytics?', cat: 'realtime', opts: [
      { text: 'No — batch only', score: 0, risk: [] },
      { text: 'Yes — basic event processing', score: 2, risk: ['Eventstream configuration'] },
      { text: 'Yes — complex event processing with low latency', score: 4, risk: ['Eventstream configuration', 'Eventhouse sizing'] }
    ]},
    { q: 'What is your current CI/CD maturity?', cat: 'devops', opts: [
      { text: '🟢 Mature — Git, automated pipelines, IaC', score: 0, risk: [] },
      { text: '🟡 Basic — some version control, manual deploys', score: 2, risk: ['DevOps setup needed'] },
      { text: '🔴 None — manual everything', score: 3, risk: ['DevOps setup needed', 'Change management'] }
    ]}
  ];

  let current = 0;
  let totalScore = 0;
  let risks = new Set();

  function renderQuiz() {
    const progress = questions.map((_, i) =>
      `<div class="wizard-progress-dot ${i < current ? 'completed' : ''} ${i === current ? 'current' : ''}"></div>`
    ).join('');

    const q = questions[current];
    const opts = q.opts.map((o, i) =>
      `<div class="quiz-option" data-idx="${i}"><span class="option-icon">▸</span> ${o.text}</div>`
    ).join('');

    container.querySelector('.ms-inner').innerHTML =
      `<div class="quiz-container">
        <div class="wizard-progress">${progress}</div>
        <div class="quiz-question active">
          <span class="tag tag-purple">Question ${current + 1} of ${questions.length}</span>
          <h4>${q.q}</h4>
          <div class="quiz-options">${opts}</div>
        </div>
      </div>`;

    container.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const idx = parseInt(opt.dataset.idx);
        const chosen = q.opts[idx];
        totalScore += chosen.score;
        chosen.risk.forEach(r => risks.add(r));
        current++;
        if (current < questions.length) renderQuiz();
        else renderResult();
      });
    });
  }

  function renderResult() {
    const max = questions.reduce((s, q) => s + Math.max(...q.opts.map(o => o.score)), 0);
    const pct = Math.round((totalScore / max) * 100);
    let level, color, phases, duration;
    if (pct <= 25) { level = 'Low'; color = 'var(--accent-green)'; phases = '2–3'; duration = '4–8 weeks'; }
    else if (pct <= 50) { level = 'Medium'; color = 'var(--accent-blue)'; phases = '3–4'; duration = '8–16 weeks'; }
    else if (pct <= 75) { level = 'High'; color = 'var(--accent-orange)'; phases = '4–5'; duration = '16–28 weeks'; }
    else { level = 'Very High'; color = '#DA3B01'; phases = '5+'; duration = '28–52 weeks'; }

    const riskTags = [...risks].map(r => `<span class="migration-risk-tag">${r}</span>`).join('');

    container.querySelector('.ms-inner').innerHTML =
      `<div class="calc-result">
        <div class="migration-result-grid">
          <div class="migration-metric">
            <div class="migration-metric-value" style="color:${color}">${level}</div>
            <div class="migration-metric-label">Complexity</div>
          </div>
          <div class="migration-metric">
            <div class="migration-metric-value" style="color:${color}">${phases}</div>
            <div class="migration-metric-label">Est. Phases</div>
          </div>
          <div class="migration-metric">
            <div class="migration-metric-value" style="color:${color}">${duration}</div>
            <div class="migration-metric-label">Est. Duration</div>
          </div>
          <div class="migration-metric">
            <div class="migration-metric-value">${risks.size}</div>
            <div class="migration-metric-label">Risk Areas</div>
          </div>
        </div>
        <div class="migration-phases">
          <div class="migration-phase"><div class="migration-phase-num">1</div>Assess &<br>Plan</div>
          <div class="migration-phase"><div class="migration-phase-num">2</div>Foundation<br>Setup</div>
          <div class="migration-phase"><div class="migration-phase-num">3</div>Data<br>Migration</div>
          <div class="migration-phase"><div class="migration-phase-num">4</div>Workload<br>Cutover</div>
          <div class="migration-phase"><div class="migration-phase-num">5</div>Optimize &<br>Validate</div>
        </div>
        ${risks.size ? `<div class="migration-risks"><strong>⚠️ Key Risk Areas:</strong><br>${riskTags}</div>` : '<p style="color:var(--accent-green);font-weight:600;">✅ No significant risk areas identified.</p>'}
        <button class="wp-export-btn" style="margin-top:16px;max-width:200px;" onclick="this.closest('.ms-inner').querySelector('.calc-result') && (function(el){
          el.parentElement.innerHTML='';
        })(this)">↻ Retake Assessment</button>
      </div>`;

    container.querySelector('.wp-export-btn').addEventListener('click', e => {
      e.preventDefault();
      current = 0; totalScore = 0; risks = new Set();
      renderQuiz();
    });
  }

  renderQuiz();
}

/* ============================================
   MIGRATION TOOLS SELECTOR
   ============================================ */
function initMigrationTools() {
  const container = document.getElementById('migration-tools');
  if (!container) return;
  const detail = document.getElementById('migration-tool-detail');

  const tools = {
    synapse: {
      icon: '🔷', title: 'Azure Synapse Analytics', status: 'ga', statusLabel: '✅ Official Tools Available',
      tools: [
        { name: 'Fabric Data Warehouse Migration Guide', desc: 'Step-by-step guide for migrating Synapse Dedicated SQL pools to Fabric Warehouse. Covers schema migration, T-SQL compatibility, stored procedures, and data movement.', link: 'https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse', linkText: 'View Migration Guide ↗' },
        { name: 'Synapse Spark → Fabric Notebooks', desc: 'PySpark and Scala code is largely compatible. Update library references, session configurations, and linked service connections. Fabric notebooks support the same Spark runtime.', link: 'https://learn.microsoft.com/fabric/data-engineering/migrate-synapse-spark-to-fabric', linkText: 'Spark Migration Docs ↗' },
        { name: 'OneLake Shortcuts (Zero-Copy Bridge)', desc: 'Create Shortcuts to your existing ADLS Gen2 storage during transition — no data movement required. Both Synapse and Fabric can read from the same storage simultaneously.', link: 'https://learn.microsoft.com/fabric/onelake/onelake-shortcuts', linkText: 'Shortcuts Documentation ↗' }
      ],
      steps: ['Assess workloads & dependencies', 'Create Fabric Workspace', 'Set up Shortcuts to existing ADLS', 'Migrate SQL schemas & procedures', 'Port Spark notebooks', 'Validate & performance test', 'Cutover & decommission Synapse']
    },
    adf: {
      icon: '🔶', title: 'Azure Data Factory', status: 'ga', statusLabel: '✅ Migration Assistant Available',
      tools: [
        { name: 'Data Factory Migration Assistant', desc: 'Open-source, browser-based tool that automates migration of ADF pipelines to Fabric. Parses ARM templates, analyzes compatibility, maps 50+ connectors, and preserves folder structure. No server infrastructure needed.', link: 'https://github.com/microsoft/fabric-toolbox/tree/main/tools/FabricDataFactoryMigrationAssistant', linkText: 'GitHub — Migration Assistant ↗' },
        { name: 'ADF to Fabric Data Factory Guide', desc: 'Official Microsoft Learn documentation covering pipeline activity mapping, connector equivalents, linked service migration, and Dataflow Gen2 replacements for ADF data flows.', link: 'https://learn.microsoft.com/fabric/data-factory/upgrade-paths', linkText: 'ADF Migration Guide ↗' }
      ],
      steps: ['Export ADF ARM templates', 'Run Migration Assistant analysis', 'Review compatibility report', 'Execute automated migration', 'Validate pipeline execution', 'Update schedules & triggers', 'Decommission ADF pipelines']
    },
    pbi: {
      icon: '📊', title: 'Power BI Premium (P-SKU)', status: 'ga', statusLabel: '✅ Guided Migration Path',
      tools: [
        { name: 'P-SKU to F-SKU Workspace Migration', desc: 'Reassign Power BI Premium workspaces to Fabric capacity (F64+). Existing reports, datasets, and dashboards continue to work unchanged. P1≈F64, P2≈F128, P3≈F256.', link: 'https://learn.microsoft.com/fabric/enterprise/licenses', linkText: 'Licensing & SKU Mapping ↗' },
        { name: 'Import to Direct Lake Migration', desc: 'Convert import-mode datasets to Direct Lake for better performance and lower cost. Direct Lake reads Delta tables directly from OneLake without importing data into Power BI memory.', link: 'https://learn.microsoft.com/power-bi/enterprise/directlake-overview', linkText: 'Direct Lake Overview ↗' },
        { name: 'Fabric Capacity Metrics App', desc: 'Monitor CU consumption after migration to validate capacity sizing. Compare utilization patterns between P-SKU and F-SKU to right-size your Fabric capacity.', link: 'https://learn.microsoft.com/fabric/enterprise/metrics-app', linkText: 'Capacity Metrics App ↗' }
      ],
      steps: ['Inventory P-SKU workspaces & usage', 'Map P-SKU to equivalent F-SKU', 'Provision Fabric capacity', 'Reassign workspaces to F-SKU', 'Migrate import datasets to Direct Lake', 'Validate reports & refreshes', 'Monitor with Capacity Metrics App']
    },
    onprem: {
      icon: '🏢', title: 'On-Premises SQL Server / SSIS', status: 'partial', statusLabel: '⚠️ Partial Tooling',
      tools: [
        { name: 'Fabric Mirroring for SQL Server', desc: 'Near real-time replication of on-premises SQL Server databases to OneLake as Delta tables. Supports change data capture (CDC) with minimal source impact.', link: 'https://learn.microsoft.com/fabric/database/mirrored-database/overview', linkText: 'Mirroring Documentation ↗' },
        { name: 'On-Premises Data Gateway', desc: 'Secure data movement between on-premises sources and Fabric. Required for Data Factory pipelines that connect to SQL Server, file shares, or other on-premises systems.', link: 'https://learn.microsoft.com/data-integration/gateway/service-gateway-onprem', linkText: 'Data Gateway Setup ↗' },
        { name: 'SSIS to Dataflows Gen2 (Manual)', desc: 'No automated converter exists for SSIS packages. Rebuild transformation logic using Dataflows Gen2 (Power Query) or Fabric Notebooks. Microsoft provides mapping guidance for common SSIS tasks.', link: 'https://learn.microsoft.com/fabric/data-factory/dataflows-gen2-overview', linkText: 'Dataflows Gen2 Overview ↗' }
      ],
      steps: ['Inventory SQL databases & SSIS packages', 'Install On-Premises Data Gateway', 'Enable Mirroring for SQL databases', 'Rebuild SSIS logic in Dataflows/Notebooks', 'Set up incremental refresh schedules', 'Validate data accuracy', 'Plan hybrid coexistence phase']
    },
    databricks: {
      icon: '🧱', title: 'Databricks', status: 'manual', statusLabel: '⚠️ Manual Migration',
      tools: [
        { name: 'Spark Notebook Porting Guide', desc: 'Fabric supports the same Apache Spark runtime. Port PySpark and Scala code with minimal changes — update cluster configs, library imports, and mount points. Delta Lake tables are natively compatible.', link: 'https://learn.microsoft.com/fabric/data-engineering/migrate-synapse-spark-to-fabric', linkText: 'Spark Migration Guide ↗' },
        { name: 'OneLake Shortcuts for Delta Tables', desc: 'Point Fabric directly at your existing Delta Lake tables in ADLS Gen2 using Shortcuts. No data copy needed — both Databricks and Fabric can read the same storage during transition.', link: 'https://learn.microsoft.com/fabric/onelake/onelake-shortcuts', linkText: 'Shortcuts Documentation ↗' },
        { name: 'MLflow Experiment Migration', desc: 'Fabric has built-in MLflow integration for experiment tracking and model registry. Export experiments from Databricks MLflow and re-register in Fabric\'s MLflow instance.', link: 'https://learn.microsoft.com/fabric/data-science/machine-learning-experiment', linkText: 'ML Experiments in Fabric ↗' }
      ],
      steps: ['Inventory Databricks workspaces & jobs', 'Create Shortcuts to existing Delta storage', 'Port notebook code (update configs)', 'Migrate MLflow experiments', 'Rebuild job schedules as Data Pipelines', 'Performance test with production data', 'Gradual workload cutover']
    },
    snowflake: {
      icon: '❄️', title: 'Snowflake', status: 'partial', statusLabel: '⚠️ Mirroring + Manual',
      tools: [
        { name: 'Fabric Mirroring for Snowflake', desc: 'Near real-time replication from Snowflake to OneLake as Delta tables. Supports incremental sync with change tracking. Data lands in a Fabric Lakehouse for immediate querying.', link: 'https://learn.microsoft.com/fabric/database/mirrored-database/snowflake', linkText: 'Snowflake Mirroring Docs ↗' },
        { name: 'SQL Translation Guide', desc: 'Map Snowflake SQL dialect to Fabric T-SQL (Warehouse) or SparkSQL (Lakehouse). Key differences: VARIANT type handling, JavaScript UDFs, QUALIFY clause, and time-travel syntax.', link: 'https://learn.microsoft.com/fabric/data-warehouse/tsql-surface-area', linkText: 'Fabric T-SQL Reference ↗' },
        { name: 'Stored Procedure Migration', desc: 'Snowflake JavaScript stored procedures need rewriting as T-SQL procedures in Fabric Warehouse or PySpark logic in Notebooks. No automated converter available.', link: 'https://learn.microsoft.com/fabric/data-warehouse/stored-procedures', linkText: 'Fabric Stored Procedures ↗' }
      ],
      steps: ['Inventory Snowflake databases & procedures', 'Enable Mirroring for source databases', 'Validate mirrored data in Fabric', 'Translate SQL dialect differences', 'Rewrite stored procedures', 'Migrate BI connections to Fabric endpoints', 'Decommission Snowflake warehouse']
    }
  };

  let activeCard = null;

  container.querySelectorAll('.migration-tool-card').forEach(card => {
    card.addEventListener('click', () => {
      const toolId = card.dataset.tool;
      const data = tools[toolId];
      if (!data) return;

      container.querySelectorAll('.migration-tool-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      activeCard = toolId;

      const toolCards = data.tools.map(t =>
        `<div class="mt-tool">
          <h5>${t.name}</h5>
          <p>${t.desc}</p>
          <a href="${t.link}" target="_blank" rel="noopener">${t.linkText}</a>
        </div>`
      ).join('');

      const stepItems = data.steps.map((s, i) =>
        `<div class="mt-step"><div class="mt-step-num">${i + 1}</div>${s}</div>`
      ).join('');

      detail.innerHTML =
        `<button class="mt-close" title="Close">✕</button>
        <div class="mt-header">
          <span style="font-size:28px;">${data.icon}</span>
          <h4>${data.title}</h4>
          <span class="mt-status ${data.status}">${data.statusLabel}</span>
        </div>
        <div class="mt-tools-grid">${toolCards}</div>
        <div class="mt-steps">
          <h5>Recommended Migration Steps</h5>
          <div class="mt-step-list">${stepItems}</div>
        </div>`;

      detail.style.display = 'block';
      detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      detail.querySelector('.mt-close').addEventListener('click', () => {
        detail.style.display = 'none';
        container.querySelectorAll('.migration-tool-card').forEach(c => c.classList.remove('active'));
        activeCard = null;
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeatures);
} else {
  initFeatures();
}

})();
