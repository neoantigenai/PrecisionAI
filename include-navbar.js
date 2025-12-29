(async function(){
  const container = document.getElementById('site-navbar');
  if (!container) return;
  try {
    const res = await fetch('navbar.html');
    if (!res.ok) throw new Error('Navbar fetch failed');
    container.innerHTML = await res.text();

    // After inserting the navbar, set the active link and try to initialize nav behaviors
    (function setActive() {
      // Remove any pre-existing active classes added in the fragment
      const existingActive = container.querySelectorAll('nav a.active');
      existingActive.forEach(a => a.classList.remove('active'));

      const links = container.querySelectorAll('nav a[href]');
      links.forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        // Mark link active if URL ends with the link href (works for file:// and http://)
        if (window.location.href.endsWith(href) || (href === 'index.html' && window.location.pathname.endsWith('/'))) {
          a.classList.add('active');
          // If link is inside dropdown, mark the parent link active but do NOT auto-open the submenu on load
          const parent = a.closest('.dropdown');
          if (parent) {
            const parentLink = parent.querySelector('.dropdown-link');
            if (parentLink) parentLink.classList.add('active');
            // keep submenu hidden by default; it will open on hover (desktop) or via the toggle button
          }
        }
      });
    })();

    function callInit(){
      if (typeof window.initNav === 'function') {
        window.initNav();
      } else {
        // Poll for a short period if script.js hasn't loaded yet
        let attempts = 0;
        const timer = setInterval(() => {
          attempts++;
          if (typeof window.initNav === 'function') {
            window.initNav();
            clearInterval(timer);
          }
          if (attempts > 20) clearInterval(timer);
        }, 100);
      }
    }

    callInit();
  } catch (err) {
    console.error('Failed to load navbar:', err);
  }
})();