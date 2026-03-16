/**
 * Frontend Routes for GearLabGaming
 *
 * Static HTML pages for the public website
 */

import { Hono } from 'hono'

const frontend = new Hono()

// Helper function to fetch data from API
async function fetchAPI(endpoint: string) {
  const response = await fetch(`https://gearlabgaming.com${endpoint}`)
  return response.json()
}

// Homepage
frontend.get('/', async (c) => {
  const [products, articles, categories] = await Promise.all([
    fetchAPI('/api/content?collection=products&limit=6'),
    fetchAPI('/api/content?collection=articles&limit=3'),
    fetchAPI('/api/content?collection=categories&limit=5')
  ])

  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GearLabGaming - Expert Gaming Gear Reviews & Guides</title>
  <meta name="description" content="In-depth gaming peripheral reviews, buyer's guides, and setup tips. Mice, keyboards, headsets & monitors tested by real gamers.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-gray-900 text-white">
  <!-- Header -->
  <header class="bg-gray-800/50 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-700">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a href="/" class="text-2xl font-bold text-white">🎮 GearLabGaming</a>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a href="/category/mice" class="text-gray-300 hover:text-white transition">Mice</a>
          <a href="/category/keyboards" class="text-gray-300 hover:text-white transition">Keyboards</a>
          <a href="/category/headsets" class="text-gray-300 hover:text-white transition">Headsets</a>
          <a href="/category/monitors" class="text-gray-300 hover:text-white transition">Monitors</a>
          <a href="/guides" class="text-gray-300 hover:text-white transition">Guides</a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="relative py-20 px-4 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
    <div class="max-w-7xl mx-auto text-center relative z-10">
      <h1 class="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Expert Gaming Gear Reviews
      </h1>
      <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        In-depth reviews, comparisons, and buying guides for gaming mice, keyboards, headsets, and monitors.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/reviews" class="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
          Browse Reviews
        </a>
        <a href="/guides" class="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition">
          Read Guides
        </a>
      </div>
    </div>
  </section>

  <!-- Featured Products -->
  <section class="py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-8">Featured Reviews</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${products.data?.map((product: any) => `
          <div class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition">
            <div class="aspect-video bg-gray-700 flex items-center justify-center">
              <span class="text-6xl">${getCategoryIcon(product.data.category)}</span>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-purple-400 font-medium">${product.data.brand}</span>
                <span class="text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  ⭐ ${product.data.rating.overall}/10
                </span>
              </div>
              <h3 class="text-xl font-bold mb-2">${product.data.name}</h3>
              <p class="text-gray-400 text-sm mb-4">${product.data.verdict?.substring(0, 100)}...</p>
              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold">$${product.data.price}</span>
                <a href="/product/${product.slug}" class="text-purple-400 hover:text-purple-300 font-medium">
                  Read Review →
                </a>
              </div>
            </div>
          </div>
        `).join('') || '<p>Loading products...</p>'}
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="py-16 px-4 bg-gray-800/50">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-8">Browse by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        ${categories.data?.map((cat: any) => `
          <a href="/category/${cat.data.slug}" class="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition">
            <div class="text-4xl mb-3">${cat.data.icon || '📦'}</div>
            <div class="font-semibold">${cat.data.name}</div>
          </a>
        `).join('') || ''}
      </div>
    </div>
  </section>

  <!-- Latest Articles -->
  <section class="py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-8">Latest Articles</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${articles.data?.map((article: any) => `
          <article class="bg-gray-800 rounded-xl overflow-hidden">
            <div class="aspect-video bg-gradient-to-br from-purple-600 to-blue-600"></div>
            <div class="p-6">
              <span class="text-sm text-purple-400 font-medium uppercase">${article.data.type}</span>
              <h3 class="text-xl font-bold mt-2 mb-3">${article.title}</h3>
              <p class="text-gray-400 text-sm mb-4">${article.data.excerpt?.substring(0, 120)}...</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>${article.data.readingTime} min read</span>
                <a href="/article/${article.slug}" class="text-purple-400 hover:text-purple-300">Read →</a>
              </div>
            </div>
          </article>
        `).join('') || ''}
      </div>
    </div>
  </section>

  <!-- Trust Signals -->
  <section class="py-12 px-4 bg-gray-800/50">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-800 border-t border-gray-700 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 class="font-bold mb-4">🎮 GearLabGaming</h4>
          <p class="text-gray-400 text-sm">Expert gaming gear reviews and guides.</p>
        </div>
        <div>
          <h4 class="font-bold mb-4">Categories</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/category/mice" class="hover:text-white">Mice</a></li>
            <li><a href="/category/keyboards" class="hover:text-white">Keyboards</a></li>
            <li><a href="/category/headsets" class="hover:text-white">Headsets</a></li>
            <li><a href="/category/monitors" class="hover:text-white">Monitors</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Resources</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/guides" class="hover:text-white">Buyer's Guides</a></li>
            <li><a href="/how-we-test" class="hover:text-white">How We Test</a></li>
            <li><a href="/about" class="hover:text-white">About Us</a></li>
            <li><a href="/contact" class="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Legal</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/privacy" class="hover:text-white">Privacy Policy</a></li>
            <li><a href="/disclosure" class="hover:text-white">Affiliate Disclosure</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
        © 2026 GearLabGaming. All rights reserved.
      </div>
    </div>
  </footer>
</body>
</html>
  `)
})

// Helper function for category icons
function getCategoryIcon(categoryId: string): string {
  const icons: Record<string, string> = {
    'cat-mice-001': '🖱️',
    'cat-keyboards-001': '⌨️',
    'cat-headsets-001': '🎧',
    'cat-monitors-001': '🖥️',
    'cat-chairs-001': '🪑'
  }
  return icons[categoryId] || '📦'
}

export default frontend
