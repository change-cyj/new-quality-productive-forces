/* ===================================================================
   滚动动画 / 交互行为 / 动态计数器
   =================================================================== */

(function () {

  /* ---------- 1. 滚动出现 reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => io.observe(el));

  /* ---------- 2. 导航高亮 + 进度条 ---------- */
  const navbar = document.getElementById('navbar');
  const navProgress = document.getElementById('navProgress');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sideDots = document.querySelectorAll('.side-dots li');
  const sections = ['hero', 'era', 'economy', 'industry', 'innovation', 'employment', 'global', 'future']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function updateNav() {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(100, (scrollY / docH) * 100));
    navProgress.style.width = progress + '%';

    if (scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // 当前 section
    const mid = scrollY + window.innerHeight * 0.4;
    let currentId = sections[0]?.id;
    for (const sec of sections) {
      if (sec.offsetTop <= mid) currentId = sec.id;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.nav === currentId));
    sideDots.forEach(d => d.classList.toggle('active', d.dataset.target === currentId));
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ---------- 3. 侧边点跳转 ---------- */
  sideDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- 4. 移动端菜单 ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.className = navLinksEl.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
  });
  navLinks?.forEach(a => a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.querySelector('i').className = 'fas fa-bars';
  }));

  /* ---------- 5. 回到顶部按钮 ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // 已通过 updateNav 处理显示，这里补一下
  function toggleBack() {
    if (window.scrollY > 600) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }
  window.addEventListener('scroll', toggleBack, { passive: true });
  toggleBack();

  /* ---------- 6. 动态计数器 ---------- */
  function animateCount(el, target, decimals, duration = 2000) {
    const start = Date.now();
    const isFloat = decimals > 0;
    function tick() {
      const elapsed = Date.now() - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);   // easeOutCubic
      const cur = target * eased;
      el.textContent = isFloat ? cur.toFixed(decimals) : Math.round(cur).toLocaleString();
      if (t < 1) setTimeout(tick, 16);
    }
    setTimeout(tick, 16);
  }

  // 工具：判断元素是否在视口
  function isInViewport(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  const heroStatsEl = document.getElementById('heroStats');
  if (heroStatsEl) {
    DATA.heroStats.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'stat-card glow-hover';
      card.innerHTML = `
        <div class="stat-label">${s.label}</div>
        <div class="stat-value">
          <span class="count-up" data-target="${s.value}" data-decimals="${s.decimals}">0</span><span class="stat-unit">${s.unit}</span>
        </div>
        <div class="stat-source">来源：${s.source}</div>
      `;
      heroStatsEl.appendChild(card);
    });

    // 触发计数动画：Hero 区初始就可见，立即触发
    const countEls = document.querySelectorAll('.count-up');
    countEls.forEach(el => {
      // 延迟一点点确保 DOM 完全渲染
      setTimeout(() => {
        animateCount(el, +el.dataset.target, +el.dataset.decimals);
      }, 100);
    });

    // 备份：如果 1 秒后计数器仍是 0，再次触发
    setTimeout(() => {
      countEls.forEach(el => {
        if (el.textContent === '0' || el.textContent === '') {
          animateCount(el, +el.dataset.target, +el.dataset.decimals);
        }
      });
    }, 1000);
  }

  /* ---------- 7. 鼠标光晕跟随 glow-hover ---------- */
  document.querySelectorAll('.glow-hover').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- 8. 金句切换 ---------- */
  const quoteCard = document.getElementById('quoteCard');
  const quoteDots = document.getElementById('quoteDots');
  if (quoteCard && quoteDots) {
    let qi = 0;
    function renderQuote() {
      const q = DATA.quotes[qi];
      quoteCard.innerHTML = `
        <div class="quote-text">${q.text}</div>
        <div class="quote-author">${q.author}</div>
      `;
      quoteCard.style.opacity = 0;
      setTimeout(() => quoteCard.style.opacity = 1, 50);
      quoteDots.querySelectorAll('.quote-dot').forEach((d, i) => d.classList.toggle('active', i === qi));
    }
    DATA.quotes.forEach((_, i) => {
      const d = document.createElement('span');
      d.className = 'quote-dot';
      d.addEventListener('click', () => { qi = i; renderQuote(); });
      quoteDots.appendChild(d);
    });
    renderQuote();
    setInterval(() => { qi = (qi + 1) % DATA.quotes.length; renderQuote(); }, 6000);
  }

  /* ---------- 9. 未来时间线 ---------- */
  const futureTimeline = document.getElementById('futureTimeline');
  if (futureTimeline) {
    DATA.futureOutlook.forEach(item => {
      const div = document.createElement('div');
      div.className = 'future-item';
      div.innerHTML = `
        <div class="future-year">${item.year}</div>
        <div class="future-text">${item.text}</div>
      `;
      futureTimeline.appendChild(div);
    });
  }

  /* ---------- 10. 总结区引言 ---------- */
  const cq = document.getElementById('conclusionQuote');
  const ca = document.getElementById('conclusionAuthor');
  if (cq && ca) {
    cq.textContent = DATA.quotes[0].text;
    ca.textContent = DATA.quotes[0].author;
  }

})();
