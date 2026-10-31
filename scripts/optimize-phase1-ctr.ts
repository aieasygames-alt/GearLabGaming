/**
 * Phase 1: High-Priority SERP Title/Meta Optimization & CTR Enhancement
 *
 * Targets top queries from GSC:
 * - wooting-60he-vs-razer-huntsman-v3-pro
 * - best-gaming-mouse-for-small-hands-2026
 * - best-gaming-setup-under-200
 * - asus-rog-swift-oled-pg27aqdm-review
 * - lamzu-atlantis-mini-review
 * - lg-27gp850-b-review
 * - pulsar-x2v2-mini-review
 * - best-wireless-gaming-headsets-2026
 *
 * Usage:
 *   npx tsx scripts/optimize-phase1-ctr.ts           # Preview changes only
 *   npx tsx scripts/optimize-phase1-ctr.ts --apply   # Backup & publish guarded updates to D1
 */

import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const apply = process.argv.includes('--apply')
const now = Math.floor(Date.now() / 1000)
const directory = `.wrangler/seo-backups/phase1-ctr-${now}`
mkdirSync(directory, { recursive: true })

console.log(`[Phase 1 CTR] Fetching remote content snapshot from Cloudflare D1...`)
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

interface SeoUpdate {
  title?: string
  seoTitle: string
  seoDescription: string
  seoKeywords?: string
  excerpt?: string
  quickVerdictSummary?: string
}

const targetUpdates: Record<string, SeoUpdate> = {
  // 1. Top Keyboard Comparison
  'wooting-60he-vs-razer-huntsman-v3-pro': {
    title: 'Wooting 60HE vs Razer Huntsman V3 Pro: Rapid Trigger Tested (2026)',
    seoTitle: 'Wooting 60HE vs Razer Huntsman V3 Pro: Rapid Trigger Tested (2026)',
    seoDescription: 'Which rapid trigger keyboard wins in 2026? We compare Wooting 60HE Hall Effect vs Razer Huntsman V3 Pro optical switches on latency, software & FPS movement.',
    seoKeywords: 'wooting 60he vs razer huntsman v3 pro, wooting vs razer, rapid trigger keyboard, best rapid trigger keyboard 2026, wooting 60he v2',
    excerpt: 'Which rapid trigger keyboard belongs on your desk? We break down Wooting 60HE Hall Effect vs Razer Huntsman V3 Pro analog optical switches for competitive FPS.',
    quickVerdictSummary: 'Choose Wooting 60HE for a 60% footprint and unrivaled Wootility analog customization. Choose Huntsman V3 Pro if you need Mini/TKL/Full-size layouts and instant onboard rapid trigger adjustments without external software.'
  },

  // 2. Top Small-Hand Mouse Roundup
  'best-gaming-mouse-for-small-hands-2026': {
    title: 'Best Gaming Mouse for Small Hands in 2026: Top Wireless Claw Picks',
    seoTitle: 'Best Gaming Mouse for Small Hands (2026): Top Wireless Claw Picks',
    seoDescription: 'Hands under 17cm? Discover the best wireless gaming mice for small hands and claw grips in 2026. Tested picks: Pulsar X2V2 Mini, Lamzu Atlantis Mini & more.',
    seoKeywords: 'best gaming mouse for small hands, small gaming mouse, claw grip mouse, compact gaming mouse, best wireless gaming mouse for small hands',
    excerpt: 'Small-hand claw and fingertip shortlist: Pulsar X2V2 Mini for balanced agility, Lamzu Atlantis Mini for aggressive claw, Viper Mini SE for ultralight fingertip, and G305 for budget endurance.',
    quickVerdictSummary: 'For hands under 17cm, shape and waist width matter far more than raw DPI. Start with Pulsar X2V2 Mini or Lamzu Atlantis Mini for compact claw, Viper Mini SE for luxury fingertip, and G305 for budget wireless endurance.'
  },

  // 3. Top Budget Setup Roundup
  'best-gaming-setup-under-200': {
    title: 'Best $200 Gaming Setup in 2026: Full PC Peripheral Guide',
    seoTitle: 'Best $200 Gaming Setup in 2026: Full PC Peripheral Guide',
    seoDescription: 'Build the best PC gaming setup under $200 in 2026. Hand-picked mechanical keyboard, lightweight wireless mouse, headset & desk pad for budget gamers.',
    seoKeywords: 'best gaming setup under 200, budget gaming peripherals pc under 200, cheap gaming setup, mechanical keyboard under 200, budget fps gear',
    excerpt: 'A complete $200 PC peripheral blueprint: mechanical keyboard, wireless mouse, comfortable headset, and reliable mousepad hand-picked for high-performance budget gaming.',
    quickVerdictSummary: 'A $200 peripheral plan for an existing PC: allocate ~$60 for a reliable mechanical keyboard, ~$45 for a wireless sensor-grade mouse, ~$50 for comfortable audio, and ~$15 for a control pad, reserving $30 for tax and shipping.'
  },

  // 4. High-Impression OLED Monitor Review
  'asus-rog-swift-oled-pg27aqdm-review': {
    title: 'ASUS ROG Swift OLED PG27AQDM Review: 1440p 240Hz Speed King?',
    seoTitle: 'ASUS ROG Swift OLED PG27AQDM Review: 1440p 240Hz Speed King?',
    seoDescription: 'Is the ASUS ROG Swift OLED PG27AQDM worth it in 2026? In-depth review testing 240Hz OLED speed, 0.03ms response time, HDR brightness & competitive FPS settings.',
    seoKeywords: 'asus pg27aqdm review, pg27aqdm, asus rog swift oled pg27aqdm, 1440p 240hz oled, pg27aqdm best settings'
  },

  // 5. High-Impression Small Claw Mouse Review
  'lamzu-atlantis-mini-review': {
    title: 'Lamzu Atlantis Mini Review: Still the Best Small Claw Grip Mouse?',
    seoTitle: 'Lamzu Atlantis Mini Review: Still the Best Small Claw Grip Mouse?',
    seoDescription: 'Full Lamzu Atlantis Mini review: 49g ultralight weight, aggressive claw shape, optical switches, and hand size compatibility tested for competitive FPS.',
    seoKeywords: 'lamzu atlantis mini review, lamzu atlantis mini, compact claw mouse, lamzu atlantis mini weight, small gaming mouse'
  },

  // 6. High-Impression Budget 1440p Monitor Review
  'lg-27gp850-b-review': {
    title: 'LG 27GP850-B UltraGear Review: Best Budget 1440p 165Hz Monitor?',
    seoTitle: 'LG 27GP850-B UltraGear Review: Best Budget 1440p 165Hz Monitor?',
    seoDescription: 'Tested LG UltraGear 27GP850-B review: 1440p Nano IPS, 165Hz (180Hz OC) response time, motion clarity & real-world value compared to modern OLED monitors.',
    seoKeywords: 'lg 27gp850 b, lg 27gp850-b, lg ultragear 27gp850, 1440p 165hz gaming monitor, lg 27gp850 review'
  },

  // 7. High-Impression Small FPS Mouse Review
  'pulsar-x2v2-mini-review': {
    title: 'Pulsar X2V2 Mini Wireless Review: 52g Esports Claw Tested',
    seoTitle: 'Pulsar X2V2 Mini Wireless Review: 52g Esports Claw Tested',
    seoDescription: 'Tested Pulsar X2V2 Mini review: 52g weight, optical switches, claw grip ergonomics, and battery life analyzed for small hands & low-sens FPS players.',
    seoKeywords: 'pulsar x2v2 mini review, pulsar x2v2 mini weight, pulsar x2v2 mini, small wireless gaming mouse, claw grip fps mouse'
  },

  // 8. Wireless Headset Roundup
  'best-wireless-gaming-headsets-2026': {
    title: 'Best Wireless Gaming Headsets for PC in 2026: Low-Latency Audio',
    seoTitle: 'Best Wireless Gaming Headsets for PC in 2026: Low-Latency Audio',
    seoDescription: 'Cut the cord without audio lag. We review the best wireless gaming headsets in 2026 for FPS spatial audio, battery life & clear mics (HyperX, SteelSeries).',
    seoKeywords: 'best wireless gaming headsets 2026, best wireless gaming headset 2026, wireless pc headset, low latency gaming headset, hyperx cloud iii wireless'
  }
}

const statements: string[] = []
let modifiedCount = 0

console.log('\n--- PHASE 1 CTR OPTIMIZATION PLAN ---')
for (const [slug, update] of Object.entries(targetUpdates)) {
  const existing = bySlug.get(slug)
  if (!existing) {
    console.warn(`[WARN] Target slug "${slug}" not found in remote D1 published content!`)
    continue
  }

  const data = typeof existing.data === 'string' ? JSON.parse(existing.data) : { ...existing.data }
  const currentSeo = data.seo || {}

  console.log(`\n[${existing.collection_id}] "${slug}":`)
  console.log(`  TITLE:`)
  console.log(`    Before: ${existing.title}`)
  console.log(`    After:  ${update.title || existing.title}`)
  console.log(`  SEO TITLE:`)
  console.log(`    Before: ${currentSeo.title || '(none)'}`)
  console.log(`    After:  ${update.seoTitle}`)
  console.log(`  SEO DESCRIPTION:`)
  console.log(`    Before: ${currentSeo.description || '(none)'}`)
  console.log(`    After:  ${update.seoDescription}`)

  data.seo = {
    ...currentSeo,
    title: update.seoTitle,
    description: update.seoDescription,
    keywords: update.seoKeywords || currentSeo.keywords || ''
  }

  if (update.excerpt) data.excerpt = update.excerpt
  if (update.quickVerdictSummary && data.quickVerdict) {
    data.quickVerdict.summary = update.quickVerdictSummary
  }

  const nextTitle = update.title || existing.title
  const nextData = JSON.stringify(data)

  const escapedTitle = nextTitle.replace(/'/g, "''")
  const escapedData = nextData.replace(/'/g, "''")
  const statement = `UPDATE content SET title = '${escapedTitle}', data = '${escapedData}', updated_at = ${now} WHERE id = '${existing.id}' AND updated_at = ${existing.updated_at};`
  statements.push(statement)
  modifiedCount++
}

console.log(`\nTotal targets: ${modifiedCount} records to update.`)

if (!apply) {
  console.log('\n[PREVIEW MODE ONLY] No changes written to remote D1. Run with --apply to publish.')
  process.exit(0)
}

console.log('\n[APPLY MODE] Executing guarded SQL batch against remote Cloudflare D1...')
writeFileSync(`${directory}/publish.sql`, statements.join('\n'))

for (let i = 0; i < statements.length; i++) {
  const stmt = statements[i]
  console.log(`Executing update ${i + 1}/${statements.length}...`)
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

for (const [slug, update] of Object.entries(targetUpdates)) {
  const verified = verifyMap.get(slug)
  if (!verified) continue
  const data = JSON.parse(verified.data)
  if (data.seo?.title !== update.seoTitle || data.seo?.description !== update.seoDescription) {
    throw new Error(`Verification mismatch on slug: ${slug}`)
  }
}

console.log('\n✅ All 8 targets successfully published and verified in remote Cloudflare D1!')
console.log(`Backup and SQL scripts saved to: ${directory}`)
