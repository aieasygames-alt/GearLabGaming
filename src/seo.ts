import { BASE_URL } from './constants'
import { DEFAULT_LOCALE, LOCALE_NAMES, TRANSLATIONS, getLocalizedContent } from './i18n'
import type { Locale } from './i18n'
import { toAbsoluteUrl, toIsoDate } from './utils/format'
import { getArticleCover, getProductImage } from './utils/content'

export interface SEOOptions {
  description?: string
  keywords?: string
  image?: string
  type?: 'website' | 'article' | 'product'
  robots?: string
  schemaType?: 'Website' | 'Product' | 'Article' | 'ItemList'
  schemaData?: any
  breadcrumbs?: Array<{ name: string; path: string }>
}

export function getLanguageSwitcher(currentLocale: Locale, currentPath: string): string {
  const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '') || '/'

  const options = `<a href="/${DEFAULT_LOCALE}${pathWithoutLang}" class="block px-4 py-2 text-sm bg-purple-600 text-white">${LOCALE_NAMES[DEFAULT_LOCALE]}</a>`

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

export function getHreflangTags(path: string, chineseTranslation = false): string {
  const pathWithoutLang = path.replace(/^\/[a-z]{2}/, '')
  const href = `${BASE_URL}/${DEFAULT_LOCALE}${pathWithoutLang}`
  return `<link rel="alternate" hreflang="en" href="${href}" />\n  <link rel="alternate" hreflang="x-default" href="${href}" />${chineseTranslation ? `\n  <link rel="alternate" hreflang="zh" href="${BASE_URL}/zh${pathWithoutLang}" />` : ''}`
}

export function generateSchemaOrg(type: 'Website' | 'Product' | 'Article' | 'ItemList', data: any, locale: Locale): string {
  if (type === 'Website') {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "GearLabGaming",
      "description": TRANSLATIONS[locale].home.subtitle,
      "url": BASE_URL,
      "inLanguage": locale,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${BASE_URL}/${locale}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    })
  }

  if (type === 'Product' && data) {
    const canonicalUrl = `${BASE_URL}/${locale}/product/${data.slug}`
    const localized = getLocalizedContent(data, locale)
    const productImage = toAbsoluteUrl(getProductImage(data))
    const purchaseUrl = toAbsoluteUrl(data.data?.affiliateLinks?.official || data.data?.affiliateLinks?.amazon)
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": localized.data?.name || localized.title,
      "description": localized.data?.verdict || '',
      "url": canonicalUrl,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "datePublished": toIsoDate(data.created_at),
      "dateModified": toIsoDate(data.updated_at || data.created_at),
      "publisher": {
        "@type": "Organization",
        "name": "GearLabGaming",
        "url": BASE_URL
      },
      "brand": {
        "@type": "Brand",
        "name": data.data?.brand || ''
      }
    }
    if (productImage) schema.image = productImage
    if (purchaseUrl) {
      schema.offers = {
        "@type": "Offer",
        "url": purchaseUrl,
        "price": data.data?.price || 0,
        "priceCurrency": "USD"
      }
    }
    if (data.data?.rating?.overall) {
      schema.review = {
        "@type": "Review",
        "author": {
          "@type": "Organization",
          "name": "GearLabGaming"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": data.data.rating.overall,
          "bestRating": 10,
          "worstRating": 0
        },
        "reviewBody": data.data?.verdict || ''
      }
    }
    if (Array.isArray(data.data?.faq) && data.data.faq.length > 0) {
      return JSON.stringify([
        schema,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.data.faq.map((item: any) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
          }))
        }
      ])
    }
    return JSON.stringify(schema)
  }

  if (type === 'Article' && data) {
    const canonicalUrl = `${BASE_URL}/${DEFAULT_LOCALE}/article/${data.slug}`
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.data?.excerpt || '',
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "author": {
        "@type": "Organization",
        "name": "GearLabGaming Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "GearLabGaming",
        "url": BASE_URL
      },
      "datePublished": toIsoDate(data.created_at),
      "dateModified": toIsoDate(data.updated_at || data.created_at),
      "image": toAbsoluteUrl(getArticleCover(data))
    }
    if (Array.isArray(data.data?.faq) && data.data.faq.length > 0) {
      return JSON.stringify([
        schema,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.data.faq.map((item: any) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
          }))
        }
      ])
    }
    return JSON.stringify(schema)
  }

  if (type === 'ItemList' && data) {
    const itemPath = data.itemPath || 'product'
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": data.name || 'Products',
      "numberOfItems": data.items?.length || 0,
      "itemListElement": (data.items || []).map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.data?.name || item.title,
        "url": `${BASE_URL}/${locale}/${itemPath}/${item.data?.slug || item.slug}`
      }))
    })
  }

  return ''
}

export function generateBreadcrumbSchema(locale: Locale, breadcrumbs: Array<{ name: string; path: string }>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: `${BASE_URL}/${locale}${breadcrumb.path}`
    }))
  })
}
