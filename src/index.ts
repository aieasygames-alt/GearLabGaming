/**
 * GearLabGaming - Gaming Gear Reviews & Guides
 *
 * SonicJS Headless CMS Application
 * Multi-language Support: EN, ZH, FR, ES, RU
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

// ============================================
// MULTI-LANGUAGE CONFIGURATION
// ============================================

const SUPPORTED_LOCALES = ['en', 'zh', 'fr', 'es', 'ru'] as const
type Locale = typeof SUPPORTED_LOCALES[number]
const DEFAULT_LOCALE: Locale = 'en'

const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский'
}

// Translation strings
const TRANSLATIONS: Record<Locale, any> = {
  en: {
    nav: { products: 'Products', articles: 'Articles', categories: 'Categories', admin: 'Admin' },
    home: {
      hero: 'Expert Gaming Gear Reviews',
      subtitle: 'In-depth reviews, comparisons, and buying guides for gaming mice, keyboards, headsets, and monitors.',
      browse: 'Browse Products',
      read: 'Read Articles',
      browseCategory: 'Browse by Category',
      featured: 'Featured Products',
      latest: 'Latest Articles',
      viewAll: 'View All'
    },
    products: {
      title: 'All Products',
      notFound: 'No products found.',
      readReview: 'Read Review'
    },
    articles: {
      title: 'All Articles',
      notFound: 'No articles found.',
      minRead: 'min read'
    },
    categories: {
      title: 'All Categories',
      notFound: 'No categories found.'
    },
    detail: {
      productNotFound: 'Product Not Found',
      articleNotFound: 'Article Not Found',
      categoryNotFound: 'Category Not Found',
      backProducts: '← Back to Products',
      backArticles: '← Back to Articles',
      backCategories: '← All Categories',
      featured: 'Featured',
      specs: 'Specifications',
      rating: 'Rating Breakdown',
      overall: 'Overall',
      buildQuality: 'Build Quality',
      performance: 'Performance',
      value: 'Value',
      pros: 'Pros',
      cons: 'Cons',
      buyAmazon: 'Buy on Amazon',
      buyDirect: 'Buy Direct',
      updated: 'Updated',
      quickVerdict: 'Quick Verdict',
      contentSoon: 'Content coming soon...',
      productsCount: 'Products',
      noProducts: 'No products in this category yet.'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. All rights reserved.'
    }
  },
  zh: {
    nav: { products: '产品', articles: '文章', categories: '分类', admin: '管理' },
    home: {
      hero: '专业游戏装备评测',
      subtitle: '游戏鼠标、键盘、耳机和显示器的深度评测、对比和购买指南。',
      browse: '浏览产品',
      read: '阅读文章',
      browseCategory: '按分类浏览',
      featured: '精选产品',
      latest: '最新文章',
      viewAll: '查看全部'
    },
    products: {
      title: '所有产品',
      notFound: '暂无产品。',
      readReview: '查看评测'
    },
    articles: {
      title: '所有文章',
      notFound: '暂无文章。',
      minRead: '分钟阅读'
    },
    categories: {
      title: '所有分类',
      notFound: '暂无分类。'
    },
    detail: {
      productNotFound: '未找到产品',
      articleNotFound: '未找到文章',
      categoryNotFound: '未找到分类',
      backProducts: '← 返回产品',
      backArticles: '← 返回文章',
      backCategories: '← 所有分类',
      featured: '精选',
      specs: '规格参数',
      rating: '评分详情',
      overall: '综合',
      buildQuality: '做工质量',
      performance: '性能表现',
      value: '性价比',
      pros: '优点',
      cons: '缺点',
      buyAmazon: '亚马逊购买',
      buyDirect: '官网购买',
      updated: '更新于',
      quickVerdict: '快速结论',
      contentSoon: '内容即将推出...',
      productsCount: '个产品',
      noProducts: '该分类暂无产品。'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. 保留所有权利。'
    }
  },
  fr: {
    nav: { products: 'Produits', articles: 'Articles', categories: 'Catégories', admin: 'Admin' },
    home: {
      hero: 'Avis d\'experts sur l\'équipement gaming',
      subtitle: 'Avis approfondis, comparaisons et guides d\'achat pour souris, claviers, casques et moniteurs gaming.',
      browse: 'Parcourir les produits',
      read: 'Lire les articles',
      browseCategory: 'Parcourir par catégorie',
      featured: 'Produits vedettes',
      latest: 'Derniers articles',
      viewAll: 'Voir tout'
    },
    products: {
      title: 'Tous les produits',
      notFound: 'Aucun produit trouvé.',
      readReview: 'Lire l\'avis'
    },
    articles: {
      title: 'Tous les articles',
      notFound: 'Aucun article trouvé.',
      minRead: 'min de lecture'
    },
    categories: {
      title: 'Toutes les catégories',
      notFound: 'Aucune catégorie trouvée.'
    },
    detail: {
      productNotFound: 'Produit non trouvé',
      articleNotFound: 'Article non trouvé',
      categoryNotFound: 'Catégorie non trouvée',
      backProducts: '← Retour aux produits',
      backArticles: '← Retour aux articles',
      backCategories: '← Toutes les catégories',
      featured: 'Vedette',
      specs: 'Spécifications',
      rating: 'Détail des notes',
      overall: 'Global',
      buildQuality: 'Qualité de fabrication',
      performance: 'Performance',
      value: 'Rapport qualité-prix',
      pros: 'Avantages',
      cons: 'Inconvénients',
      buyAmazon: 'Acheter sur Amazon',
      buyDirect: 'Acheter direct',
      updated: 'Mis à jour',
      quickVerdict: 'Verdict rapide',
      contentSoon: 'Contenu à venir...',
      productsCount: 'Produits',
      noProducts: 'Aucun produit dans cette catégorie.'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. Tous droits réservés.'
    }
  },
  es: {
    nav: { products: 'Productos', articles: 'Artículos', categories: 'Categorías', admin: 'Admin' },
    home: {
      hero: 'Reseñas expertas de equipos gaming',
      subtitle: 'Reseñas detalladas, comparaciones y guías de compra para ratones, teclados, auriculares y monitores gaming.',
      browse: 'Ver productos',
      read: 'Leer artículos',
      browseCategory: 'Explorar por categoría',
      featured: 'Productos destacados',
      latest: 'Últimos artículos',
      viewAll: 'Ver todo'
    },
    products: {
      title: 'Todos los productos',
      notFound: 'No se encontraron productos.',
      readReview: 'Leer reseña'
    },
    articles: {
      title: 'Todos los artículos',
      notFound: 'No se encontraron artículos.',
      minRead: 'min de lectura'
    },
    categories: {
      title: 'Todas las categorías',
      notFound: 'No se encontraron categorías.'
    },
    detail: {
      productNotFound: 'Producto no encontrado',
      articleNotFound: 'Artículo no encontrado',
      categoryNotFound: 'Categoría no encontrada',
      backProducts: '← Volver a productos',
      backArticles: '← Volver a artículos',
      backCategories: '← Todas las categorías',
      featured: 'Destacado',
      specs: 'Especificaciones',
      rating: 'Desglose de puntuación',
      overall: 'General',
      buildQuality: 'Calidad de construcción',
      performance: 'Rendimiento',
      value: 'Relación calidad-precio',
      pros: 'Ventajas',
      cons: 'Desventajas',
      buyAmazon: 'Comprar en Amazon',
      buyDirect: 'Comprar directo',
      updated: 'Actualizado',
      quickVerdict: 'Veredicto rápido',
      contentSoon: 'Contenido próximamente...',
      productsCount: 'Productos',
      noProducts: 'No hay productos en esta categoría.'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. Todos los derechos reservados.'
    }
  },
  ru: {
    nav: { products: 'Продукты', articles: 'Статьи', categories: 'Категории', admin: 'Админ' },
    home: {
      hero: 'Экспертные обзоры игрового оборудования',
      subtitle: 'Подробные обзоры, сравнения и руководства по покупке игровых мышей, клавиатур, гарнитур и мониторов.',
      browse: 'Смотреть продукты',
      read: 'Читать статьи',
      browseCategory: 'По категориям',
      featured: 'Рекомендуемые продукты',
      latest: 'Последние статьи',
      viewAll: 'Смотреть все'
    },
    products: {
      title: 'Все продукты',
      notFound: 'Продукты не найдены.',
      readReview: 'Читать обзор'
    },
    articles: {
      title: 'Все статьи',
      notFound: 'Статьи не найдены.',
      minRead: 'мин чтения'
    },
    categories: {
      title: 'Все категории',
      notFound: 'Категории не найдены.'
    },
    detail: {
      productNotFound: 'Продукт не найден',
      articleNotFound: 'Статья не найдена',
      categoryNotFound: 'Категория не найдена',
      backProducts: '← Назад к продуктам',
      backArticles: '← Назад к статьям',
      backCategories: '← Все категории',
      featured: 'Рекомендуем',
      specs: 'Характеристики',
      rating: 'Детальный рейтинг',
      overall: 'Общий',
      buildQuality: 'Качество сборки',
      performance: 'Производительность',
      value: 'Соотношение цена/качество',
      pros: 'Плюсы',
      cons: 'Минусы',
      buyAmazon: 'Купить на Amazon',
      buyDirect: 'Купить напрямую',
      updated: 'Обновлено',
      quickVerdict: 'Быстрый вердикт',
      contentSoon: 'Контент скоро появится...',
      productsCount: 'Продуктов',
      noProducts: 'В этой категории пока нет продуктов.'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. Все права защищены.'
    }
  }
}

// Collection IDs
const COLLECTIONS = {
  products: 'col-products-ce613aa5',
  articles: 'col-articles-f7a0326f',
  categories: 'col-categories-d8563a2b',
  authors: 'col-authors-c6c7e80c'
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Translation helper
function t(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = TRANSLATIONS[locale]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

// Get localized content from item
function getLocalizedContent(item: any, locale: Locale): any {
  if (!item) return null
  const data = item.data || {}
  const translations = data.translations?.[locale] || {}

  return {
    ...item,
    title: translations.title || item.title,
    data: {
      ...data,
      name: translations.name || data.name,
      verdict: translations.verdict || data.verdict,
      pros: translations.pros || data.pros || [],
      cons: translations.cons || data.cons || [],
      excerpt: translations.excerpt || data.excerpt,
      content: translations.content || data.content,
      description: translations.description || data.description
    }
  }
}

// Detect locale from Accept-Language header
function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE

  const languages = acceptLanguage.split(',').map(l => l.trim().split('-')[0].toLowerCase())

  for (const lang of languages) {
    if (lang === 'zh' || lang === 'zh-cn' || lang === 'zh-tw') return 'zh'
    if (lang === 'fr') return 'fr'
    if (lang === 'es') return 'es'
    if (lang === 'ru') return 'ru'
    if (lang === 'en') return 'en'
  }

  return DEFAULT_LOCALE
}

// Validate locale
function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale)
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

// Helper: Generate language switcher HTML
function getLanguageSwitcher(currentLocale: Locale, currentPath: string): string {
  const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '') || '/'

  const options = SUPPORTED_LOCALES.map(locale => {
    const isActive = locale === currentLocale
    const href = locale === DEFAULT_LOCALE ? `/${locale}${pathWithoutLang}` : `/${locale}${pathWithoutLang}`
    return `<a href="${href}" class="block px-4 py-2 text-sm ${isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}">${LOCALE_NAMES[locale]}</a>`
  }).join('')

  return `
    <div class="relative group">
      <button class="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white bg-gray-700 rounded-lg">
        <span>🌐</span>
        <span class="hidden sm:inline">${LOCALE_NAMES[currentLocale]}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div class="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        ${options}
      </div>
    </div>
  `
}

// Helper: Generate hreflang tags
function getHreflangTags(path: string): string {
  const pathWithoutLang = path.replace(/^\/[a-z]{2}/, '') || '/'

  return SUPPORTED_LOCALES.map(locale => {
    const href = `https://gearlabgaming.com/${locale}${pathWithoutLang}`
    return `<link rel="alternate" hreflang="${locale}" href="${href}" />`
  }).join('\n  ')
}

// Helper: Common HTML wrapper with locale support
function wrapHTML(title: string, content: string, locale: Locale, path: string) {
  const langSwitcher = getLanguageSwitcher(locale, path)
  const hreflangTags = getHreflangTags(path)

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | GearLabGaming</title>
  ${hreflangTags}
  <link rel="canonical" href="https://gearlabgaming.com/${locale}${path.replace(/^\/[a-z]{2}/, '') || '/'}" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-900 text-white min-h-screen">
  <header class="bg-gray-800/50 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-700">
    <nav class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/${locale}" class="text-2xl font-bold">🎮 GearLabGaming</a>
      <div class="flex items-center gap-4">
        <a href="/${locale}/products" class="text-gray-300 hover:text-white">${t(locale, 'nav.products')}</a>
        <a href="/${locale}/articles" class="text-gray-300 hover:text-white">${t(locale, 'nav.articles')}</a>
        <a href="/${locale}/categories" class="text-gray-300 hover:text-white">${t(locale, 'nav.categories')}</a>
        ${langSwitcher}
        <a href="/admin" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium">${t(locale, 'nav.admin')}</a>
      </div>
    </nav>
  </header>
  ${content}
  <footer class="bg-gray-800 border-t border-gray-700 py-8 px-4 text-center text-gray-500 mt-16">
    <p>${t(locale, 'footer.copyright')}</p>
  </footer>
</body>
</html>`
}

// ============================================
// ROOT REDIRECT
// ============================================

app.get('/', (c) => {
  const acceptLanguage = c.req.header('Accept-Language')
  const locale = detectLocale(acceptLanguage)
  return c.redirect(`/${locale}`)
})

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
    version: '1.0.0',
    supportedLocales: SUPPORTED_LOCALES
  })
})

// ============================================
// LOCALIZED HOMEPAGE
// ============================================

app.get('/:lang{en|zh|fr|es|ru}', async (c) => {
  const lang = c.req.param('lang')
  const locale: Locale = lang
  const db = c.env.DB

  const [products, articles, categories] = await Promise.all([
    getContent(db, COLLECTIONS.products, { limit: 6 }),
    getContent(db, COLLECTIONS.articles, { limit: 3 }),
    getContent(db, COLLECTIONS.categories, { limit: 6 })
  ])

  const productsHTML = products.map((p: any) => {
    const localized = getLocalizedContent(p, locale)
    return `
    <a href="/${locale}/product/${p.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="aspect-video bg-gray-700 flex items-center justify-center text-6xl">${getCategoryIcon(p.data?.category)}</div>
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-purple-400">${p.data?.brand || ''}</span>
          <span class="text-sm bg-green-500/20 text-green-400 px-2 py-0.5 rounded">⭐ ${p.data?.rating?.overall || '-'}/10</span>
        </div>
        <h3 class="font-bold mb-1">${localized.title}</h3>
        <p class="text-2xl font-bold text-purple-400">$${p.data?.price || '-'}</p>
      </div>
    </a>
  `}).join('') || `<p class="col-span-3 text-gray-400">${t(locale, 'products.notFound')}</p>`

  const articlesHTML = articles.map((a: any) => {
    const localized = getLocalizedContent(a, locale)
    return `
    <a href="/${locale}/article/${a.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="h-32 bg-gradient-to-br from-purple-600 to-blue-600"></div>
      <div class="p-4">
        <span class="text-xs text-purple-400 uppercase">${a.data?.type || 'article'}</span>
        <h3 class="font-bold mt-1">${localized.title}</h3>
        <p class="text-gray-400 text-sm mt-2 line-clamp-2">${localized.data?.excerpt || ''}</p>
      </div>
    </a>
  `}).join('') || ''

  const categoriesHTML = categories.map((cat: any) => {
    const localized = getLocalizedContent(cat, locale)
    return `
    <a href="/${locale}/category/${cat.data?.slug || cat.slug}" class="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition block">
      <div class="text-4xl mb-2">${cat.data?.icon || '📦'}</div>
      <div class="font-semibold">${localized.data?.name || localized.title}</div>
    </a>
  `}).join('') || ''

  return c.html(wrapHTML(t(locale, 'home.hero'), `
    <!-- Hero -->
    <section class="py-20 px-4 text-center bg-gradient-to-b from-gray-800 to-gray-900">
      <h1 class="text-5xl md:text-6xl font-extrabold mb-6">${t(locale, 'home.hero')}</h1>
      <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">${t(locale, 'home.subtitle')}</p>
      <div class="flex gap-4 justify-center">
        <a href="/${locale}/products" class="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">${t(locale, 'home.browse')}</a>
        <a href="/${locale}/articles" class="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">${t(locale, 'home.read')}</a>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">${t(locale, 'home.browseCategory')}</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">${categoriesHTML}</div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-12 px-4 bg-gray-800/30">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">${t(locale, 'home.featured')}</h2>
          <a href="/${locale}/products" class="text-purple-400 hover:text-purple-300">${t(locale, 'home.viewAll')} →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${productsHTML}</div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">${t(locale, 'home.latest')}</h2>
          <a href="/${locale}/articles" class="text-purple-400 hover:text-purple-300">${t(locale, 'home.viewAll')} →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${articlesHTML}</div>
      </div>
    </section>
  `, locale, `/${locale}`))
})

// ============================================
// LOCALIZED PRODUCTS LIST
// ============================================

app.get('/:lang{en|zh|fr|es|ru}/products', async (c) => {
  const lang = c.req.param('lang')
  const locale: Locale = lang
  const db = c.env.DB
  const products = await getContent(db, COLLECTIONS.products, { limit: 50 })

  const productsHTML = products.map((p: any) => {
    const localized = getLocalizedContent(p, locale)
    return `
    <a href="/${locale}/product/${p.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="aspect-video bg-gray-700 flex items-center justify-center text-6xl">${getCategoryIcon(p.data?.category)}</div>
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-purple-400">${p.data?.brand || ''}</span>
          <span class="text-sm bg-green-500/20 text-green-400 px-2 py-0.5 rounded">⭐ ${p.data?.rating?.overall || '-'}/10</span>
        </div>
        <h3 class="font-bold mb-2">${localized.title}</h3>
        <p class="text-gray-400 text-sm mb-3">${(localized.data?.verdict || '').substring(0, 80)}...</p>
        <div class="flex justify-between items-center">
          <span class="text-xl font-bold text-purple-400">$${p.data?.price || '-'}</span>
          <span class="text-purple-400">${t(locale, 'products.readReview')} →</span>
        </div>
      </div>
    </a>
  `}).join('') || `<p class="col-span-3 text-gray-400">${t(locale, 'products.notFound')}</p>`

  return c.html(wrapHTML(t(locale, 'products.title'), `
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">${t(locale, 'products.title')}</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${productsHTML}</div>
      </div>
    </section>
  `, locale, `/${locale}/products`))
})

// ============================================
// LOCALIZED PRODUCT DETAIL
// ============================================

app.get('/:lang{en|zh|fr|es|ru}/product/:slug', async (c) => {
  const lang = c.req.param('lang')
  const locale: Locale = lang
  const slug = c.req.param('slug')
  const db = c.env.DB
  const p = await getContentBySlug(db, COLLECTIONS.products, slug)

  if (!p) {
    return c.html(wrapHTML(t(locale, 'detail.productNotFound'), `
      <section class="py-20 px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">${t(locale, 'detail.productNotFound')}</h1>
        <a href="/${locale}/products" class="text-purple-400">${t(locale, 'detail.backProducts')}</a>
      </section>
    `, locale, `/${locale}/product/${slug}`))
  }

  const localized = getLocalizedContent(p, locale)
  const prosHTML = localized.data?.pros?.map((pro: string) => `<li class="flex items-center gap-2"><span class="text-green-400">✓</span> ${pro}</li>`).join('') || ''
  const consHTML = localized.data?.cons?.map((con: string) => `<li class="flex items-center gap-2"><span class="text-red-400">✗</span> ${con}</li>`).join('') || ''

  return c.html(wrapHTML(localized.title, `
    <section class="py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <a href="/${locale}/products" class="text-purple-400 mb-4 inline-block">${t(locale, 'detail.backProducts')}</a>

        <div class="bg-gray-800 rounded-xl overflow-hidden">
          <div class="aspect-video bg-gray-700 flex items-center justify-center text-8xl">${getCategoryIcon(p.data?.category)}</div>
          <div class="p-8">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-purple-400">${p.data?.brand}</span>
              <span class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">⭐ ${p.data?.rating?.overall}/10</span>
              ${p.data?.featured ? `<span class="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">${t(locale, 'detail.featured')}</span>` : ''}
            </div>

            <h1 class="text-3xl font-bold mb-4">${localized.title}</h1>

            <div class="text-4xl font-bold text-purple-400 mb-6">$${p.data?.price}</div>

            <p class="text-xl text-gray-300 mb-8">${localized.data?.verdict || ''}</p>

            <!-- Specs -->
            <div class="bg-gray-900 rounded-lg p-6 mb-8">
              <h2 class="text-xl font-bold mb-4">${t(locale, 'detail.specs')}</h2>
              <div class="grid grid-cols-2 gap-4 text-sm">
                ${p.data?.specs?.weight ? `<div><span class="text-gray-400">Weight:</span> <span class="font-medium">${p.data.specs.weight}</span></div>` : ''}
                ${p.data?.specs?.dimensions ? `<div><span class="text-gray-400">Dimensions:</span> <span class="font-medium">${p.data.specs.dimensions}</span></div>` : ''}
                ${p.data?.specs?.connectivity ? `<div><span class="text-gray-400">Connectivity:</span> <span class="font-medium">${p.data.specs.connectivity}</span></div>` : ''}
                ${p.data?.specs?.sensor ? `<div><span class="text-gray-400">Sensor:</span> <span class="font-medium">${p.data.specs.sensor}</span></div>` : ''}
              </div>
            </div>

            <!-- Rating Breakdown -->
            <div class="bg-gray-900 rounded-lg p-6 mb-8">
              <h2 class="text-xl font-bold mb-4">${t(locale, 'detail.rating')}</h2>
              <div class="space-y-3">
                <div class="flex items-center gap-4">
                  <span class="w-32 text-gray-400">${t(locale, 'detail.overall')}</span>
                  <div class="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-purple-500" style="width: ${(p.data?.rating?.overall || 0) * 10}%"></div>
                  </div>
                  <span class="font-bold">${p.data?.rating?.overall}/10</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-32 text-gray-400">${t(locale, 'detail.buildQuality')}</span>
                  <div class="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500" style="width: ${(p.data?.rating?.buildQuality || 0) * 10}%"></div>
                  </div>
                  <span class="font-bold">${p.data?.rating?.buildQuality}/10</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-32 text-gray-400">${t(locale, 'detail.performance')}</span>
                  <div class="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500" style="width: ${(p.data?.rating?.performance || 0) * 10}%"></div>
                  </div>
                  <span class="font-bold">${p.data?.rating?.performance}/10</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-32 text-gray-400">${t(locale, 'detail.value')}</span>
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
                <h2 class="text-xl font-bold mb-4 text-green-400">${t(locale, 'detail.pros')}</h2>
                <ul class="space-y-2">${prosHTML}</ul>
              </div>
              <div class="bg-gray-900 rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4 text-red-400">${t(locale, 'detail.cons')}</h2>
                <ul class="space-y-2">${consHTML}</ul>
              </div>
            </div>

            <!-- Buy Links -->
            <div class="flex gap-4">
              ${p.data?.affiliateLinks?.amazon ? `<a href="${p.data.affiliateLinks.amazon}" target="_blank" class="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold">${t(locale, 'detail.buyAmazon')}</a>` : ''}
              ${p.data?.affiliateLinks?.official ? `<a href="${p.data.affiliateLinks.official}" target="_blank" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">${t(locale, 'detail.buyDirect')}</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `, locale, `/${locale}/product/${slug}`))
})

// ============================================
// LOCALIZED ARTICLES LIST
// ============================================

app.get('/:lang{en|zh|fr|es|ru}/articles', async (c) => {
  const lang = c.req.param('lang')
  const locale: Locale = lang
  const db = c.env.DB
  const articles = await getContent(db, COLLECTIONS.articles, { limit: 50 })

  const articlesHTML = articles.map((a: any) => {
    const localized = getLocalizedContent(a, locale)
    return `
    <a href="/${locale}/article/${a.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="h-40 bg-gradient-to-br from-purple-600 to-blue-600"></div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs text-purple-400 uppercase font-medium">${a.data?.type || 'article'}</span>
          <span class="text-xs text-gray-500">${a.data?.readingTime || 5} ${t(locale, 'articles.minRead')}</span>
        </div>
        <h3 class="font-bold text-lg mb-2">${localized.title}</h3>
        <p class="text-gray-400 text-sm line-clamp-2">${localized.data?.excerpt || ''}</p>
      </div>
    </a>
  `}).join('') || `<p class="col-span-3 text-gray-400">${t(locale, 'articles.notFound')}</p>`

  return c.html(wrapHTML(t(locale, 'articles.title'), `
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">${t(locale, 'articles.title')}</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${articlesHTML}</div>
      </div>
    </section>
  `, locale, `/${locale}/articles`))
})

// ============================================
// LOCALIZED ARTICLE DETAIL
// ============================================

app.get('/:lang{en|zh|fr|es|ru}/article/:slug', async (c) => {
  const lang = c.req.param('lang')
  const locale: Locale = lang
  const slug = c.req.param('slug')
  const db = c.env.DB
  const a = await getContentBySlug(db, COLLECTIONS.articles, slug)

  if (!a) {
    return c.html(wrapHTML(t(locale, 'detail.articleNotFound'), `
      <section class="py-20 px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">${t(locale, 'detail.articleNotFound')}</h1>
        <a href="/${locale}/articles" class="text-purple-400">${t(locale, 'detail.backArticles')}</a>
      </section>
    `, locale, `/${locale}/article/${slug}`))
  }

  const localized = getLocalizedContent(a, locale)

  return c.html(wrapHTML(localized.title, `
    <article class="py-12 px-4">
      <div class="max-w-3xl mx-auto">
        <a href="/${locale}/articles" class="text-purple-400 mb-4 inline-block">${t(locale, 'detail.backArticles')}</a>

        <header class="mb-8">
          <span class="text-purple-400 uppercase text-sm font-medium">${a.data?.type || 'article'}</span>
          <h1 class="text-4xl font-bold mt-2 mb-4">${localized.title}</h1>
          <p class="text-xl text-gray-400">${localized.data?.excerpt || ''}</p>
          <div class="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>${a.data?.readingTime || 5} ${t(locale, 'articles.minRead')}</span>
            <span>•</span>
            <span>${t(locale, 'detail.updated')} ${new Date(a.updated_at || a.created_at).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale)}</span>
          </div>
        </header>

        <div class="bg-gray-800 rounded-xl p-8">
          <div class="prose prose-invert max-w-none">
            ${localized.data?.content || `<p class="text-gray-400">${t(locale, 'detail.contentSoon')}</p>`}
          </div>
        </div>

        ${a.data?.quickVerdict ? `
        <div class="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6 mt-8">
          <h2 class="text-xl font-bold mb-4">${t(locale, 'detail.quickVerdict')}</h2>
          <p class="text-gray-300">${a.data.quickVerdict.summary || ''}</p>
        </div>
        ` : ''}
      </div>
    </article>
  `, locale, `/${locale}/article/${slug}`))
})

// ============================================
// LOCALIZED CATEGORIES LIST
// ============================================

app.get('/:lang{en|zh|fr|es|ru}/categories', async (c) => {
  const lang = c.req.param('lang')
  const locale: Locale = lang
  const db = c.env.DB
  const categories = await getContent(db, COLLECTIONS.categories, { limit: 20 })

  const categoriesHTML = categories.map((cat: any) => {
    const localized = getLocalizedContent(cat, locale)
    return `
    <a href="/${locale}/category/${cat.data?.slug || cat.slug}" class="bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-700 transition block">
      <div class="text-6xl mb-4">${cat.data?.icon || '📦'}</div>
      <h3 class="text-xl font-bold mb-2">${localized.data?.name || localized.title}</h3>
      <p class="text-gray-400 text-sm">${localized.data?.description || ''}</p>
    </a>
  `}).join('') || ''

  return c.html(wrapHTML(t(locale, 'categories.title'), `
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">${t(locale, 'categories.title')}</h1>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">${categoriesHTML}</div>
      </div>
    </section>
  `, locale, `/${locale}/categories`))
})

// ============================================
// LOCALIZED CATEGORY DETAIL
// ============================================

app.get('/:lang{en|zh|fr|es|ru}/category/:slug', async (c) => {
  const lang = c.req.param('lang')
  const locale: Locale = lang
  const slug = c.req.param('slug')
  const db = c.env.DB

  // Get all categories and find the one matching the slug
  const allCategories = await getContent(db, COLLECTIONS.categories, { limit: 100 })
  const category = allCategories.find((cat: any) =>
    cat.data?.slug === slug || cat.slug === slug
  )

  if (!category) {
    return c.html(wrapHTML(t(locale, 'detail.categoryNotFound'), `
      <section class="py-20 px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">${t(locale, 'detail.categoryNotFound')}</h1>
        <a href="/${locale}/categories" class="text-purple-400">${t(locale, 'detail.backCategories')}</a>
      </section>
    `, locale, `/${locale}/category/${slug}`))
  }

  const localizedCat = getLocalizedContent(category, locale)
  const catId = category.id
  const catName = localizedCat.data?.name || localizedCat.title || slug

  // Get all products and filter by category
  const allProducts = await getContent(db, COLLECTIONS.products, { limit: 100 })
  const filteredProducts = allProducts.filter((p: any) => {
    return p.data?.category === catId || p.data?.category?.includes(slug)
  })

  const productsHTML = filteredProducts.map((p: any) => {
    const localized = getLocalizedContent(p, locale)
    return `
    <a href="/${locale}/product/${p.slug}" class="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="aspect-video bg-gray-700 flex items-center justify-center text-6xl">${getCategoryIcon(p.data?.category)}</div>
      <div class="p-4">
        <span class="text-sm text-purple-400">${p.data?.brand || ''}</span>
        <h3 class="font-bold mt-1">${localized.title}</h3>
        <div class="flex justify-between items-center mt-2">
          <span class="text-xl font-bold text-purple-400">$${p.data?.price || '-'}</span>
          <span class="text-sm text-green-400">⭐ ${p.data?.rating?.overall || '-'}/10</span>
        </div>
      </div>
    </a>
  `}).join('') || `<p class="col-span-3 text-gray-400">${t(locale, 'detail.noProducts')}</p>`

  return c.html(wrapHTML(catName, `
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <a href="/${locale}/categories" class="text-purple-400 mb-4 inline-block">${t(locale, 'detail.backCategories')}</a>
        <div class="flex items-center gap-4 mb-8">
          <span class="text-5xl">${category.data?.icon || '📦'}</span>
          <div>
            <h1 class="text-3xl font-bold">${catName}</h1>
            <p class="text-gray-400 mt-1">${localizedCat.data?.description || ''}</p>
          </div>
        </div>
        <h2 class="text-xl font-bold mb-6">${filteredProducts.length} ${t(locale, 'detail.productsCount')}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${productsHTML}</div>
      </div>
    </section>
  `, locale, `/${locale}/category/${slug}`))
})

// Mount core app (catch-all)
app.route('/', coreApp)

export default app
