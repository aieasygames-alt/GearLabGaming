import assert from 'node:assert/strict'
import worker from '../src/index'

// Minimal public-content fixtures keep route tests independent of live D1 access.
const rows = [
  { id: 'mouse', collection_id: 'col-products-ce613aa5', slug: 'pulsar-x2v2-mini-review', title: 'Pulsar X2V2 Mini', data: { reviewContent: '<p>' + 'Review '.repeat(100) + '</p>', translations: { zh: { name: 'Pulsar 中文评测', verdict: '小巧鼠标的购买建议', reviewContent: '<p>' + '中文产品评测内容'.repeat(30) + '</p>' } } } },
  { id: 'keyboard', collection_id: 'col-products-ce613aa5', slug: 'keychron-q1-pro-review', title: 'Keychron', data: { reviewContent: 'Review '.repeat(100) } },
  { id: 'guide', collection_id: 'col-articles-f7a0326f', slug: 'wooting-60he-vs-razer-huntsman-v3-pro', title: 'Keyboard comparison', data: { content: '<h2>Comparison</h2><p>' + 'Guide '.repeat(180) + '</p>' } },
  { id: 'duplicate', collection_id: 'col-articles-f7a0326f', slug: 'best-small-gaming-mouse', title: 'Duplicate', data: { content: 'Guide '.repeat(180) } },
  { id: 'test', collection_id: 'col-categories-d8563a2b', slug: 'test-product-category', title: 'Test category', data: { slug: 'test-product-category', isActive: true } }
].map(row => ({ ...row, status: 'published', created_at: 1792150000, updated_at: 1792150000, data: JSON.stringify(row.data) }))
const env: any = {
  DB: { prepare(sql: string) {
    let args: any[] = []
    const statement: any = {
      bind(...values: any[]) { args = values; return statement },
      async all() {
        let result = rows.filter((row: any) => row.collection_id === args[0])
        if (sql.includes('AND slug = ?')) result = result.filter((row: any) => row.slug === args[1])
        return { results: result }
      },
      async first() { return null }
    }
    return statement
  } },
  MEDIA_BUCKET: {}, ENVIRONMENT: 'production'
}
const ctx: any = { waitUntil() {}, passThroughOnException() {} }
const request = (path: string) => worker.fetch(new Request(`https://gearlabgaming.com${path}`), env, ctx)
for (const path of ['/zh/category/mice', '/zh/articles', '/zh/product/keychron-q1-pro-review']) {
  const response = await request(path)
  assert.equal(response.status, 301, path)
  assert.equal(response.headers.get('location'), path.replace(/^\/zh/, '/en'))
}
for (const [source, target] of Object.entries((await import('../src/seo-policy')).ARTICLE_REDIRECTS)) {
  const response = await request(`/en/article/${source}`)
  assert.equal(response.status, 301)
  assert.equal(response.headers.get('location'), `/en/article/${target}`)
}
const chinese = await request('/zh/product/pulsar-x2v2-mini-review')
assert.equal(chinese.status, 200)
const chineseHTML = await chinese.text()
assert.ok(chineseHTML.includes('hreflang="zh"'))
assert.ok(chineseHTML.includes('中文产品评测内容'), 'Localized review body must render')
assert.ok(chineseHTML.includes('rel="canonical" href="https://gearlabgaming.com/zh/product/pulsar-x2v2-mini-review"'))
const sitemap = await (await request('/sitemap.xml')).text()
assert.ok(sitemap.includes('/zh/product/pulsar-x2v2-mini-review'))
assert.ok(!sitemap.includes('/article/best-small-gaming-mouse</loc>'))
assert.equal((await request('/en/category/test-product-category')).status, 404)
assert.equal((await request('/api/info')).headers.get('x-robots-tag'), 'noindex, follow')
const articleHTML = await (await request('/en/article/wooting-60he-vs-razer-huntsman-v3-pro')).text()
assert.ok(articleHTML.includes('rel="canonical" href="https://gearlabgaming.com/en/article/wooting-60he-vs-razer-huntsman-v3-pro"'))
assert.ok(articleHTML.includes('<h2 id="comparison">Comparison</h2>'), 'Sanitized article body must render')
assert.ok(!articleHTML.includes('Content coming soon...'))
assert.ok(!articleHTML.includes('href="/admin"'), 'Public navigation must not advertise admin')
const aboutHTML = await (await request('/en/about')).text()
assert.ok(aboutHTML.includes('Specifications are not hands-on test results'))
const privateResponse = await worker.fetch(new Request('https://gearlabgaming.com/admin'), {
  ...env, JWT_SECRET: 'test-only-random-secret-for-private-route-regression-tests'
}, ctx)
assert.equal(privateResponse.status, 401, 'Anonymous admin requests must require authentication, not fail with 500')
assert.equal(privateResponse.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive')
assert.equal(privateResponse.headers.get('cache-control'), 'private, no-store')
console.log('SEO route integration tests passed.')
