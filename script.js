// ============ CURSOR ============
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});
function animateFollower() {
  fx += (mx - fx - 18) * 0.12;
  fy += (my - fy - 18) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; follower.style.transform = 'scale(1.5)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; follower.style.transform = 'scale(1)'; });
});

// ============ LOADER ============
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 2000);
});
document.body.style.overflow = 'hidden';

// ============ SCROLL PROGRESS ============
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
});

// ============ NAVBAR ============
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ============ ACTIVE NAV ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateActiveNav);

// ============ TYPING ANIMATION ============
const phrases = [
  'Building Next.js Applications',
  'Crafting AI-Powered Solutions',
  'Designing Backend Systems',
  'Creating Scalable APIs',
  'Exploring Machine Learning'
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');
function type() {
  const current = phrases[pi];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 50 : 90);
}
type();

// ============ PARTICLES ============
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.5 - 0.1,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '59,130,246' : '139,92,246'
  };
}
for (let i = 0; i < 80; i++) particles.push(createParticle());
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ============ FADE IN ON SCROLL ============
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ============ COUNTER ANIMATION ============
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 16);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#achievements, #about').forEach(s => counterObserver.observe(s));

// ============ CONTACT FORM ============
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    status.className = 'form-status success';
    status.textContent = '✅ Message sent! I\'ll get back to you soon.';
    this.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => { status.className = 'form-status'; }, 5000);
  }, 1500);
});
