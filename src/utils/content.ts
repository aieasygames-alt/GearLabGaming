import { ARTICLE_COVER_FALLBACKS } from '../constants'
import { stripHtml } from './html'

export async function getContent(db: any, collectionId: string, options: { limit?: number; slug?: string } = {}) {
  let sql = "SELECT * FROM content WHERE collection_id = ? AND status = 'published'"
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

export async function getContentBySlug(db: any, collectionId: string, slug: string) {
  const results = await getContent(db, collectionId, { slug, limit: 1 })
  return results[0] || null
}

export function isIndexableProduct(product: any): boolean {
  const reviewLength = stripHtml(product.data?.reviewContent || product.data?.content).length
  const verdictLength = stripHtml(product.data?.verdict).length
  const hasCoreDetails = Boolean(product.data?.brand && product.data?.price && product.data?.rating?.overall)
  return reviewLength >= 600 || (verdictLength >= 70 && hasCoreDetails)
}

export function isIndexableArticle(article: any): boolean {
  return stripHtml(article.data?.content).length >= 800
}

export function isIndexableCategory(category: any): boolean {
  const slug = String(category.data?.slug || category.slug || '')
  const title = String(category.title || '')
  return Boolean(category.data?.isActive) && Boolean(slug) && !slug.startsWith('test-') && !/\btest\b/i.test(title)
}

export function getRelatedProductIdentifiers(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item: any) => typeof item === 'string' ? item : item?.productId || item?.id || item?.slug)
    .filter((item: unknown): item is string => typeof item === 'string' && item.length > 0)
}

export function getCategorySlug(value: unknown, categories: any[]): string {
  const categoryValue = String(value || '')
  const category = categories.find((item: any) =>
    item.id === categoryValue || item.slug === categoryValue || item.data?.slug === categoryValue
  )
  if (category) return String(category.data?.slug || category.slug || '')
  return categoryValue.replace(/^cat-/, '').replace(/-\d+$/, '')
}

export function areSameCategory(left: unknown, right: unknown, categories: any[]): boolean {
  const leftSlug = getCategorySlug(left, categories)
  return Boolean(leftSlug) && leftSlug === getCategorySlug(right, categories)
}

export function getCategoryIcon(categoryId: string): string {
  const id = String(categoryId || '').toLowerCase()
  let paths = '<path d="M12 2v20M2 12h20"/>'
  if (id.includes('mice') || id === 'cat-mice-001') {
    paths = '<rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/>'
  } else if (id.includes('keyboard') || id === 'cat-keyboards-001') {
    paths = '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 14h10"/>'
  } else if (id.includes('headset') || id === 'cat-headsets-001') {
    paths = '<path d="M4 14a8 8 0 0 1 16 0"/><path d="M4 14v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Zm16 0v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z"/><path d="M17 19c0 2-2 3-5 3"/>'
  } else if (id.includes('monitor') || id === 'cat-monitors-001') {
    paths = '<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8M12 16v5"/>'
  } else if (id.includes('chair') || id.includes('desk') || id === 'cat-chairs-001') {
    paths = '<path d="M5 11V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/><path d="M5 11h10a4 4 0 0 1 4 4v1H5Z"/><path d="M7 16v5M17 16v5"/>'
  }
  return `<svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`
}

export function getCategoryIconBySlug(slug: string): string {
  return getCategoryIcon(slug)
}

export function getArticleCover(article: any): string | undefined {
  return article.data?.featuredImage || ARTICLE_COVER_FALLBACKS[article.slug]
}

export function getProductImage(product: any): string | undefined {
  return Array.isArray(product.data?.images) ? product.data.images[0] : undefined
}
