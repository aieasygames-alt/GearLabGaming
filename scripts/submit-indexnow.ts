import { INDEXNOW_KEY, INDEXNOW_KEY_PATH } from '../src/indexnow'

const siteUrl = new URL(process.env.SITE_URL || 'https://gearlabgaming.com')
const sitemapUrl = new URL('/sitemap.xml', siteUrl)
const keyLocation = new URL(INDEXNOW_KEY_PATH, siteUrl)

const sitemapResponse = await fetch(sitemapUrl)
if (!sitemapResponse.ok) {
  throw new Error(`Unable to read sitemap: ${sitemapResponse.status} ${sitemapResponse.statusText}`)
}

const sitemap = await sitemapResponse.text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())

if (urlList.length === 0) throw new Error('Sitemap did not contain any URLs to submit')
if (urlList.length > 10_000) throw new Error(`IndexNow accepts at most 10,000 URLs per request; found ${urlList.length}`)

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: siteUrl.host,
    key: INDEXNOW_KEY,
    keyLocation: keyLocation.href,
    urlList
  })
})

if (!response.ok) {
  throw new Error(`IndexNow rejected the submission: ${response.status} ${response.statusText}`)
}

console.log(`Submitted ${urlList.length} sitemap URLs to IndexNow (${response.status}).`)
