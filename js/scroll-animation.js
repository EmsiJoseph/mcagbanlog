document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements and computed values
  const titles = {
    about: document.querySelector('.title-content-about'),
    featured: document.querySelector('.title-content-featured')
  };
  
  // Throttle function
  const throttle = (fn, wait) => {
    let time = Date.now();
    return () => {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  };

  // Optimize scroll interaction
  function setupScrollAnimation(element, maxScroll) {
    if (!element) return;
    
    let currentPosition = 0;
    const sensitivity = 0.1;

    const updatePosition = throttle(() => {
      const scrolled = window.scrollY * sensitivity;
      currentPosition = Math.max(-maxScroll, Math.min(0, -scrolled));
      requestAnimationFrame(() => {
        element.style.transform = `translateX(${currentPosition}px)`;
      });
    }, 16); // ~60fps

    window.addEventListener('scroll', updatePosition, { passive: true });
  }

  // Setup animations for each title
  Object.entries(titles).forEach(([_, element]) => {
    if (element) {
      setupScrollAnimation(element, element.offsetWidth / 2);
    }
  });

  // Optimize intersection observer
  const nav = document.querySelector('.nav');
  const observerOptions = {
    threshold: [0.1],
    rootMargin: '0px'
  };

  const backgroundObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const backgroundColor = getComputedStyle(entry.target).backgroundColor;
        const rgb = backgroundColor.match(/\d+/g);
        if (rgb) {
          const isDark = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) < 128;
          requestAnimationFrame(() => {
            document.documentElement.style.setProperty(
              '--hamburger-color', 
              isDark ? '#ffffff' : 'var(--brand-dark)'
            );
          });
        }
      }
    });
  }, observerOptions);

  // Observe sections with reduced DOM queries
  document.querySelectorAll('section').forEach(section => {
    backgroundObserver.observe(section);
  });
});

