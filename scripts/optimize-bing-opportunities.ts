/** Back up and preview content patches; --apply publishes guarded updates. */
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const now = Math.floor(Date.now() / 1000)
const directory = `.wrangler/seo-backups/bing-${now}`
mkdirSync(directory, { recursive: true })
const query = "SELECT id,slug,title,data,updated_at FROM content WHERE slug IN ('how-to-choose-gaming-mouse-2026','best-gaming-mouse-for-small-hands-2026') AND status='published'"
const read = () => JSON.parse(execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--command', query, '--json'], { encoding: 'utf8' }))[0].results
const rows = read()
if (rows.length !== 2) throw new Error('Expected exactly two published mouse guides')
writeFileSync(`${directory}/before.json`, JSON.stringify(rows, null, 2))
const quote = (value: string) => `'${value.replaceAll("'", "''")}'`
const marker = '<h2>Sources and specification checks</h2>'
const guideSlug = 'how-to-choose-gaming-mouse-2026'
const sourceBlock = `${marker}<p>This is an editorial buying guide, not a standardized hands-on latency or durability test. Nominal weights, dimensions and features should be checked against the exact model revision. Our selection criteria are fit, reachable controls, connection requirements and delivered cost, not maximum DPI alone.</p><ul><li><a href="https://www.pulsar.gg/products/x2v2-mini-gaming-mouse">Pulsar X2V2 Mini manufacturer specifications</a> for model size, weight and switches.</li><li><a href="https://www.razer.com/gaming-mice/razer-viper-mini-signature-edition">Razer Viper Mini Signature Edition manufacturer specifications</a> for shell, weight and feature scope.</li><li><a href="https://www.logitechg.com/en-us/products/gaming-mice/g305-lightspeed-wireless-gaming-mouse.910-005280.html">Logitech G305 manufacturer specifications</a> for weight, battery and connection details.</li></ul><p>Specifications are sources for product facts, not proof that this site measured the product. See our <a href="/en/about">editorial method and limitations</a>. Product revisions, firmware and prices can change; verify the listing before checkout.</p>`
const measurementBlock = `<h2>A repeatable fit check at home</h2><ol><li>Record hand length from wrist crease to middle fingertip and width across knuckles, excluding the thumb. Measure twice using the same units.</li><li>Record your current mouse model, outer dimensions and where the palm touches its hump. Overall width is not necessarily grip width.</li><li>Keep the same mousepad, sensitivity and game while comparing fit. Check whether side buttons are reachable without rotating your hand.</li><li>Try tracking, lift-offs and normal desktop use across several sessions within the return window. Stop if the grip causes pain; this is not medical advice.</li></ol><p>Write down which action is uncomfortable rather than treating a generic hand-size cutoff as a guarantee. This is a proposed buyer checklist, not a report of tests performed by GearLabGaming.</p>`
const factorBlock = `<h2>What to look for in gaming mice: the short answer</h2><p>Choose a gaming mouse by <strong>shape and grip fit first</strong>, then weight, reachable buttons, connection reliability and software requirements. Use sensor and polling specifications as compatibility checks rather than a universal ranking. A high DPI figure cannot compensate for an uncomfortable shell.</p><h2>Gaming mouse comparison factors</h2><table><thead><tr><th>Factor</th><th>What to compare</th><th>What it does not prove</th></tr></thead><tbody><tr><td>Shape and dimensions</td><td>Length, grip width, hump location and button reach</td><td>Comfort for every hand of the same length</td></tr><tr><td>Weight</td><td>Exact revision and battery or cable configuration</td><td>That the lightest mouse gives the best control</td></tr><tr><td>Sensor and DPI</td><td>Supported range and consistent tracking at your settings</td><td>Better aim from maximum DPI</td></tr><tr><td>Polling rate</td><td>Mode support, receiver requirements and system workload</td><td>Measured end-to-end latency in your game</td></tr><tr><td>Switches</td><td>Exact switch type, click feel and warranty</td><td>A guarantee that failure or unwanted clicks cannot occur</td></tr><tr><td>Connectivity</td><td>Cable drag, receiver placement, charging or AA routine</td><td>Identical behavior across all wireless modes</td></tr><tr><td>Software</td><td>Operating-system support, onboard profiles and remapping</td><td>That every advertised feature works without software</td></tr></tbody></table>`
const statementList: string[] = []
for (const row of rows) {
  const data = JSON.parse(row.data)
  const oldData = row.data
  // Replace only our own source/checklist suffix on repeat runs.
  const ownSuffix = '<h2>A repeatable fit check at home</h2>'
  let content = String(data.content || '').split(ownSuffix)[0].split(marker)[0]
  if (row.slug === guideSlug) {
    const start = '<h2>What to look for in gaming mice: the short answer</h2>'
    content = content.startsWith(start) ? content : factorBlock + content
    data.seo = { ...data.seo, title: 'How to Choose a Gaming Mouse: Fit, Weight & Features', description: 'Choose a gaming mouse by hand fit, grip, weight, buttons, connectivity and software. Use a repeatable fit checklist and verify exact-model specifications.' }
    data.excerpt = 'What to look for in a gaming mouse: compare grip fit, shape, weight, controls, connection and software before chasing DPI or polling-rate headlines.'
    data.quickVerdict = { summary: 'Start with shape and reachable controls. Compare weight after fit, confirm connection and software needs, and verify the exact model. This guide explains purchase criteria; it does not publish measured latency rankings.' }
    data.relatedArticles = ['best-gaming-mouse-for-small-hands-2026', 'logitech-g-pro-x-superlight-2-vs-pulsar-x2v2-mini', 'best-budget-gaming-mouse-logitech-g305']
    data.featured = true
    data.faq = [
      { question: 'What should I look for in a gaming mouse?', answer: 'Start with grip fit, shell shape and reachable buttons. Then compare weight, connection, software compatibility and cost. Maximum DPI does not establish better control.' },
      { question: 'Does higher polling rate always improve a gaming mouse?', answer: 'It increases the potential report frequency, but real benefit depends on the system, game, display and implementation. It is not a substitute for a measured end-to-end latency comparison.' },
      { question: 'How do I choose a mouse for small hands?', answer: 'Measure your hand and compare shell shape, hump and button reach with your current mouse. Claw and fingertip users may prefer different shapes even with the same hand length.' }
    ]
  }
  data.content = content + measurementBlock + sourceBlock
  data.updatedAt = now
  statementList.push(`UPDATE content SET data=${quote(JSON.stringify(data))}, updated_at=${now} WHERE id=${quote(row.id)} AND data=${quote(oldData)} AND updated_at=${row.updated_at};`)
}
writeFileSync(`${directory}/publish.sql`, statementList.join('\n'))
console.log(`Preview: ${rows.length} guides; backup ${directory}`)
if (process.argv.includes('--apply')) {
  execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--file', `${directory}/publish.sql`], { stdio: 'inherit' })
  const after = read()
  if (after.some((row: any) => Number(row.updated_at) !== now)) throw new Error('Content update conflict; inspect backups before retrying')
  console.log('Verified both guide updates.')
}
