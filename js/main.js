/* ============================================
   Microsoft Fabric Best Practices Guide
   JavaScript — Navigation, Interactions
   ============================================ */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}

function initMain() {
  initSidebar();
  initScrollSpy();
  initBackToTop();
  // Conditionally init based on page content
  if (document.querySelector('.checklist-item')) initChecklist();
  if (document.querySelector('.code-copy-btn')) initCopyButtons();
  if (document.getElementById('datamesh-svg')) initDataMesh();
}

/* --- Sidebar Navigation --- */
function initSidebar() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!hamburger || !sidebar) return;

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // Close sidebar on link click (mobile)
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      }
    });
  });
}

/* --- Scroll Spy (IntersectionObserver) --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (sections.length === 0) return;

  const observerOptions = {
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  let currentActive = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        setActiveNav(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function setActiveNav(id) {
    if (currentActive === id) return;
    currentActive = id;

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    tocLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === id);
    });
  }
}

/* --- Back to Top Button --- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Interactive Checklist --- */
function initChecklist() {
  const STORAGE_KEY = 'fabric-checklist-state';
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  if (checkboxes.length === 0) return;

  // Load saved state
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  checkboxes.forEach(cb => {
    if (saved[cb.id]) {
      cb.checked = true;
      cb.closest('.checklist-item').classList.add('checked');
    }
  });

  updateProgress();

  // Listen for changes
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const item = cb.closest('.checklist-item');
      item.classList.toggle('checked', cb.checked);

      const state = {};
      checkboxes.forEach(c => { if (c.checked) state[c.id] = true; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

      updateProgress();
    });
  });

  // Click on item row toggles checkbox
  document.querySelectorAll('.checklist-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT') return;
      const cb = item.querySelector('input[type="checkbox"]');
      cb.checked = !cb.checked;
      cb.dispatchEvent(new Event('change'));
    });
  });

  function updateProgress() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.checklist-item input:checked').length;
    const pct = Math.round((checked / total) * 100);

    const progressText = document.querySelector('.progress-text');
    const progressFill = document.querySelector('.progress-fill');

    if (progressText) progressText.textContent = `${checked} of ${total} completed (${pct}%)`;
    if (progressFill) progressFill.style.width = `${pct}%`;
  }
}

/* --- Copy to Clipboard --- */
function initCopyButtons() {
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock.querySelector('pre').textContent;

      try {
        await navigator.clipboard.writeText(code);
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--accent-green)';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.color = '';
        }, 2000);
      } catch {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    });
  });
}

/* --- Data Mesh Interactive Diagram --- */
function initDataMesh() {
  const svg = document.getElementById('datamesh-svg');
  if (!svg) return;

  const domainData = {
    sales: {
      label: 'Sales Domain',
      color: '#4BA5F5',
      products: ['Revenue Lakehouse', 'Pipeline Forecast', 'Quota Attainment'],
      produces: ['marketing', 'finance'],
      consumes: ['operations']
    },
    marketing: {
      label: 'Marketing Domain',
      color: '#b47cff',
      products: ['Campaign Analytics', 'Lead Scoring Model'],
      produces: ['customer'],
      consumes: ['sales', 'operations']
    },
    customer: {
      label: 'Customer Domain',
      color: '#7FBA00',
      products: ['Customer 360 Lakehouse', 'Churn Prediction'],
      produces: ['finance'],
      consumes: ['marketing']
    },
    finance: {
      label: 'Finance Domain',
      color: '#FFB900',
      products: ['P&L Reports', 'Budget Actuals', 'Revenue Recognition'],
      produces: ['customer'],
      consumes: ['sales', 'customer']
    },
    operations: {
      label: 'Operations Domain',
      color: '#20B8C1',
      products: ['Supply Chain KPIs', 'Inventory Lakehouse'],
      produces: ['sales', 'marketing'],
      consumes: []
    }
  };

  const nodes = svg.querySelectorAll('.domain-node');
  const flows = svg.querySelectorAll('.flow-path');
  const detailPanel = document.getElementById('datamesh-detail');
  const detailTitle = document.getElementById('datamesh-detail-title');
  const detailBody = document.getElementById('datamesh-detail-body');
  const closeBtn = detailPanel?.querySelector('.datamesh-detail-close');
  let activeNode = null;

  // Create animated particles for each flow path
  createParticles();

  nodes.forEach(node => {
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      const domain = node.dataset.domain;
      if (activeNode === domain) {
        clearSelection();
        return;
      }
      selectDomain(domain);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', clearSelection);
  }

  svg.addEventListener('click', (e) => {
    if (!e.target.closest('.domain-node')) {
      clearSelection();
    }
  });

  function selectDomain(domain) {
    activeNode = domain;
    const data = domainData[domain];

    // Highlight nodes
    nodes.forEach(n => {
      const d = n.dataset.domain;
      const isConnected = d === domain ||
        data.produces.includes(d) ||
        data.consumes.includes(d);
      n.classList.toggle('active', d === domain);
      n.classList.toggle('dimmed', !isConnected);
    });

    // Highlight flows
    flows.forEach(f => {
      const from = f.dataset.from;
      const to = f.dataset.to;
      const isRelated = from === domain || to === domain;
      f.classList.toggle('highlighted', isRelated);
      f.classList.toggle('dimmed', !isRelated);
    });

    // Show detail panel
    if (detailPanel && detailTitle && detailBody) {
      detailTitle.textContent = data.label;
      detailBody.innerHTML = `
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">Published Data Products:</div>
        <div class="product-list">
          ${data.products.map(p => `
            <span class="product-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="${data.color}" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
              ${p}
            </span>`).join('')}
        </div>
        <div class="connections-info">
          ${data.produces.length ? '<strong>Produces for:</strong> ' + data.produces.map(d => domainData[d].label.replace(' Domain', '')).join(', ') + '<br>' : ''}
          ${data.consumes.length ? '<strong>Consumes from:</strong> ' + data.consumes.map(d => domainData[d].label.replace(' Domain', '')).join(', ') : ''}
        </div>
      `;
      detailPanel.classList.remove('hidden');
    }
  }

  function clearSelection() {
    activeNode = null;
    nodes.forEach(n => {
      n.classList.remove('active', 'dimmed');
    });
    flows.forEach(f => {
      f.classList.remove('highlighted', 'dimmed');
    });
    if (detailPanel) {
      detailPanel.classList.add('hidden');
    }
  }

  function createParticles() {
    const particleGroup = svg.querySelector('.datamesh-particles');
    if (!particleGroup) return;

    const colorMap = { blue: '#4BA5F5', purple: '#b47cff', green: '#7FBA00' };

    flows.forEach((flow, i) => {
      const color = colorMap[flow.dataset.color] || '#4BA5F5';
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      particle.setAttribute('class', 'datamesh-particle');
      particle.setAttribute('r', '3');
      particle.setAttribute('fill', color);

      const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      anim.setAttribute('dur', (2.5 + i * 0.4) + 's');
      anim.setAttribute('repeatCount', 'indefinite');
      anim.setAttribute('begin', (i * 0.3) + 's');

      const mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
      // Give each flow path an id for mpath reference
      const pathId = `flow-path-${i}`;
      flow.setAttribute('id', pathId);
      mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${pathId}`);

      anim.appendChild(mpath);
      particle.appendChild(anim);
      particleGroup.appendChild(particle);
    });
  }
}
