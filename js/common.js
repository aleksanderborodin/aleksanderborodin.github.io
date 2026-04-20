/* ============================================
   COMMON JS — Nav, i18n, Scroll Effects
   ============================================ */

// --- i18n ---
function getPreferredLanguage() {
  const stored = localStorage.getItem('lang');
  if (stored && translations[stored]) return stored;
  const browserLang = navigator.language.slice(0, 2);
  if (translations[browserLang]) return browserLang;
  return 'en';
}

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// --- Scroll Reveal (IntersectionObserver) ---
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- Nav scroll effect ---
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 30);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// --- Mobile nav ---
function initMobileNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const links = document.querySelector('.nav__links');
  if (!hamburger || !links) return;

  hamburger.addEventListener('click', () => {
    links.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close on link click
  links.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// --- 3D Card Tilt ---
function initCardTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    const inner = card.querySelector('.tilt-card__inner') || card;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      inner.style.transform =
        `perspective(800px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) scale(1.02)`;
      inner.style.transition = 'none';
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
      inner.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
}

// --- Text Scramble Effect ---
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________АБВГДЕЖЗИКЛМНabcdef';
    this.frame = 0;
    this.queue = [];
    this.resolve = null;
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    return new Promise(resolve => {
      this.resolve = resolve;
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 25);
        const end = start + Math.floor(Math.random() * 25);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
    });
  }

  update() {
    let output = '', complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(() => this.update());
      this.frame++;
    }
  }
}

// --- Page load animation ---
function initPageLoad() {
  document.body.classList.add('loaded');
}

// --- Initialize everything on DOM ready ---
document.addEventListener('DOMContentLoaded', () => {
  // Set language
  const lang = getPreferredLanguage();
  setLanguage(lang);

  // Language toggle handlers
  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Init all modules
  initNavScroll();
  initMobileNav();
  initScrollReveal();
  initCardTilt();

  // Delay page load animation slightly for smoother feel
  requestAnimationFrame(() => {
    requestAnimationFrame(initPageLoad);
  });
});
