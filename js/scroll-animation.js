document.addEventListener('DOMContentLoaded', () => {
  function setupScrollMicroInteraction(className) {
    const container = document.querySelector('.title-carousel' + '-' + className);
    const content = container.querySelector('.title-content' + '-' + className);
    if (!content) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    let currentPosition = 0;
    const maxScroll = content.offsetWidth / 2;
    const scrollSensitivity = 0.1; // Adjust this value to change the scroll sensitivity

    function updatePosition(scrollDelta) {
      currentPosition += scrollDelta * scrollSensitivity;
      
      // Ensure the scroll stays within bounds
      if (currentPosition > 0) {
        currentPosition = 0;
      } else if (currentPosition < -maxScroll) {
        currentPosition = -maxScroll;
      }

      content.style.transform = `translateX(${currentPosition}px)`;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = lastScrollY - currentScrollY;
          updatePosition(scrollDelta);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  setupScrollMicroInteraction('about');
  setupScrollMicroInteraction('featured');
});

