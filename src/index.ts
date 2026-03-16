/**
 * GearLabGaming - Gaming Gear Reviews & Guides
 *
 * SonicJS Headless CMS Application
 */

import { Hono } from 'hono'
import { createSonicJSApp, registerCollections } from '@sonicjs-cms/core'
import type { SonicJSConfig } from '@sonicjs-cms/core'

// Import custom collections
import categoriesCollection from './collections/categories.collection'
import productsCollection from './collections/products.collection'
import articlesCollection from './collections/articles.collection'
import authorsCollection from './collections/authors.collection'

// Register all custom collections
registerCollections([
  categoriesCollection,
  productsCollection,
  articlesCollection,
  authorsCollection
])

// Application configuration
const config: SonicJSConfig = {
  collections: {
    autoSync: true
  },
  plugins: {
    autoLoad: true,
    disableAll: false
  }
}

// Create the core application
const coreApp = createSonicJSApp(config)

// Create main app with custom routes
const app = new Hono<{ Bindings: { DB: any } }>()

// Collection IDs
const COLLECTIONS = {
  products: 'col-products-ce613aa5',
  articles: 'col-articles-f7a0326f',
  categories: 'col-categories-d8563a2b',
  authors: 'col-authors-c6c7e80c'
}

// Helper: Query content from D1 database
async function getContent(db: any, collectionId: string, options: { limit?: number; slug?: string } = {}) {
  let sql = 'SELECT * FROM content WHERE collection_id = ?'
  const params: any[] = [collectionId]

  if (options.slug) {
    sql += ' AND slug = ?'
    params.push(options.slug)
  }

  sql += ' ORDER BY created_at DESC'

  if (options.limit) {
    sql += ' LIMIT ?'
    params.push(options.limit)
  }

  const result = await db.prepare(sql).bind(...params).all()

  return result.results.map((row: any) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    collectionId: row.collection_id,
    data: typeof row.data === 'string' ? JSON.parse(row.data) : row.data,
    created_at: row.created_at,
    updated_at: row.updated_at
  }))
}

// Helper: Get single content by slug
async function getContentBySlug(db: any, collectionId: string, slug: string) {
  const results = await getContent(db, collectionId, { slug, limit: 1 })
  return results[0] || null
}

// Helper: Common HTML wrapper
function wrapHTML(title: string, content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | GearLabGaming</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-900 text-white min-h-screen">
  <header class="bg-gray-800/50 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-700">
    <nav class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/" class="text-2xl font-bold">🎮 GearLabGaming</a>
      <div class="flex items-center gap-4">
        <a href="/products" class="text-gray-300 hover:text-white">Products</a>
        <a href="/articles" class="text-gray-300 hover:text-white">Articles</a>
        <a href="/categories" class="text-gray-300 hover:text-white">Categories</a>
        <a href="/admin" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium">Admin</a>
      </div>
    </nav>
  </header>
  ${content}
  <footer class="bg-gray-800 border-t border-gray-700 py-8 px-4 text-center text-gray-500 mt-16">
    <p>© 2026 GearLabGaming. All rights reserved.</p>
  </footer>
</body>
</html>`
}

// Helper: Get category icon
function getCategoryIcon(categoryId: string): string {
  if (!categoryId) return '📦'
  if (categoryId.includes('mice') || categoryId === 'cat-mice-001') return '🖱️'
  if (categoryId.includes('keyboard') || categoryId === 'cat-keyboards-001') return '⌨️'
  if (categoryId.includes('headset') || categoryId === 'cat-headsets-001') return '🎧'
  if (categoryId.includes('monitor') || categoryId === 'cat-monitors-001') return '🖥️'
  if (categoryId.includes('chair') || categoryId === 'cat-chairs-001') return '🪑'
  return '📦'
}

// ============================================
// HEALTH & API ENDPOINTS
// ============================================

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' })
})

app.get('/api/info', (c) => {
  return c.json({
    name: 'GearLabGaming API',
    description: 'Gaming Gear Reviews & Guides',
    version: '1.0.0'
  })
})

// ============================================
// HOMEPAGE
// ============================================

app.get('/', async (c) => {
  const db = c.env.DB

  const [products, articles, categories] = await Promise.all([
    getContent(db, COLLECTIONS.products, { limit: 6 }),
    getContent(db, COLLECTIONS.articles, { limit: 3 }),
    getContent(db, COLLECTIONS.categories, { limit: 6 })
  ])

  const productsHTML = products.map((p: any) => `
    <a href="/product/${p.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="aspect-video bg-gray-700 flex items-center justify-center text-6xl">${getCategoryIcon(p.data?.category)}</div>
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-purple-400">${p.data?.brand || ''}</span>
          <span class="text-sm bg-green-500/20 text-green-400 px-2 py-0.5 rounded">⭐ ${p.data?.rating?.overall || '-'}/10</span>
        </div>
        <h3 class="font-bold mb-1">${p.title}</h3>
        <p class="text-2xl font-bold text-purple-400">$${p.data?.price || '-'}</p>
      </div>
    </a>
  `).join('') || '<p class="col-span-3 text-gray-400">Loading products...</p>'

  const articlesHTML = articles.map((a: any) => `
    <a href="/article/${a.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="h-32 bg-gradient-to-br from-purple-600 to-blue-600"></div>
      <div class="p-4">
        <span class="text-xs text-purple-400 uppercase">${a.data?.type || 'article'}</span>
        <h3 class="font-bold mt-1">${a.title}</h3>
        <p class="text-gray-400 text-sm mt-2 line-clamp-2">${a.data?.excerpt || ''}</p>
      </div>
    </a>
  `).join('') || ''

  const categoriesHTML = categories.map((cat: any) => `
    <a href="/category/${cat.data?.slug || cat.slug}" class="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition block">
      <div class="text-4xl mb-2">${cat.data?.icon || '📦'}</div>
      <div class="font-semibold">${cat.data?.name || cat.title}</div>
    </a>
  `).join('') || ''

  return c.html(wrapHTML('Expert Gaming Gear Reviews', `
    <!-- Hero -->
    <section class="py-20 px-4 text-center bg-gradient-to-b from-gray-800 to-gray-900">
      <h1 class="text-5xl md:text-6xl font-extrabold mb-6">Expert Gaming Gear Reviews</h1>
      <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">In-depth reviews, comparisons, and buying guides for gaming mice, keyboards, headsets, and monitors.</p>
      <div class="flex gap-4 justify-center">
        <a href="/products" class="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">Browse Products</a>
        <a href="/articles" class="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">Read Articles</a>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">Browse by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">${categoriesHTML}</div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-12 px-4 bg-gray-800/30">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Featured Products</h2>
          <a href="/products" class="text-purple-400 hover:text-purple-300">View All →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${productsHTML}</div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Latest Articles</h2>
          <a href="/articles" class="text-purple-400 hover:text-purple-300">View All →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${articlesHTML}</div>
      </div>
    </section>
  `))
})

// ============================================
// PRODUCTS LIST
// ============================================

app.get('/products', async (c) => {
  const db = c.env.DB
  const products = await getContent(db, COLLECTIONS.products, { limit: 50 })

  const productsHTML = products.map((p: any) => `
    <a href="/product/${p.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="aspect-video bg-gray-700 flex items-center justify-center text-6xl">${getCategoryIcon(p.data?.category)}</div>
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-purple-400">${p.data?.brand || ''}</span>
          <span class="text-sm bg-green-500/20 text-green-400 px-2 py-0.5 rounded">⭐ ${p.data?.rating?.overall || '-'}/10</span>
        </div>
        <h3 class="font-bold mb-2">${p.title}</h3>
        <p class="text-gray-400 text-sm mb-3">${(p.data?.verdict || '').substring(0, 80)}...</p>
        <div class="flex justify-between items-center">
          <span class="text-xl font-bold text-purple-400">$${p.data?.price || '-'}</span>
          <span class="text-purple-400">Read Review →</span>
        </div>
      </div>
    </a>
  `).join('') || '<p class="col-span-3 text-gray-400">No products found.</p>'

  return c.html(wrapHTML('All Products', `
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">All Products</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${productsHTML}</div>
      </div>
    </section>
  `))
})

// ============================================
// PRODUCT DETAIL
// ============================================

app.get('/product/:slug', async (c) => {
  const slug = c.req.param('slug')
  const db = c.env.DB
  const p = await getContentBySlug(db, COLLECTIONS.products, slug)

  if (!p) {
    return c.html(wrapHTML('Product Not Found', `
      <section class="py-20 px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">Product Not Found</h1>
        <a href="/products" class="text-purple-400">← Back to Products</a>
      </section>
    `))
  }

  const prosHTML = p.data?.pros?.map((pro: string) => `<li class="flex items-center gap-2"><span class="text-green-400">✓</span> ${pro}</li>`).join('') || ''
  const consHTML = p.data?.cons?.map((con: string) => `<li class="flex items-center gap-2"><span class="text-red-400">✗</span> ${con}</li>`).join('') || ''

  return c.html(wrapHTML(p.title, `
    <section class="py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <a href="/products" class="text-purple-400 mb-4 inline-block">← Back to Products</a>

        <div class="bg-gray-800 rounded-xl overflow-hidden">
          <div class="aspect-video bg-gray-700 flex items-center justify-center text-8xl">${getCategoryIcon(p.data?.category)}</div>
          <div class="p-8">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-purple-400">${p.data?.brand}</span>
              <span class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">⭐ ${p.data?.rating?.overall}/10</span>
              ${p.data?.featured ? '<span class="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">Featured</span>' : ''}
            </div>

            <h1 class="text-3xl font-bold mb-4">${p.title}</h1>

            <div class="text-4xl font-bold text-purple-400 mb-6">$${p.data?.price}</div>

            <p class="text-xl text-gray-300 mb-8">${p.data?.verdict || ''}</p>

            <!-- Specs -->
            <div class="bg-gray-900 rounded-lg p-6 mb-8">
              <h2 class="text-xl font-bold mb-4">Specifications</h2>
              <div class="grid grid-cols-2 gap-4 text-sm">
                ${p.data?.specs?.weight ? `<div><span class="text-gray-400">Weight:</span> <span class="font-medium">${p.data.specs.weight}</span></div>` : ''}
                ${p.data?.specs?.dimensions ? `<div><span class="text-gray-400">Dimensions:</span> <span class="font-medium">${p.data.specs.dimensions}</span></div>` : ''}
                ${p.data?.specs?.connectivity ? `<div><span class="text-gray-400">Connectivity:</span> <span class="font-medium">${p.data.specs.connectivity}</span></div>` : ''}
                ${p.data?.specs?.sensor ? `<div><span class="text-gray-400">Sensor:</span> <span class="font-medium">${p.data.specs.sensor}</span></div>` : ''}
              </div>
            </div>

            <!-- Rating Breakdown -->
            <div class="bg-gray-900 rounded-lg p-6 mb-8">
              <h2 class="text-xl font-bold mb-4">Rating Breakdown</h2>
              <div class="space-y-3">
                <div class="flex items-center gap-4">
                  <span class="w-32 text-gray-400">Overall</span>
                  <div class="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-purple-500" style="width: ${(p.data?.rating?.overall || 0) * 10}%"></div>
                  </div>
                  <span class="font-bold">${p.data?.rating?.overall}/10</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-32 text-gray-400">Build Quality</span>
                  <div class="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500" style="width: ${(p.data?.rating?.buildQuality || 0) * 10}%"></div>
                  </div>
                  <span class="font-bold">${p.data?.rating?.buildQuality}/10</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-32 text-gray-400">Performance</span>
                  <div class="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500" style="width: ${(p.data?.rating?.performance || 0) * 10}%"></div>
                  </div>
                  <span class="font-bold">${p.data?.rating?.performance}/10</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-32 text-gray-400">Value</span>
                  <div class="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-yellow-500" style="width: ${(p.data?.rating?.value || 0) * 10}%"></div>
                  </div>
                  <span class="font-bold">${p.data?.rating?.value}/10</span>
                </div>
              </div>
            </div>

            <!-- Pros & Cons -->
            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <div class="bg-gray-900 rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4 text-green-400">Pros</h2>
                <ul class="space-y-2">${prosHTML}</ul>
              </div>
              <div class="bg-gray-900 rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4 text-red-400">Cons</h2>
                <ul class="space-y-2">${consHTML}</ul>
              </div>
            </div>

            <!-- Buy Links -->
            <div class="flex gap-4">
              ${p.data?.affiliateLinks?.amazon ? `<a href="${p.data.affiliateLinks.amazon}" target="_blank" class="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold">Buy on Amazon</a>` : ''}
              ${p.data?.affiliateLinks?.official ? `<a href="${p.data.affiliateLinks.official}" target="_blank" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">Buy Direct</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `))
})

// ============================================
// ARTICLES LIST
// ============================================

app.get('/articles', async (c) => {
  const db = c.env.DB
  const articles = await getContent(db, COLLECTIONS.articles, { limit: 50 })

  const articlesHTML = articles.map((a: any) => `
    <a href="/article/${a.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="h-40 bg-gradient-to-br from-purple-600 to-blue-600"></div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs text-purple-400 uppercase font-medium">${a.data?.type || 'article'}</span>
          <span class="text-xs text-gray-500">${a.data?.readingTime || 5} min read</span>
        </div>
        <h3 class="font-bold text-lg mb-2">${a.title}</h3>
        <p class="text-gray-400 text-sm line-clamp-2">${a.data?.excerpt || ''}</p>
      </div>
    </a>
  `).join('') || '<p class="col-span-3 text-gray-400">No articles found.</p>'

  return c.html(wrapHTML('All Articles', `
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">All Articles</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${articlesHTML}</div>
      </div>
    </section>
  `))
})

// ============================================
// ARTICLE DETAIL
// ============================================

app.get('/article/:slug', async (c) => {
  const slug = c.req.param('slug')
  const db = c.env.DB
  const a = await getContentBySlug(db, COLLECTIONS.articles, slug)

  if (!a) {
    return c.html(wrapHTML('Article Not Found', `
      <section class="py-20 px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">Article Not Found</h1>
        <a href="/articles" class="text-purple-400">← Back to Articles</a>
      </section>
    `))
  }

  return c.html(wrapHTML(a.title, `
    <article class="py-12 px-4">
      <div class="max-w-3xl mx-auto">
        <a href="/articles" class="text-purple-400 mb-4 inline-block">← Back to Articles</a>

        <header class="mb-8">
          <span class="text-purple-400 uppercase text-sm font-medium">${a.data?.type || 'article'}</span>
          <h1 class="text-4xl font-bold mt-2 mb-4">${a.title}</h1>
          <p class="text-xl text-gray-400">${a.data?.excerpt || ''}</p>
          <div class="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>${a.data?.readingTime || 5} min read</span>
            <span>•</span>
            <span>Updated ${new Date(a.updated_at || a.created_at).toLocaleDateString()}</span>
          </div>
        </header>

        <div class="bg-gray-800 rounded-xl p-8">
          <div class="prose prose-invert max-w-none">
            ${a.data?.content || '<p class="text-gray-400">Content coming soon...</p>'}
          </div>
        </div>

        ${a.data?.quickVerdict ? `
        <div class="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6 mt-8">
          <h2 class="text-xl font-bold mb-4">Quick Verdict</h2>
          <p class="text-gray-300">${a.data.quickVerdict.summary || ''}</p>
        </div>
        ` : ''}
      </div>
    </article>
  `))
})

// ============================================
// CATEGORIES LIST
// ============================================

app.get('/categories', async (c) => {
  const db = c.env.DB
  const categories = await getContent(db, COLLECTIONS.categories, { limit: 20 })

  const categoriesHTML = categories.map((cat: any) => `
    <a href="/category/${cat.data?.slug || cat.slug}" class="bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-700 transition block">
      <div class="text-6xl mb-4">${cat.data?.icon || '📦'}</div>
      <h3 class="text-xl font-bold mb-2">${cat.data?.name || cat.title}</h3>
      <p class="text-gray-400 text-sm">${cat.data?.description || ''}</p>
    </a>
  `).join('') || ''

  return c.html(wrapHTML('All Categories', `
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">All Categories</h1>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">${categoriesHTML}</div>
      </div>
    </section>
  `))
})

// ============================================
// CATEGORY DETAIL
// ============================================

app.get('/category/:slug', async (c) => {
  const slug = c.req.param('slug')
  const db = c.env.DB

  // Get all categories and find the one matching the slug
  const allCategories = await getContent(db, COLLECTIONS.categories, { limit: 100 })
  const category = allCategories.find((cat: any) =>
    cat.data?.slug === slug || cat.slug === slug
  )

  if (!category) {
    return c.html(wrapHTML('Category Not Found', `
      <section class="py-20 px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">Category Not Found</h1>
        <a href="/categories" class="text-purple-400">← Back to Categories</a>
      </section>
    `))
  }

  const catId = category.id
  const catName = category.data?.name || category.title || slug

  // Get all products and filter by category
  const allProducts = await getContent(db, COLLECTIONS.products, { limit: 100 })
  const filteredProducts = allProducts.filter((p: any) => {
    return p.data?.category === catId || p.data?.category?.includes(slug)
  })

  const productsHTML = filteredProducts.map((p: any) => `
    <a href="/product/${p.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="aspect-video bg-gray-700 flex items-center justify-center text-6xl">${getCategoryIcon(p.data?.category)}</div>
      <div class="p-4">
        <span class="text-sm text-purple-400">${p.data?.brand || ''}</span>
        <h3 class="font-bold mt-1">${p.title}</h3>
        <div class="flex justify-between items-center mt-2">
          <span class="text-xl font-bold text-purple-400">$${p.data?.price || '-'}</span>
          <span class="text-sm text-green-400">⭐ ${p.data?.rating?.overall || '-'}/10</span>
        </div>
      </div>
    </a>
  `).join('') || '<p class="col-span-3 text-gray-400">No products in this category yet.</p>'

  return c.html(wrapHTML(catName, `
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <a href="/categories" class="text-purple-400 mb-4 inline-block">← All Categories</a>
        <div class="flex items-center gap-4 mb-8">
          <span class="text-5xl">${category.data?.icon || '📦'}</span>
          <div>
            <h1 class="text-3xl font-bold">${catName}</h1>
            <p class="text-gray-400 mt-1">${category.data?.description || ''}</p>
          </div>
        </div>
        <h2 class="text-xl font-bold mb-6">${filteredProducts.length} Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${productsHTML}</div>
      </div>
    </section>
  `))
})

// Mount core app (catch-all)
app.route('/', coreApp)

export default app
