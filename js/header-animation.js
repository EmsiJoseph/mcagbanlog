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

function toggleNavbar() {
  const navbarMobile = document.querySelector('.navbar-mobile');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  
  hamburgerMenu.classList.toggle('open');
  navbarMobile.classList.toggle('open');
}

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbarMobile = document.querySelector('.navbar-mobile');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('open');
  navbarMobile.classList.toggle('open');
});
