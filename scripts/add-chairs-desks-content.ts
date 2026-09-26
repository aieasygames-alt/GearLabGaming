/**
 * Adds the first high-interest Chairs & Desks product reviews.
 *
 * Usage (remote D1): npx tsx scripts/add-chairs-desks-content.ts
 * Usage (local D1): npx tsx scripts/add-chairs-desks-content.ts --local
 */
import { execFileSync } from 'node:child_process'

const local = process.argv.includes('--local')
const now = Math.floor(Date.now() / 1000)
const collection = 'col-products-ce613aa5'
const esc = (value: string) => value.replaceAll("'", "''")
const json = (value: unknown) => esc(JSON.stringify(value))

type Product = {
  id: string
  slug: string
  title: string
  data: Record<string, unknown>
}

const products: Product[] = [
  {
    id: 'prod-secretlab-titan-evo',
    slug: 'secretlab-titan-evo-review',
    title: 'Secretlab TITAN Evo',
    data: {
      name: 'Secretlab TITAN Evo',
      brand: 'Secretlab',
      slug: 'secretlab-titan-evo-review',
      category: 'cat-chairs-001',
      price: 549,
      priceRange: 'ultra-premium',
      specs: {
        connectivity: 'wired',
        additionalSpecs: 'Available in Small, Regular, and XL sizes; 4-way L-ADAPT lumbar support; magnetic memory-foam head pillow options vary by configuration.'
      },
      rating: { overall: 8.9, buildQuality: 9, performance: 8.7, value: 8.1 },
      pros: [
        'Three size options make fit easier to match',
        'Adjustable lumbar support and robust build',
        'Broad upholstery and design selection'
      ],
      cons: [
        'Premium price before options and accessories',
        'Firm seat feel will not suit every buyer',
        'Assembly and box size require space'
      ],
      verdict: 'The Secretlab TITAN Evo is a strong premium gaming-chair choice when you prioritize sizing options, adjustable lumbar support, and long-term build quality over a soft, plush seat feel.',
      bestFor: ['premium'],
      affiliateLinks: { official: 'https://secretlab.co/products/titan-evo-2022-series' },
      buyingNotes: [
        'Choose the size from Secretlab\'s current height and weight guidance rather than assuming one shell fits everyone.',
        'Decide between fabric and leatherette based on room temperature, cleaning needs, and preferred texture.',
        'Check the delivered box dimensions and return policy before ordering.'
      ],
      faq: [
        { question: 'Is the Secretlab TITAN Evo good for long gaming sessions?', answer: 'It is a strong option for long sessions when the chosen size and lumbar setting fit your body. The seat is relatively firm, so buyers who prefer a plush cushion should try it through a retailer with returns.' },
        { question: 'Which TITAN Evo size should I choose?', answer: 'Use Secretlab\'s current size guidance and compare both height and weight. Sizing is one of the TITAN Evo\'s main advantages, so it should be decided before upholstery or design.' },
        { question: 'Is the TITAN Evo better than an ergonomic office chair?', answer: 'The TITAN Evo offers a gaming-chair form factor, adjustable lumbar support, and broad design options. A traditional ergonomic office chair may be a better fit for buyers who prioritize mesh ventilation or a different posture profile.' }
      ],
      seo: {
        title: 'Secretlab TITAN Evo Review: Premium Gaming Chair',
        description: 'Secretlab TITAN Evo review covering sizes, lumbar support, comfort, materials, build quality, and whether this premium gaming chair is worth it.',
        keywords: 'secretlab titan evo review, premium gaming chair, gaming chair lumbar support, secretlab chair sizes',
        focusKeyword: 'secretlab titan evo review'
      },
      reviewContent: `<h2>Who the TITAN Evo is for</h2><p>The Secretlab TITAN Evo is a premium gaming chair for buyers who want a more deliberate fit than a one-size chair can offer. Its biggest advantage is availability in multiple sizes, paired with adjustable lumbar support and a sturdy, gaming-focused frame. It is best evaluated as a long-term comfort purchase rather than as a soft lounge chair.</p><h2>Fit and sizing</h2><p>Choosing the right size is central to this chair. Use the manufacturer\'s current guidance for height and weight, then consider shoulder width and preferred sitting position. A chair that is too large can reduce support, while a chair that is too small can make the side bolsters and seat feel restrictive.</p><h2>Lumbar support and comfort</h2><p>The adjustable lumbar system lets buyers tune lower-back support rather than relying on a fixed cushion. That is useful for long gaming and work sessions, but it does not replace healthy breaks or a desk height that suits your posture. The seat has a firmer character than a heavily padded recliner, which some buyers will appreciate for support and others will not.</p><h2>Materials and ownership</h2><p>Upholstery choice matters. Fabric can be a better fit for warm rooms and buyers who prefer a softer texture, while leatherette is easier to wipe clean. The chair is a substantial delivery and requires assembly space, so confirm access, box size, and return arrangements before ordering.</p><h2>Alternatives</h2><p>The Razer Iskur V2 is worth comparing when highly adjustable lumbar support is the main priority. A quality ergonomic office chair may be more suitable for buyers who prioritize breathable mesh or an office-style seating position over gaming-chair aesthetics.</p><h2>Verdict</h2><p>The TITAN Evo remains a sensible premium gaming-chair shortlist because it combines size selection, adjustability, and build quality. It is strongest for buyers willing to spend time on sizing and who are comfortable with a firmer seat profile.</p>`,
      status: 'published',
      publishedAt: now,
      updatedAt: now,
      featured: true
    }
  },
  {
    id: 'prod-secretlab-magnus-pro-xl',
    slug: 'secretlab-magnus-pro-xl-review',
    title: 'Secretlab MAGNUS Pro XL',
    data: {
      name: 'Secretlab MAGNUS Pro XL',
      brand: 'Secretlab',
      slug: 'secretlab-magnus-pro-xl-review',
      category: 'cat-chairs-001',
      price: 999,
      priceRange: 'ultra-premium',
      specs: {
        dimensions: '1770 x 670 mm desktop surface',
        connectivity: 'wired',
        additionalSpecs: 'Electric height-adjustable metal desk with integrated cable-management tray and optional magnetic ecosystem accessories.'
      },
      rating: { overall: 8.8, buildQuality: 9.2, performance: 8.8, value: 7.8 },
      pros: [
        'Large, sturdy desk surface for multi-monitor setups',
        'Integrated cable-management system is unusually tidy',
        'Electric height adjustment supports sit-stand workflows'
      ],
      cons: [
        'High starting price and optional ecosystem costs',
        'Heavy delivery and more involved setup',
        'Accessory ecosystem is more valuable for buyers who commit to it'
      ],
      verdict: 'The Secretlab MAGNUS Pro XL is a premium sit-stand gaming desk with standout cable management and space for larger setups, but its price makes the most sense when you will use its integrated ecosystem.',
      bestFor: ['premium'],
      affiliateLinks: { official: 'https://secretlab.co/products/magnus-pro' },
      buyingNotes: [
        'Measure room clearance, delivery route, and monitor-arm footprint before choosing the XL size.',
        'Price the desk with the cable and monitor accessories you actually intend to use.',
        'Confirm desktop depth is sufficient for your monitor stands, keyboard, and preferred viewing distance.'
      ],
      faq: [
        { question: 'Is the MAGNUS Pro XL large enough for multiple monitors?', answer: 'Its XL desktop is designed for larger multi-monitor and gaming setups. Confirm your monitor-arm clamp requirements and usable depth before ordering, especially with large displays.' },
        { question: 'Is the Secretlab MAGNUS Pro XL worth the price?', answer: 'It is most compelling when integrated cable management, electric height adjustment, and the magnetic accessory ecosystem solve real setup problems for you. A standard standing desk can cost less when those features are not important.' },
        { question: 'What should I measure before buying the MAGNUS Pro XL?', answer: 'Measure room width, desk depth, delivery route, monitor-arm clearance, and your preferred viewing distance. Include the space needed for the cable-management area and any accessories.' }
      ],
      seo: {
        title: 'Secretlab MAGNUS Pro XL Review: Premium Gaming Desk',
        description: 'Secretlab MAGNUS Pro XL review covering desk size, electric height adjustment, cable management, multi-monitor setups, accessories, and value.',
        keywords: 'secretlab magnus pro xl review, gaming standing desk, gaming desk cable management, premium gaming desk',
        focusKeyword: 'secretlab magnus pro xl review'
      },
      reviewContent: `<h2>Who the MAGNUS Pro XL is for</h2><p>The Secretlab MAGNUS Pro XL is a premium electric standing desk for players and creators with a larger PC setup. Its value is driven by desk space, height adjustment, and integrated cable management rather than by a generic claim that every gaming desk needs a branded accessory ecosystem.</p><h2>Desk size and setup planning</h2><p>The XL model offers a broad work surface suited to larger monitors, dual displays, and full-size peripherals. Before ordering, measure usable room width, monitor-arm clamp clearance, and preferred viewing distance. A desk can be wide enough on paper but still feel shallow once large monitor stands and a keyboard are in place.</p><h2>Height adjustment and ergonomics</h2><p>Electric height adjustment supports both seated and standing work. The important result is not simply standing more often; it is being able to set screen, keyboard, and chair heights to a comfortable position. Save a few repeatable presets after the desk is assembled rather than constantly chasing the highest or lowest setting.</p><h2>Cable management and accessories</h2><p>Integrated cable management is the product\'s defining benefit. It can make a multi-device setup easier to maintain, particularly when paired with compatible monitor arms and power routing. Those accessories add cost, so buyers should price the full setup and avoid buying parts that do not solve a specific desk problem.</p><h2>Alternatives</h2><p>A conventional standing desk can be better value for a single-monitor setup or for buyers who already own cable trays and monitor arms. The MAGNUS Pro XL is more compelling when you want a unified, clean multi-monitor setup and will use the desk\'s accessory system.</p><h2>Verdict</h2><p>The MAGNUS Pro XL is a strong premium gaming-desk option for large setups where cable management and adjustable height are daily priorities. Its high price is easier to justify when the integrated system replaces several separate accessories.</p>`,
      status: 'published',
      publishedAt: now,
      updatedAt: now,
      featured: true
    }
  }
]

const statements = products.map((product) => `DELETE FROM content WHERE collection_id = '${collection}' AND slug = '${product.slug}';
INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at)
VALUES ('${product.id}', '${collection}', '${product.slug}', '${esc(product.title)}', '${json(product.data)}', 'published', 'usr-admin-001', ${now}, ${now})
;`)

execFileSync('npx', [
  'wrangler', 'd1', 'execute', 'DB', local ? '--local' : '--remote', '--command', statements.join('\n')
], { stdio: 'inherit' })

console.log(`Upserted ${products.length} Chairs & Desks products (${local ? 'local' : 'remote'} D1).`)
