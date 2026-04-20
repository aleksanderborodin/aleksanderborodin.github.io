/* ============================================
   LANDING PAGE JS — Scramble + Portal Tilt
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Name scramble effect ---
  const nameEl = document.querySelector('.hero__name');
  if (nameEl) {
    const fx = new TextScramble(nameEl);
    const lang = document.documentElement.lang;
    const finalName = lang === 'ru' ? 'Александр Бородин' : 'Aleksander Borodin';
    setTimeout(() => { fx.setText(finalName); }, 600);
  }

  // --- Portal 3D tilt ---
  document.querySelectorAll('.portal').forEach(portal => {
    let clearTimer = null;

    portal.addEventListener('mousemove', (e) => {
      if (clearTimer) { clearTimeout(clearTimer); clearTimer = null; }
      const rect = portal.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      portal.style.transform =
        `perspective(800px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateY(-4px)`;
      portal.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
    });

    portal.addEventListener('mouseleave', () => {
      portal.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
      portal.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.6s ease, border-color 0.4s ease';
      // After the return animation finishes, drop the inline transform so the
      // card is no longer promoted to a GPU layer (prevents blurry text).
      clearTimer = setTimeout(() => {
        portal.style.transform = '';
        clearTimer = null;
      }, 650);
    });
  });

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
