/**
 * RHINO Production — Main JavaScript
 * Production & Réalisation Vidéo
 * ──────────────────────────────────
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ═══ Header scroll effect ═══ */
  const header = document.getElementById('hdr');

  const handleScroll = () => {
    header.classList.toggle('solid', window.scrollY > 60);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });


  /* ═══ Mobile menu ═══ */
  const mobileMenu  = document.getElementById('mobMenu');
  const burger      = document.getElementById('burger');
  const mobileClose = document.getElementById('mobClose');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  const toggleMenu = () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  };

  burger.addEventListener('click', toggleMenu);
  mobileClose.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });


  /* ═══ Smooth scroll ═══ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = anchor.getAttribute('href');
      const target   = document.querySelector(targetId);

      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPos    = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ═══ Scroll reveal (IntersectionObserver) ═══ */
  const revealElements = document.querySelectorAll('.rv');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('vis');
        }, index * 70);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ═══ Contact form ═══ */
  const contactForm = document.getElementById('cForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.btn-send');
      const originalHTML = submitBtn.innerHTML;

      // Success state
      submitBtn.innerHTML = '✓ Message envoyé !';
      submitBtn.style.background = '#2ecc71';
      submitBtn.disabled = true;

      // Reset after 3s
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }


  /* ═══ Current year in footer ═══ */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
