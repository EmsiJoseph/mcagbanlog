// Select the header element
const header = document.querySelector(".nav");

let lastScrollPosition = 0;
window.addEventListener("scroll", () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition) {
    // Scrolling down - hide the header
    header.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up - show the header
    header.style.transform = "translateY(0)";
  }

  lastScrollPosition = currentScrollPosition;
});

// const hamburgerMenu = document.querySelector('.hamburger-menu');
// const navbarMobile = document.querySelector('.navbar-mobile');

// hamburgerMenu.addEventListener('click', () => {
//   hamburgerMenu.classList.toggle('open');
//   navbarMobile.classList.toggle('open');
// });


// Mobile navigation animation
function toggleMobileNav() {
  const mobileNav = document.querySelector('.navbar-mobile');
  const hamburger = document.querySelector('.hamburger-menu');
  const overlay = document.querySelector('.nav-overlay');
  
  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open');
  overlay.classList.toggle('open');
  
  // Close menu when clicking nav links or overlay
  const closeMenu = () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
  };
  
  const navLinks = document.querySelectorAll('.navbar-mobile .nav-link, .navbar-mobile .cta');
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  overlay.addEventListener('click', closeMenu);
}

// Add overlay div to DOM
document.body.insertAdjacentHTML('beforeend', '<div class="nav-overlay"></div>');

// Add click event to hamburger
document.querySelector('.hamburger-menu').addEventListener('click', toggleMobileNav);
