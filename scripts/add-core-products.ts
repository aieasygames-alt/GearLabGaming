/**
 * Adds product reviews that strengthen the site's core buying paths.
 *
 * Usage (remote D1): npx tsx scripts/add-core-products.ts
 * Usage (local D1):  npx tsx scripts/add-core-products.ts --local
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
    id: 'prod-logitech-g-pro-x-superlight-2',
    slug: 'logitech-g-pro-x-superlight-2-review',
    title: 'Logitech G PRO X SUPERLIGHT 2',
    data: {
      name: 'Logitech G PRO X SUPERLIGHT 2',
      brand: 'Logitech',
      slug: 'logitech-g-pro-x-superlight-2-review',
      category: 'cat-mice',
      price: 159.99,
      priceRange: 'premium',
      images: ['/media/products/logitech-g-pro-x-superlight-2-review.webp'],
      specs: { weight: '60 g', connectivity: 'wireless', additionalSpecs: 'HERO 2 sensor; USB-C charging; ambidextrous shape with left-side buttons.' },
      rating: { overall: 9, buildQuality: 9, performance: 9.5, value: 8 },
      pros: ['Dependable esports-grade wireless performance', 'Low 60 g weight with a safe, versatile shape', 'Long battery life and USB-C charging'],
      cons: ['Premium price', 'Conservative shape may feel plain', 'Side buttons are left-hand only'],
      verdict: 'The G PRO X SUPERLIGHT 2 is a dependable premium pick for competitive players who want a light, familiar shape and proven wireless performance without chasing an aggressively specialized shell.',
      bestFor: ['fps-games', 'premium', 'wireless', 'lightweight'],
      affiliateLinks: { official: 'https://www.logitechg.com/en-us/products/gaming-mice/pro-x2-superlight-wireless-mouse.html' },
      buyingNotes: ['The neutral shape suits many claw and fingertip hybrids, but it is not truly ambidextrous for left-handed button use.', 'Compare sale pricing with lighter niche-shape alternatives before paying full retail.', 'Prioritize fit over polling-rate headlines when replacing an older mouse.'],
      faq: [
        { question: 'Is the G PRO X SUPERLIGHT 2 good for FPS games?', answer: 'Yes. Its low weight, accurate sensor, and reliable wireless connection make it a strong FPS option. Shape comfort remains more important than its specifications for long-term aim consistency.' },
        { question: 'Who should choose the SUPERLIGHT 2?', answer: 'It suits players who prefer a safe, medium-size shape and want a light premium wireless mouse without committing to an extreme ergonomic or small-hand shell.' }
      ],
      seo: { title: 'Logitech G PRO X SUPERLIGHT 2 Review', description: 'Logitech G PRO X SUPERLIGHT 2 review covering shape, 60 g weight, HERO 2 sensor, wireless performance, battery life, and competitive FPS value.', keywords: 'logitech g pro x superlight 2 review, superlight 2 gaming mouse, lightweight wireless fps mouse', focusKeyword: 'logitech g pro x superlight 2 review' },
      reviewContent: '<h2>Who the SUPERLIGHT 2 is for</h2><p>The Logitech G PRO X SUPERLIGHT 2 is a premium wireless mouse built for players who value a low-effort shape, low weight, and dependable competitive performance. Its design is intentionally conservative: instead of forcing a highly sculpted grip, it gives claw and fingertip hybrids a familiar foundation.</p><h2>Shape and weight</h2><p>At roughly 60 g, the mouse feels easy to start and stop in fast shooters without becoming fragile or overly narrow. The medium shell is broad enough for many hand sizes, though players who need a pronounced palm hump or a very small body should compare more specialized shapes.</p><h2>Wireless performance and ownership</h2><p>Sensor tracking and wireless consistency are strengths, while USB-C charging removes the older Micro-USB inconvenience. Long battery life makes it simple to use as a daily competitive mouse. The premium price is the real compromise, especially when discounted alternatives can offer a better shape match.</p><h2>Verdict</h2><p>The SUPERLIGHT 2 is a polished, reliable premium FPS mouse. Choose it when its safe shape fits your hand; choose a more specialized option when you already know you need a small, ergonomic, or aggressive claw-focused shell.</p>',
      status: 'published', publishedAt: now, updatedAt: now, featured: true
    }
  },
  {
    id: 'prod-pulsar-x2v2-mini',
    slug: 'pulsar-x2v2-mini-review',
    title: 'Pulsar X2V2 Mini',
    data: {
      name: 'Pulsar X2V2 Mini', brand: 'Pulsar', slug: 'pulsar-x2v2-mini-review', category: 'cat-mice', price: 94.95, priceRange: 'mid-range',
      images: ['/media/products/pulsar-x2v2-mini-review.webp'],
      specs: { weight: '52 g', connectivity: 'wireless', additionalSpecs: 'Symmetrical compact shell; 2.4 GHz wireless; optical switches; high-end PixArt sensor.' },
      rating: { overall: 8.8, buildQuality: 8.4, performance: 9.1, value: 8.7 },
      pros: ['Compact shape works well for small-hand claw and fingertip grips', 'Very low weight', 'Strong feature set below flagship pricing'],
      cons: ['Compact dimensions will not suit larger palm grips', 'Shape is less universally safe than larger mice', 'Fit should be confirmed with a return policy'],
      verdict: 'The Pulsar X2V2 Mini is one of the strongest value-focused lightweight wireless options for small-hand claw and fingertip players, provided its compact shape matches your grip.',
      bestFor: ['fingertip-grip', 'claw-grip', 'fps-games', 'wireless', 'lightweight'],
      affiliateLinks: { official: 'https://pulsar.gg/products/x2v2-mini' },
      buyingNotes: ['Best suited to small hands or players who use an active claw or fingertip grip.', 'Compare shell dimensions with your current mouse before ordering.', 'A lower price than flagship mice does not compensate for a shape that is too short for your palm.'],
      faq: [
        { question: 'Is the Pulsar X2V2 Mini good for small hands?', answer: 'Yes. Its compact symmetrical shell is especially suited to small-hand claw and fingertip users. Larger hands may still use it for fingertip grip but should not expect palm support.' },
        { question: 'Is the X2V2 Mini better value than premium ultralight mice?', answer: 'It offers a strong sensor, low weight, and wireless performance at a lower price. The deciding factor is shape, not a simple feature comparison.' }
      ],
      seo: { title: 'Pulsar X2V2 Mini Review: Small Hand FPS Mouse', description: 'Pulsar X2V2 Mini review covering its compact shape, 52 g weight, wireless performance, small-hand claw grip fit, and FPS value.', keywords: 'pulsar x2v2 mini review, small gaming mouse, claw grip mouse, lightweight wireless mouse', focusKeyword: 'pulsar x2v2 mini review' },
      reviewContent: '<h2>Who the X2V2 Mini is for</h2><p>The Pulsar X2V2 Mini targets a specific but popular need: a lightweight wireless mouse that gives small-hand claw and fingertip players enough room for active adjustments. Its compact shell is its defining feature, not a compromise to ignore.</p><h2>Fit and control</h2><p>The short, low profile makes it easy to move with the fingertips and reset aim quickly. It works best when the palm does not need full support. Players with larger hands can use it for fingertip grip, but relaxed palm users should compare a larger shell before buying.</p><h2>Performance and value</h2><p>Low weight, modern wireless performance, and a capable sensor give it the competitive essentials without reaching flagship pricing. That makes it especially compelling for players who already know a compact symmetric mouse fits their grip. The best savings still come from avoiding a poor shape match.</p><h2>Verdict</h2><p>The X2V2 Mini is a focused recommendation for small-hand claw and fingertip players. It is a better value choice than many flagship ultralights when its compact proportions suit you.</p>',
      status: 'published', publishedAt: now, updatedAt: now, featured: true
    }
  },
  {
    id: 'prod-wooting-80he',
    slug: 'wooting-80he-review',
    title: 'Wooting 80HE',
    data: {
      name: 'Wooting 80HE', brand: 'Wooting', slug: 'wooting-80he-review', category: 'cat-keyboards', price: 199.99, priceRange: 'premium',
      images: ['/media/products/wooting-80he-review.webp'],
      specs: { dimensions: '80% layout', connectivity: 'wired', additionalSpecs: 'Hall Effect switches; adjustable actuation; Rapid Trigger; per-key analog input; Wootility configuration software.' },
      rating: { overall: 9.2, buildQuality: 9, performance: 9.7, value: 8.5 },
      pros: ['Excellent actuation and Rapid Trigger controls', '80% layout retains dedicated arrows and navigation keys', 'Mature Wootility software'],
      cons: ['Premium price', 'Wired-only operation', 'Feature depth can encourage unnecessary tuning'],
      verdict: 'The Wooting 80HE combines class-leading Hall Effect tuning with a practical compact layout, making it a strong performance keyboard for players who want competitive controls without the compromises of a 60% board.',
      bestFor: ['fps-games', 'premium'],
      affiliateLinks: { official: 'https://wooting.io/wooting-80he' },
      buyingNotes: ['Start with conservative actuation settings and tune movement keys before changing every key.', 'Choose 80% when you need dedicated arrows and navigation controls outside games.', 'Rapid Trigger is useful only when it is configured consistently and practiced with.'],
      faq: [
        { question: 'Is the Wooting 80HE better than a 60% Hall Effect keyboard?', answer: 'It keeps the performance controls while adding dedicated arrow and navigation keys. A 60% board leaves more mouse room, but the 80HE is easier to use for mixed gaming and productivity.' },
        { question: 'Does Rapid Trigger make you better at FPS games?', answer: 'It can make movement resets feel more responsive, but it does not replace aim or practice. Conservative, repeatable settings are more useful than maximum sensitivity.' }
      ],
      seo: { title: 'Wooting 80HE Review: Best 80% Rapid Trigger Keyboard?', description: 'Wooting 80HE review covering Hall Effect switches, Rapid Trigger, adjustable actuation, Wootility software, 80% layout, and competitive FPS value.', keywords: 'wooting 80he review, rapid trigger keyboard, hall effect keyboard, 80 percent gaming keyboard', focusKeyword: 'wooting 80he review' },
      reviewContent: '<h2>What makes the 80HE different</h2><p>The Wooting 80HE gives competitive players Hall Effect controls and Rapid Trigger in an 80% layout. That matters because it preserves arrow and navigation keys while still keeping a smaller footprint than a full-size keyboard.</p><h2>Actuation and Rapid Trigger</h2><p>Wootility makes per-key actuation and rapid-reset behavior accessible, especially for movement keys in FPS games. The useful approach is restrained tuning: save a stable profile, adjust only the keys that benefit, and avoid settings so shallow that normal typing causes accidental inputs.</p><h2>Layout and daily use</h2><p>The 80% layout is easier to live with than a 60% keyboard for users who write, navigate, or work at the same desk. It gives up some mouse room compared with the smallest boards, but the practical keys are worth more for many mixed-use setups.</p><h2>Verdict</h2><p>The Wooting 80HE is a standout premium performance keyboard for players who want deep Hall Effect control in a practical layout. Buy it for its configuration quality and layout fit, not simply because Rapid Trigger is fashionable.</p>',
      status: 'published', publishedAt: now, updatedAt: now, featured: true
    }
  },
  {
    id: 'prod-hyperx-cloud-iii-wireless',
    slug: 'hyperx-cloud-iii-wireless-review',
    title: 'HyperX Cloud III Wireless',
    data: {
      name: 'HyperX Cloud III Wireless', brand: 'HyperX', slug: 'hyperx-cloud-iii-wireless-review', category: 'cat-headsets', price: 149.99, priceRange: 'premium',
      images: ['/media/products/hyperx-cloud-iii-wireless-review.webp'],
      specs: { weight: '330 g', connectivity: 'wireless', additionalSpecs: '2.4 GHz wireless USB dongle; detachable boom microphone; long battery-life design; PC and console compatibility varies by platform.' },
      rating: { overall: 8.6, buildQuality: 8.5, performance: 8.6, value: 8.7 },
      pros: ['Comfortable fit for long sessions', 'Long battery life', 'Clear detachable microphone and straightforward wireless setup'],
      cons: ['No Bluetooth for phone use', 'Sound benefits from EQ adjustment', 'Premium headset features are limited'],
      verdict: 'The HyperX Cloud III Wireless is a sensible long-session wireless headset for players who value comfort, battery life, and straightforward PC or console audio more than feature-heavy software or multi-device extras.',
      bestFor: ['fps-games', 'wireless'],
      affiliateLinks: { official: 'https://hyperx.com/products/hyperx-cloud-iii-wireless-gaming-headset' },
      buyingNotes: ['Fit and clamp force are more important than a headline battery-life claim.', 'Check platform compatibility before buying for a specific console.', 'Use a modest EQ adjustment if the default tuning does not suit your games or voice chat.'],
      faq: [
        { question: 'Is the HyperX Cloud III Wireless good for long gaming sessions?', answer: 'It is a strong option for long sessions because comfort and battery life are central to its design. Headset fit remains personal, so use a retailer with returns if possible.' },
        { question: 'Does the Cloud III Wireless have Bluetooth?', answer: 'No. It uses a 2.4 GHz USB wireless connection, which favors low-latency gaming but is less flexible for phone use.' }
      ],
      seo: { title: 'HyperX Cloud III Wireless Review: Long-Battery Headset', description: 'HyperX Cloud III Wireless review covering comfort, sound, microphone quality, battery life, 2.4 GHz wireless performance, and gaming value.', keywords: 'hyperx cloud iii wireless review, wireless gaming headset, long battery gaming headset, hyperx headset microphone', focusKeyword: 'hyperx cloud iii wireless review' },
      reviewContent: '<h2>Who the Cloud III Wireless is for</h2><p>The HyperX Cloud III Wireless is a practical wireless headset for players who want reliable daily audio rather than a complex premium ecosystem. Its priorities are comfort, a simple low-latency connection, a clear microphone, and battery life that does not demand constant charging.</p><h2>Comfort and battery life</h2><p>Comfort is the reason to consider this headset over more feature-heavy alternatives. The fit works well for many long sessions, while the battery design reduces routine charging pressure. Because head shape and glasses change the result, buyers should still treat fit as a personal test rather than a universal guarantee.</p><h2>Audio and microphone</h2><p>Sound works well for game effects and chat after a small amount of EQ adjustment. The detachable boom microphone is clear enough for team communication. The headset lacks Bluetooth, so it is best for players who prioritize the stable 2.4 GHz gaming connection over phone flexibility.</p><h2>Verdict</h2><p>The Cloud III Wireless is a strong, uncomplicated choice for long PC or console sessions. It gives up premium switching and app features in exchange for comfort and useful battery endurance.</p>',
      status: 'published', publishedAt: now, updatedAt: now, featured: false
    }
  },
  {
    id: 'prod-lg-27gs95qe-b',
    slug: 'lg-ultragear-27gs95qe-b-review',
    title: 'LG UltraGear 27GS95QE-B',
    data: {
      name: 'LG UltraGear 27GS95QE-B', brand: 'LG', slug: 'lg-ultragear-27gs95qe-b-review', category: 'cat-monitors', price: 899.99, priceRange: 'ultra-premium',
      images: ['/media/products/lg-ultragear-27gs95qe-b-review.webp'],
      specs: { dimensions: '27-inch', connectivity: 'wired', additionalSpecs: '2560 x 1440 OLED panel; 240 Hz refresh rate; adaptive sync; HDMI 2.1 connectivity.' },
      rating: { overall: 9.1, buildQuality: 8.8, performance: 9.7, value: 8 },
      pros: ['Outstanding contrast and pixel response time', '240 Hz motion clarity at 1440p', 'HDMI 2.1 adds console flexibility'],
      cons: ['OLED burn-in care remains a consideration', 'Premium price', 'Text clarity and brightness trade-offs versus IPS'],
      verdict: 'The LG UltraGear 27GS95QE-B is a compelling 1440p 240Hz OLED for players who prioritize contrast and motion clarity, provided they accept OLED ownership trade-offs and premium pricing.',
      bestFor: ['fps-games', 'premium'],
      affiliateLinks: { official: 'https://www.lg.com/us/monitors/lg-27gs95qe-b-gaming-monitor' },
      buyingNotes: ['Choose OLED for contrast and motion, not for the brightest all-day desktop experience.', 'Use the panel-care tools and consider static desktop use before buying.', 'Compare current pricing with IPS 1440p 240Hz and newer OLED options.'],
      faq: [
        { question: 'Is a 1440p 240Hz OLED worth it for gaming?', answer: 'It can be a meaningful upgrade for players who value smooth motion and deep contrast. The value depends on your GPU performance, game mix, budget, and willingness to manage OLED panel care.' },
        { question: 'Is OLED burn-in still a concern?', answer: 'Yes. Modern OLED monitors include protection features, but static desktop elements and long fixed-image use remain considerations. Buyers should understand the warranty and panel-care guidance.' }
      ],
      seo: { title: 'LG UltraGear 27GS95QE-B Review: 1440p 240Hz OLED', description: 'LG UltraGear 27GS95QE-B review covering 1440p 240Hz OLED motion, contrast, HDR, HDMI 2.1, burn-in considerations, and gaming value.', keywords: 'lg 27gs95qe-b review, 1440p 240hz oled monitor, lg ultragear oled gaming monitor, oled monitor burn in', focusKeyword: 'lg 27gs95qe-b review' },
      reviewContent: '<h2>Who this OLED monitor is for</h2><p>The LG UltraGear 27GS95QE-B is for players who want fast 1440p motion and OLED contrast in one display. Its core benefit is not simply the 240Hz number: near-instant pixel response and deep blacks make competitive and cinematic games look more immediate.</p><h2>Motion and image quality</h2><p>The 240Hz refresh rate and OLED response behavior deliver exceptionally clear motion. At 1440p, the monitor is easier to drive than 4K while keeping a sharp image on a 27-inch screen. OLED contrast also gives dark scenes more depth than a typical IPS panel.</p><h2>Ownership trade-offs</h2><p>OLED requires more deliberate ownership than IPS. Static desktop elements, panel-care settings, text rendering preferences, and long office use should be considered before purchase. It is also a premium monitor, so its value improves when your system can consistently use the refresh rate.</p><h2>Verdict</h2><p>The 27GS95QE-B is an excellent 1440p OLED gaming display for players who value response time and contrast over a low price or worry-free static desktop use.</p>',
      status: 'published', publishedAt: now, updatedAt: now, featured: true
    }
  },
  {
    id: 'prod-dell-alienware-aw2723df',
    slug: 'alienware-aw2723df-review',
    title: 'Alienware AW2723DF',
    data: {
      name: 'Alienware AW2723DF', brand: 'Alienware', slug: 'alienware-aw2723df-review', category: 'cat-monitors', price: 549.99, priceRange: 'ultra-premium',
      images: ['/media/products/alienware-aw2723df-review.webp'],
      specs: { dimensions: '27-inch', connectivity: 'wired', additionalSpecs: '2560 x 1440 Fast IPS panel; up to 280 Hz overclocked refresh rate; adaptive sync; USB hub.' },
      rating: { overall: 8.9, buildQuality: 8.7, performance: 9.4, value: 8.3 },
      pros: ['Fast 1440p IPS motion with 280Hz mode', 'Good color and viewing angles', 'Avoids OLED static-content concerns'],
      cons: ['HDR and IPS contrast are limited', '280Hz mode requires a capable PC and supported connection', 'Less cinematic than OLED'],
      verdict: 'The Alienware AW2723DF is a strong high-refresh IPS alternative for competitive 1440p players who prioritize bright-room usability and fast motion without OLED panel-care concerns.',
      bestFor: ['fps-games', 'premium'],
      affiliateLinks: { official: 'https://www.dell.com/en-us/shop/alienware-27-gaming-monitor-aw2723df/apd/210-bfgr/monitors-monitor-accessories' },
      buyingNotes: ['Use the 280Hz mode only when your GPU and games can benefit from it.', 'Choose IPS over OLED when static desktop work and bright-room use are priorities.', 'Treat HDR as secondary to the monitor\'s motion and color strengths.'],
      faq: [
        { question: 'Is the Alienware AW2723DF good for competitive gaming?', answer: 'Yes. Its fast 1440p IPS panel and high refresh rate make it a strong choice for competitive players who can produce high frame rates.' },
        { question: 'Should I choose this IPS monitor or a 240Hz OLED?', answer: 'Choose OLED for contrast and pixel response. Choose this IPS option when brighter desktop use, static content, and avoiding OLED panel-care trade-offs matter more.' }
      ],
      seo: { title: 'Alienware AW2723DF Review: 1440p 280Hz IPS', description: 'Alienware AW2723DF review covering its 1440p Fast IPS panel, 280Hz mode, motion clarity, color, HDR limits, and competitive gaming value.', keywords: 'alienware aw2723df review, 1440p 280hz monitor, fast ips gaming monitor, competitive gaming monitor', focusKeyword: 'alienware aw2723df review' },
      reviewContent: '<h2>What the AW2723DF does best</h2><p>The Alienware AW2723DF is a 1440p Fast IPS monitor for players who want high-refresh competitive performance without moving to OLED. Its appeal is bright, flexible IPS usability paired with a refresh rate that can reward a capable PC in fast shooters.</p><h2>Motion and refresh rate</h2><p>Its high-refresh mode gives fast games a clean, responsive feel when the system can maintain suitably high frame rates. 1440p remains a practical target because it is sharper than 1080p while being easier to drive than 4K. Use a sensible overdrive setting and adaptive sync rather than assuming the fastest setting is always best.</p><h2>IPS versus OLED</h2><p>Fast IPS provides good color and viewing angles without OLED burn-in considerations, which makes it practical for mixed work and gaming desks. The trade-off is contrast and HDR impact: dark scenes will not match OLED depth.</p><h2>Verdict</h2><p>The AW2723DF is a strong competitive IPS option for players who want 1440p speed and bright-room flexibility. It is best when motion and daily usability matter more than OLED contrast.</p>',
      status: 'published', publishedAt: now, updatedAt: now, featured: false
    }
  }
]

const statements = products.map((product) => `DELETE FROM content WHERE collection_id = '${collection}' AND slug = '${product.slug}';
INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at)
VALUES ('${product.id}', '${collection}', '${product.slug}', '${esc(product.title)}', '${json(product.data)}', 'published', 'usr-admin-001', ${now}, ${now});`)

execFileSync('npx', [
  'wrangler', 'd1', 'execute', 'DB', local ? '--local' : '--remote', '--command', statements.join('\n')
], { stdio: 'inherit' })

console.log(`Upserted ${products.length} core product reviews (${local ? 'local' : 'remote'} D1).`)
