import assert from 'node:assert/strict'
import { ARTICLE_REDIRECTS, hasChineseReview, rewriteArticleLinks } from '../src/seo-policy'

assert.equal(Object.keys(ARTICLE_REDIRECTS).length, 4)
for (const [source, target] of Object.entries(ARTICLE_REDIRECTS)) {
  assert.notEqual(source, target)
  assert.equal(ARTICLE_REDIRECTS[target], undefined, 'Redirects must resolve in one hop')
  assert.equal(rewriteArticleLinks(`<a href="/en/article/${source}#guide">Read</a>`), `<a href="/en/article/${target}#guide">Read</a>`)
}
assert.equal(rewriteArticleLinks('<a href="https://other.example/en/article/best-small-gaming-mouse">External</a>'), '<a href="https://other.example/en/article/best-small-gaming-mouse">External</a>')
assert.equal(hasChineseReview(null), false)
assert.equal(hasChineseReview({ data: { translations: { zh: { name: 'Name', reviewContent: '<p>Short</p>' } } } }), false)
assert.equal(hasChineseReview({ data: { translations: { zh: { name: 'Name', reviewContent: `<p>${'a'.repeat(300)}</p>` } } } }), false)
assert.equal(hasChineseReview({ data: { translations: { zh: { name: 'Name', reviewContent: `<p>${'评测'.repeat(80)}</p>` } } } }), true)
console.log('SEO policy tests passed.')
