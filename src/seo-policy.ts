export const ARTICLE_REDIRECTS: Record<string, string> = {
  'budget-gaming-setup-under-200': 'best-gaming-setup-under-200',
  'best-gaming-peripherals-pc-under-200-2026': 'best-gaming-setup-under-200',
  'best-small-gaming-mouse': 'best-gaming-mouse-for-small-hands-2026',
  'best-fps-mouse-small-hands-2026': 'best-gaming-mouse-for-small-hands-2026'
}

export function hasChineseReview(item: any): boolean {
  const translation = item?.data?.translations?.zh
  const review = String(translation?.reviewContent || '').replace(/<[^>]*>/g, '').trim()
  return Boolean(translation?.name && review.length >= 150 && /\p{Script=Han}/u.test(review))
}

export function rewriteArticleLinks(html: string): string {
  return html.replace(/(href=["']\/(?:en|zh|fr|es|ru)\/article\/)([^"'?#/]+)(["'?#])/g,
    (match, prefix, slug, suffix) => ARTICLE_REDIRECTS[slug] ? `${prefix}${ARTICLE_REDIRECTS[slug]}${suffix}` : match)
}
