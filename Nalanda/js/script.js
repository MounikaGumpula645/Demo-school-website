/* ===== NALANDA E-TECHNO SCHOOL - JavaScript ===== */

document.addEventListener('DOMContentLoaded', function() {

  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE MENU TOGGLE ---
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- SCROLL ANIMATIONS (Intersection Observer) ---
  const animateElements = document.querySelectorAll(
    '.about-grid, .about-image-wrap, .about-content, ' +
    '.academic-card, .facility-card, .event-card, ' +
    '.sl-card, .gallery-item, .transport-grid, ' +
    '.faculty-grid, .faculty-image, .faculty-content, ' +
    '.section-header, .admissions-content, .contact-grid, ' +
    '.hero-content > *'
  );

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => {
    if (!el.closest('.hero-content') || el.closest('.hero-content') === el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      animObserver.observe(el);
    }
  });

  // --- LIGHTBOX ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  function openLightbox(src) {
    if (lightbox && lightboxImg) {
      lightboxImg.src = src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // Gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) openLightbox(img.src);
    });
  });

  // Event cards
  document.querySelectorAll('.event-card').forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) openLightbox(img.src);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) closeLightbox();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // --- CONTACT FORM ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = '✓ Message Sent';
        btn.style.background = '#28a745';
        btn.style.color = '#fff';
        this.reset();
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // --- ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // --- VIDEO FALLBACK ---
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', function() {
      const fallback = document.createElement('img');
      fallback.src = 'public/images/campus-aerial.png';
      fallback.alt = 'Nalanda Campus';
      fallback.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0;';
      this.parentNode.insertBefore(fallback, this);
      this.remove();
    });
  }

  // --- IMAGE ERROR HANDLING ---
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });

  // Initial animation check
  setTimeout(() => {
    animateElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, 200);

});