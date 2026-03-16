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
      readReview: 'Read Review',
      resultsCount: 'products found'
    },
    filter: {
      category: 'Category',
      brand: 'Brand',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      minRating: 'Min Rating',
      sortBy: 'Sort By',
      allCategories: 'All Categories',
      allBrands: 'All Brands',
      anyRating: 'Any Rating',
      sortNewest: 'Newest',
      sortRating: 'Highest Rated',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortName: 'Name (A-Z)',
      apply: 'Apply Filters',
      reset: 'Reset'
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
    search: {
      title: 'Search',
      placeholder: 'Search products and articles...',
      search: 'Search',
      all: 'All',
      noResults: 'No results found. Try different keywords.',
      resultsFound: 'results found'
    },
    theme: {
      toggle: 'Toggle theme'
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
      readReview: '查看评测',
      resultsCount: '个产品'
    },
    filter: {
      category: '分类',
      brand: '品牌',
      minPrice: '最低价',
      maxPrice: '最高价',
      minRating: '最低评分',
      sortBy: '排序',
      allCategories: '全部分类',
      allBrands: '全部品牌',
      anyRating: '不限评分',
      sortNewest: '最新发布',
      sortRating: '评分最高',
      sortPriceAsc: '价格从低到高',
      sortPriceDesc: '价格从高到低',
      sortName: '名称排序',
      apply: '应用筛选',
      reset: '重置'
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
    search: {
      title: '搜索',
      placeholder: '搜索产品和文章...',
      search: '搜索',
      all: '全部',
      noResults: '未找到结果，请尝试其他关键词。',
      resultsFound: '个结果'
    },
    theme: {
      toggle: '切换主题'
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
      readReview: 'Lire l\'avis',
      resultsCount: 'produits trouvés'
    },
    filter: {
      category: 'Catégorie',
      brand: 'Marque',
      minPrice: 'Prix Min',
      maxPrice: 'Prix Max',
      minRating: 'Note Min',
      sortBy: 'Trier par',
      allCategories: 'Toutes les catégories',
      allBrands: 'Toutes les marques',
      anyRating: 'Toute note',
      sortNewest: 'Plus récents',
      sortRating: 'Mieux notés',
      sortPriceAsc: 'Prix croissant',
      sortPriceDesc: 'Prix décroissant',
      sortName: 'Nom (A-Z)',
      apply: 'Appliquer',
      reset: 'Réinitialiser'
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
    search: {
      title: 'Rechercher',
      placeholder: 'Rechercher des produits et articles...',
      search: 'Rechercher',
      all: 'Tout',
      noResults: 'Aucun résultat. Essayez d\'autres mots-clés.',
      resultsFound: 'résultats trouvés'
    },
    theme: {
      toggle: 'Changer le thème'
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
      readReview: 'Leer reseña',
      resultsCount: 'productos encontrados'
    },
    filter: {
      category: 'Categoría',
      brand: 'Marca',
      minPrice: 'Precio Mín',
      maxPrice: 'Precio Máx',
      minRating: 'Puntuación Mín',
      sortBy: 'Ordenar por',
      allCategories: 'Todas las categorías',
      allBrands: 'Todas las marcas',
      anyRating: 'Cualquier puntuación',
      sortNewest: 'Más recientes',
      sortRating: 'Mejor valorados',
      sortPriceAsc: 'Precio ascendente',
      sortPriceDesc: 'Precio descendente',
      sortName: 'Nombre (A-Z)',
      apply: 'Aplicar',
      reset: 'Restablecer'
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
    search: {
      title: 'Buscar',
      placeholder: 'Buscar productos y artículos...',
      search: 'Buscar',
      all: 'Todo',
      noResults: 'No se encontraron resultados. Intenta con otras palabras.',
      resultsFound: 'resultados encontrados'
    },
    theme: {
      toggle: 'Cambiar tema'
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
      readReview: 'Читать обзор',
      resultsCount: 'продуктов найдено'
    },
    filter: {
      category: 'Категория',
      brand: 'Бренд',
      minPrice: 'Мин. цена',
      maxPrice: 'Макс. цена',
      minRating: 'Мин. рейтинг',
      sortBy: 'Сортировать',
      allCategories: 'Все категории',
      allBrands: 'Все бренды',
      anyRating: 'Любой рейтинг',
      sortNewest: 'Новейшие',
      sortRating: 'По рейтингу',
      sortPriceAsc: 'Цена: по возрастанию',
      sortPriceDesc: 'Цена: по убыванию',
      sortName: 'По имени (А-Я)',
      apply: 'Применить',
      reset: 'Сбросить'
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
    search: {
      title: 'Поиск',
      placeholder: 'Поиск продуктов и статей...',
      search: 'Искать',
      all: 'Всё',
      noResults: 'Ничего не найдено. Попробуйте другие ключевые слова.',
      resultsFound: 'результатов найдено'
    },
    theme: {
      toggle: 'Сменить тему'
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
    return `<a href="${href}" class="block px-4 py-2 text-sm ${isActive ? 'bg-purple-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">${LOCALE_NAMES[locale]}</a>`
  }).join('')

  return `
    <div class="relative group">
      <button class="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-white bg-gray-700 rounded-lg">
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

// Helper: Generate Schema.org structured data
function generateSchemaOrg(type: 'Website' | 'Product' | 'Article' | 'ItemList', data: any, locale: Locale): string {
  const baseUrl = 'https://gearlabgaming.com'

  if (type === 'Website') {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "GearLabGaming",
      "description": TRANSLATIONS[locale].home.subtitle,
      "url": baseUrl,
      "inLanguage": locale,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/${locale}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    })
  }

  if (type === 'Product' && data) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.title,
      "description": data.data?.verdict || '',
      "brand": {
        "@type": "Brand",
        "name": data.data?.brand || ''
      },
      "offers": {
        "@type": "Offer",
        "price": data.data?.price || 0,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": data.data?.rating?.overall ? {
        "@type": "AggregateRating",
        "ratingValue": data.data.rating.overall,
        "bestRating": 10,
        "worstRating": 0,
        "ratingCount": 1
      } : undefined
    })
  }

  if (type === 'Article' && data) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.data?.excerpt || '',
      "author": {
        "@type": "Person",
        "name": "GearLabGaming Team"
      },
      "datePublished": data.created_at ? new Date(data.created_at).toISOString() : undefined,
      "dateModified": data.updated_at ? new Date(data.updated_at).toISOString() : undefined
    })
  }

  if (type === 'ItemList' && data) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": data.name || 'Products',
      "numberOfItems": data.items?.length || 0,
      "itemListElement": (data.items || []).map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${baseUrl}/${locale}/product/${item.slug}`
      }))
    })
  }

  return ''
}

// SEO options interface
interface SEOOptions {
  description?: string
  keywords?: string
  image?: string
  type?: 'website' | 'article' | 'product'
  schemaType?: 'Website' | 'Product' | 'Article' | 'ItemList'
  schemaData?: any
}

// Helper: Common HTML wrapper with locale support and enhanced SEO
function wrapHTML(title: string, content: string, locale: Locale, path: string, seo: SEOOptions = {}) {
  const langSwitcher = getLanguageSwitcher(locale, path)
  const hreflangTags = getHreflangTags(path)
  const canonicalUrl = `https://gearlabgaming.com/${locale}${path.replace(/^\/[a-z]{2}/, '') || '/'}`

  // Generate Schema.org
  const schemaOrg = seo.schemaType
    ? generateSchemaOrg(seo.schemaType, seo.schemaData, locale)
    : generateSchemaOrg('Website', null, locale)

  // Default meta description
  const metaDescription = seo.description || TRANSLATIONS[locale].home.subtitle
  const metaImage = seo.image || 'https://gearlabgaming.com/og-image.png'
  const metaType = seo.type || 'website'

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>${title} | GearLabGaming</title>
  <meta name="title" content="${title} | GearLabGaming" />
  <meta name="description" content="${metaDescription}" />
  <meta name="color-scheme" content="dark light" />
  ${seo.keywords ? `<meta name="keywords" content="${seo.keywords}" />` : ''}

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${metaType}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${title} | GearLabGaming" />
  <meta property="og:description" content="${metaDescription}" />
  <meta property="og:image" content="${metaImage}" />
  <meta property="og:locale" content="${locale}" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="${canonicalUrl}" />
  <meta property="twitter:title" content="${title} | GearLabGaming" />
  <meta property="twitter:description" content="${metaDescription}" />
  <meta property="twitter:image" content="${metaImage}" />

  <!-- Canonical & Hreflang -->
  <link rel="canonical" href="${canonicalUrl}" />
  ${hreflangTags}

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">${schemaOrg}</script>

  <!-- Styles -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {}
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    /* Theme transition */
    * { transition: background-color 0.2s, border-color 0.2s, color 0.2s; }
    /* Lazy load images */
    img[loading="lazy"] { opacity: 0; transition: opacity 0.3s; }
    img[loading="lazy"].loaded { opacity: 1; }
  </style>

  <!-- Theme Script (runs before render to prevent flash) -->
  <script>
    (function() {
      const theme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      if (theme === 'dark') document.documentElement.classList.add('dark');
    })();
  </script>
</head>
<body class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
  <header class="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
    <nav class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/${locale}" class="text-2xl font-bold">🎮 GearLabGaming</a>
      <div class="flex items-center gap-4">
        <a href="/${locale}/products" class="text-gray-600 dark:text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white">${t(locale, 'nav.products')}</a>
        <a href="/${locale}/articles" class="text-gray-600 dark:text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white">${t(locale, 'nav.articles')}</a>
        <a href="/${locale}/categories" class="text-gray-600 dark:text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white">${t(locale, 'nav.categories')}</a>
        <a href="/${locale}/search" class="text-gray-600 dark:text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white" title="${t(locale, 'search.title')}">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </a>
        ${langSwitcher}
        <!-- Theme Toggle -->
        <button id="theme-toggle" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition" title="${t(locale, 'theme.toggle')}">
          <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </button>
        <a href="/admin" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white">${t(locale, 'nav.admin')}</a>
      </div>
    </nav>
  </header>
  ${content}
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 px-4 text-center text-gray-500 dark:text-gray-400 mt-16">
    <p>${t(locale, 'footer.copyright')}</p>
  </footer>

  <!-- Theme Toggle Script -->
  <script>
    document.getElementById('theme-toggle').addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    // Lazy load images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img.complete) img.classList.add('loaded');
      else img.addEventListener('load', () => img.classList.add('loaded'));
    });
  </script>
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
// SEO: SITEMAP & ROBOTS.TXT
// ============================================

app.get('/sitemap.xml', async (c) => {
  const db = c.env.DB
  const baseUrl = 'https://gearlabgaming.com'

  // Get all content
  const [products, articles, categories] = await Promise.all([
    getContent(db, COLLECTIONS.products, { limit: 500 }),
    getContent(db, COLLECTIONS.articles, { limit: 500 }),
    getContent(db, COLLECTIONS.categories, { limit: 100 })
  ])

  const now = new Date().toISOString().split('T')[0]

  // Generate URLs for all languages
  let urls = ''

  // Homepage for each language
  for (const lang of SUPPORTED_LOCALES) {
    urls += `
  <url>
    <loc>${baseUrl}/${lang}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`
  }

  // Static pages for each language
  const staticPages = ['products', 'articles', 'categories']
  for (const lang of SUPPORTED_LOCALES) {
    for (const page of staticPages) {
      urls += `
  <url>
    <loc>${baseUrl}/${lang}/${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
    }
  }

  // Product pages for each language
  for (const product of products) {
    const lastmod = product.updated_at
      ? new Date(product.updated_at).toISOString().split('T')[0]
      : now
    for (const lang of SUPPORTED_LOCALES) {
      urls += `
  <url>
    <loc>${baseUrl}/${lang}/product/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    }
  }

  // Article pages for each language
  for (const article of articles) {
    const lastmod = article.updated_at
      ? new Date(article.updated_at).toISOString().split('T')[0]
      : now
    for (const lang of SUPPORTED_LOCALES) {
      urls += `
  <url>
    <loc>${baseUrl}/${lang}/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    }
  }

  // Category pages for each language
  for (const category of categories) {
    for (const lang of SUPPORTED_LOCALES) {
      urls += `
  <url>
    <loc>${baseUrl}/${lang}/category/${category.data?.slug || category.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`

  return c.text(sitemap, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600'
  })
})

app.get('/robots.txt', (c) => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://gearlabgaming.com/sitemap.xml

# Disallow admin area
Disallow: /admin/`

  return c.text(robots, 200, {
    'Content-Type': 'text/plain; charset=utf-8'
  })
})

// ============================================
// SEARCH API & PAGE
// ============================================

// Search API endpoint
app.get('/api/search', async (c) => {
  const db = c.env.DB
  const q = c.req.query('q') || ''
  const type = c.req.query('type') || 'all' // products, articles, all
  const limit = parseInt(c.req.query('limit') || '20')

  if (!q || q.length < 2) {
    return c.json({ results: [], query: q, total: 0 })
  }

  const searchQuery = `%${q.toLowerCase()}%`
  let results: any[] = []

  // Search products
  if (type === 'all' || type === 'products') {
    const productResults = await db.prepare(`
      SELECT id, title, slug, data, created_at, updated_at, 'product' as type
      FROM content
      WHERE collection_id = ?
      AND status = 'published'
      AND (LOWER(title) LIKE ? OR LOWER(data) LIKE ?)
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(COLLECTIONS.products, searchQuery, searchQuery, limit).all()

    results = results.concat(productResults.results?.map((r: any) => ({
      ...r,
      data: typeof r.data === 'string' ? JSON.parse(r.data) : r.data
    })) || [])
  }

  // Search articles
  if (type === 'all' || type === 'articles') {
    const articleResults = await db.prepare(`
      SELECT id, title, slug, data, created_at, updated_at, 'article' as type
      FROM content
      WHERE collection_id = ?
      AND status = 'published'
      AND (LOWER(title) LIKE ? OR LOWER(data) LIKE ?)
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(COLLECTIONS.articles, searchQuery, searchQuery, limit).all()

    results = results.concat(articleResults.results?.map((r: any) => ({
      ...r,
      data: typeof r.data === 'string' ? JSON.parse(r.data) : r.data
    })) || [])
  }

  return c.json({
    results,
    query: q,
    total: results.length
  })
})

// Search page
app.get('/:lang{en|zh|fr|es|ru}/search', async (c) => {
  const lang = c.req.param('lang')
  const locale: Locale = lang
  const db = c.env.DB
  const q = c.req.query('q') || ''
  const type = c.req.query('type') || 'all'

  let results: any[] = []

  if (q && q.length >= 2) {
    const searchQuery = `%${q.toLowerCase()}%`

    // Search products
    if (type === 'all' || type === 'products') {
      const productResults = await db.prepare(`
        SELECT id, title, slug, data, created_at, 'product' as type
        FROM content
        WHERE collection_id = ?
        AND status = 'published'
        AND (LOWER(title) LIKE ? OR LOWER(data) LIKE ?)
        ORDER BY created_at DESC
        LIMIT 20
      `).bind(COLLECTIONS.products, searchQuery, searchQuery).all()

      results = results.concat((productResults.results || []).map((r: any) => ({
        ...r,
        data: typeof r.data === 'string' ? JSON.parse(r.data) : r.data
      })))
    }

    // Search articles
    if (type === 'all' || type === 'articles') {
      const articleResults = await db.prepare(`
        SELECT id, title, slug, data, created_at, 'article' as type
        FROM content
        WHERE collection_id = ?
        AND status = 'published'
        AND (LOWER(title) LIKE ? OR LOWER(data) LIKE ?)
        ORDER BY created_at DESC
        LIMIT 20
      `).bind(COLLECTIONS.articles, searchQuery, searchQuery).all()

      results = results.concat((articleResults.results || []).map((r: any) => ({
        ...r,
        data: typeof r.data === 'string' ? JSON.parse(r.data) : r.data
      })))
    }
  }

  const resultsHTML = results.map((item: any) => {
    const localized = getLocalizedContent(item, locale)
    if (item.type === 'product') {
      return `
      <a href="/${locale}/product/${item.slug}" class="bg-white dark:bg-gray-800 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex gap-4">
        <div class="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">${getCategoryIcon(item.data?.category)}</div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">Product</span>
            <span class="text-xs text-gray-500">${item.data?.brand || ''}</span>
          </div>
          <h3 class="font-bold">${localized.title}</h3>
          <p class="text-sm text-gray-400 line-clamp-2">${(localized.data?.verdict || '').substring(0, 100)}...</p>
        </div>
      </a>`
    } else {
      return `
      <a href="/${locale}/article/${item.slug}" class="bg-white dark:bg-gray-800 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex gap-4">
        <div class="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex-shrink-0"></div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Article</span>
            <span class="text-xs text-gray-500">${item.data?.type || 'article'}</span>
          </div>
          <h3 class="font-bold">${localized.title}</h3>
          <p class="text-sm text-gray-400 line-clamp-2">${localized.data?.excerpt || ''}</p>
        </div>
      </a>`
    }
  }).join('') || (q ? `<p class="text-gray-400 text-center py-8">${t(locale, 'search.noResults')}</p>` : '')

  const searchTitle = q ? `${t(locale, 'search.title')}: "${q}"` : t(locale, 'search.title')

  return c.html(wrapHTML(searchTitle, `
    <section class="py-12 px-4">
      <div class="max-w-3xl mx-auto">
        <!-- Search Form -->
        <form method="get" class="mb-8">
          <div class="flex gap-4">
            <div class="flex-1 relative">
              <input
                type="text"
                name="q"
                value="${q}"
                placeholder="${t(locale, 'search.placeholder')}"
                class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-purple-500"
              />
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <select name="type" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500">
              <option value="all" ${type === 'all' ? 'selected' : ''}>${t(locale, 'search.all')}</option>
              <option value="products" ${type === 'products' ? 'selected' : ''}>${t(locale, 'nav.products')}</option>
              <option value="articles" ${type === 'articles' ? 'selected' : ''}>${t(locale, 'nav.articles')}</option>
            </select>
            <button type="submit" class="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium">
              ${t(locale, 'search.search')}
            </button>
          </div>
        </form>

        <!-- Results -->
        <div class="space-y-4">
          ${resultsHTML}
        </div>

        ${results.length > 0 ? `<p class="text-gray-500 dark:text-gray-400 text-sm mt-4">${results.length} ${t(locale, 'search.resultsFound')}</p>` : ''}
      </div>
    </section>
  `, locale, `/${locale}/search`))
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
    <a href="/${locale}/product/${p.slug}" class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-6xl">${getCategoryIcon(p.data?.category)}</div>
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
    <a href="/${locale}/article/${a.slug}" class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="h-32 bg-gradient-to-br from-purple-600 to-blue-600"></div>
      <div class="p-4">
        <span class="text-xs text-purple-400 uppercase">${a.data?.type || 'article'}</span>
        <h3 class="font-bold mt-1">${localized.title}</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">${localized.data?.excerpt || ''}</p>
      </div>
    </a>
  `}).join('') || ''

  const categoriesHTML = categories.map((cat: any) => {
    const localized = getLocalizedContent(cat, locale)
    return `
    <a href="/${locale}/category/${cat.data?.slug || cat.slug}" class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition block">
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
    <section class="py-12 px-4 bg-gray-100 dark:bg-gray-800/30">
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
// LOCALIZED PRODUCTS LIST WITH FILTERS
// ============================================

app.get('/:lang{en|zh|fr|es|ru}/products', async (c) => {
  const lang = c.req.param('lang')
  const locale: Locale = lang
  const db = c.env.DB

  // Get query parameters for filtering and sorting
  const categoryFilter = c.req.query('category') || ''
  const brandFilter = c.req.query('brand') || ''
  const priceMin = parseInt(c.req.query('priceMin') || '0')
  const priceMax = parseInt(c.req.query('priceMax') || '9999')
  const sortBy = c.req.query('sort') || 'newest'
  const ratingMin = parseFloat(c.req.query('rating') || '0')

  // Get all products
  let products = await getContent(db, COLLECTIONS.products, { limit: 100 })

  // Get categories for filter dropdown
  const categories = await getContent(db, COLLECTIONS.categories, { limit: 20 })

  // Get unique brands
  const brands = [...new Set(products.map((p: any) => p.data?.brand).filter(Boolean))].sort()

  // Apply filters
  if (categoryFilter) {
    products = products.filter((p: any) => {
      const cat = categories.find((c: any) => c.id === p.data?.category || c.data?.slug === categoryFilter)
      return cat && (cat.id === p.data?.category || cat.data?.slug === categoryFilter || p.data?.category === categoryFilter)
    })
  }

  if (brandFilter) {
    products = products.filter((p: any) => p.data?.brand === brandFilter)
  }

  if (priceMin > 0 || priceMax < 9999) {
    products = products.filter((p: any) => {
      const price = p.data?.price || 0
      return price >= priceMin && price <= priceMax
    })
  }

  if (ratingMin > 0) {
    products = products.filter((p: any) => (p.data?.rating?.overall || 0) >= ratingMin)
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-asc':
      products.sort((a: any, b: any) => (a.data?.price || 0) - (b.data?.price || 0))
      break
    case 'price-desc':
      products.sort((a: any, b: any) => (b.data?.price || 0) - (a.data?.price || 0))
      break
    case 'rating':
      products.sort((a: any, b: any) => (b.data?.rating?.overall || 0) - (a.data?.rating?.overall || 0))
      break
    case 'name':
      products.sort((a: any, b: any) => a.title.localeCompare(b.title))
      break
    default: // newest
      products.sort((a: any, b: any) => (b.created_at || 0) - (a.created_at || 0))
  }

  const productsHTML = products.map((p: any) => {
    const localized = getLocalizedContent(p, locale)
    return `
    <a href="/${locale}/product/${p.slug}" class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-6xl">${getCategoryIcon(p.data?.category)}</div>
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-purple-400">${p.data?.brand || ''}</span>
          <span class="text-sm bg-green-500/20 text-green-400 px-2 py-0.5 rounded">⭐ ${p.data?.rating?.overall || '-'}/10</span>
        </div>
        <h3 class="font-bold mb-2">${localized.title}</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">${(localized.data?.verdict || '').substring(0, 80)}...</p>
        <div class="flex justify-between items-center">
          <span class="text-xl font-bold text-purple-400">$${p.data?.price || '-'}</span>
          <span class="text-purple-400">${t(locale, 'products.readReview')} →</span>
        </div>
      </div>
    </a>
  `}).join('') || `<p class="col-span-3 text-gray-400">${t(locale, 'products.notFound')}</p>`

  // Build filter options HTML
  const categoryOptions = categories.map((cat: any) =>
    `<option value="${cat.data?.slug || cat.slug}" ${categoryFilter === (cat.data?.slug || cat.slug) ? 'selected' : ''}>${cat.data?.name || cat.title}</option>`
  ).join('')

  const brandOptions = brands.map((brand: string) =>
    `<option value="${brand}" ${brandFilter === brand ? 'selected' : ''}>${brand}</option>`
  ).join('')

  return c.html(wrapHTML(t(locale, 'products.title'), `
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">${t(locale, 'products.title')}</h1>

        <!-- Filters -->
        <form method="get" class="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
          <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">${t(locale, 'filter.category')}</label>
              <select name="category" class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500">
                <option value="">${t(locale, 'filter.allCategories')}</option>
                ${categoryOptions}
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">${t(locale, 'filter.brand')}</label>
              <select name="brand" class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500">
                <option value="">${t(locale, 'filter.allBrands')}</option>
                ${brandOptions}
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">${t(locale, 'filter.minPrice')}</label>
              <input type="number" name="priceMin" value="${priceMin || ''}" placeholder="0" class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">${t(locale, 'filter.maxPrice')}</label>
              <input type="number" name="priceMax" value="${priceMax >= 9999 ? '' : priceMax}" placeholder="9999" class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">${t(locale, 'filter.minRating')}</label>
              <select name="rating" class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500">
                <option value="">${t(locale, 'filter.anyRating')}</option>
                <option value="9" ${ratingMin === 9 ? 'selected' : ''}>9+</option>
                <option value="8" ${ratingMin === 8 ? 'selected' : ''}>8+</option>
                <option value="7" ${ratingMin === 7 ? 'selected' : ''}>7+</option>
                <option value="6" ${ratingMin === 6 ? 'selected' : ''}>6+</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">${t(locale, 'filter.sortBy')}</label>
              <select name="sort" class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500">
                <option value="newest" ${sortBy === 'newest' ? 'selected' : ''}>${t(locale, 'filter.sortNewest')}</option>
                <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>${t(locale, 'filter.sortRating')}</option>
                <option value="price-asc" ${sortBy === 'price-asc' ? 'selected' : ''}>${t(locale, 'filter.sortPriceAsc')}</option>
                <option value="price-desc" ${sortBy === 'price-desc' ? 'selected' : ''}>${t(locale, 'filter.sortPriceDesc')}</option>
                <option value="name" ${sortBy === 'name' ? 'selected' : ''}>${t(locale, 'filter.sortName')}</option>
              </select>
            </div>
          </div>
          <div class="mt-4 flex gap-4">
            <button type="submit" class="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-medium">${t(locale, 'filter.apply')}</button>
            <a href="/${locale}/products" class="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium">${t(locale, 'filter.reset')}</a>
          </div>
        </form>

        <!-- Results count -->
        <p class="text-gray-400 mb-4">${products.length} ${t(locale, 'products.resultsCount')}</p>

        <!-- Products Grid -->
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

        <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <div class="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-8xl">${getCategoryIcon(p.data?.category)}</div>
          <div class="p-8">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-purple-400">${p.data?.brand}</span>
              <span class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">⭐ ${p.data?.rating?.overall}/10</span>
              ${p.data?.featured ? `<span class="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">${t(locale, 'detail.featured')}</span>` : ''}
            </div>

            <h1 class="text-3xl font-bold mb-4">${localized.title}</h1>

            <div class="text-4xl font-bold text-purple-400 mb-6">$${p.data?.price}</div>

            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">${localized.data?.verdict || ''}</p>

            <!-- Specs -->
            <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 mb-8">
              <h2 class="text-xl font-bold mb-4">${t(locale, 'detail.specs')}</h2>
              <div class="grid grid-cols-2 gap-4 text-sm">
                ${p.data?.specs?.weight ? `<div><span class="text-gray-400">Weight:</span> <span class="font-medium">${p.data.specs.weight}</span></div>` : ''}
                ${p.data?.specs?.dimensions ? `<div><span class="text-gray-400">Dimensions:</span> <span class="font-medium">${p.data.specs.dimensions}</span></div>` : ''}
                ${p.data?.specs?.connectivity ? `<div><span class="text-gray-400">Connectivity:</span> <span class="font-medium">${p.data.specs.connectivity}</span></div>` : ''}
                ${p.data?.specs?.sensor ? `<div><span class="text-gray-400">Sensor:</span> <span class="font-medium">${p.data.specs.sensor}</span></div>` : ''}
              </div>
            </div>

            <!-- Rating Breakdown -->
            <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 mb-8">
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
              <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4 text-green-400">${t(locale, 'detail.pros')}</h2>
                <ul class="space-y-2">${prosHTML}</ul>
              </div>
              <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
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
    <a href="/${locale}/article/${a.slug}" class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="h-40 bg-gradient-to-br from-purple-600 to-blue-600"></div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs text-purple-400 uppercase font-medium">${a.data?.type || 'article'}</span>
          <span class="text-xs text-gray-500">${a.data?.readingTime || 5} ${t(locale, 'articles.minRead')}</span>
        </div>
        <h3 class="font-bold text-lg mb-2">${localized.title}</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">${localized.data?.excerpt || ''}</p>
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

        <div class="bg-white dark:bg-gray-800 rounded-xl p-8">
          <div class="prose prose-invert max-w-none">
            ${localized.data?.content || `<p class="text-gray-400">${t(locale, 'detail.contentSoon')}</p>`}
          </div>
        </div>

        ${a.data?.quickVerdict ? `
        <div class="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6 mt-8">
          <h2 class="text-xl font-bold mb-4">${t(locale, 'detail.quickVerdict')}</h2>
          <p class="text-gray-600 dark:text-gray-300">${a.data.quickVerdict.summary || ''}</p>
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
    <a href="/${locale}/category/${cat.data?.slug || cat.slug}" class="bg-white dark:bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition block">
      <div class="text-6xl mb-4">${cat.data?.icon || '📦'}</div>
      <h3 class="text-xl font-bold mb-2">${localized.data?.name || localized.title}</h3>
      <p class="text-gray-500 dark:text-gray-400 text-sm">${localized.data?.description || ''}</p>
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
    <a href="/${locale}/product/${p.slug}" class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition block">
      <div class="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-6xl">${getCategoryIcon(p.data?.category)}</div>
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
