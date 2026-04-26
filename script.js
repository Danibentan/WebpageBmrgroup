const slides = Array.from(document.querySelectorAll('.slide'));
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');
let activeSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
  });
}

function nextSlide() {
  activeSlide = (activeSlide + 1) % slides.length;
  showSlide(activeSlide);
}

function prevSlide() {
  activeSlide = (activeSlide - 1 + slides.length) % slides.length;
  showSlide(activeSlide);
}

if (nextBtn && prevBtn && slides.length) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  setInterval(nextSlide, 6000);
}

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  introTl
    .from('.site-header', { y: -70, opacity: 0, duration: 0.9 })
    .from('.brand', { x: -50, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.nav-list li', { y: -20, opacity: 0, duration: 0.45, stagger: 0.08 }, '-=0.35')
    .from('.hero-content', { y: 50, opacity: 0, duration: 0.8 }, '-=0.2');

  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.from(el, {
      y: 42,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%'
      }
    });
  });

  gsap.utils.toArray('.btn').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        y: -2,
        duration: 0.25,
        boxShadow: '0 12px 26px rgba(255, 106, 20, 0.35)'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        y: 0,
        duration: 0.25,
        boxShadow: '0 0 0 rgba(0,0,0,0)'
      });
    });
  });
}
