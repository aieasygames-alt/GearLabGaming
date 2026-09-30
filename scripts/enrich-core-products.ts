/**
 * Adds buying-path content, Chinese product localization, structured specs,
 * and initial price observations for the six core product reviews.
 *
 * Usage (remote D1): npx tsx scripts/enrich-core-products.ts
 * Usage (local D1):  npx tsx scripts/enrich-core-products.ts --local
 */
import { execFileSync } from 'node:child_process'

const local = process.argv.includes('--local')
const now = Math.floor(Date.now() / 1000)
const collections = {
  products: 'col-products-ce613aa5',
  articles: 'col-articles-f7a0326f',
  priceHistory: 'col-price-history-f9569b20b0f778402303b087040bf76b'
}

const esc = (value: string) => value.replaceAll("'", "''")
const json = (value: unknown) => esc(JSON.stringify(value))

type ProductEnrichment = {
  slug: string
  specs: Record<string, string>
  faq: Array<{ question: string; answer: string }>
  zh: Record<string, unknown>
}

const productEnrichments: ProductEnrichment[] = [
  {
    slug: 'logitech-g-pro-x-superlight-2-review',
    specs: { formFactor: 'Medium symmetrical mouse', sensor: 'HERO 2 optical sensor', batteryLife: 'Up to 95 hours', ports: 'USB-C charging; 2.4 GHz LIGHTSPEED receiver' },
    faq: [
      { question: 'Is the SUPERLIGHT 2 suitable for larger hands?', answer: 'Many larger-hand players can use it with claw or fingertip grip, but its moderate hump offers less palm support than an ergonomic mouse. Shape comparison is still worthwhile before buying.' },
      { question: 'Can left-handed players use the SUPERLIGHT 2?', answer: 'The shell is symmetrical, but the side buttons are on the left. It can be used in the left hand, although it does not provide thumb buttons for left-handed use.' },
      { question: 'Is it worth upgrading from the original SUPERLIGHT?', answer: 'The upgrade is most meaningful if you want USB-C charging, newer sensor support, or are replacing an aging unit. The overall shape and core use case remain very similar.' }
    ],
    zh: {
      name: '罗技 G PRO X SUPERLIGHT 2',
      verdict: 'G PRO X SUPERLIGHT 2 适合想要轻量、中等尺寸对称鼠标与稳定无线性能的竞技玩家。它的外形较为稳妥，但是否舒适仍取决于手型和握法。',
      pros: ['60 克轻量机身，移动负担小', 'HERO 2 传感器与 LIGHTSPEED 无线连接稳定', 'USB-C 充电和长续航更适合日常使用'],
      cons: ['定价较高', '外形保守，不一定适合追求明显支撑的用户', '左侧按键不适合左手拇指操作'],
      reviewContent: '<h2>适合谁</h2><p>G PRO X SUPERLIGHT 2 面向重视轻量化、稳定无线连接和中性外形的竞技玩家。它不是为某一种握法量身定制，而是为抓握和指握的混合用户提供容易上手的基础。</p><h2>外形与重量</h2><p>约 60 克的重量让快速启停更轻松。中等尺寸的对称外壳适合多数抓握和指握用户；需要高背部支撑或小尺寸外壳的玩家，应优先比较其他形状。</p><h2>结论</h2><p>如果这款中性外形适合你的手，它是一款成熟、可靠的高端 FPS 鼠标。先确认形状，再比较轮询率等参数，通常更能改善长期使用体验。</p>'
    }
  },
  {
    slug: 'pulsar-x2v2-mini-review',
    specs: { formFactor: 'Compact symmetrical mouse', sensor: 'PixArt PAW3395 optical sensor', batteryLife: 'Up to 100 hours', ports: 'USB-C charging; 2.4 GHz receiver' },
    faq: [
      { question: 'What grip is the X2V2 Mini best for?', answer: 'It is strongest for small-hand claw and fingertip grip. Its short shell gives fingers room to adjust, but relaxed palm users may find it too compact.' },
      { question: 'Is the X2V2 Mini good for larger hands?', answer: 'Larger-hand players can use it with fingertip grip, but most should look at a larger shell for claw or palm support.' },
      { question: 'How does it compare with the SUPERLIGHT 2?', answer: 'The X2V2 Mini is smaller, lighter, and more specialized for small-hand grips. The SUPERLIGHT 2 is a safer medium-size option for a wider range of hands.' }
    ],
    zh: {
      name: 'Pulsar X2V2 Mini',
      verdict: 'X2V2 Mini 是一款偏向小手抓握和指握玩家的轻量无线鼠标。它在适合的手型中很有性价比，但紧凑外形不适合需要掌心支撑的人。',
      pros: ['52 克轻量机身', '紧凑对称外形适合小手抓握和指握', '价格低于许多旗舰轻量鼠标'],
      cons: ['大手掌握会觉得过小', '外形适用范围不如中等尺寸鼠标广', '购买前应确认尺寸和退换政策'],
      reviewContent: '<h2>适合谁</h2><p>X2V2 Mini 针对小手抓握和指握玩家。短小、低矮的外壳让手指有更大的调整空间，也更适合主动控制鼠标的使用方式。</p><h2>手型与操控</h2><p>它最适合不依赖掌心完全贴合的用户。大手玩家可以使用指握，但如果需要稳定的掌心支撑，应该优先考虑更大的外壳。</p><h2>结论</h2><p>对于确定自己喜欢小尺寸对称外形的玩家，X2V2 Mini 在重量、无线性能和价格之间给出了很有竞争力的平衡。</p>'
    }
  },
  {
    slug: 'wooting-80he-review',
    specs: { formFactor: '80% keyboard', sensor: 'Hall Effect switches', ports: 'Wired USB-C; Wootility configuration software' },
    faq: [
      { question: 'Is the Wooting 80HE good for work as well as gaming?', answer: 'Yes. Its 80% layout keeps arrows and navigation keys, so it is easier to use for work than a 60% keyboard. The Hall Effect settings should be kept conservative for typing.' },
      { question: 'How should I set up Rapid Trigger for the first time?', answer: 'Begin with a stable default profile, tune only movement keys, and avoid extremely shallow actuation. Save a known-good profile before experimenting.' },
      { question: 'Does the 80HE support wireless use?', answer: 'No. It is a wired keyboard. Its value is in performance tuning and layout practicality rather than wireless portability.' }
    ],
    zh: {
      name: 'Wooting 80HE',
      verdict: 'Wooting 80HE 将磁轴可调触发与实用的 80% 配列结合，适合希望兼顾 FPS 操控、方向键和日常输入的高端键盘用户。',
      pros: ['可细调触发行程和 Rapid Trigger', '80% 配列保留方向键与常用导航键', 'Wootility 软件成熟、设置自由度高'],
      cons: ['售价较高', '仅支持有线连接', '设置过深容易影响日常输入'],
      reviewContent: '<h2>核心定位</h2><p>Wooting 80HE 把磁轴调校能力和 80% 配列结合。相比 60% 键盘，它保留方向键和导航键，更适合游戏与办公共用的桌面。</p><h2>触发与 Rapid Trigger</h2><p>Wootility 可以按键设置触发行程与快速回弹。对 FPS 移动键而言，稳妥的微调比把所有按键设到极限灵敏更有用。建议先保存一个稳定配置，再逐步调整。</p><h2>结论</h2><p>如果你想要深入的磁轴调校，同时不愿放弃常用按键，80HE 是目前非常成熟的高端选择。</p>'
    }
  },
  {
    slug: 'hyperx-cloud-iii-wireless-review',
    specs: { formFactor: 'Closed-back over-ear headset', batteryLife: 'Up to 120 hours', ports: '2.4 GHz USB dongle; detachable boom microphone; PC and supported consoles' },
    faq: [
      { question: 'Does the Cloud III Wireless work with consoles?', answer: 'It supports compatible console use through its USB wireless connection, but buyers should verify current platform support for their exact console before ordering.' },
      { question: 'Is the microphone good enough for team chat?', answer: 'The detachable boom microphone is clear enough for everyday party and team communication. It is designed for gaming chat rather than studio voice recording.' },
      { question: 'Can I use it with a phone?', answer: 'It has no Bluetooth, so it is not the convenient choice for phone use. Its 2.4 GHz connection prioritizes low-latency gaming audio.' }
    ],
    zh: {
      name: 'HyperX Cloud III Wireless',
      verdict: 'HyperX Cloud III Wireless 适合重视佩戴舒适、续航和简单低延迟连接的玩家。它牺牲了蓝牙和复杂功能，换来更直接的日常游戏体验。',
      pros: ['长时间佩戴舒适', '续航长，减少充电频率', '可拆卸麦克风清晰，连接简单'],
      cons: ['不支持蓝牙', '音效更适合经由 EQ 微调', '多设备切换功能有限'],
      reviewContent: '<h2>适合谁</h2><p>Cloud III Wireless 是一款强调舒适和稳定连接的无线耳机。它适合想要每天直接使用、而不是管理复杂多设备生态的 PC 或主机玩家。</p><h2>舒适与续航</h2><p>舒适度和续航是这款耳机的主要优势。长时间游戏时，贴合度和夹力仍因人而异，建议在有退换保障的渠道购买。</p><h2>结论</h2><p>如果你看重低延迟 2.4 GHz 连接、清晰语音和长续航，它是一个务实的无线耳机选择。</p>'
    }
  },
  {
    slug: 'lg-ultragear-27gs95qe-b-review',
    specs: { formFactor: '27-inch OLED', refreshRate: '240 Hz', resolution: '2560 x 1440', ports: 'DisplayPort; HDMI 2.1; adaptive sync' },
    faq: [
      { question: 'What PC do I need for 1440p 240Hz gaming?', answer: 'You need a system that can reach high frame rates in the games you play. Competitive titles are easier to drive than demanding single-player games, where settings and upscaling may matter more.' },
      { question: 'Can consoles use the 27GS95QE-B at a high refresh rate?', answer: 'HDMI 2.1 improves console flexibility, but supported resolutions and refresh rates vary by console and game. Confirm your desired mode before purchase.' },
      { question: 'Is the LG OLED good for office use?', answer: 'It can be used for mixed work, but buyers who keep static windows on screen all day should consider OLED care, text preference, and their warranty before choosing it.' }
    ],
    zh: {
      name: 'LG UltraGear 27GS95QE-B',
      verdict: 'LG 27GS95QE-B 将 1440p 240Hz 与 OLED 对比度结合，适合优先追求动态清晰度和暗场表现的玩家，但需要接受 OLED 的维护与价格取舍。',
      pros: ['OLED 黑位与像素响应表现出色', '1440p 240Hz 适合高速游戏', 'HDMI 2.1 增加主机连接灵活性'],
      cons: ['需要考虑静态内容与面板维护', '售价高', '文字显示和持续亮度取舍不同于 IPS'],
      reviewContent: '<h2>适合谁</h2><p>27GS95QE-B 适合把动态清晰度和 OLED 对比度放在首位的玩家。240Hz 与极快响应时间让竞技游戏更利落，深黑表现也让单机游戏更有沉浸感。</p><h2>使用取舍</h2><p>OLED 的优势伴随更谨慎的使用方式。长时间静态桌面、文字观感、面板保护设置和保修政策都应在购买前确认。</p><h2>结论</h2><p>如果你的 PC 能在常玩的游戏中发挥高刷新率，并且能接受 OLED 的维护习惯，这是一款出色的 1440p 游戏显示器。</p>'
    }
  },
  {
    slug: 'alienware-aw2723df-review',
    specs: { formFactor: '27-inch Fast IPS', refreshRate: 'Up to 280 Hz', resolution: '2560 x 1440', ports: 'DisplayPort; HDMI; USB hub; adaptive sync' },
    faq: [
      { question: 'What do I need to use the AW2723DF at 280Hz?', answer: 'You need a compatible PC connection and enough in-game frame rate to benefit. Check current firmware and your graphics-card output options before relying on the overclocked mode.' },
      { question: 'Is the AW2723DF good for bright rooms and desktop work?', answer: 'Yes. Its IPS panel is practical for bright rooms and static desktop use, where many buyers prefer to avoid OLED panel-care concerns.' },
      { question: 'Is its HDR good enough to replace an OLED?', answer: 'No. It supports HDR compatibility, but IPS contrast and limited dimming cannot match OLED black levels. Choose it for high-refresh IPS usability rather than cinematic HDR.' }
    ],
    zh: {
      name: 'Alienware AW2723DF',
      verdict: 'Alienware AW2723DF 是偏向竞技游戏的 1440p 高刷 IPS 选择，适合重视明亮环境、桌面静态内容和 280Hz 模式，同时不想承担 OLED 使用顾虑的玩家。',
      pros: ['1440p Fast IPS 与最高 280Hz 模式带来流畅动态', '色彩和可视角度表现良好', '更适合长期桌面与明亮环境使用'],
      cons: ['HDR 与暗场对比度不及 OLED', '280Hz 需要兼容设备和足够帧率', '观影沉浸感不如 OLED'],
      reviewContent: '<h2>核心优势</h2><p>AW2723DF 是一款针对竞技游戏的 1440p Fast IPS 显示器。它把高刷新率、亮度和日常桌面适用性放在首位，而不是追求 OLED 的极致暗场。</p><h2>刷新率与使用场景</h2><p>当 PC 和游戏能提供足够高的帧率时，280Hz 模式能让高速画面更加清晰。IPS 也更适合长时间固定窗口和明亮房间使用。</p><h2>结论</h2><p>如果你优先重视 1440p 高刷竞技体验与长期桌面使用的安心感，AW2723DF 是很强的 IPS 选择；若重点是 HDR 和深黑，则应优先比较 OLED。</p>'
    }
  }
]

const articles = [
  {
    id: 'art-superlight-2-vs-x2v2-mini', slug: 'logitech-g-pro-x-superlight-2-vs-pulsar-x2v2-mini', title: 'Logitech G PRO X SUPERLIGHT 2 vs Pulsar X2V2 Mini', category: 'cat-mice', type: 'comparison', readingTime: 9,
    featuredImage: '/media/articles/logitech-g-pro-x-superlight-2-vs-pulsar-x2v2-mini.webp',
    featuredProducts: ['prod-logitech-g-pro-x-superlight-2', 'prod-pulsar-x2v2-mini'],
    quickVerdict: { summary: 'Choose the SUPERLIGHT 2 for a safer medium shape; choose the X2V2 Mini for small-hand claw or fingertip value.', topPick: 'prod-logitech-g-pro-x-superlight-2', valuePick: 'prod-pulsar-x2v2-mini' },
    seo: { title: 'SUPERLIGHT 2 vs Pulsar X2V2 Mini', description: 'Compare Logitech G PRO X SUPERLIGHT 2 and Pulsar X2V2 Mini on shape, hand size, weight, wireless performance, FPS use, and value.', keywords: 'superlight 2 vs pulsar x2v2 mini, small gaming mouse, lightweight wireless mouse', focusKeyword: 'superlight 2 vs pulsar x2v2 mini' },
    excerpt: 'A practical comparison of the G PRO X SUPERLIGHT 2 and Pulsar X2V2 Mini for hand size, grip, weight, wireless performance, and FPS value.',
    content: '<h2>Choose by shape first</h2><p>These mice share low weight and reliable wireless performance, but they solve different fit problems. The SUPERLIGHT 2 is a medium-size, neutral option for players who want a familiar shell. The X2V2 Mini is a compact specialist mouse for small-hand claw and fingertip users.</p><h2>Hand size and grip</h2><p>The SUPERLIGHT 2 has a broader, safer shape for a wider range of hands. It suits claw and fingertip hybrids that want some room under the palm. The X2V2 Mini gives small hands more freedom to make active fingertip adjustments, but larger relaxed-palm users may find it too short.</p><h2>Weight and performance</h2><p>The X2V2 Mini is lighter, while the SUPERLIGHT 2 pairs its 60 g body with a familiar esports shape and mature wireless ecosystem. Both are accurate enough for competitive FPS; the difference in daily aim comes from shell fit and control rather than sensor marketing.</p><h2>Value</h2><p>The Pulsar is the value pick when its compact shape already fits. The Logitech costs more but is easier to recommend to buyers who do not yet know whether a very small shell works for them.</p><h2>Verdict</h2><p>Choose the G PRO X SUPERLIGHT 2 for a safer medium-size premium mouse. Choose the Pulsar X2V2 Mini for small-hand claw or fingertip play and a stronger value case.</p>',
    featured: true
  },
  {
    id: 'art-lg-27gs95qe-vs-aw2723df', slug: 'lg-27gs95qe-b-vs-alienware-aw2723df', title: 'LG 27GS95QE-B vs Alienware AW2723DF', category: 'cat-monitors', type: 'comparison', readingTime: 10,
    featuredImage: '/media/articles/lg-27gs95qe-b-vs-alienware-aw2723df.webp',
    featuredProducts: ['prod-lg-27gs95qe-b', 'prod-dell-alienware-aw2723df'],
    quickVerdict: { summary: 'Choose LG OLED for contrast and response time; choose Alienware IPS for 280Hz, bright-room use, and fewer static-content concerns.', topPick: 'prod-lg-27gs95qe-b', valuePick: 'prod-dell-alienware-aw2723df' },
    seo: { title: 'LG 27GS95QE-B vs Alienware AW2723DF', description: 'Compare LG 27GS95QE-B OLED and Alienware AW2723DF Fast IPS monitors on 1440p motion, HDR, contrast, 240Hz vs 280Hz, and desktop use.', keywords: 'lg 27gs95qe vs alienware aw2723df, oled vs ips gaming monitor, 1440p gaming monitor', focusKeyword: 'lg 27gs95qe vs alienware aw2723df' },
    excerpt: 'An OLED versus Fast IPS 1440p comparison covering motion, contrast, 240Hz and 280Hz modes, HDR, bright-room use, and panel-care trade-offs.',
    content: '<h2>The real choice: OLED versus Fast IPS</h2><p>The LG 27GS95QE-B and Alienware AW2723DF are both fast 27-inch 1440p gaming monitors. The more important difference is panel behavior. LG offers OLED contrast and near-instant pixel response; Alienware offers bright, flexible Fast IPS use and a 280Hz mode.</p><h2>Motion and competitive play</h2><p>Both are excellent for fast games when paired with a PC that can deliver high frame rates. OLED response behavior keeps motion exceptionally clean, while the Alienware can reach a higher refresh target. In practice, the better choice is the display whose panel trade-offs fit the rest of your desk use.</p><h2>Contrast, HDR, and daily use</h2><p>LG wins clearly for dark scenes and perceived HDR depth. The Alienware has typical IPS contrast and should be chosen for speed and color rather than cinematic black levels. For bright rooms and long static desktop sessions, many users will find IPS ownership simpler.</p><h2>Verdict</h2><p>Choose the LG when contrast, fast pixel response, and OLED image quality justify the price and panel-care routine. Choose the Alienware when 280Hz, brighter desktop use, and no OLED static-content concern are the priority.</p>',
    featured: true
  },
  {
    id: 'art-best-wireless-gaming-headsets-2026', slug: 'best-wireless-gaming-headsets-2026', title: 'Best Wireless Gaming Headsets in 2026', category: 'cat-headsets', type: 'list', readingTime: 8,
    featuredImage: '/media/articles/best-wireless-gaming-headsets-2026.webp',
    featuredProducts: ['prod-hyperx-cloud-iii-wireless', 'prod-arctis-nova-pro'],
    quickVerdict: { summary: 'HyperX Cloud III Wireless is the comfort-and-battery pick; Arctis Nova Pro Wireless is the premium multi-device choice.', topPick: 'prod-hyperx-cloud-iii-wireless', valuePick: 'prod-hyperx-cloud-iii-wireless' },
    seo: { title: 'Best Wireless Gaming Headsets in 2026', description: 'Find the best wireless gaming headset for comfort, battery life, microphone quality, PC and console compatibility, and premium multi-device features.', keywords: 'best wireless gaming headset 2026, long battery gaming headset, hyperx cloud iii wireless review', focusKeyword: 'best wireless gaming headset' },
    excerpt: 'Choose a wireless gaming headset by fit, connection type, battery routine, microphone clarity, and platform compatibility rather than by a generic feature list.',
    content: '<h2>Choose fit before features</h2><p>A wireless headset only helps when it remains comfortable for the whole session. Start with clamp force, cup depth, glasses comfort, and return policy. Then compare connection type, battery routine, and platform support.</p><h2>Best for long battery life: HyperX Cloud III Wireless</h2><p>The Cloud III Wireless is the sensible choice for players who want straightforward 2.4 GHz audio, a clear detachable microphone, and long battery life. It does not offer Bluetooth or elaborate multi-device controls, which is a reasonable trade for players who primarily game on one PC or compatible console.</p><h2>Best premium flexibility: SteelSeries Arctis Nova Pro Wireless</h2><p>The Arctis Nova Pro Wireless costs much more, but its base station, hot-swappable batteries, and source switching can be worth it for multi-platform players. Its value is in the routine it simplifies, not simply in a higher price tag.</p><h2>Buying checklist</h2><ul><li>Confirm support for the exact PC or console you use.</li><li>Prioritize comfort over claimed driver size.</li><li>Check whether you need Bluetooth or only low-latency 2.4 GHz.</li><li>Decide whether a spare-battery system solves a real charging problem.</li></ul><h2>Verdict</h2><p>For straightforward long sessions, the HyperX Cloud III Wireless is the practical pick. Move up to the Arctis Nova Pro Wireless only when multi-device switching and its battery system will be used often.</p>',
    featured: false
  }
]

const priceObservations = [
  ['price-superlight-2-official', 'prod-logitech-g-pro-x-superlight-2', 'logitech-g-pro-x-superlight-2-price', 159.99, 'Official launch-price reference; verify live retailer pricing before purchase.'],
  ['price-x2v2-mini-official', 'prod-pulsar-x2v2-mini', 'pulsar-x2v2-mini-price', 94.95, 'Official price reference; verify color and regional stock before purchase.'],
  ['price-wooting-80he-official', 'prod-wooting-80he', 'wooting-80he-price', 199.99, 'Official price reference; configuration and availability can vary.'],
  ['price-cloud-iii-wireless-official', 'prod-hyperx-cloud-iii-wireless', 'hyperx-cloud-iii-wireless-price', 149.99, 'Official price reference; verify current PC and console bundle compatibility.'],
  ['price-lg-27gs95qe-official', 'prod-lg-27gs95qe-b', 'lg-27gs95qe-b-price', 899.99, 'Official price reference; compare promotions and warranty terms.'],
  ['price-aw2723df-official', 'prod-dell-alienware-aw2723df', 'alienware-aw2723df-price', 549.99, 'Official price reference; verify current overclock and support details.']
] as const

const productSql = productEnrichments.map((item) => `UPDATE content SET data = json_set(data, '$.specs', json_patch(COALESCE(json_extract(data, '$.specs'), '{}'), '${json(item.specs)}'), '$.faq', json('${json(item.faq)}'), '$.translations.zh', json('${json(item.zh)}')), updated_at = ${now} WHERE collection_id = '${collections.products}' AND slug = '${esc(item.slug)}';`)

const articleSql = articles.map((article) => `INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at) VALUES ('${article.id}', '${collections.articles}', '${article.slug}', '${esc(article.title)}', '${json({ ...article, author: 'author-editor', status: 'published', publishedAt: now, updatedAt: now })}', 'published', 'usr-admin-001', ${now}, ${now}) ON CONFLICT(id) DO UPDATE SET slug=excluded.slug, title=excluded.title, data=excluded.data, status=excluded.status, author_id=excluded.author_id, updated_at=excluded.updated_at;`)

const priceSql = priceObservations.map(([id, product, slug, price, notes]) => `INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at) VALUES ('${id}', '${collections.priceHistory}', '${slug}', 'Price observation', '${json({ product, price, currency: 'USD', source: 'official', availability: 'in-stock', discount: 0, notes })}', 'published', 'usr-admin-001', ${now}, ${now}) ON CONFLICT(id) DO UPDATE SET slug=excluded.slug, data=excluded.data, status=excluded.status, author_id=excluded.author_id, updated_at=excluded.updated_at;`)

const run = (statements: string[]) => {
  execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', local ? '--local' : '--remote', '--command', statements.join('\n')], { stdio: 'inherit' })
}

const collectionExists = (collectionId: string) => {
  const output = execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', local ? '--local' : '--remote', '--command', `SELECT id FROM collections WHERE id='${collectionId}';`], { encoding: 'utf8' })
  return output.includes(collectionId)
}

run(productSql)
run(articleSql)
if (collectionExists(collections.priceHistory)) {
  run(priceSql)
  console.log(`Enriched ${productEnrichments.length} products, upserted ${articles.length} articles, and added ${priceObservations.length} price observations (${local ? 'local' : 'remote'} D1).`)
} else {
  console.log(`Enriched ${productEnrichments.length} products and upserted ${articles.length} articles (${local ? 'local' : 'remote'} D1). Skipped price observations because the price-history collection is not initialized.`)
}
