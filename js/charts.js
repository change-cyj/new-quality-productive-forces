/* ===================================================================
   ECharts 配置中心
   所有图表实例与配置集中管理，按需懒加载渲染
   =================================================================== */

const CHART_THEME = {
  bgColor: 'transparent',
  textColor: '#9aa7c7',
  textBright: '#e6ecff',
  splitLine: 'rgba(124, 194, 255, 0.08)',
  axisLine: 'rgba(124, 194, 255, 0.2)',
  colors: ['#00d9ff', '#7c3aed', '#ec4899', '#fbbf24', '#10b981', '#a78bfa', '#06b6d4', '#f97316'],
  accent: '#00d9ff'
};

// 全局图表实例集合（便于 resize 联动）
const chartInstances = {};

/* 通用 tooltip 样式 */
function tooltipStyle(extra = {}) {
  return Object.assign({
    backgroundColor: 'rgba(8, 12, 32, 0.92)',
    borderColor: 'rgba(0, 217, 255, 0.4)',
    borderWidth: 1,
    padding: [10, 14],
    textStyle: { color: CHART_THEME.textBright, fontSize: 12 },
    extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); border-radius: 10px;'
  }, extra);
}

/* ---------- 1. 训练算力 vs 推理成本 双Y折线 ---------- */
function renderComputeChart() {
  const chart = echarts.init(document.getElementById('computeChart'), null, { renderer: 'canvas' });
  const d = DATA.computeGrowth;
  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), { trigger: 'axis' }),
    legend: {
      data: ['训练算力指数', '推理成本指数'],
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 },
      top: 0, right: 0,
      itemWidth: 14, itemHeight: 14
    },
    grid: { left: 50, right: 50, top: 50, bottom: 40 },
    xAxis: {
      type: 'category',
      data: d.years,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 12 },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'log', name: '算力指数', min: 50, max: 20000,
        nameTextStyle: { color: CHART_THEME.accent, fontSize: 11 },
        axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
        axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
        splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
      },
      {
        type: 'value', name: '成本指数', min: 0, max: 110,
        nameTextStyle: { color: '#ec4899', fontSize: 11 },
        axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
        axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '训练算力指数', type: 'line', smooth: true,
        data: d.trainingCompute,
        symbol: 'circle', symbolSize: 10,
        lineStyle: { color: CHART_THEME.accent, width: 3 },
        itemStyle: { color: CHART_THEME.accent, borderColor: '#fff', borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 217, 255, 0.45)' },
            { offset: 1, color: 'rgba(0, 217, 255, 0)' }
          ])
        },
        emphasis: { focus: 'self' },
        markPoint: {
          symbol: 'pin', symbolSize: 48,
          itemStyle: { color: '#00d9ff', borderColor: '#fff', borderWidth: 1 },
          label: { color: '#050814', fontWeight: 700, fontSize: 9, formatter: '{c}' },
          data: [{ type: 'max', name: '算力峰值' }]
        },
        markLine: {
          silent: true,
          lineStyle: { color: 'rgba(236, 72, 153, 0.5)', type: 'dotted', width: 1 },
          label: { color: '#ec4899', formatter: '成本↓99%', fontSize: 10, position: 'start' },
          data: [{ yAxis: 6 }]
        }
      },
      {
        name: '推理成本指数', type: 'line', smooth: true, yAxisIndex: 1,
        data: d.inferenceCost,
        symbol: 'diamond', symbolSize: 10,
        lineStyle: { color: '#ec4899', width: 3, type: 'dashed' },
        itemStyle: { color: '#ec4899', borderColor: '#fff', borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(236, 72, 153, 0.35)' },
            { offset: 1, color: 'rgba(236, 72, 153, 0)' }
          ])
        }
      }
    ]
  });
  chartInstances.compute = chart;
}

/* ---------- 2. 全球&中国 AI 市场规模 ---------- */
function renderMarketChart() {
  const chart = echarts.init(document.getElementById('marketChart'));
  const d = DATA.marketSize;
  const idxForecast = d.years.indexOf(d.forecastFrom);

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), { trigger: 'axis', valueFormatter: v => v + ' 亿美元' }),
    legend: {
      data: ['全球', '中国'], top: 0, right: 0,
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 }
    },
    grid: { left: 50, right: 30, top: 50, bottom: 40 },
    xAxis: {
      type: 'category', data: d.years,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11, rotate: 30 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value', name: '亿美元',
      nameTextStyle: { color: CHART_THEME.accent, fontSize: 11 },
      axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    series: [
      {
        name: '全球', type: 'line', smooth: true,
        data: d.global,
        symbol: 'circle', symbolSize: 8,
        lineStyle: { color: CHART_THEME.accent, width: 3 },
        itemStyle: { color: CHART_THEME.accent, borderColor: '#fff', borderWidth: 1.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 217, 255, 0.45)' },
            { offset: 1, color: 'rgba(0, 217, 255, 0.02)' }
          ])
        },
        markLine: idxForecast >= 0 ? {
          silent: true, symbol: ['none', 'none'],
          lineStyle: { color: '#fbbf24', type: 'dashed', width: 1.5 },
          label: { color: '#fbbf24', formatter: '预测起点', fontSize: 10 },
          data: [{ xAxis: idxForecast }]
        } : undefined,
        markPoint: {
          symbol: 'pin', symbolSize: 50,
          itemStyle: { color: '#00d9ff', borderColor: '#fff', borderWidth: 1 },
          label: { color: '#050814', fontWeight: 700, fontSize: 10, formatter: '{c}' },
          data: [
            { type: 'max', name: '峰值' }
          ]
        }
      },
      {
        name: '中国', type: 'line', smooth: true,
        data: d.china,
        symbol: 'diamond', symbolSize: 8,
        lineStyle: { color: '#ec4899', width: 3 },
        itemStyle: { color: '#ec4899', borderColor: '#fff', borderWidth: 1.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(236, 72, 153, 0.35)' },
            { offset: 1, color: 'rgba(236, 72, 153, 0.02)' }
          ])
        }
      }
    ]
  });
  chartInstances.market = chart;
}

/* ---------- 3. 各国市场规模（横向条形） ---------- */
function renderCountryChart() {
  const chart = echarts.init(document.getElementById('countryChart'));
  const data = DATA.countryMarket.slice().sort((a, b) => a.value - b.value);

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'item', formatter: '{b}: {c} 亿美元'
    }),
    grid: { left: 70, right: 40, top: 20, bottom: 30 },
    xAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    yAxis: {
      type: 'category', data: data.map(d => d.country),
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: data.map(d => ({
        value: d.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: d.color + '99' },
            { offset: 1, color: d.color }
          ]),
          borderRadius: [0, 8, 8, 0]
        }
      })),
      barWidth: 18,
      label: {
        show: true, position: 'right',
        color: CHART_THEME.textBright, fontSize: 12, fontWeight: 700,
        formatter: '{c} 亿'
      },
      animationDelay: i => i * 80
    }]
  });
  chartInstances.country = chart;
}

/* ---------- 4. GDP 贡献（玫瑰图） ---------- */
function renderGdpChart() {
  const chart = echarts.init(document.getElementById('gdpChart'));
  const d = DATA.gdpImpact;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'item',
      formatter: p => `${p.name}<br/>贡献: <b>${p.value} 万亿美元</b><br/>占GDP: <b>${d[p.dataIndex].pct}%</b>`
    }),
    legend: {
      orient: 'vertical', left: 20, top: 'center',
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 },
      itemWidth: 14, itemHeight: 14
    },
    series: [{
      type: 'pie',
      radius: ['28%', '78%'],
      center: ['58%', '50%'],
      roseType: 'radius',
      itemStyle: { borderRadius: 6, borderColor: '#050814', borderWidth: 2 },
      label: {
        color: CHART_THEME.textBright, fontSize: 12,
        formatter: '{b}\n{d}%',
        lineHeight: 16
      },
      labelLine: { length: 12, length2: 14, lineStyle: { color: CHART_THEME.textColor } },
      data: d.map((item, i) => ({
        name: item.country,
        value: item.value,
        itemStyle: { color: CHART_THEME.colors[i % CHART_THEME.colors.length] }
      })),
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: i => i * 100
    }]
  });
  chartInstances.gdp = chart;
}

/* ---------- 5. 行业 × 能力 热力图 ---------- */
function renderHeatmapChart() {
  const chart = echarts.init(document.getElementById('heatmapChart'));
  const d = DATA.industryHeatmap;
  const data = [];
  for (let i = 0; i < d.industries.length; i++) {
    for (let j = 0; j < d.capabilities.length; j++) {
      data.push([j, i, d.matrix[i][j]]);
    }
  }

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      position: 'top',
      formatter: p => `${d.industries[p.value[1]]} × ${d.capabilities[p.value[0]]}<br/>渗透率: <b style="color:#00d9ff">${p.value[2]}%</b>`
    }),
    grid: { left: 90, right: 60, top: 30, bottom: 70 },
    xAxis: {
      type: 'category', data: d.capabilities,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11, rotate: -30 },
      splitArea: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'category', data: d.industries,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      splitArea: { show: false },
      axisTick: { show: false }
    },
    visualMap: {
      min: 0, max: 100,
      calculable: true, orient: 'horizontal',
      left: 'center', bottom: 0,
      textStyle: { color: CHART_THEME.textColor, fontSize: 11 },
      inRange: {
        color: ['#0a1f3d', '#1e3a8a', '#0e7490', '#06b6d4', '#00d9ff', '#fbbf24', '#ec4899']
      }
    },
    series: [{
      type: 'heatmap',
      data: data,
      label: {
        show: true,
        color: '#fff',
        fontSize: 11,
        formatter: p => p.value[2]
      },
      itemStyle: { borderColor: 'rgba(5,8,20,0.4)', borderWidth: 2, borderRadius: 4 },
      emphasis: {
        itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0, 217, 255, 0.6)' }
      }
    }]
  });
  chartInstances.heatmap = chart;
}

/* ---------- 6. 投资气泡图 ---------- */
function renderBubbleChart() {
  const chart = echarts.init(document.getElementById('bubbleChart'));
  const d = DATA.investmentBubble;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      formatter: p => {
        const it = p.data;
        return `<b>${it.name}</b><br/>渗透率: ${it.value[0]}%<br/>生产力提升: ${it.value[1]}%<br/>投资额: ${it.value[2]} 亿美元`;
      }
    }),
    grid: { left: 60, right: 30, top: 30, bottom: 50 },
    xAxis: {
      type: 'value', name: '渗透率 (%)', min: 20, max: 100,
      nameTextStyle: { color: CHART_THEME.accent, fontSize: 11 },
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    yAxis: {
      type: 'value', name: '生产力提升 (%)', min: 10, max: 70,
      nameTextStyle: { color: '#ec4899', fontSize: 11 },
      axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    series: [{
      type: 'scatter',
      data: d.map(item => ({
        name: item.name,
        value: [item.adoption, item.productivity, item.invest],
        color: item.color
      })),
      symbolSize: val => Math.sqrt(val[2]) * 3.2,
      itemStyle: {
        color: p => p.data.color,
        opacity: 0.7,
        borderColor: '#fff',
        borderWidth: 1.5,
        shadowBlur: 12,
        shadowColor: p => p.data.color
      },
      label: {
        show: true,
        formatter: p => p.data.name,
        color: '#e6ecff', fontSize: 11, fontWeight: 700,
        position: 'top'
      },
      emphasis: { itemStyle: { opacity: 1, shadowBlur: 24 } }
    }]
  });
  chartInstances.bubble = chart;
}

/* ---------- 7. 中美生产力雷达 ---------- */
function renderRadarChart() {
  const chart = echarts.init(document.getElementById('radarChart'));
  const d = DATA.productivityRadar;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {}),
    legend: {
      data: ['中国', '美国'], top: 0, right: 0,
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 }
    },
    radar: {
      indicator: d.indicators,
      center: ['50%', '55%'], radius: '65%',
      axisName: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
      splitArea: { areaStyle: { color: ['rgba(0,217,255,0.04)', 'rgba(124,58,237,0.04)'] } },
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          name: '中国', value: d.china,
          lineStyle: { color: '#ec4899', width: 2.5 },
          areaStyle: { color: 'rgba(236, 72, 153, 0.35)' },
          itemStyle: { color: '#ec4899' },
          symbolSize: 6
        },
        {
          name: '美国', value: d.usa,
          lineStyle: { color: '#00d9ff', width: 2.5 },
          areaStyle: { color: 'rgba(0, 217, 255, 0.30)' },
          itemStyle: { color: '#00d9ff' },
          symbolSize: 6
        }
      ]
    }]
  });
  chartInstances.radar = chart;
}

/* ---------- 8. R&D 投入趋势（堆叠柱状） ---------- */
function renderRdChart() {
  const chart = echarts.init(document.getElementById('rdChart'));
  const d = DATA.rdTrend;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), { trigger: 'axis', valueFormatter: v => v + ' 亿美元' }),
    legend: {
      data: ['私营部门', '公共部门'], top: 0, right: 0,
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 }
    },
    grid: { left: 50, right: 30, top: 50, bottom: 40 },
    xAxis: {
      type: 'category', data: d.years,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value', name: '亿美元',
      nameTextStyle: { color: CHART_THEME.accent, fontSize: 11 },
      axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    series: [
      {
        name: '私营部门', type: 'bar', stack: 'rd',
        data: d.private, barWidth: '40%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00d9ff' },
            { offset: 1, color: '#0e7490' }
          ]),
          borderRadius: [0, 0, 0, 0]
        }
      },
      {
        name: '公共部门', type: 'bar', stack: 'rd',
        data: d.public,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#7c3aed' },
            { offset: 1, color: '#4c1d95' }
          ]),
          borderRadius: [6, 6, 0, 0]
        }
      }
    ]
  });
  chartInstances.rd = chart;
}

/* ---------- 9. 专利 TOP（环形条形） ---------- */
function renderPatentChart() {
  const chart = echarts.init(document.getElementById('patentChart'));
  const data = DATA.patentTop.slice().sort((a, b) => a.value - b.value);

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), { trigger: 'item', formatter: '{b}: {c} 件' }),
    grid: { left: 60, right: 60, top: 20, bottom: 30 },
    xAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    yAxis: {
      type: 'category', data: data.map(d => d.country),
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: data.map(d => ({
        value: d.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: d.color + '88' },
            { offset: 1, color: d.color }
          ]),
          borderRadius: [0, 10, 10, 0]
        }
      })),
      barWidth: 16,
      label: {
        show: true, position: 'right',
        color: CHART_THEME.textBright, fontSize: 11, fontWeight: 700,
        formatter: '{c}'
      },
      animationDelay: i => i * 80
    }]
  });
  chartInstances.patent = chart;
}

/* ---------- 10. 论文 TOP 机构（水平条形） ---------- */
function renderPaperChart() {
  const chart = echarts.init(document.getElementById('paperChart'));
  const data = DATA.paperTop.slice().sort((a, b) => a.value - b.value);

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), { trigger: 'item', formatter: '{b}: {c} 篇' }),
    grid: { left: 100, right: 60, top: 20, bottom: 30 },
    xAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    yAxis: {
      type: 'category', data: data.map(d => d.name),
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: data.map((d, i) => ({
        value: d.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#7c3aed99' },
            { offset: 1, color: '#00d9ff' }
          ]),
          borderRadius: [0, 10, 10, 0]
        }
      })),
      barWidth: 16,
      label: {
        show: true, position: 'right',
        color: CHART_THEME.textBright, fontSize: 11, fontWeight: 700,
        formatter: '{c}'
      },
      animationDelay: i => i * 80
    }]
  });
  chartInstances.paper = chart;
}

/* ---------- 11. 数据/算法/算力贡献堆叠面积 ---------- */
function renderContribChart() {
  const chart = echarts.init(document.getElementById('contribChart'));
  const d = DATA.contribution;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), { trigger: 'axis', valueFormatter: v => v + '%' }),
    legend: {
      data: ['数据', '算法', '算力'], top: 0, right: 0,
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 }
    },
    grid: { left: 50, right: 30, top: 50, bottom: 40 },
    xAxis: {
      type: 'category', boundaryGap: false, data: d.years,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value', max: 100, name: '贡献 %',
      nameTextStyle: { color: CHART_THEME.accent, fontSize: 11 },
      axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    series: [
      {
        name: '数据', type: 'line', stack: 'c', smooth: true,
        data: d.data,
        lineStyle: { width: 0 }, symbol: 'none',
        areaStyle: { color: '#10b981cc' }
      },
      {
        name: '算法', type: 'line', stack: 'c', smooth: true,
        data: d.algorithm,
        lineStyle: { width: 0 }, symbol: 'none',
        areaStyle: { color: '#7c3aedcc' }
      },
      {
        name: '算力', type: 'line', stack: 'c', smooth: true,
        data: d.compute,
        lineStyle: { width: 0 }, symbol: 'none',
        areaStyle: { color: '#00d9ffcc' }
      }
    ]
  });
  chartInstances.contrib = chart;
}

/* ---------- 12. 就业转型（双轴折线+差异面积） ---------- */
function renderJobChart() {
  const chart = echarts.init(document.getElementById('jobChart'));
  const d = DATA.jobTransform;
  const years = d.map(x => x.year);
  const lost = d.map(x => x.lost);
  const gained = d.map(x => x.gained);
  const idxForecast = d.findIndex(x => x.forecast);

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), { trigger: 'axis', valueFormatter: v => v + ' 万人' }),
    legend: {
      data: ['消失岗位', '新增岗位'], top: 0, right: 0,
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 }
    },
    grid: { left: 60, right: 30, top: 50, bottom: 40 },
    xAxis: {
      type: 'category', data: years,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value', name: '万人',
      nameTextStyle: { color: CHART_THEME.accent, fontSize: 11 },
      axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    series: [
      {
        name: '消失岗位', type: 'line', smooth: true,
        data: lost, symbol: 'circle', symbolSize: 8,
        lineStyle: { color: '#ec4899', width: 3, type: 'dashed' },
        itemStyle: { color: '#ec4899' },
        areaStyle: { color: 'rgba(236, 72, 153, 0.15)' }
      },
      {
        name: '新增岗位', type: 'line', smooth: true,
        data: gained, symbol: 'diamond', symbolSize: 9,
        lineStyle: { color: '#00d9ff', width: 3 },
        itemStyle: { color: '#00d9ff', borderColor: '#fff', borderWidth: 1.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 217, 255, 0.5)' },
            { offset: 1, color: 'rgba(0, 217, 255, 0.02)' }
          ])
        },
        markLine: idxForecast >= 0 ? {
          silent: true, symbol: ['none', 'none'],
          lineStyle: { color: '#fbbf24', type: 'dashed', width: 1.5 },
          label: { color: '#fbbf24', formatter: '预测', fontSize: 10 },
          data: [{ xAxis: idxForecast }]
        } : undefined
      }
    ]
  });
  chartInstances.job = chart;
}

/* ---------- 13. 新兴岗位需求（条形） ---------- */
function renderJobDemandChart() {
  const chart = echarts.init(document.getElementById('jobDemandChart'));
  const data = DATA.jobDemand.slice().sort((a, b) => a.growth - b.growth);

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'item', formatter: '{b}: +{c}% 同比'
    }),
    grid: { left: 130, right: 60, top: 20, bottom: 30 },
    xAxis: {
      type: 'value', axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    yAxis: {
      type: 'category', data: data.map(d => d.name),
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: data.map((d, i) => ({
        value: d.growth,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#7c3aed88' },
            { offset: 1, color: '#00d9ff' }
          ]),
          borderRadius: [0, 10, 10, 0]
        }
      })),
      barWidth: 18,
      label: {
        show: true, position: 'right',
        color: CHART_THEME.accent, fontSize: 11, fontWeight: 700,
        formatter: '+{c}%'
      },
      animationDelay: i => i * 80
    }]
  });
  chartInstances.jobDemand = chart;
}

/* ---------- 14. 全球综合国力雷达 ---------- */
function renderGlobalRadar() {
  const chart = echarts.init(document.getElementById('globalRadar'));
  const d = DATA.globalRadar;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {}),
    legend: {
      data: ['美国', '中国', '欧盟'], top: 0, right: 0,
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 }
    },
    radar: {
      indicator: d.indicators,
      center: ['50%', '55%'], radius: '65%',
      axisName: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
      splitArea: { areaStyle: { color: ['rgba(0,217,255,0.03)', 'rgba(124,58,237,0.05)'] } },
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } }
    },
    series: [{
      type: 'radar',
      data: [
        { name: '美国', value: d.usa, lineStyle: { color: '#3b82f6', width: 2.5 }, areaStyle: { color: 'rgba(59, 130, 246, 0.3)' }, itemStyle: { color: '#3b82f6' }, symbolSize: 6 },
        { name: '中国', value: d.china, lineStyle: { color: '#ef4444', width: 2.5 }, areaStyle: { color: 'rgba(239, 68, 68, 0.3)' }, itemStyle: { color: '#ef4444' }, symbolSize: 6 },
        { name: '欧盟', value: d.eu, lineStyle: { color: '#10b981', width: 2.5 }, areaStyle: { color: 'rgba(16, 185, 129, 0.3)' }, itemStyle: { color: '#10b981' }, symbolSize: 6 }
      ]
    }]
  });
  chartInstances.globalRadar = chart;
}

/* ---------- 15. AI 独角兽分布（玫瑰图） ---------- */
function renderUnicornChart() {
  const chart = echarts.init(document.getElementById('unicornChart'));
  const d = DATA.unicorns;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'item', formatter: '{b}: {c} 家 ({d}%)'
    }),
    legend: { orient: 'vertical', left: 10, top: 'center', textStyle: { color: CHART_THEME.textColor, fontSize: 12 } },
    series: [{
      type: 'pie',
      radius: ['35%', '75%'],
      center: ['60%', '50%'],
      roseType: 'radius',
      itemStyle: { borderRadius: 6, borderColor: '#050814', borderWidth: 2 },
      label: { color: CHART_THEME.textBright, fontSize: 12, formatter: '{b}\n{c}家' },
      labelLine: { length: 10, length2: 12, lineStyle: { color: CHART_THEME.textColor } },
      data: d.map((item, i) => ({
        name: item.region,
        value: item.value,
        itemStyle: { color: item.color }
      })),
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: i => i * 100
    }]
  });
  chartInstances.unicorn = chart;
}

/* ---------- 16. 关键技术突破热度雷达 ---------- */
function renderTechRadar() {
  const chart = echarts.init(document.getElementById('techRadar'));
  const d = DATA.techRadar;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {}),
    legend: {
      data: ['2023 年', '2025 年'], top: 0, right: 0,
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 }
    },
    radar: {
      indicator: d.indicators,
      center: ['50%', '55%'], radius: '65%',
      axisName: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
      splitArea: { areaStyle: { color: ['rgba(0,217,255,0.03)', 'rgba(124,58,237,0.05)'] } },
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } }
    },
    series: [{
      type: 'radar',
      data: [
        { name: '2023 年', value: d.progress2023, lineStyle: { color: '#fbbf24', width: 2.5, type: 'dashed' }, areaStyle: { color: 'rgba(251, 191, 36, 0.20)' }, itemStyle: { color: '#fbbf24' }, symbolSize: 6 },
        { name: '2025 年', value: d.progress2025, lineStyle: { color: '#00d9ff', width: 3 }, areaStyle: { color: 'rgba(0, 217, 255, 0.30)' }, itemStyle: { color: '#00d9ff' }, symbolSize: 7 }
      ]
    }]
  });
  chartInstances.techRadar = chart;
}

/* ===================================================================
   专业可视化扩展图表函数
   =================================================================== */

/* ---------- 17. 价值流转 桑基图（技术→应用→价值） ---------- */
/* 使用 graph 圆形布局替代 sankey，确保兼容渲染 */
function renderSankeyChart() {
  var el = document.getElementById('sankeyChart');
  if (!el) return;
  var chart = echarts.init(el);
  var d = DATA.valueFlow;

  // 将桑基数据转为关系图圆形布局
  var nodeColors = ['#00d9ff','#7c3aed','#ec4899','#fbbf24','#10b981','#06b6d4','#a78bfa','#f97316','#3b82f6','#84cc16','#fbbf24','#ec4899','#7c3aed','#10b981'];
  var nodes = d.nodes.map(function(n, i) {
    return {
      name: n.name,
      symbolSize: 35,
      itemStyle: {
        color: n.itemStyle ? n.itemStyle.color : nodeColors[i % nodeColors.length],
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2
      },
      label: { show: true, color: '#fff', fontSize: 11, fontWeight: 600 }
    };
  });

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'item',
      formatter: function (params) {
        if (params.dataType === 'edge') {
          return params.data.source + ' → ' + params.data.target + '<br/>价值强度: <b>' + params.data.value + '</b>';
        }
        return '<b>' + params.name + '</b>';
      }
    }),
    series: [{
      type: 'graph',
      layout: 'circular',
      circular: { rotateLabel: true },
      left: 30, right: 30, top: 30, bottom: 30,
      roam: true,
      focusNodeAdjacency: true,
      data: nodes,
      links: d.links.map(function(l) {
        return {
          source: l.source,
          target: l.target,
          value: l.value,
          lineStyle: {
            width: Math.max(1, l.value / 80),
            curveness: 0.2,
            opacity: 0.4,
            color: 'gradient'
          }
        };
      }),
      label: {
        show: true,
        color: CHART_THEME.textBright,
        fontSize: 11,
        fontWeight: 500
      },
      lineStyle: { color: 'gradient', curveness: 0.3, opacity: 0.4 },
      emphasis: {
        lineStyle: { width: 4, opacity: 1, color: '#00d9ff' },
        focus: 'adjacency'
      },
      animationDuration: 1500,
      animationEasing: 'cubicOut'
    }]
  });
  chartInstances.sankey = chart;
}

/* ---------- 18. 全球AI公司市值 矩形树图 ---------- */
function renderTreemapChart() {
  const chart = echarts.init(document.getElementById('treemapChart'));
  const d = DATA.companyTree;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      formatter: function (params) {
        const v = params.value;
        const total = 175000;
        const pct = ((v / total) * 100).toFixed(1);
        return '<b>' + params.name + '</b><br/>市值: $' + v + ' 亿<br/>占比: ' + pct + '%';
      }
    }),
    series: [{
      type: 'treemap',
      data: d.children.map(function (group) {
        return {
          name: group.name,
          value: group.children.reduce(function (sum, c) { return sum + c.value; }, 0),
          children: group.children.map(function (c) {
            return {
              name: c.name,
              value: c.value,
              itemStyle: { color: c.color, borderColor: '#050814', borderWidth: 2 }
            };
          }),
          itemStyle: {
            borderColor: '#050814',
            borderWidth: 3
          },
          label: {
            color: CHART_THEME.textBright,
            fontSize: 14,
            fontWeight: 700
          },
          upperLabel: {
            show: true,
            height: 26,
            color: '#fff',
            backgroundColor: 'rgba(0, 217, 255, 0.35)',
            fontSize: 13,
            fontWeight: 700
          }
        };
      }),
      leafDepth: 2,
      roam: false,
      nodeClick: 'zoomToNode',
      visualDimension: 'value',
      visualMap: {
        show: false,
        min: 100,
        max: 35000,
        inRange: {
          colorLightness: [0.35, 0.85]
        }
      },
      breadcrumb: {
        show: true,
        top: 5,
        left: 5,
        right: 5,
        height: 22,
        emptyItemWidth: 25,
        itemStyle: {
          color: 'rgba(0, 217, 255, 0.18)',
          borderColor: 'rgba(0, 217, 255, 0.4)',
          borderWidth: 1,
          textStyle: { color: CHART_THEME.textBright, fontSize: 11 }
        }
      },
      label: {
        show: true,
        color: '#fff',
        fontSize: 12,
        fontWeight: 600,
        formatter: '{b}\n${c}'
      },
      upperLabel: { show: true, height: 22 },
      animationDuration: 1200,
      animationEasing: 'cubicOut'
    }]
  });
  chartInstances.treemap = chart;
}

/* ---------- 19. 中美欧算力对比 象形柱图 ---------- */
function renderPictorialChart() {
  const chart = echarts.init(document.getElementById('pictorialChart'));
  const d = DATA.computeCompare;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      valueFormatter: function (v) { return v + ' EFLOPS'; }
    }),
    legend: { show: false },
    grid: { left: 60, right: 40, top: 60, bottom: 40 },
    xAxis: {
      type: 'category',
      data: d.categories,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textBright, fontSize: 13, fontWeight: 600 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'EFLOPS',
      nameTextStyle: { color: CHART_THEME.accent, fontSize: 11 },
      axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    series: [{
      type: 'pictorial',
      symbol: 'roundRect',
      symbolRepeat: true,
      symbolSize: ['70%', 12],
      symbolMargin: 3,
      data: d.values.map(function (v, i) {
        return {
          value: v,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: CHART_THEME.colors[i % CHART_THEME.colors.length] },
              { offset: 1, color: 'rgba(0, 217, 255, 0.3)' }
            ]),
            borderColor: CHART_THEME.colors[i % CHART_THEME.colors.length],
            borderWidth: 1
          }
        };
      }),
      label: {
        show: true,
        position: 'top',
        color: CHART_THEME.textBright,
        fontSize: 13,
        fontWeight: 700,
        formatter: '{c}'
      },
      animationDelay: function (idx) { return idx * 150; },
      animationEasing: 'elasticOut'
    }]
  });
  chartInstances.pictorial = chart;
}

/* ---------- 20. AI生态网络 关系图（力引导） ---------- */
function renderGraphChart() {
  const chart = echarts.init(document.getElementById('graphChart'));
  const d = DATA.ecosystemGraph;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      formatter: function (params) {
        if (params.dataType === 'node') {
          return '<b>' + params.data.name + '</b><br/>影响力指数: ' + params.data.value;
        } else if (params.dataType === 'edge') {
          return params.data.source + ' ↔ ' + params.data.target + '<br/>关联强度: ' + params.data.value;
        }
        return params.name;
      }
    }),
    legend: [{
      data: d.categories.map(function (c) { return c.name; }),
      top: 5, left: 5,
      orient: 'vertical',
      textStyle: { color: CHART_THEME.textColor, fontSize: 11 },
      itemWidth: 12, itemHeight: 12
    }],
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      draggable: true,
      focusNodeAdjacency: true,
      force: {
        repulsion: 220,
        edgeLength: [60, 140],
        gravity: 0.08,
        friction: 0.6,
        layoutAnimation: true
      },
      label: {
        show: true,
        position: 'right',
        color: CHART_THEME.textBright,
        fontSize: 11,
        fontWeight: 600,
        formatter: '{b}'
      },
      edgeLabel: {
        show: false
      },
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: [0, 8],
      lineStyle: {
        color: 'rgba(124, 194, 255, 0.35)',
        width: 1.5,
        curveness: 0.18,
        opacity: 0.7
      },
      emphasis: {
        lineStyle: { width: 3, color: '#00d9ff', opacity: 1 },
        label: { fontSize: 14, fontWeight: 700 }
      },
      categories: d.categories,
      data: d.nodes.map(function (n) {
        return Object.assign({}, n, {
          label: { show: true }
        });
      }),
      links: d.links,
      animationDuration: 1800,
      animationEasing: 'cubicOut'
    }]
  });
  chartInstances.graph = chart;
}

/* ---------- 21. AI子领域研究热度 主题河流图 ---------- */
function renderThemeRiverChart() {
  const chart = echarts.init(document.getElementById('themeRiverChart'));
  const d = DATA.researchStream;

  // 将数据转换为 themeRiver 所需格式：[date, value, name]
  var flatData = [];
  d.series.forEach(function (s) {
    s.data.forEach(function (v, i) {
      flatData.push([d.timeline[i], v, s.name]);
    });
  });

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: 'rgba(0, 217, 255, 0.5)', type: 'dashed' } }
    }),
    legend: {
      data: d.series.map(function (s) { return s.name; }),
      top: 0,
      textStyle: { color: CHART_THEME.textColor, fontSize: 11 },
      itemWidth: 14, itemHeight: 10
    },
    singleAxis: {
      top: 50,
      bottom: 30,
      left: 50,
      right: 40,
      type: 'time',
      boundaryGap: false,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { show: true, lineStyle: { color: CHART_THEME.splitLine } }
    },
    color: ['#00d9ff', '#7c3aed', '#ec4899', '#fbbf24', '#10b981', '#a78bfa', '#06b6d4', '#f97316', '#3b82f6'],
    series: [{
      type: 'themeRiver',
      data: flatData,
      emphasis: {
        itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0, 217, 255, 0.5)' }
      },
      label: {
        show: true,
        color: '#fff',
        fontSize: 11,
        fontWeight: 600
      }
    }]
  });
  chartInstances.themeRiver = chart;
}

/* ---------- 22. 主要国家AI多维度 平行坐标图 ---------- */
function renderParallelChart() {
  const chart = echarts.init(document.getElementById('parallelChart'));
  const d = DATA.parallelData;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {}),
    legend: {
      data: d.countries.map(function (c) { return c.name; }),
      top: 0, left: 'center',
      textStyle: { color: CHART_THEME.textColor, fontSize: 11 },
      itemWidth: 14, itemHeight: 8
    },
    parallelAxis: d.dimensions.map(function (name, i) {
      return {
        dim: i,
        name: name,
        nameTextStyle: { color: CHART_THEME.accent, fontSize: 11, fontWeight: 600 },
        nameLocation: 'end',
        axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
        axisLabel: { color: CHART_THEME.textColor, fontSize: 10 },
        axisTick: { show: false },
        splitLine: { show: true, lineStyle: { color: CHART_THEME.splitLine } }
      };
    }),
    parallel: {
      left: 50, right: 50, top: 50, bottom: 40,
      layout: 'horizontal',
      axisExpandable: true,
      axisExpandCenter: null,
      axisExpandCount: 0,
      axisExpandWidth: 50
    },
    visualMap: {
      show: true,
      min: 0,
      max: 100,
      dimension: 2,
      inRange: {
        color: ['#3b82f6', '#00d9ff', '#10b981', '#fbbf24', '#ef4444']
      },
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      left: 10, bottom: 10,
      itemWidth: 12, itemHeight: 80
    },
    series: [{
      type: 'parallel',
      lineStyle: { width: 2, opacity: 0.7 },
      emphasis: {
        lineStyle: { width: 4, opacity: 1 }
      },
      data: d.countries.map(function (c, i) {
        return {
          name: c.name,
          value: c.data,
          lineStyle: { color: d.colors[i % d.colors.length] },
          itemStyle: { color: d.colors[i % d.colors.length] }
        };
      }),
      animationDuration: 1500,
      animationEasing: 'cubicOut'
    }]
  });
  chartInstances.parallel = chart;
}

/* ---------- 23. AI关键词 词云图 ---------- */
function renderWordCloudChart() {
  var el = document.getElementById('wordCloudChart');
  if (!el) return;
  var chart = echarts.init(el);
  var d = DATA.wordCloud;

  // 尝试使用词云扩展；若不可用则退化为矩形树图
  try {
    chart.setOption({
      backgroundColor: CHART_THEME.bgColor,
      tooltip: Object.assign(tooltipStyle(), {
        formatter: function (p) { return '<b>' + p.name + '</b><br/>热度: ' + p.value; }
      }),
      series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '90%',
        height: '90%',
        sizeRange: [14, 56],
        rotationRange: [-45, 45],
        rotationStep: 15,
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          fontFamily: 'Noto Sans SC, sans-serif',
          fontWeight: 'bold',
          color: function () {
            var palette = ['#00d9ff', '#7c3aed', '#ec4899', '#fbbf24', '#10b981', '#a78bfa', '#06b6d4', '#f97316', '#3b82f6'];
            return palette[Math.floor(Math.random() * palette.length)];
          }
        },
        emphasis: {
          textStyle: {
            shadowBlur: 12,
            shadowColor: 'rgba(0, 217, 255, 0.6)'
          }
        },
        data: d.map(function (w, i) {
          return {
            name: w.name,
            value: w.value,
            textStyle: { color: CHART_THEME.colors[i % CHART_THEME.colors.length] }
          };
        })
      }]
    });
    // 检查是否实际渲染了内容
    var canvas = el.querySelector('canvas');
    if (canvas && canvas.width > 0) {
      chartInstances.wordCloud = chart;
      return;
    }
  } catch (e) {
    // 词云扩展未加载，使用树图退化方案
  }

  // 退化为矩形树图展示关键词热度
  chart = echarts.init(el);
  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      formatter: function (p) { return '<b>' + p.name + '</b><br/>热度指数: ' + p.value; }
    }),
    series: [{
      type: 'treemap',
      left: 5, right: 5, top: 5, bottom: 5,
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      label: {
        show: true,
        color: '#fff',
        fontSize: 13,
        fontWeight: 600,
        formatter: '{b}'
      },
      itemStyle: { borderColor: '#050814', borderWidth: 2, gapWidth: 2 },
      data: d.map(function (w, i) {
        return {
          name: w.name,
          value: w.value,
          itemStyle: { color: CHART_THEME.colors[i % CHART_THEME.colors.length] }
        };
      }),
      animationDuration: 1200,
      animationEasing: 'cubicOut'
    }]
  });
  chartInstances.wordCloud = chart;
}

/* ---------- 24. 各行业生产力提升分布 箱线图 ---------- */
function renderBoxplotChart() {
  const chart = echarts.init(document.getElementById('boxplotChart'));
  const d = DATA.productivityBoxplot;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'item',
      formatter: function (param) {
        if (param.seriesType === 'boxplot') {
          return '<b>' + param.name + '</b><br/>' +
            '最大值: ' + param.value[5] + '%<br/>' +
            '上四分位 (Q3): ' + param.value[4] + '%<br/>' +
            '中位数: ' + param.value[3] + '%<br/>' +
            '下四分位 (Q1): ' + param.value[2] + '%<br/>' +
            '最小值: ' + param.value[1] + '%';
        }
        return '<b>' + param.name + '</b>: ' + param.value + '% (均值)';
      }
    }),
    legend: {
      data: ['分布范围', '行业均值'],
      top: 0, right: 20,
      textStyle: { color: CHART_THEME.textColor, fontSize: 12 }
    },
    grid: { left: 50, right: 50, top: 60, bottom: 40 },
    xAxis: {
      type: 'category',
      data: d.industries,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '生产力提升 (%)',
      nameTextStyle: { color: CHART_THEME.accent, fontSize: 11 },
      axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    series: [
      {
        name: '分布范围',
        type: 'boxplot',
        data: d.boxes,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 217, 255, 0.45)' },
            { offset: 1, color: 'rgba(124, 58, 237, 0.18)' }
          ]),
          borderColor: '#00d9ff',
          borderWidth: 1.5
        },
        emphasis: {
          itemStyle: {
            borderColor: '#ec4899',
            borderWidth: 2.5
          }
        }
      },
      {
        name: '行业均值',
        type: 'line',
        data: d.means,
        smooth: true,
        symbol: 'diamond',
        symbolSize: 11,
        lineStyle: { color: '#fbbf24', width: 2.5, type: 'dashed' },
        itemStyle: { color: '#fbbf24', borderColor: '#fff', borderWidth: 2 },
        label: {
          show: true,
          position: 'top',
          color: '#fbbf24',
          fontSize: 11,
          fontWeight: 700,
          formatter: '{c}%'
        }
      }
    ]
  });
  chartInstances.boxplot = chart;
}

/* ---------- 25. AI模型开发到商用 漏斗图 ---------- */
/* 使用水平条形图 + 渐变色模拟漏斗效果 */
function renderFunnelChart() {
  var el = document.getElementById('funnelChart');
  if (!el) return;
  var chart = echarts.init(el);
  var d = DATA.funnelTransform;

  var stages = d.stages;
  var maxVal = d.max;

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params) {
        var p = params[0];
        var pct = (p.value / maxVal * 100).toFixed(1);
        return '<b>' + p.name + '</b><br/>数量: ' + p.value + '<br/>转化率: ' + pct + '%';
      }
    }),
    grid: { left: 100, right: 60, top: 20, bottom: 30 },
    xAxis: {
      type: 'value',
      max: maxVal,
      axisLine: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'category',
      data: stages.map(function(s) { return s.name; }).reverse(),
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textBright, fontSize: 12, fontWeight: 600 },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      barWidth: '60%',
      data: stages.map(function(s, i) {
        var pct = (s.value / maxVal);
        return {
          value: s.value,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: s.color },
              { offset: 1, color: s.color.replace(')', ', 0.3)').replace('rgb', 'rgba') }
            ]),
            borderRadius: [0, 8, 8, 0],
            borderColor: s.color,
            borderWidth: 1
          },
          label: {
            show: true,
            position: 'right',
            color: CHART_THEME.textBright,
            fontSize: 12,
            fontWeight: 700,
            formatter: function() { return s.value + '  (' + (pct * 100).toFixed(1) + '%)'; }
          }
        };
      }).reverse(),
      animationDuration: 1200,
      animationEasing: 'cubicOut',
      animationDelay: function (idx) { return idx * 100; }
    }]
  });
  chartInstances.funnel = chart;
}

/* ---------- 26. 主要国家AI多指标 小倍图 ---------- */
function renderSmallMultiplesChart() {
  var chart = echarts.init(document.getElementById('smallMultiplesChart'));
  var d = DATA.smallMultiples;

  // 构建多 series，每个国家 × 每个 metric 一条线
  var seriesData = [];
  d.countries.forEach(function (country, ci) {
    var countryData = d.data[country];
    d.metrics.forEach(function (metric, mi) {
      var lineData = countryData.map(function (yearArr) { return yearArr[mi]; });
      seriesData.push({
        name: country + ' - ' + metric,
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: lineData,
        lineStyle: { width: 1.5, opacity: 0.8, color: d.colors ? d.colors[ci] : CHART_THEME.colors[ci] },
        itemStyle: { color: d.colors ? d.colors[ci] : CHART_THEME.colors[ci] },
        endLabel: {
          show: false
        }
      });
    });
  });

  chart.setOption({
    backgroundColor: CHART_THEME.bgColor,
    tooltip: Object.assign(tooltipStyle(), {
      trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: 'rgba(0, 217, 255, 0.5)', type: 'dashed' } }
    }),
    legend: {
      data: d.countries.map(function (c, i) { return c; }),
      top: 0, left: 'center',
      textStyle: { color: CHART_THEME.textColor, fontSize: 11 },
      itemWidth: 14, itemHeight: 8
    },
    grid: { left: 50, right: 30, top: 50, bottom: 40 },
    xAxis: {
      type: 'category',
      data: d.timeline,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 11 },
      axisTick: { show: false },
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      min: 0, max: 100,
      axisLine: { show: true, lineStyle: { color: CHART_THEME.axisLine } },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 10 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } }
    },
    dataZoom: [
      { type: 'inside', start: 0, end: 100 },
      { type: 'slider', start: 0, end: 100, height: 18, bottom: 8, borderColor: 'rgba(0, 217, 255, 0.3)', fillerColor: 'rgba(0, 217, 255, 0.15)', textStyle: { color: CHART_THEME.textColor, fontSize: 10 } }
    ],
    series: seriesData
  });
  chartInstances.smallMultiples = chart;
}

/* ---------- 联动 resize ---------- */
function resizeAllCharts() {
  Object.values(chartInstances).forEach(c => c && c.resize());
}
