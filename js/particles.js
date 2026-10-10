/* ===================================================================
   Hero 区粒子网络背景
   构造动态节点网络，模拟"神经网络"与"数据流"意象
   =================================================================== */

(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let mouse = { x: -9999, y: -9999 };
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;

  const CONFIG = {
    density: 0.00012,      // 粒子密度（粒子/像素²）
    maxParticles: 130,
    minParticles: 50,
    speed: 0.4,
    linkDist: 140,
    mouseLink: 180,
    mouseRepel: 80,
    colors: ['#00d9ff', '#7c3aed', '#ec4899', '#a78bfa']
  };

  function resize() {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(CONFIG.minParticles, Math.min(CONFIG.maxParticles, Math.floor(W * H * CONFIG.density)));
    particles = [];
    for (let i = 0; i < count; i++) particles.push(createParticle());
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed,
      r: Math.random() * 2.2 + 0.8,
      color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
      pulse: Math.random() * Math.PI * 2
    };
  }

  function step() {
    ctx.clearRect(0, 0, W, H);

    // 绘制连接线
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONFIG.linkDist) {
          const alpha = (1 - d / CONFIG.linkDist) * 0.4;
          ctx.strokeStyle = `rgba(124, 194, 255, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // 鼠标交互
      const mdx = p1.x - mouse.x;
      const mdy = p1.y - mouse.y;
      const md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < CONFIG.mouseLink) {
        const alpha = (1 - md / CONFIG.mouseLink) * 0.8;
        ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
      // 鼠标排斥
      if (md < CONFIG.mouseRepel && md > 0.001) {
        const force = (1 - md / CONFIG.mouseRepel) * 0.6;
        p1.vx += (mdx / md) * force;
        p1.vy += (mdy / md) * force;
      }
    }

    // 绘制粒子
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.04;

      // 阻尼
      p.vx *= 0.98;
      p.vy *= 0.98;
      // 随机微动
      p.vx += (Math.random() - 0.5) * 0.02;
      p.vy += (Math.random() - 0.5) * 0.02;

      // 边界回弹
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      p.x = Math.max(0, Math.min(W, p.x));
      p.y = Math.max(0, Math.min(H, p.y));

      const glow = 0.5 + 0.5 * Math.sin(p.pulse);
      // 光晕
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.15 * glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();

      // 核心
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }

  // 鼠标事件
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = mouse.y = -9999;
  });

  window.addEventListener('resize', () => {
    clearTimeout(window._pResize);
    window._pResize = setTimeout(resize, 150);
  });

  resize();
  requestAnimationFrame(step);
})();
