/** Preview by default. --apply publishes guarded updates after saving a D1 snapshot. */
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { ARTICLE_REDIRECTS, rewriteArticleLinks } from '../src/seo-policy'

const apply = process.argv.includes('--apply')
const now = Math.floor(Date.now() / 1000)
const directory = `.wrangler/seo-backups/gsc-${now}`
mkdirSync(directory, { recursive: true })
const query = "SELECT id, collection_id, slug, title, data, updated_at FROM content WHERE status='published'"
const output = execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--command', query, '--json'], { encoding: 'utf8' })
writeFileSync(`${directory}/before.json`, output)
const rows = JSON.parse(output)[0].results as Array<{ id: string; collection_id: string; slug: string; title: string; data: string; updated_at: number }>
const bySlug = new Map(rows.map(row => [row.slug, row]))
const productId = (slug: string) => {
  const row = bySlug.get(slug)
  if (!row || row.collection_id !== 'col-products-ce613aa5') throw new Error(`Missing product: ${slug}`)
  return row.id
}
const articleLink = (slug: string, label: string) => `<a href="/en/article/${slug}">${label}</a>`
const productLink = (slug: string, label: string) => `<a href="/en/product/${slug}">${label}</a>`
const mice = 'best-gaming-mouse-for-small-hands-2026'
const setup = 'best-gaming-setup-under-200'
const keyboard = 'wooting-60he-vs-razer-huntsman-v3-pro'
const comparison80 = 'wooting-80he-vs-razer-huntsman-v3-pro'

const updates: Record<string, Record<string, any>> = {
  [keyboard]: {
    title: 'Wooting 60HE vs Razer Huntsman V3 Pro: Layout, Switches and Value',
    seo: {
      title: 'Wooting 60HE vs Razer Huntsman V3 Pro: Which to Buy?',
      description: 'Compare Wooting 60HE and Razer Huntsman V3 Pro by layout, Hall Effect vs optical switches, Rapid Trigger, software and everyday key access.',
      keywords: 'wooting 60he vs razer huntsman v3 pro, wooting vs razer, rapid trigger keyboard',
      focusKeyword: 'wooting 60he vs razer huntsman v3 pro'
    },
    excerpt: 'Choose the original Wooting 60HE for a compact 60% desk footprint; choose the Huntsman V3 Pro layout that provides the dedicated keys you need.',
    featured: true,
    featuredProducts: [productId('wooting-60he-review'), productId('razer-huntsman-v3-pro-review')],
    relatedArticles: [comparison80, setup],
    readingTime: 5,
    quickVerdict: { summary: 'Choose Wooting 60HE for a 60% layout and Wootility tuning. Choose Huntsman V3 Pro when its Mini, TKL or full-size layout and Razer configuration suit your workflow. This is a feature-based buying comparison, not a measured latency ranking.' },
    content: `<h2>Quick answer: which should you buy?</h2><p>Choose the <strong>Wooting 60HE</strong> if you want a compact 60% keyboard and detailed per-key tuning in Wootility. Choose the <strong>Razer Huntsman V3 Pro</strong> if its available layout and configuration workflow better match your desk. For FPS, both offer adjustable actuation and Rapid Trigger; neither feature guarantees better aim or movement without comfortable, consistent settings.</p>
<h2>Model scope: 60HE is not 80HE or 60HE V2</h2><p>This page compares the original 60HE platform with the Huntsman V3 Pro family. Razer sells different sizes: Mini, Tenkeyless and full-size. A Mini is the closest layout comparison to a 60% Wooting; TKL and full-size versions add keys rather than being interchangeable names for the same board. Do not assume firmware, polling-rate claims or accessories from a newer Wooting revision apply to the original model. If you need dedicated arrows and a function row, read our ${articleLink(comparison80, 'Wooting 80HE vs Huntsman V3 Pro comparison')} instead.</p>
<h2>Side-by-side buying comparison</h2><table><thead><tr><th>Decision</th><th>Wooting 60HE</th><th>Razer Huntsman V3 Pro</th></tr></thead><tbody><tr><td>Layout</td><td>60%; navigation and function keys use layers</td><td>Mini, TKL or full-size; confirm the exact variant</td></tr><tr><td>Switch sensing</td><td>Lekker Hall Effect (magnetic)</td><td>Analog optical; not a Hall Effect keyboard</td></tr><tr><td>Movement tuning</td><td>Adjustable actuation and Rapid Trigger</td><td>Adjustable actuation and Rapid Trigger</td></tr><tr><td>Configuration</td><td>Wootility, including browser-based configuration</td><td>Razer Synapse and supported onboard adjustments</td></tr><tr><td>Desk fit</td><td>Maximum room for low-sensitivity mouse movement</td><td>Choose size according to key-access needs</td></tr><tr><td>Value check</td><td>Check the exact revision, availability and delivered price</td><td>Check the exact size, included accessories and sale price</td></tr></tbody></table>
<h2>Rapid Trigger: useful tuning, not a guaranteed win</h2><p>Conventional fixed reset behavior requires a key to return past a reset point. Rapid Trigger uses movement-based reset behavior so a key can release after a smaller upward motion. This can help repeated movement inputs, but overly sensitive settings can also register unintended actions. Begin with moderate actuation, tune movement keys first, and keep typing keys less sensitive if accidental presses occur.</p><p>We do not present measured end-to-end latency results here, so this comparison does not declare either keyboard faster. Firmware, connection, settings and the game all affect behavior. Check your game's current rules before enabling automated or multi-input movement features; they are not the same thing as ordinary adjustable actuation.</p>
<h2>Typing, arrow keys and everyday use</h2><p>The 60HE makes sense when mouse room outweighs the convenience of dedicated keys. If you routinely use arrows, shortcuts or spreadsheets, consider the learning cost of layers before buying. Huntsman V3 Pro TKL keeps dedicated arrows and a function row without a number pad; the full-size version suits users who need one. The Mini remains compact, so buying Razer alone does not solve the missing-key trade-off.</p>
<h2>Software and ownership</h2><p>Wootility focuses on keyboard profiles, analog behavior and per-key tuning. Synapse may suit an existing Razer setup, but confirm operating-system compatibility and whether your desired functions require software. Check current manufacturer documentation for the exact model rather than relying on a product-family name.</p><p>Official references: <a href="https://wooting.io/wooting-60he">Wooting 60HE information</a> and <a href="https://www.razer.com/gaming-keyboards/razer-huntsman-v3-pro">Razer Huntsman V3 Pro information</a>. These are feature references, not evidence of a hands-on test by this site.</p>
<h2>Price and final decision</h2><p>Compare the final local price including shipping and tax. Do not pay for a larger board if you do not need its keys, or pick a 60% board solely for a performance label. Our ${productLink('wooting-60he-review', '60HE product guide')} and ${productLink('razer-huntsman-v3-pro-review', 'Huntsman V3 Pro product guide')} explain ownership trade-offs. If your entire peripheral budget is limited, start with our ${articleLink(setup, 'under-$200 peripheral plan')} before allocating most of it to an analog keyboard.</p>`,
    faq: [
      { question: 'Is Wooting 60HE better than Razer Huntsman V3 Pro?', answer: 'Choose by layout and configuration: 60HE is a compact 60% Hall Effect board; Huntsman V3 Pro uses analog optical switches and comes in different sizes. This guide does not establish a measured latency winner.' },
      { question: 'Is Huntsman V3 Pro a magnetic keyboard?', answer: 'No. It uses analog optical sensing. Adjustable actuation and Rapid Trigger do not necessarily mean a keyboard uses Hall Effect switches.' },
      { question: 'Should I choose 60HE or 80HE?', answer: 'Choose 60HE for a 60% footprint and layer-based navigation; consider 80HE if dedicated arrows and a function row matter. Verify the exact model revision before comparing specifications.' }
    ]
  },
  [mice]: {
    title: 'Best Gaming Mouse for Small Hands in 2026: Grip-Based Picks',
    seo: { title: 'Best Gaming Mouse for Small Hands: Claw & Fingertip Picks', description: 'Choose a small-hand gaming mouse by grip, weight and budget. Compare Pulsar X2V2 Mini, Viper Mini SE, Atlantis Mini and Logitech G305 trade-offs.', keywords: 'best gaming mouse for small hands, small gaming mouse, claw grip mouse, fingertip mouse', focusKeyword: 'best gaming mouse for small hands' },
    excerpt: 'A grip-first shortlist: X2V2 Mini for compact claw, Viper Mini SE for premium fingertip use, Atlantis Mini as a shape alternative, and G305 for a budget wireless option.',
    featured: true, readingTime: 6,
    featuredProducts: ['pulsar-x2v2-mini-review', 'razer-viper-mini-signature-edition-review', 'lamzu-atlantis-mini-review', 'logitech-g305-lightspeed-review'].map(productId),
    relatedArticles: ['logitech-g-pro-x-superlight-2-vs-pulsar-x2v2-mini', 'how-to-choose-gaming-mouse-2026', 'best-budget-gaming-mouse-logitech-g305'],
    content: `<h2>Quick picks by grip and budget</h2><p>For small-hand claw or claw/fingertip use, start by comparing the <strong>Pulsar X2V2 Mini</strong> with the <strong>Lamzu Atlantis Mini</strong>. For a premium compact fingertip option, consider the <strong>Razer Viper Mini Signature Edition</strong>. For lower-cost wireless reliability, the <strong>Logitech G305</strong> is an alternative if you accept its heavier AA-powered design. These are fit-based recommendations, not a claim that one shape works for every small hand.</p>
<h2>Comparison: shape first, weight second</h2><table><thead><tr><th>Mouse</th><th>Start here if</th><th>Weight reference</th><th>Main compromise</th></tr></thead><tbody><tr><td>${productLink('pulsar-x2v2-mini-review', 'Pulsar X2V2 Mini')}</td><td>You want a compact claw or hybrid shape</td><td>About 52 g</td><td>Rear support and side shape may not fit every grip</td></tr><tr><td>${productLink('razer-viper-mini-signature-edition-review', 'Viper Mini Signature Edition')}</td><td>You already prefer a very light compact fingertip shell</td><td>About 49 g</td><td>Premium price and open-shell feel</td></tr><tr><td>${productLink('lamzu-atlantis-mini-review', 'Lamzu Atlantis Mini')}</td><td>You want an alternative compact claw shape</td><td>Check the exact Mini revision</td><td>Revision names and shell fit require care</td></tr><tr><td>${productLink('logitech-g305-lightspeed-review', 'Logitech G305')}</td><td>Budget and AA battery endurance matter most</td><td>About 99 g with an AA battery</td><td>Heavier than the ultralight picks</td></tr></tbody></table><p>Weights are nominal model references, not measurements from a new lab test. Battery choice, revision and accessories can change them. Manufacturer dimensions describe the outer shell, not necessarily the width where your fingers grip it.</p>
<h2>Measure your hand and current mouse</h2><ol><li>Measure hand length from wrist crease to middle fingertip and width across the knuckles, excluding the thumb.</li><li>Note where your palm touches the mouse and whether you use claw, fingertip or a relaxed hybrid.</li><li>Compare your current mouse's length, maximum width and hump position with the exact replacement model.</li><li>Check whether side buttons are reachable without rotating or tightening your grip.</li></ol><p>Under roughly 17 cm is a useful small-hand starting point, not a medical or universal sizing standard. Two players with the same hand length can prefer different shells because finger length, grip angle and palm contact differ.</p>
<h2>Which wireless gaming mice fit small hands and claw grip?</h2><p>The X2V2 Mini and Atlantis Mini are useful starting points for compact claw grip. Compare their rear support and waist rather than choosing from weight alone. In relaxed claw, the G305's rounded shell may be comfortable, but the added battery weight is noticeable during repeated lift-offs. A mouse is too large if you must stretch for buttons or cannot lift it without squeezing; a smaller mouse is not automatically better if it leaves the hand unsupported.</p>
<h2>Fingertip grip and premium options</h2><p>Fingertip users keep the palm mostly off the shell and make fine adjustments with the fingers. Low mass and a shell that leaves room for those movements are useful. The Viper Mini Signature Edition is a specialist premium option, not the default value recommendation. Consider the X2V2 Mini too, and use a return policy to check whether its hump interferes with your finger movement.</p>
<h2>Small-hand FPS checklist</h2><ul><li>Use a comfortable grip without consciously squeezing the shell.</li><li>Keep sensitivity stable while assessing a new shape; changing both at once makes fit harder to judge.</li><li>Place the receiver according to the manufacturer's instructions and keep the mousepad clean.</li><li>Prioritize reachable buttons and controlled lift-offs over maximum DPI or polling-rate headlines.</li><li>Check exact optical-switch and wireless specifications if those are purchase requirements; do not infer them from size alone.</li></ul>
<h2>Budget and availability</h2><p>A sale can change the best-value choice, but it cannot fix the wrong shape. Compare the final price, local warranty and returns rather than assuming availability is identical in every country. Our ${articleLink('best-budget-gaming-mouse-logitech-g305', 'G305 budget guide')} explains when battery endurance outweighs low weight. For a complete input upgrade, see the ${articleLink(setup, 'under-$200 setup plan')}.</p>
<h2>How this shortlist was selected</h2><p>This guide uses product features, published specifications and grip trade-offs; it does not report a standardized hands-on ranking or measured latency comparison. Fit remains personal. See the individual product guides and our ${articleLink('how-to-choose-gaming-mouse-2026', 'mouse buying checklist')} before choosing. For a larger-shell comparison, read ${articleLink('logitech-g-pro-x-superlight-2-vs-pulsar-x2v2-mini', 'Superlight 2 vs X2V2 Mini')}.</p>`,
    quickVerdict: { summary: 'Start with X2V2 Mini or Atlantis Mini for compact claw, Viper Mini SE for premium fingertip use, and G305 for budget wireless battery endurance. Check fit before weight; these are specification-based picks, not a new hands-on ranking.' }
  },
  [setup]: {
    title: 'Gaming Setup Under $200: Mouse, Keyboard and Audio Budget',
    seo: { title: 'Gaming Setup Under $200: Mouse, Keyboard & Audio', description: 'Plan a PC peripheral setup under $200 with a clear mouse, keyboard, headset and mousepad budget. PC and monitor excluded; prices are spending caps.', keywords: 'gaming setup under 200, best gaming peripherals for pc under 200, budget mouse keyboard headset', focusKeyword: 'gaming setup under 200' },
    excerpt: 'A $200 peripheral budget for an existing PC and monitor: allocate clear spending caps to controls, audio and a mousepad, with room for tax and shipping.',
    featured: true, readingTime: 5,
    featuredProducts: ['logitech-g305-lightspeed-review', 'royal-kludge-rk61-review'].map(productId),
    relatedArticles: [mice, 'gaming-peripherals-for-pc-buying-guide-2026', 'best-wireless-gaming-headsets-2026'],
    content: `<h2>What a $200 gaming setup includes</h2><p>This is a <strong>mouse, keyboard, audio and mousepad plan for an existing PC and monitor</strong>. It is not a claim that $200 buys a complete gaming computer, display, desk and chair. Spend first on controls that fit, reuse working equipment, and include tax and shipping in the cap.</p>
<h2>Example budget: spending limits, not live prices</h2><table><thead><tr><th>Item</th><th>Maximum allocation</th><th>What to prioritize</th></tr></thead><tbody><tr><td>Mouse</td><td>$45</td><td>Comfortable shape and reliable connection</td></tr><tr><td>Keyboard</td><td>$60</td><td>Useful layout and required connection modes</td></tr><tr><td>Headset or headphones</td><td>$50</td><td>Comfort, compatible connection and a usable microphone if needed</td></tr><tr><td>Mousepad</td><td>$15</td><td>Enough space for your sensitivity and a stable surface</td></tr><tr><td>Tax, shipping or reserve</td><td>$30</td><td>Avoid exceeding the budget at checkout</td></tr><tr><td>Total</td><td>$200</td><td>Reduce item caps if local charges exceed the reserve</td></tr></tbody></table><p>These are planning caps, not verified current offers. A named product belongs in this plan only if its delivered price fits. Reuse an existing headset or keyboard to move that allocation to the part that actually limits play.</p>
<h2>Mouse: consider G305, but check the grip</h2><p>The ${productLink('logitech-g305-lightspeed-review', 'Logitech G305')} is worth comparing when available within your mouse allocation. Wireless reliability and AA battery endurance are its strengths; roughly 99 g with an AA battery is the compromise. It is not a substitute for an ultralight fingertip mouse merely because it is inexpensive. Our ${articleLink(mice, 'small-hand mouse shortlist')} explains when a compact lighter alternative is worth reallocating the budget.</p>
<h2>Keyboard: a small layout is not always better</h2><p>The ${productLink('royal-kludge-rk61-review', 'Royal Kludge RK61')} is a compact option when its exact variant and delivered price fit your cap. A 60% layout frees mouse room but uses layers for arrows and function keys. If you need dedicated navigation, compare a budget TKL instead. Verify whether the particular RK61 listing includes the connection modes and hot-swap support you require; product variants can differ.</p>
<h2>Audio: reuse first, then solve a specific problem</h2><p>Keep working headphones if they are comfortable and your microphone is clear. Before buying, check whether your PC needs a combined or split 3.5 mm connection, USB audio, or a wireless dongle. Wireless headsets can consume too much of this budget; the ${articleLink('best-wireless-gaming-headsets-2026', 'wireless headset comparison')} is an upgrade reference, not a promise that either premium model fits a $50 cap.</p>
<h2>Three ways to adapt the plan</h2><ul><li><strong>FPS first:</strong> reuse audio and put the saving into a mouse that fits plus enough mousepad space.</li><li><strong>Gaming and work:</strong> keep dedicated arrows and a comfortable keyboard layout; do not sacrifice daily usability for RGB.</li><li><strong>Starting from scratch:</strong> budget separately for the PC and monitor before calling the peripheral plan complete.</li></ul>
<h2>Checkout checklist</h2><ol><li>Add delivered prices, tax, any wireless receiver and required adapters.</li><li>Confirm keyboard layout, connection modes, headset platform support and desk space.</li><li>Check the return policy for mouse shape and headset comfort.</li><li>Leave out decorative extras if the total exceeds $200.</li></ol><p>For a broader upgrade strategy, see our ${articleLink('gaming-peripherals-for-pc-buying-guide-2026', 'PC peripheral buying guide')}. A balanced setup is one you can use comfortably, not a bundle that replaces good equipment unnecessarily.</p>`,
    quickVerdict: { summary: 'For an existing PC and monitor, cap mouse at $45, keyboard at $60, audio at $50 and mousepad at $15, leaving $30 for tax, shipping or savings. These are budget allocations, not live product-price claims.' },
    faq: [
      { question: 'Can $200 buy a complete gaming PC setup?', answer: 'This plan covers peripherals only. A PC, monitor, desk and chair are excluded and require separate budgets.' },
      { question: 'Which peripherals should I buy first?', answer: 'Fix mouse fit and keyboard usability first. Reuse working audio and reserve money for tax, shipping and any required adapters.' },
      { question: 'Are these current product prices?', answer: 'No. The table gives spending caps. Check delivered prices and choose alternatives or reuse existing gear when a product exceeds its cap.' }
    ]
  },
  [comparison80]: {
    title: 'Wooting 80HE vs Razer Huntsman V3 Pro: 80% or TKL?',
    seo: { title: 'Wooting 80HE vs Huntsman V3 Pro: 80% or TKL?', description: 'Compare Wooting 80HE with Huntsman V3 Pro TKL by dedicated keys, Hall Effect vs analog optical switches, tuning workflow and daily use.', keywords: 'wooting 80he vs razer huntsman v3 pro tkl, 80he vs huntsman', focusKeyword: 'wooting 80he vs razer huntsman v3 pro' },
    featuredProducts: ['wooting-80he-review', 'razer-huntsman-v3-pro-review'].map(productId),
    relatedArticles: [keyboard, setup],
    quickVerdict: { summary: 'Compare 80HE with the Huntsman V3 Pro TKL when arrows and a function row matter. Wooting uses Hall Effect switches; Razer uses analog optical switches. Choose layout and workflow, not an unsupported latency winner.' }
  },
  'best-wireless-gaming-headsets-2026': {
    seo: { title: 'Wireless Gaming Headsets: Cloud III vs Nova Pro (2026)', description: 'Compare HyperX Cloud III Wireless and Arctis Nova Pro Wireless for battery routine, Bluetooth, source switching, comfort and platform compatibility.', keywords: 'best wireless gaming headset 2026, cloud iii wireless vs nova pro wireless', focusKeyword: 'best wireless gaming headset' },
    relatedArticles: [setup, 'gaming-peripherals-for-pc-buying-guide-2026']
  }
}

const statements: string[] = []
const changed: string[] = []
const quote = (text: string) => `'${text.replaceAll("'", "''")}'`
for (const row of rows) {
  const original = JSON.parse(row.data)
  let data = { ...original }
  const patch = updates[row.slug]
  if (patch) data = { ...data, ...patch }
  if (row.slug === comparison80) {
    data.content = `<h2>Compare the right sizes: 80HE vs Huntsman V3 Pro TKL</h2><p>The Wooting 80HE has dedicated arrows and a function row. Compare it with the Huntsman V3 Pro TKL when everyday key access matters; the Razer Mini and full-size versions are different layout choices. The 80HE uses Hall Effect sensing, while Huntsman V3 Pro uses analog optical sensing. Both support adjustable actuation and Rapid Trigger, but those shared features do not make both keyboards magnetic.</p><table><thead><tr><th>Priority</th><th>80HE</th><th>Huntsman V3 Pro TKL</th></tr></thead><tbody><tr><td>Dedicated everyday keys</td><td>80% layout with arrows and function row</td><td>TKL layout without number pad</td></tr><tr><td>Configuration</td><td>Wootility and per-key tuning</td><td>Synapse and supported onboard adjustments</td></tr><tr><td>Buying check</td><td>Exact case, configuration and delivered price</td><td>Exact variant, accessories and delivered price</td></tr></tbody></table><p>This is a feature-based comparison, not a measured latency test. For a smaller footprint, see ${articleLink(keyboard, '60HE vs Huntsman V3 Pro')}. Compare the ${productLink('wooting-80he-review', '80HE product guide')} with the ${productLink('razer-huntsman-v3-pro-review', 'Huntsman V3 Pro product guide')} before buying.</p>` + original.content
  }
  for (const field of ['content', 'reviewContent']) {
    if (typeof data[field] === 'string') data[field] = rewriteArticleLinks(data[field])
  }
  if (Array.isArray(data.relatedArticles)) {
    data.relatedArticles = [...new Set(data.relatedArticles.map((id: string) => {
      const related = rows.find(item => item.id === id || item.slug === id)
      return related && ARTICLE_REDIRECTS[related.slug] ? bySlug.get(ARTICLE_REDIRECTS[related.slug])!.id : id
    }))].filter(id => id !== row.id && id !== row.slug)
  }
  // Link existing relevant reviews and guides to the stronger topic hubs without duplicating blocks.
  if (row.collection_id === 'col-products-ce613aa5') {
    const field = typeof data.reviewContent === 'string' ? 'reviewContent' : undefined
    const topic = String(data.category || '')
    const hub = topic.includes('mice') ? mice : topic.includes('keyboard') ? keyboard : topic.includes('headset') ? 'best-wireless-gaming-headsets-2026' : undefined
    if (field && hub && !data[field].includes(`/en/article/${hub}`)) {
      data[field] += `<h2>Compare your options</h2><p>See our ${articleLink(hub, topic.includes('mice') ? 'small-hand mouse buying guide' : topic.includes('keyboard') ? 'keyboard layout and tuning comparison' : 'wireless headset buying guide')} for alternatives and purchase trade-offs.</p>`
    }
  }
  if (JSON.stringify(data) === JSON.stringify(original) && !patch) continue
  data.updatedAt = now
  const title = patch?.title || row.title
  statements.push(`UPDATE content SET title=${quote(title)}, data=${quote(JSON.stringify(data))}, updated_at=${now} WHERE id=${quote(row.id)} AND data=${quote(row.data)} AND title=${quote(row.title)} AND updated_at=${row.updated_at};`)
  changed.push(row.slug)
}
writeFileSync(`${directory}/publish.sql`, statements.join('\n'))
writeFileSync(`${directory}/manifest.json`, JSON.stringify({ now, changed }, null, 2))
console.log(JSON.stringify({ apply, backup: directory, count: changed.length, changed }, null, 2))
if (apply) {
  execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--file', `${directory}/publish.sql`], { stdio: 'inherit' })
  const verification = JSON.parse(execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--command', query, '--json'], { encoding: 'utf8' }))[0].results
  for (const slug of changed) {
    const row = verification.find((item: any) => item.slug === slug)
    if (Number(row?.updated_at) !== now) throw new Error(`Publish conflict or failed update: ${slug}`)
  }
  console.log(`Verified ${changed.length} published updates.`)
}
