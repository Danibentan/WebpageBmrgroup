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
  setInterval(nextSlide, 6500);
}

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.site-header', {
    y: -70,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out'
  });

  gsap.from('.hero-content', {
    y: 50,
    opacity: 0,
    duration: 1.1,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.from(el, {
      y: 44,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.utils.toArray('.btn').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        boxShadow: '0 14px 28px rgba(120, 166, 255, 0.35)',
        duration: 0.3,
        scale: 1.02
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        duration: 0.3,
        scale: 1
      });
    });
  });
}
