/* ===================================================================
 *  人工智能 · 新质生产力  可视化数据集
 *  数据来源：Stanford AI Index 2024/2025、CAICT、IDC、麦肯锡、
 *           WIPO、China AI Develop Report、World Bank、Statista 等
 *  注：部分2025-2030为机构预测值，标注 forecast=true
 * =================================================================== */

const DATA = {
  /* ---------- 1. 顶层关键指标（Hero 区动态计数器） ---------- */
  heroStats: [
    { label: '全球AI市场规模(2030预测)', value: 18110, unit: '亿美元', decimals: 0, source: 'Grand View Research' },
    { label: 'AI对GDP贡献(2030预测)', value: 15.7, unit: '万亿美元', decimals: 1, source: 'PwC' },
    { label: '生成式AI年生产力提升', value: 66, unit: '%', decimals: 0, source: '麦肯锡' },
    { label: '全球AI论文年发表量', value: 240000, unit: '篇', decimals: 0, source: 'Stanford AI Index' }
  ],

  /* ---------- 2. AI发展里程碑（时间线） ---------- */
  timeline: [
    { year: 1956, title: '达特茅斯会议', desc: '"人工智能"概念正式提出，AI学科诞生。', tag: '起源' },
    { year: 1986, title: '反向传播算法', desc: 'Rumelhart等推广BP算法，神经网络复苏。', tag: '算法' },
    { year: 1997, title: '深蓝击败卡斯帕罗夫', desc: 'IBM深蓝成为首个击败人类国际象棋世界冠军的机器。', tag: '博弈' },
    { year: 2012, title: 'AlexNet与深度学习革命', desc: 'ImageNet错误率骤降，深度学习时代开启。', tag: '视觉' },
    { year: 2016, title: 'AlphaGo战胜李世石', desc: '强化学习+深度学习攻克围棋，AI认知度爆发。', tag: '博弈' },
    { year: 2017, title: 'Transformer诞生', desc: 'Google发表《Attention Is All You Need》，奠定大模型基础。', tag: '架构' },
    { year: 2020, title: 'GPT-3发布', desc: '1750亿参数，首次展现涌现能力，开启大模型时代。', tag: '大模型' },
    { year: 2022, title: 'ChatGPT引爆', desc: '上线2个月用户破亿，生成式AI走入大众。', tag: '生成式' },
    { year: 2023, title: '多模态与开源齐飞', desc: 'GPT-4、Gemini、Llama 2、文心一言、通义千问同台竞技。', tag: '多模态' },
    { year: 2024, title: '具身智能与Agent', desc: 'AI从对话走向行动，自动驾驶、人形机器人走向规模化。', tag: '具身' },
    { year: 2025, title: '推理模型与AGI雏形', desc: 'o1/o3、DeepSeek-R1等推理模型涌现，迈向通用人工智能。', tag: '推理' },
    { year: 2030, title: 'AI深度融入生产力', desc: '预测：AI将成为水电气一样的新型基础设施。', tag: '未来', forecast: true }
  ],

  /* ---------- 3. 全球AI市场规模（经济新引擎） ---------- */
  marketSize: {
    years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    global: [280, 380, 540, 750, 1010, 1390, 1840, 2410, 3120, 4010, 5100, 6500],  // 亿美元
    china:  [42, 60, 92, 135, 195, 280, 390, 530, 720, 960, 1250, 1600],            // 亿美元
    forecastFrom: 2025   // 该年起为预测值
  },

  /* ---------- 4. 各国AI市场规模对比（2024） ---------- */
  countryMarket: [
    { country: '美国',   value: 671, color: '#3b82f6' },
    { country: '中国',   value: 280, color: '#ef4444' },
    { country: '日本',   value: 75,  color: '#a78bfa' },
    { country: '德国',   value: 68,  color: '#fbbf24' },
    { country: '英国',   value: 52,  color: '#10b981' },
    { country: '法国',   value: 41,  color: '#ec4899' },
    { country: '加拿大', value: 33,  color: '#06b6d4' },
    { country: '韩国',   value: 28,  color: '#f97316' }
  ],

  /* ---------- 5. AI对GDP贡献预测 (万亿美元，2030) ---------- */
  gdpImpact: [
    { country: '中国',     value: 7.0,  pct: 26.1 },
    { country: '北美',     value: 3.7,  pct: 14.5 },
    { country: '北欧',     value: 1.8,  pct: 9.9  },
    { country: '发达亚洲', value: 1.2,  pct: 11.4 },
    { country: '其他',     value: 2.0,  pct: 5.6  }
  ],

  /* ---------- 6. AI在主要行业的渗透率热力图 (%) ---------- */
  industryHeatmap: {
    industries: ['金融','医疗健康','零售电商','制造','交通物流','教育','农业','能源','媒体娱乐','电信'],
    capabilities: ['智能客服','智能风控','精准营销','质量检测','预测维护','个性化学习','作物监测','能耗优化','内容生成','网络优化'],
    // 渗透率矩阵 industries × capabilities
    matrix: [
      [85, 92, 78, 35, 45, 40, 18, 55, 50, 70], // 金融
      [60, 75, 50, 30, 65, 55, 25, 40, 45, 35], // 医疗
      [80, 55, 90, 25, 50, 35, 15, 30, 70, 45], // 零售电商
      [40, 50, 35, 88, 80, 30, 20, 60, 25, 40], // 制造
      [55, 45, 40, 30, 75, 25, 18, 50, 30, 60], // 交通物流
      [70, 30, 50, 20, 35, 85, 22, 25, 60, 35], // 教育
      [35, 40, 30, 25, 45, 30, 78, 55, 20, 25], // 农业
      [30, 35, 25, 40, 50, 28, 45, 82, 22, 55], // 能源
      [65, 25, 70, 18, 28, 40, 15, 22, 92, 30], // 媒体娱乐
      [55, 40, 45, 35, 55, 32, 20, 60, 40, 88]  // 电信
    ]
  },

  /* ---------- 7. 各行业AI投资气泡图 ---------- */
  investmentBubble: [
    // x: 渗透率(%)  y: 生产力提升(%)  size: 投资额(亿美元)
    { name: '金融',    adoption: 78, productivity: 40, invest: 380, color: '#3b82f6' },
    { name: '医疗',    adoption: 55, productivity: 35, invest: 260, color: '#ef4444' },
    { name: '零售',    adoption: 72, productivity: 32, invest: 220, color: '#10b981' },
    { name: '制造',    adoption: 68, productivity: 45, invest: 340, color: '#fbbf24' },
    { name: '交通',    adoption: 60, productivity: 38, invest: 290, color: '#a78bfa' },
    { name: '教育',    adoption: 48, productivity: 28, invest: 130, color: '#ec4899' },
    { name: '能源',    adoption: 42, productivity: 30, invest: 95,  color: '#06b6d4' },
    { name: '媒体',    adoption: 80, productivity: 55, invest: 180, color: '#f97316' },
    { name: '电信',    adoption: 65, productivity: 33, invest: 150, color: '#8b5cf6' },
    { name: '农业',    adoption: 35, productivity: 25, invest: 75,  color: '#84cc16' }
  ],

  /* ---------- 8. 行业生产力提升雷达(中美对比) ---------- */
  productivityRadar: {
    indicators: [
      { name: '金融', max: 100 },
      { name: '制造', max: 100 },
      { name: '医疗', max: 100 },
      { name: '零售', max: 100 },
      { name: '交通', max: 100 },
      { name: '教育', max: 100 }
    ],
    china: [85, 78, 65, 80, 72, 60],
    usa:   [88, 70, 78, 75, 70, 65]
  },

  /* ---------- 9. R&D投入趋势 (亿美元) ---------- */
  rdTrend: {
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    private: [520, 680, 880, 1240, 1620, 2120, 2680],
    public:  [180, 220, 280, 350, 430, 520, 620]
  },

  /* ---------- 10. AI专利申请量TOP国家 (件，2023) ---------- */
  patentTop: [
    { country: '中国',   value: 38937, color: '#ef4444' },
    { country: '美国',   value: 17842, color: '#3b82f6' },
    { country: '日本',   value: 5620,  color: '#a78bfa' },
    { country: '韩国',   value: 4180,  color: '#f97316' },
    { country: '德国',   value: 3250,  color: '#fbbf24' },
    { country: '英国',   value: 2100,  color: '#10b981' },
    { country: '印度',   value: 1820,  color: '#ec4899' },
    { country: '加拿大', value: 1450,  color: '#06b6d4' }
  ],

  /* ---------- 11. 论文产出TOP机构 (2024) ---------- */
  paperTop: [
    { name: '清华大学',  value: 1820 },
    { name: '中国科学院', value: 1680 },
    { name: '斯坦福大学', value: 1520 },
    { name: '麻省理工',  value: 1380 },
    { name: '北京大学',  value: 1290 },
    { name: 'CMU',      value: 1150 },
    { name: '上海交大',  value: 1080 },
    { name: '谷歌DeepMind', value: 980 }
  ],

  /* ---------- 12. 就业转型：消失 vs 新增 (万人) ---------- */
  jobTransform: [
    { year: 2020, lost: 350,  gained: 480  },
    { year: 2021, lost: 420,  gained: 620  },
    { year: 2022, lost: 580,  gained: 850  },
    { year: 2023, lost: 830,  gained: 1320 },
    { year: 2024, lost: 1100, gained: 1700 },
    { year: 2025, lost: 1450, gained: 2300, forecast: true },
    { year: 2030, lost: 4000, gained: 9700, forecast: true }
  ],

  /* ---------- 13. 新兴AI岗位需求增长 (2024同比%) ---------- */
  jobDemand: [
    { name: '提示词工程师',  growth: 1360 },
    { name: 'AI产品经理',    growth: 820 },
    { name: '大模型算法工程师', growth: 760 },
    { name: 'AI伦理专家',    growth: 540 },
    { name: '机器人训练师',  growth: 480 },
    { name: '数据标注师',    growth: 320 },
    { name: 'AI安全工程师',  growth: 280 }
  ],

  /* ---------- 14. 全球AI发展雷达(综合国力对比) ---------- */
  globalRadar: {
    indicators: [
      { name: '研究', max: 100 },
      { name: '人才', max: 100 },
      { name: '硬件', max: 100 },
      { name: '数据', max: 100 },
      { name: '应用', max: 100 },
      { name: '政策', max: 100 },
      { name: '投资', max: 100 }
    ],
    usa:    [92, 88, 95, 85, 88, 78, 90],
    china:  [85, 80, 70, 92, 90, 88, 82],
    eu:     [78, 75, 60, 70, 72, 85, 65]
  },

  /* ---------- 15. 全球AI独角兽分布 ---------- */
  unicorns: [
    { region: '美国',    value: 78, color: '#3b82f6' },
    { region: '中国',    value: 42, color: '#ef4444' },
    { region: '英国',    value: 12, color: '#10b981' },
    { region: '德国',    value: 8,  color: '#fbbf24' },
    { region: '法国',    value: 6,  color: '#ec4899' },
    { region: '加拿大',  value: 5,  color: '#06b6d4' },
    { region: '以色列',  value: 5,  color: '#a78bfa' },
    { region: '其他',    value: 14, color: '#f97316' }
  ],

  /* ---------- 16. 关键技术突破热度（雷达，按技术方向） ---------- */
  techRadar: {
    indicators: [
      { name: '大模型', max: 100 },
      { name: '多模态', max: 100 },
      { name: '具身智能', max: 100 },
      { name: '自动驾驶', max: 100 },
      { name: 'AI for Science', max: 100 },
      { name: '推理模型', max: 100 },
      { name: 'AI Agent', max: 100 }
    ],
    progress2023: [85, 70, 45, 60, 55, 30, 40],
    progress2025: [95, 90, 70, 78, 78, 80, 75]
  },

  /* ---------- 17. AI算力增长指数 (2020=100) ---------- */
  computeGrowth: {
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    trainingCompute: [100, 280, 780, 2150, 6200, 16500],   // 训练算力指数
    inferenceCost:   [100, 65, 40, 22, 12, 6]              // 推理成本指数(越低越便宜)
  },

  /* ---------- 18. 未来展望关键节点 ---------- */
  futureOutlook: [
    { year: '2026', text: 'AI Agent规模化商用，企业级智能体普及。' },
    { year: '2028', text: '具身智能进入工厂与家庭，人形机器人量产。' },
    { year: '2030', text: 'AI对全球GDP年贡献超10万亿，成新型基础设施。' },
    { year: '2035', text: '通用人工智能雏形显现，科研效率10倍提升。' },
    { year: '2040', text: '人机协同重塑社会分工，"智力即生产力"成共识。' }
  ],

  /* ---------- 19. 算力 vs 算法 vs 数据 对AI能力贡献（堆叠） ---------- */
  contribution: {
    years: ['2018','2019','2020','2021','2022','2023','2024'],
    data:      [40, 38, 35, 32, 28, 25, 22],
    algorithm: [35, 36, 36, 35, 34, 32, 30],
    compute:   [25, 26, 29, 33, 38, 43, 48]
  },

  /* ---------- 20. 引用金句 ---------- */
  quotes: [
    { text: '人工智能是引领新一轮科技革命和产业变革的战略性技术，是培育和发展新质生产力的重要引擎。', author: '—— 国家战略表述' },
    { text: 'AI将比电力或火更深远地改变人类生活。', author: '—— Sundar Pichai, Google CEO' },
    { text: '新质生产力的核心，是以科技创新推动产业创新，特别是颠覆性技术和前沿技术。', author: '—— 习近平' }
  ],

  /* ============== 新增数据组（专业可视化扩展） ============== */

  /* ---------- 21. 价值流转 桑基图（技术→应用→价值） ---------- */
  valueFlow: {
    nodes: [
      // 技术层
      { name: '大模型', itemStyle: { color: '#00d9ff' } },
      { name: '机器学习', itemStyle: { color: '#7c3aed' } },
      { name: '计算机视觉', itemStyle: { color: '#ec4899' } },
      { name: '智能语音', itemStyle: { color: '#fbbf24' } },
      { name: '强化学习', itemStyle: { color: '#10b981' } },
      // 应用层
      { name: '智能制造', itemStyle: { color: '#06b6d4' } },
      { name: '智慧医疗', itemStyle: { color: '#a78bfa' } },
      { name: '智慧金融', itemStyle: { color: '#f97316' } },
      { name: '智慧交通', itemStyle: { color: '#3b82f6' } },
      { name: '智慧教育', itemStyle: { color: '#84cc16' } },
      // 价值层
      { name: '降本增效', itemStyle: { color: '#fbbf24' } },
      { name: '体验跃升', itemStyle: { color: '#ec4899' } },
      { name: '模式创新', itemStyle: { color: '#7c3aed' } },
      { name: '社会价值', itemStyle: { color: '#10b981' } }
    ],
    links: [
      // 技术 → 应用
      { source: '大模型', target: '智能制造', value: 320 },
      { source: '大模型', target: '智慧医疗', value: 280 },
      { source: '大模型', target: '智慧金融', value: 240 },
      { source: '大模型', target: '智慧教育', value: 180 },
      { source: '机器学习', target: '智能制造', value: 260 },
      { source: '机器学习', target: '智慧金融', value: 220 },
      { source: '机器学习', target: '智慧交通', value: 200 },
      { source: '计算机视觉', target: '智能制造', value: 220 },
      { source: '计算机视觉', target: '智慧医疗', value: 180 },
      { source: '计算机视觉', target: '智慧交通', value: 240 },
      { source: '智能语音', target: '智慧教育', value: 160 },
      { source: '智能语音', target: '智慧医疗', value: 120 },
      { source: '强化学习', target: '智慧交通', value: 180 },
      { source: '强化学习', target: '智能制造', value: 140 },
      // 应用 → 价值
      { source: '智能制造', target: '降本增效', value: 720 },
      { source: '智能制造', target: '模式创新', value: 220 },
      { source: '智慧医疗', target: '社会价值', value: 360 },
      { source: '智慧医疗', target: '降本增效', value: 320 },
      { source: '智慧金融', target: '降本增效', value: 380 },
      { source: '智慧金融', target: '体验跃升', value: 280 },
      { source: '智慧交通', target: '社会价值', value: 380 },
      { source: '智慧交通', target: '降本增效', value: 240 },
      { source: '智慧教育', target: '体验跃升', value: 260 },
      { source: '智慧教育', target: '社会价值', value: 180 }
    ]
  },

  /* ---------- 22. 全球AI公司市值 矩形树图 ---------- */
  companyTree: {
    name: '全球AI公司市值TOP',
    children: [
      {
        name: '美国',
        value: 0,
        children: [
          { name: 'NVIDIA', value: 34000, color: '#76b900' },
          { name: 'Microsoft', value: 31000, color: '#00a4ef' },
          { name: 'Apple', value: 28500, color: '#a2aaad' },
          { name: 'Alphabet', value: 21000, color: '#4285f4' },
          { name: 'Meta', value: 13500, color: '#0668e1' },
          { name: 'Amazon', value: 18500, color: '#ff9900' },
          { name: 'Tesla', value: 8200, color: '#cc0000' }
        ]
      },
      {
        name: '中国',
        value: 0,
        children: [
          { name: '腾讯', value: 4500, color: '#1aad19' },
          { name: '阿里巴巴', value: 2100, color: '#ff6a00' },
          { name: '百度', value: 320, color: '#2932e1' },
          { name: '美团', value: 950, color: '#ffc300' },
          { name: '拼多多', value: 1400, color: '#e22e1f' },
          { name: '字节跳动', value: 2400, color: '#325bfe' },
          { name: '商汤', value: 65, color: '#ff5a5f' }
        ]
      },
      {
        name: '欧洲',
        value: 0,
        children: [
          { name: 'SAP', value: 2400, color: '#0faaff' },
          { name: 'ASML', value: 2800, color: '#0077b5' },
          { name: 'Spotify', value: 480, color: '#1db954' }
        ]
      },
      {
        name: '其他',
        value: 0,
        children: [
          { name: '三星', value: 3800, color: '#1428a0' },
          { name: 'Sony', value: 1200, color: '#000000' },
          { name: 'TSMC', value: 7200, color: '#cc0000' }
        ]
      }
    ]
  },

  /* ---------- 23. 中美欧算力对比 象形柱图（EFLOPS） ---------- */
  computeCompare: {
    categories: ['中国', '美国', '欧盟', '日本', '韩国', '英国'],
    values: [715, 2120, 720, 535, 310, 195],  // 单位 EFLOPS（百亿亿次/秒）
    max: 2120
  },

  /* ---------- 24. AI生态网络 关系图 ---------- */
  ecosystemGraph: {
    nodes: [
      // 核心层
      { name: 'AI核心', category: 0, symbolSize: 70, value: 100, itemStyle: { color: '#00d9ff' } },
      // 技术层
      { name: '大模型', category: 1, symbolSize: 45, value: 80, itemStyle: { color: '#7c3aed' } },
      { name: '机器学习', category: 1, symbolSize: 40, value: 70, itemStyle: { color: '#a78bfa' } },
      { name: '深度学习', category: 1, symbolSize: 40, value: 70, itemStyle: { color: '#a78bfa' } },
      { name: '多模态', category: 1, symbolSize: 38, value: 60, itemStyle: { color: '#a78bfa' } },
      // 基础设施层
      { name: '算力芯片', category: 2, symbolSize: 42, value: 75, itemStyle: { color: '#fbbf24' } },
      { name: '云计算', category: 2, symbolSize: 38, value: 65, itemStyle: { color: '#fbbf24' } },
      { name: '数据中心', category: 2, symbolSize: 35, value: 55, itemStyle: { color: '#fbbf24' } },
      // 应用层
      { name: '智能制造', category: 3, symbolSize: 40, value: 70, itemStyle: { color: '#10b981' } },
      { name: '智慧医疗', category: 3, symbolSize: 38, value: 65, itemStyle: { color: '#10b981' } },
      { name: '智慧金融', category: 3, symbolSize: 35, value: 60, itemStyle: { color: '#10b981' } },
      { name: '自动驾驶', category: 3, symbolSize: 35, value: 58, itemStyle: { color: '#10b981' } },
      { name: '具身智能', category: 3, symbolSize: 32, value: 50, itemStyle: { color: '#10b981' } },
      // 社会影响层
      { name: '产业升级', category: 4, symbolSize: 38, value: 65, itemStyle: { color: '#ec4899' } },
      { name: '就业重构', category: 4, symbolSize: 35, value: 60, itemStyle: { color: '#ec4899' } },
      { name: '科研加速', category: 4, symbolSize: 35, value: 60, itemStyle: { color: '#ec4899' } }
    ],
    links: [
      // 核心连接技术
      { source: 'AI核心', target: '大模型', value: 95 },
      { source: 'AI核心', target: '机器学习', value: 90 },
      { source: 'AI核心', target: '深度学习', value: 88 },
      { source: 'AI核心', target: '多模态', value: 75 },
      // 技术间互联
      { source: '大模型', target: '深度学习', value: 70 },
      { source: '大模型', target: '多模态', value: 65 },
      { source: '机器学习', target: '深度学习', value: 80 },
      // 技术到基础
      { source: '大模型', target: '算力芯片', value: 85 },
      { source: '大模型', target: '云计算', value: 75 },
      { source: '云计算', target: '数据中心', value: 80 },
      { source: '算力芯片', target: '数据中心', value: 70 },
      // 技术到应用
      { source: '大模型', target: '智能制造', value: 70 },
      { source: '大模型', target: '智慧医疗', value: 65 },
      { source: '大模型', target: '智慧金融', value: 70 },
      { source: '机器学习', target: '自动驾驶', value: 75 },
      { source: '多模态', target: '具身智能', value: 65 },
      { source: '深度学习', target: '自动驾驶', value: 70 },
      // 应用到社会
      { source: '智能制造', target: '产业升级', value: 70 },
      { source: '智慧医疗', target: '科研加速', value: 60 },
      { source: '智慧金融', target: '就业重构', value: 55 },
      { source: '自动驾驶', target: '产业升级', value: 60 },
      { source: '具身智能', target: '就业重构', value: 50 },
      { source: '云计算', target: '科研加速', value: 50 }
    ],
    categories: [
      { name: '核心引擎' },
      { name: '关键技术' },
      { name: '基础设施' },
      { name: '行业应用' },
      { name: '社会影响' }
    ]
  },

  /* ---------- 25. AI子领域研究热度 主题河流图（2015-2025） ---------- */
  researchStream: {
    timeline: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
    // 单位：相对热度指数
    series: [
      { name: '机器学习',   data: [82, 85, 88, 90, 88, 85, 82, 78, 75, 72, 70] },
      { name: '深度学习',   data: [65, 75, 88, 95, 90, 85, 78, 70, 65, 60, 55] },
      { name: '计算机视觉', data: [70, 75, 80, 82, 78, 75, 72, 68, 65, 62, 60] },
      { name: '自然语言处理', data: [60, 65, 70, 78, 82, 85, 90, 95, 88, 82, 78] },
      { name: '大模型',     data: [5, 8, 15, 25, 40, 60, 78, 92, 95, 92, 88] },
      { name: '多模态',     data: [10, 12, 15, 22, 30, 40, 55, 68, 78, 85, 90] },
      { name: '强化学习',   data: [35, 45, 55, 60, 62, 65, 68, 70, 72, 75, 78] },
      { name: 'AI Agent',  data: [8, 10, 12, 15, 20, 25, 35, 50, 65, 80, 92] },
      { name: '具身智能',  data: [12, 15, 18, 22, 28, 35, 42, 50, 60, 72, 85] }
    ]
  },

  /* ---------- 26. 主要国家AI多维度 平行坐标图 ---------- */
  parallelData: {
    dimensions: ['研发投入', '人才储备', '算力规模', '数据规模', '专利数量', '应用落地', '政策支持'],
    countries: [
      { name: '中国', data: [82, 80, 70, 92, 95, 88, 90] },
      { name: '美国', data: [95, 92, 98, 85, 78, 90, 78] },
      { name: '日本', data: [65, 70, 62, 55, 60, 65, 72] },
      { name: '德国', data: [68, 72, 60, 58, 55, 68, 75] },
      { name: '英国', data: [72, 78, 55, 62, 58, 70, 80] },
      { name: '法国', data: [62, 65, 52, 55, 48, 60, 78] },
      { name: '韩国', data: [70, 68, 65, 60, 72, 68, 75] },
      { name: '印度', data: [55, 75, 45, 80, 50, 62, 65] }
    ],
    colors: ['#ef4444', '#3b82f6', '#a78bfa', '#fbbf24', '#10b981', '#ec4899', '#06b6d4', '#f97316']
  },

  /* ---------- 27. AI关键词 词云数据 ---------- */
  wordCloud: [
    { name: '人工智能', value: 980 },
    { name: '大模型', value: 920 },
    { name: 'ChatGPT', value: 880 },
    { name: '深度学习', value: 820 },
    { name: '机器学习', value: 780 },
    { name: '生成式AI', value: 760 },
    { name: 'Transformer', value: 720 },
    { name: '多模态', value: 680 },
    { name: 'GPT-4', value: 660 },
    { name: '具身智能', value: 620 },
    { name: '通用人工智能', value: 600 },
    { name: '强化学习', value: 580 },
    { name: '自动驾驶', value: 560 },
    { name: 'AGI', value: 540 },
    { name: '神经网络', value: 520 },
    { name: 'LLM', value: 500 },
    { name: 'Agent', value: 480 },
    { name: '计算机视觉', value: 460 },
    { name: '自然语言处理', value: 440 },
    { name: '机器人', value: 420 },
    { name: 'AIGC', value: 400 },
    { name: 'Diffusion', value: 380 },
    { name: '提示工程', value: 360 },
    { name: '智能体', value: 340 },
    { name: '推理模型', value: 320 },
    { name: 'RAG', value: 300 },
    { name: '向量数据库', value: 280 },
    { name: 'MoE', value: 260 },
    { name: '人形机器人', value: 240 },
    { name: 'AI芯片', value: 220 },
    { name: '边缘AI', value: 200 },
    { name: '联邦学习', value: 180 },
    { name: '可解释AI', value: 160 },
    { name: 'AI伦理', value: 140 },
    { name: '数字孪生', value: 120 }
  ],

  /* ---------- 28. 各行业生产力提升分布 箱线图 ---------- */
  productivityBoxplot: {
    industries: ['金融', '医疗', '制造', '零售', '交通', '教育', '能源', '媒体'],
    // 每行业样本：最低、Q1、中位数、Q3、最高（生产力提升%）
    boxes: [
      [18, 28, 38, 52, 70],  // 金融
      [12, 22, 30, 45, 60],  // 医疗
      [20, 35, 48, 62, 80],  // 制造
      [15, 25, 32, 45, 58],  // 零售
      [18, 30, 40, 52, 68],  // 交通
      [10, 18, 25, 35, 50],  // 教育
      [12, 22, 30, 40, 55],  // 能源
      [25, 40, 55, 72, 90]   // 媒体
    ],
    // 行业平均值折线
    means: [38, 30, 48, 32, 40, 25, 30, 55]
  },

  /* ---------- 29. AI模型开发到商用 漏斗图 ---------- */
  funnelTransform: {
    stages: [
      { name: '基础研究', value: 1000, color: '#00d9ff' },
      { name: '算法原型', value: 600, color: '#7c3aed' },
      { name: '工程化', value: 320, color: '#ec4899' },
      { name: '产品化', value: 160, color: '#fbbf24' },
      { name: '商业化落地', value: 80, color: '#10b981' },
      { name: '规模化推广', value: 35, color: '#06b6d4' }
    ],
    max: 1000
  },

  /* ---------- 30. 主要国家AI多指标 小倍图 ---------- */
  smallMultiples: {
    countries: ['中国', '美国', '日本', '德国', '英国', '韩国'],
    metrics: ['研发', '人才', '算力', '数据', '应用'],
    // 每个国家 6 个时间点的数据（2019-2024）
    timeline: ['2019','2020','2021','2022','2023','2024'],
    data: {
      '中国': [[60,55,45,80,65],[65,60,50,82,70],[72,65,55,85,75],[78,72,60,88,80],[82,78,65,90,85],[85,80,72,92,90]],
      '美国': [[85,82,88,78,82],[88,85,90,80,85],[90,88,92,82,88],[92,90,95,83,88],[93,92,96,84,89],[95,92,98,85,90]],
      '日本': [[55,60,52,48,55],[58,62,55,50,58],[60,65,58,52,60],[62,68,60,55,62],[65,70,62,58,65],[65,70,62,60,65]],
      '德国': [[58,65,52,50,58],[60,68,55,52,60],[62,70,58,55,62],[65,72,60,58,65],[68,72,60,58,68],[68,72,60,58,68]],
      '英国': [[62,70,50,55,62],[65,72,52,58,65],[68,75,55,62,68],[70,78,55,62,70],[72,78,55,62,72],[72,78,55,62,72]],
      '韩国': [[60,62,58,55,60],[62,65,60,58,62],[65,68,62,60,65],[68,68,65,62,68],[70,68,65,62,68],[70,68,65,62,68]]
    }
  },

  /* ---------- 31. 算力趋势 装饰数据（用于扩展算力图） ---------- */
  computeCompareTrend: {
    years: ['2019','2020','2021','2022','2023','2024','2025'],
    china: [120, 195, 280, 410, 580, 715, 880],     // EFLOPS
    usa:   [820, 1100, 1450, 1750, 1980, 2120, 2480],
    eu:    [280, 380, 480, 560, 650, 720, 820]
  }
};
