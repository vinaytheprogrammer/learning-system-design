/**
 * Universal Navigation Enhancements for System Design Field Guide
 * Adds reading progress tracking, keyboard shortcuts, and modal controls.
 */
(function () {
  // 1. Reading Progress Bar
  let progressBar = document.getElementById('lsd-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'lsd-progress-bar';
    document.body.appendChild(progressBar);
  }

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

  // 2. Keyboard Navigation ([ / ] or Alt + Left / Right, Escape to close menu)
  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    
    const overlay = document.getElementById('lsdMenuOverlay');
    if (e.key === 'Escape' && overlay) {
      overlay.classList.remove('active');
    }

    const prevBtn = document.querySelector('.lsd-nav-btn[title*="Previous"]') || 
                    document.querySelector('.lsd-pagination-card.prev');
    const nextBtn = document.querySelector('.lsd-nav-btn[title*="Next"]') || 
                    document.querySelector('.lsd-pagination-card.next');

    if ((e.altKey && e.key === 'ArrowRight') || e.key === ']') {
      if (nextBtn && nextBtn.href) {
        window.location.href = nextBtn.href;
      }
    }
    if ((e.altKey && e.key === 'ArrowLeft') || e.key === '[') {
      if (prevBtn && prevBtn.href) {
        window.location.href = prevBtn.href;
      }
    }
  });
})();
