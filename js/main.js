/* ===================================================================
   主入口：时间线渲染、图表懒加载、初始事件绑定
   =================================================================== */

(function () {

  /* ---------- 1. 渲染时间线 ---------- */
  const timelineTrack = document.getElementById('timelineTrack');
  if (timelineTrack) {
    DATA.timeline.forEach(item => {
      const div = document.createElement('div');
      div.className = 'timeline-item' + (item.forecast ? ' forecast' : '');
      div.innerHTML = `
        <div class="tl-year">${item.year}</div>
        <div class="tl-title">${item.title}</div>
        <div class="tl-desc">${item.desc}</div>
        <span class="tl-tag">${item.tag}</span>
      `;
      timelineTrack.appendChild(div);
    });
  }

  /* ---------- 2. 时间线左右导航 ---------- */
  const tlPrev = document.getElementById('tlPrev');
  const tlNext = document.getElementById('tlNext');
  const track = document.getElementById('timelineTrack');
  const scrollStep = 300;
  tlPrev?.addEventListener('click', () => track.scrollBy({ left: -scrollStep, behavior: 'smooth' }));
  tlNext?.addEventListener('click', () => track.scrollBy({ left: scrollStep, behavior: 'smooth' }));

  /* ---------- 3. 图表懒加载（IntersectionObserver + 立即备份） ---------- */
  const chartRenderers = {
    compute: renderComputeChart,
    market: renderMarketChart,
    country: renderCountryChart,
    gdp: renderGdpChart,
    heatmap: renderHeatmapChart,
    bubble: renderBubbleChart,
    radar: renderRadarChart,
    rd: renderRdChart,
    patent: renderPatentChart,
    paper: renderPaperChart,
    contrib: renderContribChart,
    job: renderJobChart,
    jobDemand: renderJobDemandChart,
    globalRadar: renderGlobalRadar,
    unicorn: renderUnicornChart,
    techRadar: renderTechRadar,
    // 专业可视化扩展
    sankey: renderSankeyChart,
    treemap: renderTreemapChart,
    pictorial: renderPictorialChart,
    graph: renderGraphChart,
    themeRiver: renderThemeRiverChart,
    parallel: renderParallelChart,
    wordCloud: renderWordCloudChart,
    boxplot: renderBoxplotChart,
    funnel: renderFunnelChart,
    smallMultiples: renderSmallMultiplesChart
  };

  const containerMap = {
    compute: 'computeChart',
    market: 'marketChart',
    country: 'countryChart',
    gdp: 'gdpChart',
    heatmap: 'heatmapChart',
    bubble: 'bubbleChart',
    radar: 'radarChart',
    rd: 'rdChart',
    patent: 'patentChart',
    paper: 'paperChart',
    contrib: 'contribChart',
    job: 'jobChart',
    jobDemand: 'jobDemandChart',
    globalRadar: 'globalRadar',
    unicorn: 'unicornChart',
    techRadar: 'techRadar',
    // 专业可视化扩展
    sankey: 'sankeyChart',
    treemap: 'treemapChart',
    pictorial: 'pictorialChart',
    graph: 'graphChart',
    themeRiver: 'themeRiverChart',
    parallel: 'parallelChart',
    wordCloud: 'wordCloudChart',
    boxplot: 'boxplotChart',
    funnel: 'funnelChart',
    smallMultiples: 'smallMultiplesChart'
  };

  // 记录已渲染的图表
  const rendered = new Set();

  function renderChart(key) {
    if (rendered.has(key)) return;
    if (!chartRenderers[key]) return;
    try {
      chartRenderers[key]();
      rendered.add(key);
      const el = document.getElementById(containerMap[key]);
      if (el) el.classList.add('fade-in');
    } catch (err) {
      console.error('Chart render error:', key, err);
    }
  }

  function isInViewport(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  const chartIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        renderChart(e.target.dataset.chart);
        chartIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  Object.entries(containerMap).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) {
      el.dataset.chart = key;
      // 可见时立即渲染，否则观察
      if (isInViewport(el)) {
        renderChart(key);
      } else {
        chartIO.observe(el);
      }
    }
  });

  // 滚动时也检查（备份机制）
  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      Object.entries(containerMap).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el && !rendered.has(key) && isInViewport(el)) {
          renderChart(key);
        }
      });
    }, 150);
  }, { passive: true });

  /* ---------- 4. 窗口 resize 联动 ---------- */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof resizeAllCharts === 'function') resizeAllCharts();
    }, 200);
  });

  /* ---------- 5. 平滑滚动到锚点（覆盖默认行为兼容） ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 64;  // navbar 高度
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 6. 防止 ECharts 在隐藏容器中尺寸为 0 ---------- */
  // 滚动到首次可见时强制 resize
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (typeof resizeAllCharts === 'function') resizeAllCharts();
    }, 300);
  });

  /* ---------- 7. 备份：1.5 秒后强制渲染所有图表 ---------- */
  // 防止 IntersectionObserver 在某些环境不触发
  setTimeout(() => {
    Object.keys(containerMap).forEach(key => {
      const el = document.getElementById(containerMap[key]);
      if (el && !rendered.has(key)) {
        renderChart(key);
      }
    });
    if (typeof resizeAllCharts === 'function') resizeAllCharts();
  }, 1500);

  // 滚动时再备份一次（分批渲染避免卡顿）
  let scrollCount = 0;
  const scrollBackup = () => {
    scrollCount++;
    if (scrollCount > 20) {
      window.removeEventListener('scroll', scrollBackup);
      return;
    }
    Object.keys(containerMap).forEach(key => {
      const el = document.getElementById(containerMap[key]);
      if (el && !rendered.has(key) && isInViewport(el)) {
        renderChart(key);
      }
    });
  };
  window.addEventListener('scroll', scrollBackup, { passive: true });

})();
