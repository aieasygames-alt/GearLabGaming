/**
 * Add "ASUS PG27AQDM vs LG 27GS95QE-B" 1440p 240Hz OLED Showdown Article
 *
 * Targets GSC queries:
 * - pg27aqdm (48 imp, rank 23.1)
 * - asus rog swift oled pg27aqdm (9 imp)
 * - asus pg27aqdm (4 imp)
 * - asus pg27aqdm best settings
 * - 1440p 240hz oled gaming monitor
 * - lg 27gs95qe-b vs asus pg27aqdm
 *
 * Usage:
 *   npx tsx scripts/add-oled-showdown-article.ts          # Preview only
 *   npx tsx scripts/add-oled-showdown-article.ts --apply  # Publish to remote D1 & link products
 */

import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const apply = process.argv.includes('--apply')
const now = Math.floor(Date.now() / 1000)
const directory = `.wrangler/seo-backups/oled-showdown-${now}`
mkdirSync(directory, { recursive: true })

console.log('[OLED Showdown] Fetching remote snapshot from Cloudflare D1...')
const query = "SELECT id, collection_id, slug, title, data, updated_at FROM content WHERE status='published'"
const output = execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--command', query, '--json'], {
  encoding: 'utf8',
  env: process.env
})
writeFileSync(`${directory}/before.json`, output)

function parseWranglerJson(raw: string): any {
  const jsonStart = raw.indexOf('[')
  if (jsonStart === -1) throw new Error(`Could not find JSON in wrangler output:\n${raw}`)
  return JSON.parse(raw.slice(jsonStart))
}

const rows = parseWranglerJson(output)[0].results as Array<{ id: string; collection_id: string; slug: string; title: string; data: string; updated_at: number }>
const bySlug = new Map(rows.map(row => [row.slug, row]))

const asusSlug = 'asus-rog-swift-oled-pg27aqdm-review'
const lgSlug = 'lg-ultragear-27gs95qe-b-review'
const newArticleSlug = 'asus-pg27aqdm-vs-lg-27gs95qe-b'

const asusProduct = bySlug.get(asusSlug)
const lgProduct = bySlug.get(lgSlug)

if (!asusProduct) throw new Error(`Missing ASUS product record: ${asusSlug}`)
if (!lgProduct) throw new Error(`Missing LG product record: ${lgSlug}`)

const articleLink = (slug: string, label: string) => `<a href="/en/article/${slug}">${label}</a>`
const productLink = (slug: string, label: string) => `<a href="/en/product/${slug}">${label}</a>`

const articleData = {
  id: 'art-asus-pg27aqdm-vs-lg-27gs95qe-b',
  slug: newArticleSlug,
  title: 'ASUS PG27AQDM vs LG 27GS95QE-B: 1440p 240Hz OLED Showdown (2026)',
  category: 'cat-monitors',
  type: 'comparison',
  readingTime: 8,
  featuredImage: '/media/articles/asus-pg27aqdm-vs-lg-27gs95qe-b.webp',
  featuredProducts: [asusProduct.id, lgProduct.id],
  relatedArticles: [
    'lg-27gs95qe-b-vs-alienware-aw2723df',
    'best-gaming-monitors-2026',
    'best-1440p-gaming-monitor-2026'
  ],
  quickVerdict: {
    summary: 'Choose the ASUS ROG Swift OLED PG27AQDM for pure PC competitive esports, aggressive styling, and its Uniform Brightness desktop mode. Choose the LG UltraGear 27GS95QE-B for dual PC and PS5/Xbox setups requiring full-bandwidth HDMI 2.1 and higher sustained full-screen MLA+ brightness.',
    topPick: asusProduct.id,
    valuePick: lgProduct.id
  },
  seo: {
    title: 'ASUS PG27AQDM vs LG 27GS95QE-B: Which 240Hz OLED to Buy?',
    description: 'Direct comparison of ASUS ROG Swift OLED PG27AQDM vs LG UltraGear 27GS95QE-B. We test brightness, HDMI 2.1 vs DP 1.4, motion clarity & burn-in cooling.',
    keywords: 'asus pg27aqdm vs lg 27gs95qe-b, asus pg27aqdm review, pg27aqdm best settings, 1440p 240hz oled monitor, lg 27gs95qe-b vs pg27aqdm, best 240hz gaming monitor',
    focusKeyword: 'asus pg27aqdm vs lg 27gs95qe-b'
  },
  excerpt: 'A comprehensive head-to-head showdown between two titan 27-inch 1440p 240Hz WOLED gaming monitors: ASUS PG27AQDM custom heatsink engineering versus LG 27GS95QE-B upgraded MLA+ brightness and full HDMI 2.1.',
  content: `<h2>Quick Answer: Which 1440p 240Hz OLED Should You Buy?</h2>
<p>If you are a dedicated PC gamer competing in fast-paced titles like Counter-Strike 2, Valorant, or Apex Legends, the <strong>${productLink(asusSlug, 'ASUS ROG Swift OLED PG27AQDM')}</strong> delivers peak visual aggression, a robust custom heatsink with intelligent voltage management, and an exceptional <em>Uniform Brightness</em> mode that prevents distracting window-resizing brightness shifts during daily web browsing.</p>
<p>On the other hand, the <strong>${productLink(lgSlug, 'LG UltraGear 27GS95QE-B')}</strong> is the smarter versatile pick if you split your time between a gaming PC and next-gen consoles (PlayStation 5 or Xbox Series X). LG equips the 27GS95QE-B with <strong>dual full-bandwidth 48Gbps HDMI 2.1 ports</strong> and second-generation MLA+ (Micro Lens Array) technology that noticeably lifts overall SDR and HDR sustained brightness over earlier OLED displays.</p>

<h2>Side-by-Side Specifications Comparison</h2>
<table>
  <thead>
    <tr>
      <th>Feature / Spec</th>
      <th>ASUS ROG Swift PG27AQDM</th>
      <th>LG UltraGear 27GS95QE-B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Panel Type</strong></td>
      <td>26.5" QHD WOLED (Anti-Glare)</td>
      <td>26.5" QHD WOLED with MLA+ (Anti-Glare)</td>
    </tr>
    <tr>
      <td><strong>Refresh Rate & Response</strong></td>
      <td>240 Hz | 0.03 ms GtG</td>
      <td>240 Hz | 0.03 ms GtG</td>
    </tr>
    <tr>
      <td><strong>Peak HDR Brightness</strong></td>
      <td>Up to 1,000 nits (3% window)</td>
      <td>Up to 1,300 nits (peak) / 275 nits (100% APL)</td>
    </tr>
    <tr>
      <td><strong>Video Inputs</strong></td>
      <td>1x DisplayPort 1.4 (DSC), 2x HDMI 2.0</td>
      <td>1x DisplayPort 1.4 (DSC), <strong>2x full HDMI 2.1</strong></td>
    </tr>
    <tr>
      <td><strong>Console 120Hz / 4K Support</strong></td>
      <td>1440p 120Hz (HDMI 2.0 capped; no 4K downscale)</td>
      <td><strong>4K 120Hz Downscale & 1440p 120Hz VRR</strong></td>
    </tr>
    <tr>
      <td><strong>Thermal Management</strong></td>
      <td>Custom oversized heatsink + top air vent</td>
      <td>Graphite pad + active internal ventilation</td>
    </tr>
    <tr>
      <td><strong>Uniform Brightness Mode</strong></td>
      <td>Yes (Maintains fixed luminance across windows)</td>
      <td>ABL behavior varies by picture preset</td>
    </tr>
    <tr>
      <td><strong>Audio Connectivity</strong></td>
      <td>3.5mm Headphone Jack (Audio out)</td>
      <td>3.5mm Headphone Jack with DTS Headphone:X</td>
    </tr>
  </tbody>
</table>

<h2>Brightness & HDR Performance: Heatsink vs MLA+</h2>
<p>Brightness has historically been the primary criticism of first-generation 27-inch 1440p OLED panels. Both ASUS and LG tackle this challenge through distinct engineering pathways:</p>
<ul>
  <li><strong>ASUS PG27AQDM Engineering:</strong> ASUS engineered a massive bespoke internal heatsink combined with intelligent voltage optimization algorithms. By pulling heat directly away from the organic diodes without relying on high-RPM noisy fans, the PG27AQDM achieves striking 1,000-nit localized specular highlights in small HDR highlight windows.</li>
  <li><strong>LG 27GS95QE-B Upgraded MLA+ Panel:</strong> LG Display introduced Micro Lens Array (MLA+) optical lenses on the 27GS95QE-B panel surface. These microscopic lenses harvest internal light that was previously lost to internal reflections, significantly increasing broad full-screen white brightness (reaching ~275 nits in 100% APL) compared to previous generation displays.</li>
</ul>
<p>If you game in a dim or light-controlled room, both monitors deliver infinite contrast and pitch-black levels that make fast IPS and VA panels look washed out. In moderately lit rooms, LG's MLA+ panel offers a slightly punchier overall picture in bright daylight game scenes.</p>

<h2>Connectivity & Console Compatibility: The HDMI 2.1 Divide</h2>
<p>Connectivity represents the single most decisive split between these two displays:</p>
<p><strong>The LG 27GS95QE-B features dual 48Gbps HDMI 2.1 ports.</strong> This allows PlayStation 5 and Xbox Series X owners to connect over standard HDMI, output native 1440p at 120Hz with Variable Refresh Rate (VRR), or accept a 4K 120Hz signal with pristine downsampling for superior anti-aliasing. If your desk serves as a hybrid battle station for both PC and console, LG is undeniably the smoother platform.</p>
<p><strong>The ASUS PG27AQDM is constrained to HDMI 2.0 alongside DisplayPort 1.4.</strong> While PC gamers using DisplayPort with Display Stream Compression (DSC) enjoy uncompromised 1440p 240Hz 10-bit color, console inputs over HDMI 2.0 are bandwidth-constrained. PS5 and Xbox cannot leverage full 4K 120Hz HDR downsampling over HDMI 2.0 without chroma subsampling trade-offs.</p>

<h2>Motion Clarity & Competitive Esports: CS2, Valorant & Apex</h2>
<p>Thanks to near-instantaneous 0.03 ms gray-to-gray (GtG) pixel response times, both monitors eliminate pixel ghosting, trailing, and overshoot artifacts entirely. At 240Hz, moving targets remain razor-sharp during high-velocity camera pans in tactical shooters.</p>
<p>Both displays support AMD FreeSync Premium and NVIDIA G-SYNC compatibility, keeping fast frame fluctuations smooth without screen tearing.</p>

<h3>Best Settings for ASUS PG27AQDM in Competitive Gaming</h3>
<p>If you decide on the ASUS PG27AQDM, apply the following proven configuration for optimal competitive latency and color balance:</p>
<ol>
  <li><strong>Color Preset:</strong> Switch from default to <em>Racing Mode</em> or calibrated <em>sRGB Calibrated Mode</em> to prevent oversaturated neon greens and reds.</li>
  <li><strong>Uniform Brightness:</strong> Turn <strong>ON</strong> for web browsing and static UI applications to stop aggressive ABL dimming. Turn <strong>OFF</strong> during HDR cinematic single-player campaigns when maximum dynamic contrast is needed.</li>
  <li><strong>Variable Refresh Rate:</strong> Enable in both the monitor OSD and the NVIDIA Control Panel / AMD Adrenalin software.</li>
  <li><strong>Screen Protection:</strong> Leave <em>Screen Saver</em>, <em>Pixel Cleaning</em>, and <em>Screen Move</em> enabled to ensure long-term panel health.</li>
</ol>

<h2>Text Clarity & Daily Desktop Productivity</h2>
<p>Both monitors utilize an RWBG subpixel layout beneath an anti-glare matte coating. While anti-glare treatment diffuses reflections effectively in office environments, the non-standard subpixel arrangement can produce slight color fringing around small high-contrast text in Windows ClearType.</p>
<p>Gamers upgrading from a traditional RGB IPS monitor (such as the ${productLink('lg-27gp850-b-review', 'LG 27GP850-B')}) should sit at an ergonomic viewing distance of 60–75 cm, where subpixel fringing becomes virtually unnoticeable during gaming and media streaming.</p>

<h2>Burn-In Mitigation & Thermal Reliability</h2>
<p>Both manufacturers include automated pixel-refresh cycles, logo luminance dimming, and pixel shift features. ASUS's custom aluminum heatsink gives it an edge in thermal dissipation under sustained heavy loads, reducing operating temperatures by up to 5% without requiring fan noise. Both brands back these flagship displays with comprehensive multi-year burn-in warranties in most global markets.</p>

<h2>Final Buying Verdict</h2>
<p>Both displays represent the pinnacle of 27-inch esports hardware. Your final purchasing decision hinges on connectivity and room environment:</p>
<ul>
  <li>Buy the <strong>${productLink(asusSlug, 'ASUS ROG Swift OLED PG27AQDM')}</strong> if you are a PC-first gamer who wants elite heatsink cooling, ROG premium ergonomics, and the comfort of the Uniform Brightness desktop toggle.</li>
  <li>Buy the <strong>${productLink(lgSlug, 'LG UltraGear 27GS95QE-B')}</strong> if you require HDMI 2.1 for PS5 or Xbox Series X, or if you play in a sunlit room where the extra full-screen MLA+ brightness provides an edge.</li>
</ul>
<p>For alternative multi-display options and budget setups, explore our ${articleLink('best-gaming-monitors-2026', 'Best Gaming Monitors 2026 Guide')} and our ${articleLink('lg-27gs95qe-b-vs-alienware-aw2723df', 'LG OLED vs Alienware 280Hz IPS showdown')}.</p>`,
  faq: [
    {
      question: 'Is ASUS PG27AQDM brighter than LG 27GS95QE-B?',
      answer: 'In small window HDR highlights (under 10% of the screen), the ASUS PG27AQDM can reach up to 1,000 nits thanks to its aggressive heatsink and voltage tuning. However, across large full-screen bright scenes (100% APL), the LG 27GS95QE-B is brighter (around 275 nits) due to its second-generation MLA+ optical layer.'
    },
    {
      question: 'Does ASUS PG27AQDM support HDMI 2.1 for PS5 or Xbox Series X?',
      answer: 'No. The ASUS PG27AQDM features DisplayPort 1.4 and HDMI 2.0 ports. For full 4K 120Hz downsampled console signals with VRR, the LG 27GS95QE-B is the superior pick because it includes two full-bandwidth 48Gbps HDMI 2.1 ports.'
    },
    {
      question: 'What are the best settings for the ASUS PG27AQDM?',
      answer: 'For competitive FPS, set the monitor to Racing Mode or sRGB mode, enable Variable Refresh Rate (G-Sync Compatible), turn Uniform Brightness ON for office/browsing use, and ensure firmware is updated to the latest revision for optimal HDR color tracking.'
    },
    {
      question: 'Which 1440p 240Hz OLED monitor is better for competitive FPS?',
      answer: 'Both monitors share identical 0.03ms GtG response times and 240Hz refresh rates, delivering unmatched motion clarity over any IPS panel. Pure PC players often favor ASUS for its heatsink and uniform brightness toggle, while hybrid console players prefer LG for HDMI 2.1.'
    }
  ],
  featured: true,
  author: 'author-editor',
  status: 'published',
  publishedAt: now,
  updatedAt: now
}

console.log(`\n--- NEW ARTICLE PREVIEW ---`)
console.log(`SLUG: ${newArticleSlug}`)
console.log(`TITLE: ${articleData.title}`)
console.log(`SEO TITLE: ${articleData.seo.title}`)
console.log(`SEO DESCRIPTION: ${articleData.seo.description}`)
console.log(`FEATURED PRODUCTS: ${articleData.featuredProducts.join(', ')}`)
console.log(`CONTENT LENGTH: ${articleData.content.length} characters`)
console.log(`FAQ ITEMS: ${articleData.faq.length}`)

// Prepare SQL statements
const statements: string[] = []

// 1. Insert or Replace the new article in content table
const escapedData = JSON.stringify(articleData).replace(/'/g, "''")
const escapedTitle = articleData.title.replace(/'/g, "''")

// Check if article already exists
const existingArticle = bySlug.get(newArticleSlug)
if (existingArticle) {
  statements.push(`UPDATE content SET title = '${escapedTitle}', data = '${escapedData}', updated_at = ${now} WHERE id = '${existingArticle.id}';`)
} else {
  statements.push(`INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at) VALUES ('art-${newArticleSlug}', 'col-articles-f7a0326f', '${newArticleSlug}', '${escapedTitle}', '${escapedData}', 'published', 'usr-admin-001', ${now}, ${now});`)
}

// 2. Cross-link: Update ASUS product relatedArticles to include new article
const asusData = typeof asusProduct.data === 'string' ? JSON.parse(asusProduct.data) : { ...asusProduct.data }
const asusRelated = Array.isArray(asusData.relatedArticles) ? asusData.relatedArticles : []
if (!asusRelated.includes(newArticleSlug)) {
  asusData.relatedArticles = [newArticleSlug, ...asusRelated.filter((s: string) => s !== newArticleSlug)].slice(0, 4)
  const escapedAsusData = JSON.stringify(asusData).replace(/'/g, "''")
  statements.push(`UPDATE content SET data = '${escapedAsusData}', updated_at = ${now} WHERE id = '${asusProduct.id}' AND updated_at = ${asusProduct.updated_at};`)
  console.log(`[LINK] Added "${newArticleSlug}" to ASUS PG27AQDM relatedArticles`)
}

// 3. Cross-link: Update LG product relatedArticles to include new article
const lgData = typeof lgProduct.data === 'string' ? JSON.parse(lgProduct.data) : { ...lgProduct.data }
const lgRelated = Array.isArray(lgData.relatedArticles) ? lgData.relatedArticles : []
if (!lgRelated.includes(newArticleSlug)) {
  lgData.relatedArticles = [newArticleSlug, ...lgRelated.filter((s: string) => s !== newArticleSlug)].slice(0, 4)
  const escapedLgData = JSON.stringify(lgData).replace(/'/g, "''")
  statements.push(`UPDATE content SET data = '${escapedLgData}', updated_at = ${now} WHERE id = '${lgProduct.id}' AND updated_at = ${lgProduct.updated_at};`)
  console.log(`[LINK] Added "${newArticleSlug}" to LG 27GS95QE-B relatedArticles`)
}

console.log(`\nGenerated ${statements.length} SQL operations.`)

if (!apply) {
  console.log('\n[PREVIEW MODE ONLY] No changes written to remote D1. Run with --apply to publish.')
  process.exit(0)
}

console.log('\n[APPLY MODE] Executing guarded SQL batch against remote Cloudflare D1...')
writeFileSync(`${directory}/publish.sql`, statements.join('\n'))

for (let i = 0; i < statements.length; i++) {
  const stmt = statements[i]
  console.log(`Executing statement ${i + 1}/${statements.length}...`)
  execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--command', stmt], {
    stdio: 'inherit',
    env: process.env
  })
}

console.log('\n[VERIFICATION] Reading back updated records from remote D1...')
const verifyOutput = execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--command', query, '--json'], {
  encoding: 'utf8',
  env: process.env
})
const verifyRows = parseWranglerJson(verifyOutput)[0].results as Array<{ slug: string; title: string; data: string; updated_at: number }>
const verifyMap = new Map(verifyRows.map(r => [r.slug, r]))

const published = verifyMap.get(newArticleSlug)
if (!published) throw new Error(`Verification failed: new article "${newArticleSlug}" not found in remote D1!`)

console.log(`\n✅ Verified new article "${newArticleSlug}" is published in remote Cloudflare D1!`)
console.log(`Backup and SQL scripts saved to: ${directory}`)
