/**
 * Repairs the remaining published product records identified by the site audit.
 *
 * Usage (remote D1): npx tsx scripts/fix-audit-findings.ts
 * Usage (local D1): npx tsx scripts/fix-audit-findings.ts --local
 */
import { execFileSync } from 'node:child_process'

const local = process.argv.includes('--local')
const now = Math.floor(Date.now() / 1000)
const productCollection = 'col-products-ce613aa5'

const esc = (value: string) => value.replaceAll("'", "''")
const json = (value: unknown) => esc(JSON.stringify(value))

type ProductRepair = {
  slug: string
  reviewContent: string
  faq: Array<{ question: string; answer: string }>
}

const repairs: ProductRepair[] = [
  {
    slug: 'royal-kludge-rk61-review',
    reviewContent: `<h2>Who the RK61 is for</h2><p>The Royal Kludge RK61 is a compact 60% mechanical keyboard aimed at buyers who want an affordable desk footprint and flexible connection options. Its value is strongest when mouse room, basic wireless use, and a small layout matter more than premium materials or dedicated navigation keys.</p><h2>Layout and daily use</h2><p>The 60% layout leaves more room for a mouse, which is useful in low-sensitivity FPS setups. It also removes dedicated arrows, navigation keys, and a function row. Layers can cover those commands, but they are a real workflow compromise for players who write, browse, or manage spreadsheets at the same desk.</p><h2>Switches and typing</h2><p>Hot-swappable variants make the RK61 more flexible than many entry-level boards because switch feel can be changed without replacing the whole keyboard. Out of the box, stabilizer tuning and sound are more basic than on enthusiast boards. That is expected at this price, but it is worth considering before spending more on modifications.</p><h2>Wireless and gaming</h2><p>Wireless modes make the board convenient for a tidy setup and casual multi-device use. For competitive play, a wired connection is the simplest way to prioritize consistent input behavior. The RK61 is not a Hall Effect or Rapid Trigger board, so buyers focused on adjustable actuation should compare performance-first alternatives instead.</p><h2>Verdict</h2><p>The RK61 is a practical compact budget keyboard when its layout fits your workflow. It is best for buyers who want inexpensive 60% wireless flexibility, not for users who need dedicated keys, premium acoustics, or specialized competitive-switch features.</p>`,
    faq: [
      { question: 'Is the Royal Kludge RK61 good for gaming?', answer: 'It is a solid entry-level option for gaming when you are comfortable with a 60% layout. A wired connection is the simplest choice for competitive play.' },
      { question: 'Does the RK61 have dedicated arrow keys?', answer: 'No. The compact 60% layout uses function layers for arrows and navigation commands, which saves desk space but can slow general work.' },
      { question: 'Who should choose RK61 over a Hall Effect keyboard?', answer: 'Choose RK61 when compact size and budget matter most. Choose a Hall Effect board when adjustable actuation and Rapid Trigger are features you will use regularly.' }
    ]
  },
  {
    slug: 'keychron-q1-pro-review',
    reviewContent: `<h2>Who the Q1 Pro is for</h2><p>The Keychron Q1 Pro is a premium compact mechanical keyboard for buyers who care about an aluminum case, configurable firmware, and a refined typing experience as much as gaming. Its appeal is craftsmanship and flexibility rather than a narrow competitive-performance claim.</p><h2>Build and typing feel</h2><p>The aluminum chassis gives the Q1 Pro a planted, substantial feel that is a clear step up from lightweight plastic boards. The trade-off is weight: it is not designed to be moved around a desk every day. Its gasket-mounted construction, switch choice, and keycaps make it easier to tune sound and feel than typical gaming-branded models.</p><h2>Wireless and configuration</h2><p>Bluetooth support is useful for switching between a desktop, laptop, and tablet, while wired operation remains the simple option for focused gaming. QMK/VIA configuration allows keys and layers to be tailored to your workflow. That depth is valuable for owners who will actually set up shortcuts; it is unnecessary complexity for buyers who only want a standard layout.</p><h2>Gaming suitability</h2><p>The Q1 Pro is responsive enough for ordinary and competitive gaming, but it is not built around adjustable actuation or Rapid Trigger. Players whose primary goal is movement tuning in FPS games should compare Hall Effect keyboards. Buyers who split time between games, writing, and development will likely appreciate the Q1 Pro's broader strengths more.</p><h2>Verdict</h2><p>The Q1 Pro is a strong premium choice for enthusiasts who want a compact wireless keyboard with configurable firmware and a substantial build. It is less compelling for a buyer who only wants the lightest, most gaming-specialized input tool.</p>`,
    faq: [
      { question: 'Is the Keychron Q1 Pro good for gaming?', answer: 'It is a capable gaming keyboard, especially for people who also value a premium build and remapping. It does not offer the adjustable-actuation features of Hall Effect boards.' },
      { question: 'Does Q1 Pro support QMK and VIA?', answer: 'The Q1 Pro supports QMK/VIA configuration, allowing owners to remap keys and create layers for a more personal workflow.' },
      { question: 'Should I choose Keychron Q1 Pro or Wooting for FPS?', answer: 'Choose the Q1 Pro for build quality, typing feel, wireless flexibility, and remapping. Choose Wooting when adjustable actuation and Rapid Trigger are your priority.' }
    ]
  },
  {
    slug: 'asus-rog-swift-oled-pg27aqdm-review',
    reviewContent: `<h2>Who the PG27AQDM is for</h2><p>The ASUS ROG Swift OLED PG27AQDM is a 27-inch 1440p 240Hz OLED monitor for players who prioritize motion clarity, contrast, and response time over a lower purchase price. It is an enthusiast display, so the decision should include room lighting, static desktop use, and long-term panel care.</p><h2>Motion and image quality</h2><p>At 1440p and 240Hz, the monitor delivers a smooth presentation that is especially useful in fast shooters and racing games. OLED's near-instant pixel response helps preserve clarity around moving objects. Per-pixel lighting also gives dark scenes much better depth than conventional IPS displays, which is a visible advantage in cinematic games and media.</p><h2>HDR and desktop trade-offs</h2><p>OLED contrast makes HDR scenes more convincing than on many edge-lit LCD monitors. Bright-room use and small text can still favor a good IPS display, depending on personal preference and desktop setup. It is important to use panel-care features, vary static content, and understand burn-in policies before treating any OLED as an all-day productivity monitor.</p><h2>Connectivity and alternatives</h2><p>The 1440p 240Hz format is easier to drive than 4K at high frame rates, making it a practical match for competitive PCs. Compare current pricing with newer OLED models and high-refresh IPS alternatives. An IPS option can be the more sensible purchase when long static work sessions, budget, or bright-room clarity lead the decision.</p><h2>Verdict</h2><p>The PG27AQDM is a compelling 1440p OLED gaming display for players who will benefit from its contrast and 240Hz motion. Its premium price and OLED ownership considerations mean it is best for gaming-first setups rather than every desk.</p>`,
    faq: [
      { question: 'Is the ASUS PG27AQDM good for competitive gaming?', answer: 'Yes. Its 240Hz refresh rate and OLED response time make it well suited to fast competitive games when paired with a PC that can sustain high frame rates.' },
      { question: 'Does OLED burn-in matter for PG27AQDM buyers?', answer: 'It should be considered. Use panel-care features, vary static content, and review the warranty before choosing an OLED for all-day desktop work.' },
      { question: 'Should I buy a 1440p OLED or high-refresh IPS monitor?', answer: 'Choose OLED for contrast, HDR impact, and response time. Choose IPS when price, bright-room comfort, and extended static desktop use are more important.' }
    ]
  }
]

const statements = [
  ...repairs.map((repair) => `UPDATE content SET data = json_set(data,
    '$.reviewContent', '${esc(repair.reviewContent)}',
    '$.faq', json('${json(repair.faq)}'),
    '$.updatedAt', ${now}
  ), updated_at = ${now} WHERE collection_id = '${productCollection}' AND slug = '${esc(repair.slug)}';`),
  `UPDATE content SET status = 'archived', updated_at = ${now}
    WHERE collection_id = '${productCollection}' AND slug = 'lg-27gp850-b-ultragear-review';`
]

execFileSync('npx', [
  'wrangler', 'd1', 'execute', 'DB', local ? '--local' : '--remote', '--command', statements.join('\n')
], { stdio: 'inherit' })

console.log(`Repaired ${repairs.length} product records and archived one duplicate product (${local ? 'local' : 'remote'} D1).`)
