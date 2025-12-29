// Initialize navigation behaviors (exposed as initNav so injected nav can be initialized)
function initNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navbar = document.getElementById('navbar');

  // Mobile toggle
  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
      // Change icon based on state
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navbar.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times'); // Use X icon when open
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars'); // Use bars icon when closed
        }
      }
    });
  }

  // Close mobile nav when clicking a link
  if (navbar) {
    navbar.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (target && navbar.classList.contains('open')) {
        // Small delay to allow navigation before closing
        setTimeout(() => {
          navbar.classList.remove('open');
          const icon = document.querySelector('#nav-toggle i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }, 100);
      }
    });
  }

  // Dropdown toggles (click to open/close) - use separate button so main link navigates
  const dropdownToggleBtns = document.querySelectorAll('.dropdown-toggle-btn');
  dropdownToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = btn.closest('.dropdown');
      if (!parent) return;
      const menu = parent.querySelector('.dropdown-menu');
      const link = parent.querySelector('.dropdown-link');
      const isOpen = menu && menu.classList.contains('show');

      // Close other open dropdowns
      document.querySelectorAll('.dropdown-menu.show').forEach(m => {
        if (m !== menu) {
          m.classList.remove('show');
          const t = m.closest('.dropdown')?.querySelector('.dropdown-toggle-btn');
          if (t) {
            t.classList.remove('open');
            t.setAttribute('aria-expanded', 'false');
          }
          const pl = m.closest('.dropdown')?.querySelector('.dropdown-link');
          if (pl) pl.classList.remove('active');
        }
      });

      if (menu) menu.classList.toggle('show', !isOpen);
      btn.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (link) link.classList.toggle('active', !isOpen);
    });
  });

  // Hover-to-open behavior for desktop: open submenu on hover and sync ARIA/classes
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(drop => {
    const btn = drop.querySelector('.dropdown-toggle-btn');
    const menu = drop.querySelector('.dropdown-menu');
    const link = drop.querySelector('.dropdown-link');

    drop.addEventListener('mouseenter', () => {
      if (window.innerWidth <= 768) return;
      if (menu) menu.classList.add('show');
      if (btn) { btn.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
      if (link) link.classList.add('active');
    });
    drop.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 768) return;
      if (menu) menu.classList.remove('show');
      if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
      if (link) link.classList.remove('active');
    });

    // Keyboard support: open on focus, close on focusout if focus leaves the dropdown
    drop.addEventListener('focusin', () => {
      if (window.innerWidth <= 768) return;
      if (menu) menu.classList.add('show');
      if (btn) { btn.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
      if (link) link.classList.add('active');
    });
    drop.addEventListener('focusout', (e) => {
      if (window.innerWidth <= 768) return;
      if (drop.contains(e.relatedTarget)) return;
      if (menu) menu.classList.remove('show');
      if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
      if (link) link.classList.remove('active');
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
        const t = menu.closest('.dropdown')?.querySelector('.dropdown-toggle');
        if (t) {
          t.classList.remove('open');
          t.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // Keyboard support: Esc to close menus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
        const t = menu.closest('.dropdown')?.querySelector('.dropdown-toggle');
        if (t) {
          t.classList.remove('open');
          t.setAttribute('aria-expanded', 'false');
        }
      });
      const navbarEl = document.getElementById('navbar');
      if (navbarEl && navbarEl.classList.contains('open')) {
        navbarEl.classList.remove('open');
        const icon = document.querySelector('#nav-toggle i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    }
  });
}

// Expose globally so include-navbar.js can call it after injecting the markup
window.initNav = initNav;

// Initialize on DOMContentLoaded in case navbar is already present in the DOM
document.addEventListener('DOMContentLoaded', () => {
  initNav();
});

// --- Scroll-based Section Visibility Animation ---

function checkVisibility() {
    // Select all sections that are immediate children of the body, excluding the header and footer
    const sections = document.querySelectorAll('body > .section, body > .hero-section');
    sections.forEach(section => {
        
        // Skip elements that are already visible
        if (section.classList.contains('visible')) return;

        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // If the section's top edge is within 80% of the viewport height, make it visible
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('visible');
        } 
    });
}

// Initial check on load
document.addEventListener('DOMContentLoaded', () => {
    checkVisibility();
});

// Check on scroll
window.addEventListener('scroll', checkVisibility);

// --- END NEW ANIMATION CODE ---

// Simple fake submit handler for the contact form (works on contact.html and index.html)
const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Clear previous messages and show loading
      formStatus.style.color = 'var(--accent-color)';
      formStatus.textContent = "Sending request...";

      // Simulate API call delay
      setTimeout(() => {
        formStatus.style.color = '#4ade80'; // Success green
        formStatus.textContent = "Thank you! Your request has been recorded (This is a demo only).";
        contactForm.reset();
        
        // Clear message after a few seconds
        setTimeout(() => {
            formStatus.textContent = "";
        }, 5000);
      }, 1500); // 1.5 second delay
    });
}