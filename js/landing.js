/* ============================================
   LANDING PAGE JS — Name scramble + parallax shapes
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Name scramble effect ---
  const nameEl = document.querySelector('.hero__name');
  if (nameEl) {
    const lang = document.documentElement.lang;
    const finalName = lang === 'ru' ? 'Александр Бородин' : 'Aleksander Borodin';
    const keepNameStable = window.innerWidth <= 640 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (keepNameStable) {
      nameEl.textContent = finalName;
    } else {
      const fx = new TextScramble(nameEl);
      setTimeout(() => { fx.setText(finalName); }, 600);
    }
  }

  // --- Parallax floating shapes on mousemove ---
  const shapes = document.querySelectorAll('.geo-shape');
  if (shapes.length > 0) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, i) => {
        const factor = (i + 1) * 8;
        shape.style.transform += '';
        shape.style.setProperty('--mx', `${x * factor}px`);
        shape.style.setProperty('--my', `${y * factor}px`);
      });
    }, { passive: true });
  }
});
