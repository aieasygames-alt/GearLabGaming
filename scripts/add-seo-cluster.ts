import { execFileSync } from 'node:child_process'

const now = Math.floor(Date.now() / 1000)
const collections = {
  products: 'col-products-ce613aa5',
  articles: 'col-articles-f7a0326f',
  user: 'usr-admin-001'
}
const esc = (value: string) => value.replaceAll("'", "''")
const json = (value: unknown) => esc(JSON.stringify(value))

const product = {
  id: 'prod-razer-huntsman-v3-pro',
  slug: 'razer-huntsman-v3-pro-review',
  title: 'Razer Huntsman V3 Pro',
  data: {
    name: 'Razer Huntsman V3 Pro', brand: 'Razer', slug: 'razer-huntsman-v3-pro-review', category: 'cat-keyboards',
    price: 199.99, priceRange: 'premium', images: ['/media/articles/codex-clipboard-4d706d25-0844-454f-b8d9-ff423ab82610.webp'],
    specs: { connectivity: 'wired', additionalSpecs: 'Analog optical switches, adjustable actuation, Rapid Trigger' },
    rating: { overall: 8.8, buildQuality: 9, performance: 9.1, value: 8.2 },
    pros: ['Precise adjustable actuation', 'Strong Rapid Trigger performance', 'Excellent build quality'],
    cons: ['Wired only', 'Software is less flexible than Wooting'],
    verdict: 'The Razer Huntsman V3 Pro is a fast analog gaming keyboard for competitive FPS players who want adjustable actuation and Rapid Trigger.',
    bestFor: ['fps-games', 'premium'],
    affiliateLinks: { amazon: 'https://www.amazon.com/s?k=Razer+Huntsman+V3+Pro' },
    seo: { title: 'Razer Huntsman V3 Pro Review: A Wooting Alternative?', description: 'Razer Huntsman V3 Pro review covering analog switches, Rapid Trigger, actuation, software, gaming performance, and value.', focusKeyword: 'razer huntsman v3 pro review' },
    status: 'published', publishedAt: now, updatedAt: now, featured: false
  }
}

const articles = [
  {
    id: 'art-lg-monitor-deep-dive', slug: 'lg-27gp850-b-review-guide', title: 'LG 27GP850-B Review: Is This 1440p 165Hz Monitor Still Worth It?',
    data: { title: 'LG 27GP850-B Review: Is This 1440p 165Hz Monitor Still Worth It?', slug: 'lg-27gp850-b-review-guide', type: 'review', category: 'cat-monitors', excerpt: 'A practical LG 27GP850-B review covering price, 1440p image quality, 165Hz motion, HDR limits, and who should buy it.', content: '<h2>At a glance</h2><p>The LG 27GP850-B remains a strong 27-inch 1440p gaming monitor when fast motion and wide color matter more than deep contrast.</p><h2>Gaming performance</h2><p>Its 165Hz refresh rate and quick response make it a good fit for competitive shooters. Adaptive sync helps reduce tearing when frame rates vary.</p><h2>HDR and contrast</h2><p>Nano IPS delivers vibrant color, but typical IPS contrast and limited local dimming mean HDR is not its strongest feature.</p><h2>Who should buy it</h2><p>Choose it for a balanced 1440p high-refresh setup. Consider an OLED alternative if contrast and HDR are more important than price and burn-in risk.</p>', seo: { title: 'LG 27GP850-B Review: Is This 1440p 165Hz Monitor Still Worth It?', description: 'LG 27GP850-B review covering price, 1440p image quality, 165Hz motion, response times, HDR limits, and alternatives.', focusKeyword: 'lg 27gp850-b review' }, featuredProducts: ['prod-lg-27gp850'], author: 'author-editor', status: 'published', publishedAt: now, updatedAt: now, readingTime: 8, featured: false, featuredImage: '/media/articles/codex-clipboard-5289332e-8ac7-48c4-bc63-4e98fc1bbe94.webp' }
  },
  {
    id: 'art-small-fps-mouse', slug: 'best-fps-mouse-small-hands-2026', title: 'Best FPS Mouse for Small Hands in 2026: Claw and Fingertip Picks',
    data: { title: 'Best FPS Mouse for Small Hands in 2026: Claw and Fingertip Picks', slug: 'best-fps-mouse-small-hands-2026', type: 'list', category: 'cat-mice', excerpt: 'Tested picks for small-hand FPS players, including lightweight shapes for claw, fingertip, and relaxed grip styles.', content: '<h2>How we chose</h2><p>We compare shape, weight balance, click feel, wireless latency, and sensor consistency. A low weight alone does not guarantee a good small-hand fit.</p><h2>Best overall small FPS shape</h2><p>The Pulsar X2V2 Mini and Lamzu Atlantis Mini suit claw and fingertip grips with short shells and low front sections.</p><h2>Best budget option</h2><p>The Logitech G305 remains reliable and affordable, though its 99 gram weight and taller hump suit relaxed claw users better than fingertip players.</p><h2>Best ultralight option</h2><p>The Razer Viper Mini Signature Edition prioritizes low weight and fingertip control for buyers with a premium budget.</p>', seo: { title: 'Best FPS Mouse for Small Hands in 2026', description: 'Find the best FPS mouse for small hands with tested claw and fingertip picks, including Pulsar, Lamzu, Logitech, and Razer.', focusKeyword: 'best fps mouse for small hands' }, featuredProducts: ['prod-pulsar-x2v2-mini', 'prod-lamzu-atlantis-mini', 'prod-razer-viper-mini'], author: 'author-editor', status: 'published', publishedAt: now, updatedAt: now, readingTime: 9, featured: false, featuredImage: '/media/articles/codex-clipboard-f6d671a6-6402-4f76-9b10-76bd4e6f58dd.webp' }
  },
  {
    id: 'art-peripherals-under-200', slug: 'best-gaming-peripherals-pc-under-200-2026', title: 'Best Gaming Peripherals for PC Under $200 in 2026',
    data: { title: 'Best Gaming Peripherals for PC Under $200 in 2026', slug: 'best-gaming-peripherals-pc-under-200-2026', type: 'guide', category: 'cat-mice', excerpt: 'A realistic under-$200 PC gaming gear plan with a mouse, keyboard, and headset, plus upgrade priorities.', content: '<h2>The balanced $200 setup</h2><p>Start with a dependable mouse, compact mechanical keyboard, and an affordable headset. This combination improves control and communication without overspending on one component.</p><h2>Recommended combination</h2><p>Pair the Logitech G305 with the Royal Kludge RK61 and keep room for a budget headset. Choose the Pulsar X2V2 Mini instead when low weight and small-hand comfort matter most.</p><h2>Where to spend more</h2><p>Spend extra on the device that limits your sessions most. Competitive FPS players usually notice mouse shape and monitor motion before premium audio features.</p><h2>Upgrade path</h2><p>Upgrade the headset or display next, then replace the mouse only if its shape or weight remains uncomfortable.</p>', seo: { title: 'Best Gaming Peripherals for PC Under $200 in 2026', description: 'Build the best gaming peripherals for PC under $200 with a mouse, keyboard, headset, and practical upgrade priorities.', focusKeyword: 'best gaming peripherals for pc under $200' }, featuredProducts: ['prod-logitech-g305', 'prod-rk61'], author: 'author-editor', status: 'published', publishedAt: now, updatedAt: now, readingTime: 7, featured: true, featuredImage: '/media/articles/codex-clipboard-5d89b186-a7e5-46f9-8087-80d54a6dbd4e.webp' }
  }
]

const statements = [
  `INSERT OR IGNORE INTO content (id, collection_id, slug, title, data, status, published_at, author_id, created_at, updated_at) VALUES ('${product.id}','${collections.products}','${product.slug}','${esc(product.title)}','${json(product.data)}','published',${now},'${collections.user}',${now},${now});`,
  ...articles.map((article) => `INSERT OR IGNORE INTO content (id, collection_id, slug, title, data, status, published_at, author_id, created_at, updated_at) VALUES ('${article.id}','${collections.articles}','${article.slug}','${esc(article.title)}','${json(article.data)}','published',${now},'${collections.user}',${now},${now});`),
  `UPDATE content SET data=json_set(data,'$.seo.title','LG 27GP850-B Review: Is This 1440p 165Hz Monitor Still Worth It?','$.seo.description','LG 27GP850-B review covering price, 1440p image quality, 165Hz motion, response times, HDR limits, and alternatives.'), updated_at=${now} WHERE slug='lg-27gp850-b-review';`
]
execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--command', statements.join('\n')], { stdio: 'inherit' })
console.log('SEO cluster added without overwriting existing records.')
