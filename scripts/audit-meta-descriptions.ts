const siteUrl = new URL(process.env.SITE_URL || 'https://gearlabgaming.com')
const sitemapResponse = await fetch(new URL('/sitemap.xml', siteUrl))

if (!sitemapResponse.ok) {
  throw new Error(`Unable to read sitemap: ${sitemapResponse.status} ${sitemapResponse.statusText}`)
}

const sitemap = await sitemapResponse.text()
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
const descriptions = new Map<string, string[]>()
const shortDescriptions: Array<{ url: string; length: number }> = []
const missingDescriptions: string[] = []

for (const url of urls) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Unable to fetch ${url}: ${response.status}`)

  const html = await response.text()
  const match = html.match(/<meta name="description" content="([^"]*)"\s*\/>/i)
  const description = match?.[1]?.trim() || ''

  if (!description) {
    missingDescriptions.push(url)
    continue
  }

  if (description.length < 110) shortDescriptions.push({ url, length: description.length })
  const matchingUrls = descriptions.get(description) || []
  matchingUrls.push(url)
  descriptions.set(description, matchingUrls)
}

const duplicates = [...descriptions.entries()].filter(([, matchingUrls]) => matchingUrls.length > 1)

console.log(`Audited ${urls.length} sitemap URLs.`)
console.log(`Missing descriptions: ${missingDescriptions.length}`)
console.log(`Descriptions below 110 characters: ${shortDescriptions.length}`)
console.log(`Duplicate descriptions: ${duplicates.length}`)

if (missingDescriptions.length || shortDescriptions.length || duplicates.length) {
  console.error(JSON.stringify({ missingDescriptions, shortDescriptions, duplicates }, null, 2))
  process.exitCode = 1
}
