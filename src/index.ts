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

// Mount core app (catch-all)
app.route('/', coreApp)

export default app
