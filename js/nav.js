/* ============================================
   Shared Navigation Component
   Injects header + sidebar into every page
   ============================================ */

const LAST_DEPLOYED = '2026-04-29';

// Section index for each page (used for TOC + search)
// Each page has a defaultCategory; sections can override with `category`
const pageCategories = {
  'home':           'overview',
  'checklist':      'overview',
  'architecture':   'architecture',
  'governance':     'security',
  'security':       'security',
  'networking':     'networking',
  'best-practices': 'engineering',
  'operations':     'operations',
  'capacity-planning': 'operations',
  'data-integration':  'data-integration',
  'data-mesh':      'architecture',
  'fabric-iq':      'ai',
  'scenarios':      'architecture',
  'useful-links':   'overview',
  'whats-new':      'overview',
  'playground':     'overview'
};

const pageSections = {
  'home':           [
    { id: 'introduction', title: 'Introduction to Microsoft Fabric' },
    { id: 'topic-index', title: 'Browse by Topic' },
    { id: 'pages', title: 'Explore the Guide' },
    { id: 'journey', title: 'Find Your Path by Role' },
    { id: 'arch-decision', title: 'Architecture Decision Wizard' },
    { id: 'readiness', title: 'Fabric Readiness Assessment' }
  ],
  'architecture':   [
    { id: 'architecture', title: 'Core Architecture' },
    { id: 'medallion', title: 'Medallion Architecture' },
    { id: 'real-time', title: 'Real-Time Intelligence', category: 'analytics' }
  ],
  'governance':     [
    { id: 'governance', title: 'Governance' },
    { id: 'security', title: 'Security' },
    { id: 'governance-first', title: 'Governance Assessment' },
    { id: 'governance-first-guide', title: 'Governance-First Guide' }
  ],
  'security':       [
    { id: 'overview', title: 'Defense-in-Depth Model' },
    { id: 'identity', title: 'Identity & Access' },
    { id: 'workspace', title: 'Workspace Security' },
    { id: 'item-security', title: 'Item-Level Permissions' },
    { id: 'data-security', title: 'Data-Level Security' },
    { id: 'onelake-security', title: 'OneLake Security' },
    { id: 'info-protection', title: 'Information Protection' },
    { id: 'network-security', title: 'Network Security' },
    { id: 'monitoring', title: 'Monitoring & Audit' },
    { id: 'real-world', title: 'Real-World Example' },
    { id: 'checklist', title: 'Security Checklist' }
  ],
  'operations':     [
    { id: 'deployment', title: 'Deployment Patterns' },
    { id: 'migration', title: 'Migration Strategies' }
  ],
  'best-practices': [
    { id: 'engineering', title: 'Data Engineering Best Practices' },
    { id: 'realtime', title: 'Real-Time Analytics', category: 'analytics' },
    { id: 'powerbi', title: 'Power BI Integration', category: 'analytics' },
    { id: 'data-for-ai', title: 'Preparing Data for AI', category: 'ai' },
    { id: 'migration-scorer', title: 'Migration Complexity Scorer', category: 'operations' }
  ],
  'data-mesh':      [
    { id: 'datamesh', title: 'Data Mesh Architecture' }
  ],
  'fabric-iq':      [
    { id: 'fabric-iq', title: 'Microsoft Fabric IQ' },
    { id: 'what-is', title: 'What is Fabric IQ?' },
    { id: 'core-components', title: 'Core Components' },
    { id: 'architecture', title: 'Architecture', category: 'architecture' },
    { id: 'ontology', title: 'Ontology' },
    { id: 'ai-agents', title: 'AI Agents' },
    { id: 'realtime', title: 'Real-Time Intelligence', category: 'analytics' },
    { id: 'governance', title: 'Governance', category: 'security' },
    { id: 'fabcon-updates', title: 'FabCon 2026 Updates' },
    { id: 'connected-data', title: 'Connected Data Estates', category: 'data-integration' },
    { id: 'ecosystem', title: 'IQ Ecosystem' },
    { id: 'getting-started', title: 'Getting Started' }
  ],
  'networking':     [
    { id: 'zero-trust', title: 'Zero-Trust Architecture' },
    { id: 'private-link', title: 'Private Link' },
    { id: 'managed-pe', title: 'Managed Private Endpoints' },
    { id: 'managed-vnet', title: 'Managed Virtual Networks' },
    { id: 'vnet-gateway', title: 'VNet Data Gateways' },
    { id: 'trusted-access', title: 'Trusted Workspace Access' },
    { id: 'conditional-access', title: 'Conditional Access' },
    { id: 'decision-matrix', title: 'Decision Matrix' }
  ],
  'checklist':      [
    { id: 'checklist', title: 'Getting Started Checklist' }
  ],
  'useful-links':   [
    { id: 'useful-links', title: 'Useful Links' }
  ],
  'scenarios':      [
    { id: 'scenarios', title: 'Customer Scenario Templates' }
  ],
  'whats-new':      [
    { id: 'guide-updates', title: 'Guide Updates' },
    { id: 'fabcon-2026', title: 'FabCon 2026 News' },
    { id: 'whats-new', title: 'What\'s New' }
  ],
  'playground':     [
    { id: 'playground', title: 'Architecture Playground' }
  ],
  'capacity-planning': [
    { id: 'costs', title: 'Capacity & Cost Management' },
    { id: 'surge-protection', title: 'Surge Protection' },
    { id: 'sizing', title: 'Capacity Sizing Guide' },
    { id: 'tco-calculator', title: 'TCO / ROI Calculator' }
  ],
  'data-integration': [
    { id: 'shortcuts', title: 'OneLake Shortcuts' },
    { id: 'mirroring', title: 'Fabric Mirroring' },
    { id: 'dataflows', title: 'Dataflows Gen2' },
    { id: 'pipelines', title: 'Data Pipelines' },
    { id: 'decision-matrix', title: 'Integration Decision Matrix' }
  ]
};

function getNav(activePage) {
  const pages = [
    { id: 'home',            href: 'index.html',          label: 'Home',                    group: 'Overview',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
    { id: 'checklist',       href: 'checklist.html',      label: 'Getting Started',         group: 'Overview',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>' },
    { id: 'architecture',    href: 'architecture.html',   label: 'Architecture',            group: 'Learn',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
    { id: 'governance',      href: 'governance.html',     label: 'Governance',              group: 'Learn',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
    { id: 'security',        href: 'security.html',       label: 'Security',                group: 'Learn',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1"/></svg>' },
    { id: 'networking',      href: 'networking.html',     label: 'Networking Security',     group: 'Learn',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="3"/></svg>' },
    { id: 'best-practices',  href: 'best-practices.html', label: 'Best Practices',          group: 'Build',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
    { id: 'operations',      href: 'operations.html',     label: 'Operations',              group: 'Build',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' },
    { id: 'capacity-planning', href: 'capacity-planning.html', label: 'Capacity Planning',   group: 'Build',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>' },
    { id: 'data-integration', href: 'data-integration.html', label: 'Data Integration',        group: 'Build',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 00-1.172-2.872L3 3"/><path d="m15 9 6-6"/></svg>' },
    { id: 'scenarios',       href: 'scenarios.html',      label: 'Scenario Templates',      group: 'Build',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>' },
    { id: 'data-mesh',       href: 'data-mesh.html',      label: 'Data Mesh',               group: 'Scale',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><line x1="7" y1="7" x2="10" y2="11"/><line x1="17" y1="7" x2="14" y2="11"/><line x1="7" y1="17" x2="10" y2="13"/><line x1="17" y1="17" x2="14" y2="13"/></svg>' },
    { id: 'fabric-iq',       href: 'fabric-iq.html',      label: 'Fabric IQ',               group: 'Scale',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/><circle cx="12" cy="8" r="1.5"/></svg>' },
    { id: 'useful-links',    href: 'useful-links.html',   label: 'Useful Links',             group: 'Resources',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>' },
    { id: 'whats-new',      href: 'whats-new.html',      label: 'What\'s New',              group: 'Resources',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' },
    { id: 'playground',      href: 'playground.html',     label: 'Playground',               group: 'Resources',
      icon: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>' }
  ];

  let currentGroup = '';
  let navItems = '';
  const sections = pageSections[activePage] || [];

  pages.forEach(p => {
    if (p.group !== currentGroup) {
      currentGroup = p.group;
      navItems += `<li class="sidebar-section-label">${currentGroup}</li>\n`;
    }
    const isActive = p.id === activePage;
    const activeClass = isActive ? ' class="active"' : '';
    const liClass = isActive && sections.length > 1 ? ' class="nav-item-expanded"' : '';
    navItems += `      <li${liClass}><a href="${p.href}"${activeClass}>${p.icon} ${p.label}</a>`;
    // Inject TOC sub-items for the active page
    if (isActive && sections.length > 1) {
      navItems += '\n        <ul class="toc-list">\n';
      sections.forEach(s => {
        navItems += `          <li><a href="#${s.id}" class="toc-link" data-section="${s.id}">${s.title}</a></li>\n`;
      });
      navItems += '        </ul>';
    }
    navItems += '</li>\n';
  });

  return { pages, navItems };
}

function injectNav(activePage) {
  const { navItems } = getNav(activePage);

  // Header
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
    <a href="index.html" class="header-logo">
      <span>Fabric Guide <span class="subtitle">Implementation Best Practices</span></span>
    </a>
    <div class="search-wrapper" id="search-wrapper" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-owns="search-results">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="search-input" class="search-input" placeholder="Search guide…" autocomplete="off" role="searchbox" aria-autocomplete="list" aria-controls="search-results" />
      <kbd class="search-kbd">Ctrl+K</kbd>
      <div id="search-results" class="search-results" role="listbox" aria-label="Search results"></div>
    </div>
    <div class="header-controls">
      <button class="header-btn" id="dark-mode-toggle" title="Toggle dark mode" aria-label="Toggle dark mode">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg><span class="btn-label">Dark</span>
      </button>
      <button class="header-btn" id="lang-toggle" title="Toggle language" aria-label="Toggle language">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg><span class="btn-label">ES</span>
      </button>
      <button class="header-btn" id="bookmarks-toggle" title="Bookmarks" aria-label="View bookmarks">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg><span class="btn-label">Saved</span>
      </button>
    </div>
    <button class="hamburger" aria-label="Toggle navigation">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>`;

  // Sidebar overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';

  // Sidebar
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `<nav><ul class="sidebar-nav">\n${navItems}    </ul></nav>`;

  // Back to top
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>';

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-content">
      <p class="footer-disclaimer">⚠️ This is a personal project, not an official Microsoft resource. Views and recommendations are my own and do not represent Microsoft.</p>
      <p>Created by <a href="https://www.linkedin.com/in/diegodiazrodriguez/" target="_blank" rel="noopener"><strong>Diego Diaz Rodriguez</strong></a> · Built with <a href="https://github.com/features/copilot/cli/" target="_blank" rel="noopener">GitHub Copilot CLI</a> powered by Claude Opus 4.6 · Last updated: ${LAST_DEPLOYED}</p>
      <div class="footer-share">
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://fabric.diazlabs.xyz/')}" target="_blank" rel="noopener" class="share-btn share-linkedin" aria-label="Share on LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          Share on LinkedIn
        </a>
      </div>
    </div>`;

  // Insert into DOM
  const mainContent = document.querySelector('.main-content');
  if (mainContent) mainContent.appendChild(footer);

  document.body.prepend(backToTop);
  document.body.prepend(sidebar);
  document.body.prepend(overlay);
  document.body.prepend(header);

  // Populate hero last-updated badge on index page
  const heroBadge = document.getElementById('hero-last-updated');
  if (heroBadge) {
    const d = new Date(LAST_DEPLOYED + 'T00:00:00');
    const formatted = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    heroBadge.appendChild(document.createTextNode(formatted));
  }

  // Init search
  initSearch();
}

/* --- Client-Side Search --- */
function initSearch() {
  const input = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');
  const wrapper = document.getElementById('search-wrapper');
  if (!input || !resultsEl) return;

  // Build search index from all pages + sections
  const searchIndex = [];
  const allPages = [
    { id: 'home', href: 'index.html', title: 'Home', desc: 'Landing page with role-based journeys and guide overview' },
    { id: 'checklist', href: 'checklist.html', title: 'Getting Started', desc: 'Interactive adoption checklist for Fabric implementation' },
    { id: 'architecture', href: 'architecture.html', title: 'Architecture', desc: 'Core concepts, OneLake, workspaces, capacities, medallion pattern, real-time intelligence' },
    { id: 'governance', href: 'governance.html', title: 'Governance', desc: 'Purview, sensitivity labels, endorsement, domains, data quality, governance assessment' },
    { id: 'security', href: 'security.html', title: 'Security', desc: 'Defense-in-depth, identity, workspace roles, RLS, CLS, OLS, DDM, OneLake RBAC, information protection, monitoring, audit' },
    { id: 'networking', href: 'networking.html', title: 'Networking Security', desc: 'Private Link, managed private endpoints, managed VNet, VNet data gateways, zero-trust, conditional access' },
    { id: 'best-practices', href: 'best-practices.html', title: 'Best Practices', desc: 'Data engineering, Spark optimization, real-time analytics, Eventhouse, Power BI Direct Lake, AI data preparation, Copilot, data agents' },
    { id: 'operations', href: 'operations.html', title: 'Operations', desc: 'CI/CD, fabric-cicd, deployment pipelines, Git integration, and migration strategies' },
    { id: 'capacity-planning', href: 'capacity-planning.html', title: 'Capacity Planning', desc: 'Capacity sizing, SKU selection, cost optimization, CU smoothing and throttling, TCO/ROI calculator' },
    { id: 'data-mesh', href: 'data-mesh.html', title: 'Data Mesh', desc: 'Domain ownership, data products, federated governance, OneLake shortcuts, interactive diagram' },
    { id: 'fabric-iq', href: 'fabric-iq.html', title: 'Fabric IQ', desc: 'Semantic intelligence layer, ontology, data agents, operations agents, real-time operational intelligence' },
    { id: 'useful-links', href: 'useful-links.html', title: 'Useful Links', desc: 'Curated collection of essential Microsoft Fabric resources, community tools, and official documentation' },
    { id: 'whats-new', href: 'whats-new.html', title: 'What\'s New', desc: 'Latest Microsoft Fabric blog updates categorized by workload — Power BI, Data Engineering, Real-Time Intelligence, and more' },
    { id: 'data-integration', href: 'data-integration.html', title: 'Data Integration', desc: 'OneLake shortcuts, Fabric mirroring, Dataflows Gen2, data pipelines, and integration decision matrix' },
    { id: 'scenarios', href: 'scenarios.html', title: 'Scenario Templates', desc: 'Industry-specific architecture blueprints: retail, healthcare, finance, manufacturing, marketing, enterprise' },
    { id: 'playground', href: 'playground.html', title: 'Architecture Playground', desc: 'Interactive drag-and-drop canvas for designing Microsoft Fabric architectures with SVG export' }
  ];

  allPages.forEach(p => {
    searchIndex.push({ type: 'page', title: p.title, desc: p.desc, href: p.href });
    const secs = pageSections[p.id] || [];
    secs.forEach(s => {
      searchIndex.push({ type: 'section', title: s.title, desc: p.title, href: p.href + '#' + s.id });
    });
  });

  // Add key topic keywords for deeper matching
  const keywords = [
    { terms: 'OneLake data lake storage shortcuts', href: 'architecture.html#architecture', title: 'OneLake', desc: 'Architecture → Core Architecture' },
    { terms: 'medallion bronze silver gold layers', href: 'architecture.html#medallion', title: 'Medallion Architecture', desc: 'Architecture → Medallion' },
    { terms: 'eventhouse KQL kusto streaming eventstreams', href: 'architecture.html#real-time', title: 'Real-Time Intelligence', desc: 'Architecture → Real-Time' },
    { terms: 'Purview sensitivity labels compliance', href: 'governance.html#governance', title: 'Microsoft Purview', desc: 'Governance' },
    { terms: 'RLS CLS row level column level security', href: 'security.html#data-security', title: 'Row & Column Level Security', desc: 'Security → Data-Level' },
    { terms: 'OLS object level security hide tables', href: 'security.html#data-security', title: 'Object-Level Security', desc: 'Security → Data-Level' },
    { terms: 'dynamic data masking DDM mask PII', href: 'security.html#data-security', title: 'Dynamic Data Masking', desc: 'Security → Data-Level' },
    { terms: 'OneLake RBAC folder table data access roles', href: 'security.html#onelake-security', title: 'OneLake Security', desc: 'Security → OneLake' },
    { terms: 'workspace identity managed identity service principal', href: 'security.html#identity', title: 'Identity & Access', desc: 'Security → Identity' },
    { terms: 'sensitivity labels DLP information protection', href: 'security.html#info-protection', title: 'Information Protection', desc: 'Security → Info Protection' },
    { terms: 'Copilot AI security data boundaries DSPM', href: 'security.html#info-protection', title: 'AI & Copilot Security', desc: 'Security → Info Protection' },
    { terms: 'audit logs monitoring Defender MDCA SIEM Sentinel', href: 'security.html#monitoring', title: 'Security Monitoring', desc: 'Security → Monitoring' },
    { terms: 'real world example scenario defense in depth all layers end to end use case', href: 'security.html#real-world', title: 'Security Example', desc: 'Security → Real-World Example' },
    { terms: 'conditional access MFA Entra ID zero trust', href: 'security.html#identity', title: 'Conditional Access', desc: 'Security → Identity' },
    { terms: 'workspace roles Admin Member Contributor Viewer', href: 'security.html#workspace', title: 'Workspace Roles', desc: 'Security → Workspace' },
    { terms: 'private endpoint VNet firewall DNS', href: 'networking.html#private-link', title: 'Private Endpoints', desc: 'Networking → Private Link' },
    { terms: 'managed private endpoints MPE outbound', href: 'networking.html#managed-pe', title: 'Managed Private Endpoints', desc: 'Networking → MPE' },
    { terms: 'Spark notebooks Delta Lake optimization V-Order', href: 'best-practices.html#engineering', title: 'Spark & Delta Lake', desc: 'Best Practices → Data Engineering' },
    { terms: 'Direct Lake Power BI semantic model', href: 'best-practices.html#powerbi', title: 'Direct Lake Mode', desc: 'Best Practices → Power BI' },
    { terms: 'fabric-cicd Python library CI CD GitHub Actions', href: 'operations.html#deployment', title: 'CI/CD with fabric-cicd', desc: 'Operations → Deployment' },
    { terms: 'capacity sizing SKU estimator CU throttling', href: 'capacity-planning.html#sizing', title: 'Capacity Sizing', desc: 'Capacity Planning → Sizing' },
    { terms: 'migration Synapse ADF Power BI Premium', href: 'operations.html#migration', title: 'Migration Strategies', desc: 'Operations → Migration' },
    { terms: 'data mesh domain ownership data products', href: 'data-mesh.html#datamesh', title: 'Data Mesh', desc: 'Data Mesh → Architecture' },
    { terms: 'shortcuts OneLake ADLS S3 GCS zero-copy virtualization cross-domain', href: 'data-integration.html#shortcuts', title: 'OneLake Shortcuts', desc: 'Data Integration → Shortcuts' },
    { terms: 'mirroring CDC replication database sync change data capture', href: 'data-integration.html#mirroring', title: 'Fabric Mirroring', desc: 'Data Integration → Mirroring' },
    { terms: 'dataflows gen2 Power Query connectors low-code ETL', href: 'data-integration.html#dataflows', title: 'Dataflows Gen2', desc: 'Data Integration → Dataflows' },
    { terms: 'data pipelines orchestration copy activity ADF scheduling', href: 'data-integration.html#pipelines', title: 'Data Pipelines', desc: 'Data Integration → Pipelines' },
    { terms: 'Fabric IQ ontology agents intelligence', href: 'fabric-iq.html#fabric-iq', title: 'Fabric IQ', desc: 'Fabric IQ → Intelligence Layer' },
    { terms: 'conditional access Entra MFA device compliance', href: 'networking.html#conditional-access', title: 'Conditional Access', desc: 'Networking → Identity' },
    { terms: 'cost optimization reservation pause resume pricing', href: 'capacity-planning.html#costs', title: 'Cost Management', desc: 'Capacity Planning → Costs' },
    { terms: 'surge protection background rejection recovery threshold workspace CU limit mission critical blocking overload', href: 'capacity-planning.html#surge-protection', title: 'Surge Protection', desc: 'Capacity Planning → Surge Protection' },
    { terms: 'migration complexity scorer assessment risk phases duration', href: 'best-practices.html#migration-scorer', title: 'Migration Scorer', desc: 'Best Practices → Migration Scorer' },
    { terms: 'Copilot AI data preparation prep semantic model verified answers AI instructions AI schema data agent agents NL2SQL NL2DAX prompt engineering', href: 'best-practices.html#data-for-ai', title: 'Preparing Data for AI', desc: 'Best Practices → Data for AI' }
  ];
  keywords.forEach(kw => {
    searchIndex.push({ type: 'keyword', title: kw.title, desc: kw.desc, href: kw.href, terms: kw.terms });
  });

  // Expose search index globally for hero search
  window.__searchIndex = searchIndex;

  let selectedIdx = -1;

  function doSearch(query) {
    if (!query || query.length < 2) {
      resultsEl.classList.remove('visible');
      wrapper.setAttribute('aria-expanded', 'false');
      resultsEl.innerHTML = '';
      selectedIdx = -1;
      return;
    }

    const q = query.toLowerCase();
    const words = q.split(/\s+/);
    const scored = [];

    searchIndex.forEach(item => {
      const haystack = (item.title + ' ' + item.desc + ' ' + (item.terms || '')).toLowerCase();
      let score = 0;
      words.forEach(w => {
        if (haystack.includes(w)) score++;
      });
      if (item.title.toLowerCase().includes(q)) score += 3;
      if (score > 0) scored.push({ ...item, score });
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 8);

    if (top.length === 0) {
      resultsEl.innerHTML = '<div class="search-no-results">No results found</div>';
      resultsEl.classList.add('visible');
      selectedIdx = -1;
      return;
    }

    resultsEl.innerHTML = top.map((r, i) => {
      const icon = r.type === 'page' ? '📄' : r.type === 'section' ? '§' : '🔑';
      return `<a href="${r.href}" class="search-result-item" role="option" id="search-opt-${i}" data-idx="${i}">${icon} <strong>${r.title}</strong><span>${r.desc}</span></a>`;
    }).join('');
    resultsEl.classList.add('visible');
    wrapper.setAttribute('aria-expanded', 'true');
    selectedIdx = -1;
  }

  function updateSelected() {
    const items = resultsEl.querySelectorAll('.search-result-item');
    items.forEach((el, i) => el.classList.toggle('selected', i === selectedIdx));
    if (selectedIdx >= 0 && items[selectedIdx]) {
      items[selectedIdx].scrollIntoView({ block: 'nearest' });
    }
  }

  input.addEventListener('input', () => doSearch(input.value.trim()));

  input.addEventListener('keydown', (e) => {
    const items = resultsEl.querySelectorAll('.search-result-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIdx = Math.min(selectedIdx + 1, items.length - 1);
      updateSelected();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIdx = Math.max(selectedIdx - 1, 0);
      updateSelected();
    } else if (e.key === 'Enter' && selectedIdx >= 0 && items[selectedIdx]) {
      e.preventDefault();
      window.location.href = items[selectedIdx].href;
    } else if (e.key === 'Escape') {
      input.blur();
      resultsEl.classList.remove('visible');
      wrapper.setAttribute('aria-expanded', 'false');
      selectedIdx = -1;
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      resultsEl.classList.remove('visible');
      wrapper.setAttribute('aria-expanded', 'false');
      selectedIdx = -1;
    }
  });

  // Ctrl+K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });

  // ── Application Insights ─────────────────────────────────────
  (function () {
    var sdkUrl = 'https://js.monitor.azure.com/scripts/b/ai.3.gbl.min.js';
    var connStr = 'InstrumentationKey=571e5994-0954-443e-8b64-60694377abc0;IngestionEndpoint=https://westus2-2.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/;ApplicationId=42ac285b-527f-4d98-91b4-ca98c8a70386';
    var cfg = { connectionString: connStr, enableAutoRouteTracking: true, disableCookiesUsage: true };
    var s = document.createElement('script');
    s.src = sdkUrl;
    s.onload = function () {
      if (window.Microsoft && Microsoft.ApplicationInsights) {
        var ai = new Microsoft.ApplicationInsights.ApplicationInsights({ config: cfg });
        ai.loadAppInsights();
        ai.trackPageView();
      }
    };
    document.head.appendChild(s);
  })();
}
