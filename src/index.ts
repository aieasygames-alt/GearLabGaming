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
const app = new Hono()

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// API info endpoint
app.get('/api/info', (c) => {
  return c.json({
    name: 'GearLabGaming API',
    description: 'Gaming Gear Reviews & Guides',
    version: '1.0.0',
    endpoints: {
      admin: '/admin',
      api: '/api',
      collections: '/api/collections'
    }
  })
})

// Homepage - Simple landing page
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GearLabGaming - Expert Gaming Gear Reviews</title>
  <meta name="description" content="In-depth gaming peripheral reviews, buyer's guides, and setup tips.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-900 text-white min-h-screen">
  <!-- Header -->
  <header class="bg-gray-800/50 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-700">
    <nav class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/" class="text-2xl font-bold">🎮 GearLabGaming</a>
      <div class="flex items-center gap-6">
        <a href="/api/collections" class="text-gray-300 hover:text-white">API</a>
        <a href="/admin" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium">Admin</a>
      </div>
    </nav>
  </header>

  <!-- Hero -->
  <section class="py-20 px-4 text-center">
    <h1 class="text-5xl md:text-6xl font-extrabold mb-6">Expert Gaming Gear Reviews</h1>
    <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
      In-depth reviews, comparisons, and buying guides for gaming mice, keyboards, headsets, and monitors.
    </p>
    <div class="flex gap-4 justify-center">
      <a href="/api/content?collection=products" class="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">
        Browse Products
      </a>
      <a href="/api/content?collection=articles" class="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
        Read Articles
      </a>
    </div>
  </section>

  <!-- Stats -->
  <section class="py-12 px-4 bg-gray-800/50">
    <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <div class="text-4xl font-bold text-purple-400">100+</div>
        <div class="text-gray-400">Products Tested</div>
      </div>
      <div>
        <div class="text-4xl font-bold text-purple-400">500+</div>
        <div class="text-gray-400">Hours of Testing</div>
      </div>
      <div>
        <div class="text-4xl font-bold text-purple-400">2026</div>
        <div class="text-gray-400">Updated for</div>
      </div>
      <div>
        <div class="text-4xl font-bold text-purple-400">0%</div>
        <div class="text-gray-400">Sponsored Reviews</div>
      </div>
    </div>
  </section>

  <!-- API Quick Links -->
  <section class="py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center">API Endpoints</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gray-800 rounded-xl p-6">
          <div class="text-3xl mb-4">📦</div>
          <h3 class="text-xl font-bold mb-2">Products</h3>
          <p class="text-gray-400 text-sm mb-4">All product reviews and ratings</p>
          <code class="text-sm text-green-400 bg-gray-900 px-2 py-1 rounded">GET /api/content?collection=products</code>
        </div>
        <div class="bg-gray-800 rounded-xl p-6">
          <div class="text-3xl mb-4">📰</div>
          <h3 class="text-xl font-bold mb-2">Articles</h3>
          <p class="text-gray-400 text-sm mb-4">Guides, comparisons, and reviews</p>
          <code class="text-sm text-green-400 bg-gray-900 px-2 py-1 rounded">GET /api/content?collection=articles</code>
        </div>
        <div class="bg-gray-800 rounded-xl p-6">
          <div class="text-3xl mb-4">📁</div>
          <h3 class="text-xl font-bold mb-2">Categories</h3>
          <p class="text-gray-400 text-sm mb-4">Product categories and types</p>
          <code class="text-sm text-green-400 bg-gray-900 px-2 py-1 rounded">GET /api/content?collection=categories</code>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-800 border-t border-gray-700 py-8 px-4 text-center text-gray-500">
    <p>© 2026 GearLabGaming. All rights reserved.</p>
    <p class="mt-2 text-sm">Powered by SonicJS CMS on Cloudflare Workers</p>
  </footer>
</body>
</html>
  `)
})

// Mount core app (catch-all)
app.route('/', coreApp)

export default app
