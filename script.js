/**
 * MAINCRAFTS - PREMIUM TECH LANDING PAGE JAVASCRIPT
 * Full Stack Web Development Internship – Task 1
 * Vanilla JavaScript (ES6+) for smooth interactions & animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DOM Elements Selection
  // --------------------------------------------------------------------------
  const header = document.getElementById('main-header');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileServicesToggle = document.getElementById('mobile-services-toggle');
  const mobileAccordion = document.querySelector('.mobile-accordion');
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sublink');
  const servicesDropdownItem = document.getElementById('services-dropdown-item');
  const servicesDropdownBtn = document.getElementById('services-dropdown-btn');
  const dropdownOptions = document.querySelectorAll('.dropdown-option');
  
  // Interactive Modal Elements
  const modalOverlay = document.getElementById('interactive-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalTriggers = document.querySelectorAll('[data-modal]');
  
  // Form Elements
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const copyEmailBtn = document.querySelector('.copy-email-btn');
  
  // CTA & Nav Talk Buttons
  const navCtaBtn = document.getElementById('nav-cta-btn');
  const ctaStartBtn = document.getElementById('cta-start-btn');

  // --------------------------------------------------------------------------
  // 2. Navigation Header Scroll Effect
  // --------------------------------------------------------------------------
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to Top Button Visibility
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Initial check

  // Scroll to Top on click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation & Accordion
  // --------------------------------------------------------------------------
  const toggleMobileNav = (forceClose = false) => {
    const isCurrentlyOpen = mobileNav.classList.contains('open');
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    if (shouldOpen) {
      mobileNav.classList.add('open');
      mobileToggleBtn.classList.add('active');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      mobileNav.classList.remove('open');
      mobileToggleBtn.classList.remove('active');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => toggleMobileNav());
  }

  // Mobile Accordion for Services
  if (mobileServicesToggle && mobileAccordion) {
    mobileServicesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = mobileAccordion.classList.toggle('open');
      mobileServicesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Close Mobile Nav on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileNav(true);
    });
  });

  // --------------------------------------------------------------------------
  // 4. Desktop Services Dropdown Accessibility & Click Handling
  // --------------------------------------------------------------------------
  if (servicesDropdownBtn && servicesDropdownItem) {
    // Keyboard accessibility for dropdown toggle
    servicesDropdownBtn.addEventListener('click', (e) => {
      // Toggle dropdown on click as well
      const isExpanded = servicesDropdownBtn.getAttribute('aria-expanded') === 'true';
      servicesDropdownBtn.setAttribute('aria-expanded', !isExpanded);
      servicesDropdownItem.classList.toggle('open');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!servicesDropdownItem.contains(e.target)) {
        servicesDropdownItem.classList.remove('open');
        servicesDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && servicesDropdownItem.classList.contains('open')) {
        servicesDropdownItem.classList.remove('open');
        servicesDropdownBtn.setAttribute('aria-expanded', 'false');
        servicesDropdownBtn.focus();
      }
    });
  }

  // Dropdown item click smooth scroll & highlight
  dropdownOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      servicesDropdownItem.classList.remove('open');
      servicesDropdownBtn.setAttribute('aria-expanded', 'false');
      
      const serviceTarget = opt.getAttribute('data-service');
      if (serviceTarget) {
        const targetElement = document.getElementById(`service-${serviceTarget}`);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetElement.style.borderColor = 'var(--cyan-accent)';
            targetElement.style.boxShadow = '0 0 35px rgba(34, 211, 238, 0.4)';
            setTimeout(() => {
              targetElement.style.borderColor = '';
              targetElement.style.boxShadow = '';
            }, 1800);
          }, 300);
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Active Navigation Link Highlighting on Scroll
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      const secId = sec.getAttribute('id');

      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 6. Smooth Scroll for Anchor Links
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 7. Scroll Reveal Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-fade-up');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 8. Animated Number Counters (Statistics Section)
  // --------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const duration = 2000; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out cubic formula
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOutProgress * target);

        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.querySelector('.about-stats-card');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }

  // --------------------------------------------------------------------------
  // 9. Interactive Modals (Services & Legal Information)
  // --------------------------------------------------------------------------
  const modalData = {
    'web-dev': {
      title: 'Web Development Services',
      tag: 'FULL STACK EXCELLENCE',
      description: 'At MainCrafts, we architect high-performance, resilient web platforms built to handle modern scale and deliver memorable user experiences.',
      features: [
        'Single Page Applications (SPAs) & Server-Side Rendering (SSR)',
        'Modern semantic HTML5, CSS3 Grid/Flexbox, and optimized JavaScript',
        'Headless CMS, GraphQL, and resilient RESTful API integration',
        'Lighthouse 95+ performance optimization and core web vitals compliance',
        'Progressive Web Apps (PWA) with offline caching and instant load'
      ]
    },
    'ui-ux': {
      title: 'UI/UX Design & Prototyping',
      tag: 'HUMAN-CENTERED DESIGN',
      description: 'We shape intuitive, visually compelling digital products that elevate brand loyalty and maximize user engagement across every viewport.',
      features: [
        'User journey mapping, wireframing, and interactive high-fidelity prototypes',
        'Scalable, token-driven design systems in Figma',
        'Accessibility compliance conforming to WCAG 2.1 AA standards',
        'Micro-interactions, fluid animation design, and gesture feedback',
        'Data-backed A/B testing and quantitative usability research'
      ]
    },
    'digital-solutions': {
      title: 'Digital Solutions & Cloud Infrastructure',
      tag: 'CLOUD & ARCHITECTURE',
      description: 'Transform legacy bottlenecks into modern, cloud-native automated systems engineered for seamless uptime and effortless scaling.',
      features: [
        'Automated CI/CD pipelines for continuous integration and delivery',
        'Serverless and containerized microservice architectures',
        'End-to-end API integrations, payment gateways, and enterprise webhooks',
        'Zero-trust security compliance and automated vulnerability audits',
        'Data telemetry, live logging, and real-time event analytics'
      ]
    },
    'tech-consulting': {
      title: 'Strategic Technology Consulting',
      tag: 'STRATEGY & AUDITING',
      description: 'Navigate evolving technology landscapes with confidence. We help leadership teams choose optimal architectures, modernize codebases, and derisk roadmaps.',
      features: [
        'Technical architecture reviews and bottleneck identification',
        'Legacy code modernization and technical debt mitigation',
        'Cloud cost optimization and infrastructure rightsizing',
        'Engineering team mentoring and modern workflow best practices',
        'Security compliance audits and disaster recovery roadmaps'
      ]
    },
    'privacy': {
      title: 'MainCrafts Privacy Policy',
      tag: 'TRANSPARENCY & TRUST',
      description: 'Your privacy is paramount to MainCrafts. This policy outlines our commitment to handling your personal data securely and transparently.',
      features: [
        'Zero selling or third-party sharing of client or inquiry data',
        'Full compliance with standard GDPR and CCPA privacy protections',
        'Encrypted database storage and secure HTTPS data transit',
        'Right to request immediate data deletion or export at any time',
        'Inquiries or privacy questions: contact hello@maincrafts.tech'
      ]
    },
    'terms': {
      title: 'MainCrafts Terms & Conditions',
      tag: 'LEGAL AGREEMENT',
      description: 'Welcome to MainCrafts. By accessing this platform and engaging our engineering services, you agree to these transparent terms.',
      features: [
        'All intellectual property created for client projects is assigned upon completion',
        'Transparent milestones, deliverables, and service-level agreements (SLA)',
        'Confidentiality and non-disclosure agreements guaranteed for all inquiries',
        'Full Stack Web Development Internship – Task 1 project demonstration',
        'Governed under international software engineering best practices'
      ]
    }
  };

  const openModal = (key) => {
    const data = modalData[key];
    if (!data) return;

    modalBodyContent.innerHTML = `
      <div class="section-tag mb-2">
        <i class="fa-solid fa-sparkles"></i> ${data.tag}
      </div>
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <h4 style="font-size: 0.9375rem; color: #FFF; margin-top: 18px; margin-bottom: 10px;">Key Capabilities:</h4>
      <ul class="modal-feature-list">
        ${data.features.map(f => `<li><i class="fa-solid fa-circle-check text-cyan"></i> ${f}</li>`).join('')}
      </ul>
      <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: flex-end;">
        <button class="btn btn-secondary btn-sm" id="modal-action-close">Close</button>
        <a href="#contact" class="btn btn-primary btn-sm" id="modal-action-talk">
          <span>Let's Discuss</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    `;

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook internal modal buttons
    const internalClose = document.getElementById('modal-action-close');
    const internalTalk = document.getElementById('modal-action-talk');
    
    if (internalClose) {
      internalClose.addEventListener('click', closeModal);
    }
    if (internalTalk) {
      internalTalk.addEventListener('click', () => {
        closeModal();
      });
    }
  };

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = trigger.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 10. Toast Notification System
  // --------------------------------------------------------------------------
  const toastNotify = document.getElementById('toast-notify');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  const showToast = (message, isError = false) => {
    if (!toastNotify || !toastMessage) return;

    clearTimeout(toastTimeout);
    toastMessage.textContent = message;

    const toastIcon = document.getElementById('toast-icon');
    if (isError) {
      toastNotify.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      if (toastIcon) {
        toastIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color: #EF4444;"></i>';
      }
    } else {
      toastNotify.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      if (toastIcon) {
        toastIcon.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10B981;"></i>';
      }
    }

    toastNotify.classList.add('show');

    toastTimeout = setTimeout(() => {
      toastNotify.classList.remove('show');
    }, 4000);
  };

  // Copy email click feedback
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'hello@maincrafts.tech';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Email address: ' + email);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Interactive Contact Form Validation & Submission
  // --------------------------------------------------------------------------
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateInput = (input, condition, errorMsgId) => {
      const parent = input.closest('.form-group');
      if (!condition) {
        parent.classList.add('has-error');
        return false;
      } else {
        parent.classList.remove('has-error');
        return true;
      }
    };

    // Live validation on blur
    nameInput.addEventListener('blur', () => {
      validateInput(nameInput, nameInput.value.trim().length >= 2, 'name-error');
    });

    emailInput.addEventListener('blur', () => {
      validateInput(emailInput, emailRegex.test(emailInput.value.trim()), 'email-error');
    });

    messageInput.addEventListener('blur', () => {
      validateInput(messageInput, messageInput.value.trim().length >= 5, 'message-error');
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateInput(nameInput, nameInput.value.trim().length >= 2, 'name-error');
      const isEmailValid = validateInput(emailInput, emailRegex.test(emailInput.value.trim()), 'email-error');
      const isMessageValid = validateInput(messageInput, messageInput.value.trim().length >= 5, 'message-error');

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        showToast('Please fill in all required fields accurately.', true);
        return;
      }

      // Simulate submission state
      const originalBtnHtml = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Encrypting & Sending...</span>
      `;

      setTimeout(() => {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnHtml;
        contactForm.reset();
        showToast('Thank you! Your project inquiry has been received. We will respond within 2-4 hours.');
      }, 1200);
    });
  }

  // CTA button triggers focus on contact form
  const focusContactForm = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const nameInput = document.getElementById('contact-name');
        if (nameInput) {
          nameInput.focus();
        }
      }, 700);
    }
  };

  if (navCtaBtn) {
    navCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      focusContactForm();
    });
  }

  if (ctaStartBtn) {
    ctaStartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      focusContactForm();
    });
  }

  // --------------------------------------------------------------------------
  // 12. Interactive Subtle Particle / Constellation Canvas
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 22), 65); // Adaptive density
    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.color = Math.random() > 0.5 ? 'rgba(79, 140, 255, ' : 'rgba(34, 211, 238, ';
        this.alpha = Math.random() * 0.45 + 0.2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse reaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            this.x -= directionX * force * 2;
            this.y -= directionY * force * 2;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 110;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = `rgba(79, 140, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    // Pause animation when tab is not visible to maximize battery and performance
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 13. Interactive 3D Card Hover / Mouse Move Spotlight
  // --------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt]');
  
  if (window.innerWidth > 992) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});
