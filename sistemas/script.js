// =====================
// NAV LINKS ACTIVE
// =====================
const topLinks = document.querySelectorAll('.top-link');

function updateActiveTopLink() {
  const sections = document.querySelectorAll('section[id]');
  let currentId = null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentId = section.id;
    }
  });

  topLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const id = href?.startsWith('#') ? href.substring(1) : null;
    link.classList.toggle('active', id === currentId);
  });
}

window.addEventListener('scroll', updateActiveTopLink);
updateActiveTopLink();

// =====================
// TIMELINE MARKER
// =====================
const marker = document.getElementById('timeline-marker');
const nodes = document.querySelectorAll('[data-node]');

function updateTimelineMarker() {
  if (!marker || !nodes.length) return;

  const viewportHeight = window.innerHeight;
  let closestNode = null;
  let closestDistance = Infinity;

  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    const nodeCenter = rect.top + rect.height / 2;
    const distance = Math.abs(nodeCenter - viewportHeight / 2);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestNode = node;
    }
  });

  if (!closestNode) return;

  const rect = closestNode.getBoundingClientRect();
  const nodeCenter = rect.top + rect.height / 2;
  const markerOffset = ((nodeCenter - 80) / (window.innerHeight - 140)) * 100;

  marker.style.top = `${Math.max(0, Math.min(100, markerOffset))}%`;
}

window.addEventListener('scroll', updateTimelineMarker);
window.addEventListener('resize', updateTimelineMarker);
updateTimelineMarker();

// =====================
// SKILL BARS
// =====================
const skillBars = document.querySelectorAll('.skill-bar span');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level') || 60;
        entry.target.style.width = `${level}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// =====================
// CONTACT FORM
// =====================
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');
const formFeedback = document.getElementById('form-feedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      e.preventDefault();
      if (formFeedback) {
        formFeedback.style.color = 'var(--danger)';
        formFeedback.textContent = 'Preencha todos os campos antes de enviar.';
      }
      return;
    }

    if (submitBtn && btnText && btnLoading) {
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
    }
  });
}

// =====================
// FOOTER YEAR
// =====================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// =====================
// SCROLL TOP BUTTON
// =====================
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =====================
// AVATAR FALLBACK LOG
// =====================
const avatarImg = document.getElementById('avatar-img');
const avatarFallback = document.getElementById('avatar-fallback');

if (avatarImg) {
  avatarImg.addEventListener('error', () => {
    avatarImg.style.display = 'none';
    if (avatarFallback) avatarFallback.style.display = 'flex';
  });

  if (avatarImg.complete && avatarImg.naturalWidth === 0) {
    avatarImg.dispatchEvent(new Event('error'));
  }
}

// =====================
// BACKGROUND — TRIÂNGULOS DE PONTOS
// =====================
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const POINT_COUNT = 90;
  const CONNECTION_DIST = 160;
  const points = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Point {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.r = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37,99,235,0.75)';
      ctx.fill();
    }
  }

  function init() {
    points.length = 0;
    for (let i = 0; i < POINT_COUNT; i++) {
      points.push(new Point());
    }
  }

  function drawTriangles() {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx1 = points[j].x - points[i].x;
        const dy1 = points[j].y - points[i].y;
        const d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        if (d1 > CONNECTION_DIST) continue;

        for (let k = j + 1; k < points.length; k++) {
          const dx2 = points[k].x - points[j].x;
          const dy2 = points[k].y - points[j].y;
          const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d2 > CONNECTION_DIST) continue;

          const dx3 = points[i].x - points[k].x;
          const dy3 = points[i].y - points[k].y;
          const d3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);
          if (d3 > CONNECTION_DIST) continue;

          const alpha = (1 - Math.max(d1, d2, d3) / CONNECTION_DIST) * 0.18;

          // Triângulo preenchido
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.lineTo(points[k].x, points[k].y);
          ctx.closePath();
          ctx.fillStyle = `rgba(37,99,235,${alpha * 0.6})`;
          ctx.fill();

          // Arestas do triângulo
          const edgeAlpha = alpha * 2.5;
          ctx.strokeStyle = `rgba(37,99,235,${edgeAlpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // Gradiente de fundo
    const grad = ctx.createRadialGradient(W / 2, 0, 0, W / 2, H / 2, H);
    grad.addColorStop(0, '#020f3b');
    grad.addColorStop(0.45, '#020617');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    points.forEach((p) => p.update());
    drawTriangles();
    points.forEach((p) => p.draw());

    requestAnimationFrame(loop);
  }

  resize();
  init();
  loop();
  window.addEventListener('resize', () => {
    resize();
    init();
  });
})();