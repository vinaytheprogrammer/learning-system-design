/**
 * Universal Navigation & Reader Experience for System Design Field Guide
 * Enables blog-like jumping between chapters, reading progress, and pagination.
 */
(function () {
  const LSD_CHAPTERS = [
    {
      id: "caching",
      file: "Caching.html",
      title: "Caching at Staff Level",
      desc: "Multi-tier caching, consistency, eviction, and stampede mitigation",
      icon: "⚡"
    },
    {
      id: "db",
      file: "DB.html",
      title: "SQL, NoSQL & Vector DBs",
      desc: "RDBMS, document, wide-column, graph, and vector search engines",
      icon: "🗄️"
    },
    {
      id: "docker-k8s",
      file: "Docker&Kubernetes.html",
      title: "Docker & Kubernetes",
      desc: "Containers, layer caching, pods, self-healing, and orchestration",
      icon: "🐳"
    },
    {
      id: "request-journey",
      file: "Request_Journey.html",
      title: "The Request's Journey",
      desc: "DNS, CDN, Anycast, Proxies, Load Balancers, and API Gateways",
      icon: "🌐"
    },
    {
      id: "auth",
      file: "auth.html",
      title: "AuthN & AuthZ at Staff Level",
      desc: "OAuth 2.0, OIDC, JWT lifecycle, RBAC, ABAC, and Google Zanzibar",
      icon: "🔐"
    },
    {
      id: "ratelimiting",
      file: "ratelimiting.html",
      title: "Rate Limiting, Three Ways",
      desc: "Fixed Window, Token Bucket, Leaky Bucket, and boundary bursts",
      icon: "⏱️"
    }
  ];

  // Determine current chapter
  const currentPath = decodeURIComponent(window.location.pathname.split('/').pop() || '');
  let currentIndex = LSD_CHAPTERS.findIndex(c => c.file.toLowerCase() === currentPath.toLowerCase());
  if (currentIndex === -1) currentIndex = 0;

  const currentChapter = LSD_CHAPTERS[currentIndex];
  const prevChapter = currentIndex > 0 ? LSD_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < LSD_CHAPTERS.length - 1 ? LSD_CHAPTERS[currentIndex + 1] : null;

  function initNav() {
    // 1. Reading Progress Bar
    const progressBar = document.createElement('div');
    progressBar.id = 'lsd-progress-bar';
    document.body.appendChild(progressBar);

    function updateProgress() {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const scrolled = (h[st] || b[st]);
      const height = (h[sh] || b[sh]) - h.clientHeight;
      const percent = height > 0 ? Math.min(100, Math.max(0, (scrolled / height) * 100)) : 0;
      progressBar.style.width = percent + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // 2. Sticky Top Nav
    const nav = document.createElement('nav');
    nav.className = 'lsd-top-nav';
    nav.innerHTML = `
      <div class="lsd-nav-container">
        <div class="lsd-nav-left">
          <a href="./index.html" class="lsd-hub-link" title="Back to All Guides">
            <span class="lsd-hub-badge">⌘</span>
            <span>All Guides</span>
          </a>
          <span class="lsd-divider"></span>
          <button class="lsd-chapter-trigger" id="lsdChapterToggle" aria-label="Open chapters menu">
            <span class="lsd-chapter-num">Chapter ${currentIndex + 1}/${LSD_CHAPTERS.length}</span>
            <span>${currentChapter.icon}</span>
            <span class="lsd-chapter-name">${currentChapter.title}</span>
            <span style="font-size:0.7rem;opacity:0.6;">▾</span>
          </button>
        </div>

        <div class="lsd-nav-right">
          ${prevChapter 
            ? `<a href="./${prevChapter.file}" class="lsd-nav-btn" title="Previous: ${prevChapter.title} (Alt + [)"><span style="font-size:0.75rem">←</span> Prev</a>`
            : `<span class="lsd-nav-btn disabled">← Prev</span>`
          }
          ${nextChapter 
            ? `<a href="./${nextChapter.file}" class="lsd-nav-btn" title="Next: ${nextChapter.title} (Alt + ])">Next <span style="font-size:0.75rem">→</span></a>`
            : `<span class="lsd-nav-btn disabled">Next →</span>`
          }
        </div>
      </div>
    `;
    document.body.prepend(nav);

    // 3. Dropdown Menu Overlay
    const overlay = document.createElement('div');
    overlay.className = 'lsd-menu-overlay';
    overlay.id = 'lsdMenuOverlay';

    const menuItemsHtml = LSD_CHAPTERS.map((chap, idx) => {
      const isCurrent = idx === currentIndex;
      return `
        <a href="./${chap.file}" class="lsd-menu-item ${isCurrent ? 'current' : ''}">
          <div class="lsd-item-icon">${chap.icon}</div>
          <div class="lsd-item-info">
            <div class="lsd-item-title">
              <span>${chap.title}</span>
              ${isCurrent ? `<span class="lsd-item-badge">Reading</span>` : ''}
            </div>
            <div class="lsd-item-desc">${chap.desc}</div>
          </div>
          <span style="font-family:var(--lsd-nav-mono);font-size:0.75rem;color:var(--lsd-nav-muted)">0${idx + 1}</span>
        </a>
      `;
    }).join('');

    overlay.innerHTML = `
      <div class="lsd-menu-panel" id="lsdMenuPanel">
        <div class="lsd-menu-header">
          <span class="lsd-menu-title">📚 System Design Guides Table of Contents</span>
          <button class="lsd-menu-close" id="lsdMenuClose" aria-label="Close menu">&times;</button>
        </div>
        <div class="lsd-menu-list">
          ${menuItemsHtml}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const toggleBtn = document.getElementById('lsdChapterToggle');
    const closeBtn = document.getElementById('lsdMenuClose');

    function openMenu() {
      overlay.classList.add('active');
    }
    function closeMenu() {
      overlay.classList.remove('active');
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });

    // 4. Bottom Article Pagination (Previous & Next Post)
    const bottomNav = document.createElement('div');
    bottomNav.className = 'lsd-bottom-nav';

    let prevCardHtml = prevChapter ? `
      <a href="./${prevChapter.file}" class="lsd-pagination-card prev">
        <span class="lsd-pagination-label">← Previous Chapter</span>
        <span class="lsd-pagination-title">${prevChapter.icon} ${prevChapter.title}</span>
      </a>
    ` : `<div></div>`;

    let nextCardHtml = nextChapter ? `
      <a href="./${nextChapter.file}" class="lsd-pagination-card next">
        <span class="lsd-pagination-label">Next Chapter →</span>
        <span class="lsd-pagination-title">${nextChapter.icon} ${nextChapter.title}</span>
      </a>
    ` : `<div></div>`;

    bottomNav.innerHTML = `
      <div class="lsd-pagination-grid">
        ${prevCardHtml}
        ${nextCardHtml}
      </div>
      <div class="lsd-bottom-hub-bar">
        <a href="./index.html" class="lsd-bottom-hub-btn">
          <span>⌘</span>
          <span>View All System Design Topics & Simulators</span>
        </a>
      </div>
    `;

    // Append bottomNav before any footer or at end of body
    const footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(bottomNav, footer);
    } else {
      document.body.appendChild(bottomNav);
    }

    // 5. Keyboard Navigation (Alt + Left/Right or [ / ])
    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'Escape') closeMenu();
      if ((e.altKey && e.key === 'ArrowRight') || e.key === ']') {
        if (nextChapter) window.location.href = './' + nextChapter.file;
      }
      if ((e.altKey && e.key === 'ArrowLeft') || e.key === '[') {
        if (prevChapter) window.location.href = './' + prevChapter.file;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
