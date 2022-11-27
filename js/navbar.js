// Toggle Menu Logic
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarTogglerIcon = document.querySelector('.navbar-toggler-icon');
const menu = document.querySelector('.navbar-collapse');
const overlay = document.querySelector('.overlay');

navbarToggler.addEventListener('click', () => {
  if (menu.classList.contains('active')) {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    // The Close Icon Convert to Menu Icon
    navbarTogglerIcon.style.removeProperty('background-image');
  } else {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    navbarTogglerIcon.style.backgroundImage =
      'url("./assets/images/icon-close.svg")';
  }
});
