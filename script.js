// Toggle mobile navigation visibility
const navToggle = document.getElementById('nav-toggle');
const navbar = document.getElementById('navbar');

if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        // Change icon based on state
        const icon = navToggle.querySelector('i');
        if (navbar.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Use X icon when open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Use bars icon when closed
        }
    });
}

// Close mobile nav when clicking a link
if (navbar) {
  navbar.addEventListener("click", (e) => {
    // Check if it's a link and if the mobile menu is open
    if (e.target.tagName.toLowerCase() === "a" && navbar.classList.contains('open')) {
      // Small delay to allow navigation before closing
      setTimeout(() => {
        navbar.classList.remove("open");
        navToggle.querySelector('i').classList.remove('fa-times');
        navToggle.querySelector('i').classList.add('fa-bars');
      }, 100); 
    }
  });
}

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