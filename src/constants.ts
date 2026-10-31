import { ARTICLE_REDIRECTS } from './seo-policy'

export const BASE_URL = 'https://gearlabgaming.com'

export const COLLECTIONS = {
  products: 'col-products-ce613aa5',
  articles: 'col-articles-f7a0326f',
  categories: 'col-categories-d8563a2b',
  authors: 'col-authors-5dc12aff',
  priceHistory: 'col-price-history-f9569b20b0f778402303b087040bf76b',
  comments: 'col-comments-e81245abf7e0bf66081d56c5c90c75f2'
} as const

export const PRODUCT_SLUG_REDIRECTS: Record<string, string> = {
  'lg-27gp850-b-ultragear-review': 'lg-27gp850-b-review'
}

export const ARTICLE_SLUG_REDIRECTS = ARTICLE_REDIRECTS

export const COMMENT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
export const COMMENT_RATE_LIMIT_MAX_REQUESTS = 5
export const COMMENT_MAX_BODY_BYTES = 8_192

export const ARTICLE_COVER_FALLBACKS: Record<string, string> = {
  'best-budget-gaming-mouse-logitech-g305': '/media/articles/codex-clipboard-3b109a23-6743-47de-8f60-4c4e722710af.webp',
  'wooting-80he-vs-razer-huntsman-v3-pro': '/media/articles/codex-clipboard-e2605ebe-8cc6-4732-bbb1-369b0eef6e7e.webp',
  'best-gaming-setup-under-200': '/media/articles/codex-clipboard-38759111-f47b-457d-afe3-25b4499f10f7.webp',
  'best-small-gaming-mouse': '/media/articles/codex-clipboard-717fee35-029b-4bc9-b7b6-dd82dc62dc54.webp'
}
