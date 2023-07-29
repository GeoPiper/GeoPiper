import './geopiper.scss'

const nav = document.getElementById('nav-bar');
const main = document.querySelector('main > header:first-child');
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver((entries) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    if (!nav.classList.contains('nav-bg')) {
      nav.classList.add('nav-bg');
    }
  } else {
    if (nav.classList.contains('nav-bg')) {
      nav.classList.remove('nav-bg');
    }
  }
}, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(main);

document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurger = document.querySelector('.navbar-burger');

  $navbarBurger.addEventListener('click', () => {
    const target = $navbarBurger.dataset.target;
    const $target = document.getElementById(target);

    $navbarBurger.classList.toggle('is-active');
    $target.classList.toggle('is-active');
  });
});

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const locale = navigator.languages != undefined ? navigator.languages[0] : navigator.language;
    const plus = obj.hasAttribute('data-plus') ? '+' : '';
    obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString(locale) + plus;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

document.querySelectorAll('p[data-value]').forEach((el) => {
  const end = Number.parseInt(el.getAttribute('data-value'));
  animateValue(el, 0, end, 1000)
});
