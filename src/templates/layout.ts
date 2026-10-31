import { BASE_URL } from '../constants'
import { DEFAULT_LOCALE, TRANSLATIONS, t } from '../i18n'
import type { Locale } from '../i18n'
import { escapeHtml, escapeJsonForHtml } from '../utils/html'
import { toAbsoluteUrl } from '../utils/format'
import { generateBreadcrumbSchema, generateSchemaOrg, getHreflangTags, getLanguageSwitcher } from '../seo'
import type { SEOOptions } from '../seo'
import { hasChineseReview } from '../seo-policy'

export function wrapHTML(title: string, content: string, locale: Locale, path: string, seo: SEOOptions = {}) {
  const langSwitcher = getLanguageSwitcher(locale, path)
  const hreflangTags = getHreflangTags(path, seo.schemaType === 'Product' && hasChineseReview(seo.schemaData))
  const canonicalPath = path.replace(/^\/[a-z]{2}/, '')
  const canonicalUrl = `${BASE_URL}/${locale}${canonicalPath}`
  const titleWithBrand = /\|\s*GearLabGaming\s*$/i.test(title) ? title : `${title} | GearLabGaming`
  // Keep long, query-focused titles intact instead of truncating their keywords.
  const documentTitle = titleWithBrand.length > 65 ? title : titleWithBrand

  // Generate Schema.org
  const schemaOrg = seo.schemaType
    ? generateSchemaOrg(seo.schemaType, seo.schemaData, locale)
    : generateSchemaOrg('Website', null, locale)
  const schemas = seo.breadcrumbs?.length
    ? [...(Array.isArray(JSON.parse(schemaOrg)) ? JSON.parse(schemaOrg) : [JSON.parse(schemaOrg)]), JSON.parse(generateBreadcrumbSchema(locale, seo.breadcrumbs))]
    : JSON.parse(schemaOrg)
  const serializedSchemas = JSON.stringify(schemas)

  // Default meta description
  const metaDescription = seo.description || TRANSLATIONS[locale].home.subtitle
  const metaImage = toAbsoluteUrl(seo.image) || `${BASE_URL}/og-image.webp`
  const metaType = seo.type || 'website'
  const escapedTitle = escapeHtml(documentTitle)
  const escapedDescription = escapeHtml(metaDescription)
  const escapedImage = escapeHtml(metaImage)
  const escapedCanonicalUrl = escapeHtml(canonicalUrl)
  const escapedKeywords = seo.keywords ? escapeHtml(seo.keywords) : ''

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>${escapedTitle}</title>
  <meta name="title" content="${escapedTitle}" />
  <meta name="description" content="${escapedDescription}" />
  <meta name="color-scheme" content="light dark" />
  ${seo.robots ? `<meta name="robots" content="${seo.robots}" />` : ''}
  ${seo.keywords ? `<meta name="keywords" content="${escapedKeywords}" />` : ''}

  <!-- Favicon with WebP support -->
  <link rel="icon" type="image/webp" href="https://gearlabgaming.com/favicon.webp" />
  <link rel="icon" type="image/png" sizes="256x256" href="https://gearlabgaming.com/favicon-256.png" />
  <link rel="apple-touch-icon" sizes="256x256" href="https://gearlabgaming.com/favicon-256.png" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${metaType}" />
  <meta property="og:url" content="${escapedCanonicalUrl}" />
  <meta property="og:title" content="${escapedTitle}" />
  <meta property="og:description" content="${escapedDescription}" />
  <meta property="og:image" content="${escapedImage}" />
  <meta property="og:locale" content="${locale}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${escapedCanonicalUrl}" />
  <meta name="twitter:title" content="${escapedTitle}" />
  <meta name="twitter:description" content="${escapedDescription}" />
  <meta name="twitter:image" content="${escapedImage}" />

  <!-- Canonical & Hreflang -->
  <link rel="canonical" href="${escapedCanonicalUrl}" />
  ${hreflangTags}

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">${escapeJsonForHtml(serializedSchemas)}</script>

  <!-- Styles -->
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      color-scheme: light;
      --page-bg: #f7f8fc;
      --surface: #ffffff;
      --surface-subtle: #eef1f7;
      --text: #172033;
      --text-muted: #5d687b;
      --border: #d9dfeb;
      --accent: #6d28d9;
      --accent-hover: #5b21b6;
    }
    .dark {
      color-scheme: dark;
      --page-bg: #101522;
      --surface: #1b2333;
      --surface-subtle: #151c2a;
      --text: #f5f7fb;
      --text-muted: #b3bdcf;
      --border: #344055;
      --accent: #c4b5fd;
      --accent-hover: #ddd6fe;
    }
    body {
      background-color: var(--page-bg);
      color: var(--text);
      font-family: 'Manrope', sans-serif;
    }
    h1, h2, h3, h4 { font-family: 'Space Grotesk', sans-serif; }
    a { color: inherit; text-decoration: none; }
    a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
      outline: 3px solid var(--accent);
      outline-offset: 3px;
    }
    .hidden { display: none; }
    .flex { display: flex; }
    .grid { display: grid; }
    .block { display: block; }
    .inline-block { display: inline-block; }
    .relative { position: relative; }
    .absolute { position: absolute; }
    .sticky { position: sticky; }
    .fixed { position: fixed; }
    .invisible { visibility: hidden; }
    .visible { visibility: visible; }
    .opacity-0 { opacity: 0; }
    .cursor-pointer { cursor: pointer; }
    .outline-none { outline: 0; }
    .group { position: relative; }
    .z-10 { z-index: 10; }
    .z-40 { z-index: 40; }
    .z-50 { z-index: 50; }
    .top-0 { top: 0; }
    .top-8 { top: 2rem; }
    .top-3 { top: .75rem; }
    .top-1\/2 { top: 50%; }
    .right-0 { right: 0; }
    .right-3 { right: .75rem; }
    .bottom-5 { bottom: 1.25rem; }
    .left-4 { left: 1rem; }
    .left-1\/2 { left: 50%; }
    .-translate-x-1\/2 { transform: translateX(-50%); }
    .-translate-y-1\/2 { transform: translateY(-50%); }
    .items-center { align-items: center; }
    .items-start { align-items: flex-start; }
    .items-end { align-items: flex-end; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .flex-wrap { flex-wrap: wrap; }
    .flex-col { flex-direction: column; }
    .flex-1 { flex: 1 1 0%; }
    .flex-shrink-0 { flex-shrink: 0; }
    .min-w-0 { min-width: 0; }
    .min-w-\[200px\] { min-width: 200px; }
    .min-w-\[300px\] { min-width: 300px; }
    .min-h-screen { min-height: 100vh; }
    .w-full { width: 100%; }
    .w-4 { width: 1rem; }
    .w-5 { width: 1.25rem; }
    .w-10 { width: 2.5rem; }
    .w-12 { width: 3rem; }
    .w-16 { width: 4rem; }
    .w-20 { width: 5rem; }
    .w-24 { width: 6rem; }
    .w-32 { width: 8rem; }
    .w-40 { width: 10rem; }
    .h-full { height: 100%; }
    .h-2 { height: .5rem; }
    .h-3 { height: .75rem; }
    .h-4 { height: 1rem; }
    .h-5 { height: 1.25rem; }
    .h-10 { height: 2.5rem; }
    .h-12 { height: 3rem; }
    .h-16 { height: 4rem; }
    .h-20 { height: 5rem; }
    .h-32 { height: 8rem; }
    .h-48 { height: 12rem; }
    .max-w-4xl { max-width: 56rem; }
    .max-w-2xl { max-width: 42rem; }
    .max-w-3xl { max-width: 48rem; }
    .max-w-6xl { max-width: 72rem; }
    .max-w-7xl { max-width: 80rem; }
    .max-w-none { max-width: none; }
    .max-h-\[420px\] { max-height: 420px; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .overflow-hidden { overflow: hidden; }
    .overflow-x-auto { overflow-x: auto; }
    .overflow-y-auto { overflow-y: auto; }
    .object-cover { object-fit: cover; }
    .object-contain { object-fit: contain; }
    .text-center { text-align: center; }
    .text-left { text-align: left; }
    .capitalize { text-transform: capitalize; }
    .uppercase { text-transform: uppercase; }
    .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .font-bold { font-weight: 700; }
    .font-extrabold { font-weight: 800; }
    .font-semibold { font-weight: 600; }
    .font-medium { font-weight: 500; }
    .rounded { border-radius: .25rem; }
    .rounded-lg { border-radius: .5rem; }
    .rounded-xl { border-radius: .75rem; }
    .rounded-2xl { border-radius: 1rem; }
    .rounded-full { border-radius: 9999px; }
    .border { border-width: 1px; border-style: solid; }
    .border-t { border-top-width: 1px; border-top-style: solid; }
    .border-b { border-bottom-width: 1px; border-bottom-style: solid; }
    .border-gray-700 { border-color: #374151; }
    .border-gray-600 { border-color: #4b5563; }
    .border-gray-200 { border-color: var(--border); }
    .border-gray-300 { border-color: var(--border); }
    .border-gray-700\/60 { border-color: rgb(55 65 81 / .6); }
    .border-purple-500 { border-color: #a855f7; }
    .border-purple-500\/30 { border-color: rgb(168 85 247 / .3); }
    .bg-white { background-color: var(--surface); }
    .bg-gray-100 { background-color: var(--surface-subtle); }
    .bg-gray-50 { background-color: #f9fafb; }
    .bg-gray-200 { background-color: #e5e7eb; }
    .bg-gray-600 { background-color: #4b5563; }
    .bg-gray-700 { background-color: #374151; }
    .bg-gray-800 { background-color: #1f2937; }
    .bg-gray-900 { background-color: #111827; }
    .bg-purple-600 { background-color: #9333ea; }
    .bg-orange-600 { background-color: #ea580c; }
    .bg-blue-500 { background-color: #3b82f6; }
    .bg-green-500 { background-color: #22c55e; }
    .bg-yellow-500 { background-color: #eab308; }
    .bg-purple-500 { background-color: #a855f7; }
    .bg-gray-700\/50 { background-color: rgb(55 65 81 / .5); }
    .bg-gray-800\/50 { background-color: rgb(31 41 55 / .5); }
    .bg-gray-900\/80 { background-color: rgb(17 24 39 / .8); }
    .bg-white\/80 { background-color: rgb(255 255 255 / .8); }
    .bg-blue-500\/20 { background-color: rgb(59 130 246 / .2); }
    .bg-green-500\/20 { background-color: rgb(34 197 94 / .2); }
    .bg-yellow-500\/20 { background-color: rgb(234 179 8 / .2); }
    .bg-purple-500\/10 { background-color: rgb(168 85 247 / .1); }
    .bg-purple-500\/20 { background-color: rgb(168 85 247 / .2); }
    .bg-gradient-to-b { background-image: linear-gradient(to bottom, var(--tw-gradient-stops)); }
    .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
    .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
    .from-gray-800 { --tw-gradient-stops: #1f2937, rgb(31 41 55 / 0); }
    .from-purple-500 { --tw-gradient-stops: #a855f7, rgb(168 85 247 / 0); }
    .from-purple-600 { --tw-gradient-stops: #9333ea, rgb(147 51 234 / 0); }
    .from-purple-900\/50 { --tw-gradient-stops: rgb(88 28 135 / .5), rgb(88 28 135 / 0); }
    .to-blue-500 { --tw-gradient-to: #3b82f6; }
    .to-blue-600 { --tw-gradient-to: #2563eb; }
    .to-blue-900\/50 { --tw-gradient-to: rgb(30 58 138 / .5); }
    .to-gray-900 { --tw-gradient-to: #111827; }
    .text-white { color: #fff; }
    .text-gray-300 { color: #435066; }
    .text-gray-400 { color: #6d788b; }
    .text-gray-500 { color: var(--text-muted); }
    .text-purple-400 { color: var(--accent); }
    .text-purple-300 { color: #d8b4fe; }
    .text-blue-400 { color: #60a5fa; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-900 { color: #111827; }
    .text-green-400 { color: #4ade80; }
    .text-red-400 { color: #f87171; }
    .text-yellow-400 { color: #facc15; }
    .text-sm { font-size: .875rem; }
    .text-xs { font-size: .75rem; }
    .text-xl { font-size: 1.25rem; }
    .text-2xl { font-size: 1.5rem; }
    .text-3xl { font-size: 1.875rem; }
    .text-4xl { font-size: 2.25rem; }
    .text-8xl { font-size: 6rem; }
    .text-lg { font-size: 1.125rem; }
    .text-5xl { font-size: 3rem; }
    .text-6xl { font-size: 3.75rem; }
    .leading-tight { line-height: 1.25; }
    .leading-relaxed { line-height: 1.625; }
    .p-2 { padding: .5rem; }
    .p-3 { padding: .75rem; }
    .p-4 { padding: 1rem; }
    .p-5 { padding: 1.25rem; }
    .p-6 { padding: 1.5rem; }
    .p-8 { padding: 2rem; }
    .px-3 { padding-left: .75rem; padding-right: .75rem; }
    .px-2 { padding-left: .5rem; padding-right: .5rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
    .px-8 { padding-left: 2rem; padding-right: 2rem; }
    .py-1 { padding-top: .25rem; padding-bottom: .25rem; }
    .py-0\.5 { padding-top: .125rem; padding-bottom: .125rem; }
    .py-1\.5 { padding-top: .375rem; padding-bottom: .375rem; }
    .py-2 { padding-top: .5rem; padding-bottom: .5rem; }
    .py-3 { padding-top: .75rem; padding-bottom: .75rem; }
    .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
    .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
    .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
    .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
    .pt-6 { padding-top: 1.5rem; }
    .pb-6 { padding-bottom: 1.5rem; }
    .pl-4 { padding-left: 1rem; }
    .pl-12 { padding-left: 3rem; }
    .mb-1 { margin-bottom: .25rem; }
    .mb-2 { margin-bottom: .5rem; }
    .mb-3 { margin-bottom: .75rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-5 { margin-bottom: 1.25rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mb-8 { margin-bottom: 2rem; }
    .mb-10 { margin-bottom: 2.5rem; }
    .mt-1 { margin-top: .25rem; }
    .mt-2 { margin-top: .5rem; }
    .mt-4 { margin-top: 1rem; }
    .mt-6 { margin-top: 1.5rem; }
    .mt-8 { margin-top: 2rem; }
    .mt-10 { margin-top: 2.5rem; }
    .mt-16 { margin-top: 4rem; }
    .ml-2 { margin-left: .5rem; }
    .mr-1 { margin-right: .25rem; }
    .mr-3 { margin-right: .75rem; }
    .mx-2 { margin-left: .5rem; margin-right: .5rem; }
    .gap-2 { gap: .5rem; }
    .gap-3 { gap: .75rem; }
    .gap-4 { gap: 1rem; }
    .gap-6 { gap: 1.5rem; }
    .gap-x-4 { column-gap: 1rem; }
    .gap-y-2 { row-gap: .5rem; }
    .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: .25rem; }
    .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: .5rem; }
    .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: .75rem; }
    .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
    .space-y-5 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.25rem; }
    .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    .col-span-2 { grid-column: span 2 / span 2; }
    .col-span-3 { grid-column: span 3 / span 3; }
    .aspect-video { aspect-ratio: 16 / 9; }
    .line-clamp-2, .line-clamp-3 { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; }
    .line-clamp-2 { -webkit-line-clamp: 2; }
    .line-clamp-3 { -webkit-line-clamp: 3; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgb(15 23 42 / .12), 0 4px 6px -4px rgb(15 23 42 / .12); }
    .shadow-xl { box-shadow: 0 20px 25px -5px rgb(15 23 42 / .14), 0 8px 10px -6px rgb(15 23 42 / .12); }
    .shadow-2xl { box-shadow: 0 25px 50px -12px rgb(15 23 42 / .25); }
    .backdrop-blur-lg { backdrop-filter: blur(16px); }
    .transition { transition: background-color .2s, border-color .2s, color .2s, box-shadow .2s, transform .2s; }
    .transition-all { transition: all .2s; }
    .duration-200 { transition-duration: .2s; }
    .duration-500 { transition-duration: .5s; }
    .prose p { margin: 0 0 1rem; line-height: 1.65; }
    .prose h2 { font-size: 1.5rem; margin: 2rem 0 1rem; }
    .prose h3 { font-size: 1.25rem; margin: 1.5rem 0 .75rem; }
    .prose h4 { font-size: 1.125rem; margin: 1.5rem 0 .5rem; }
    .prose h2, .prose h3, .prose h4 { color: var(--text); font-weight: 700; }
    .prose h2 { border-bottom: 1px solid var(--border); padding-bottom: .5rem; }
    .prose ul, .prose ol { margin: 1rem 0; padding-left: 1.5rem; }
    .prose li { margin: .25rem 0; color: var(--text-muted); }
    .prose strong { color: var(--text); font-weight: 600; }
    .prose a {
      color: var(--accent);
      font-weight: 600;
      text-decoration: underline;
      text-decoration-color: color-mix(in srgb, currentColor 45%, transparent);
      text-decoration-thickness: 1px;
      text-underline-offset: .18em;
    }
    .prose a:hover { color: var(--accent-hover); text-decoration-color: currentColor; }
    .prose img { max-width: 100%; height: auto; border-radius: .75rem; }
    .prose table { width: 100%; border-collapse: collapse; }
    .prose th, .prose td { border: 1px solid #374151; padding: .75rem; text-align: left; }
    .prose th { background: #374151; color: #fff; }
    .prose blockquote { margin: 1.5rem 0; border-left: 4px solid #a855f7; border-radius: 0 .5rem .5rem 0; background: rgb(88 28 135 / .12); padding: .5rem 1rem; }
    .prose code { border-radius: .25rem; background: #374151; color: #d8b4fe; padding: .125rem .375rem; }
    .prose pre { overflow-x: auto; border: 1px solid #374151; background: #111827; }
    .prose pre code { background: transparent; padding: 0; }
    .dark .bg-gray-100 { background-color: var(--surface-subtle); }
    .dark .bg-white { background-color: var(--surface); }
    .dark .text-gray-300 { color: #d1d5db; }
    .dark .text-gray-400 { color: #9ca3af; }
    .dark .text-gray-500 { color: var(--text-muted); }
    .dark .text-purple-400 { color: var(--accent); }
    .dark .border-gray-200 { border-color: var(--border); }
    .dark .border-gray-300 { border-color: var(--border); }
    .dark .dark\\:bg-gray-800 { background-color: #1f2937; }
    .dark .dark\\:bg-gray-900 { background-color: #111827; }
    .dark .dark\\:text-gray-300 { color: #d1d5db; }
    .dark .dark\\:text-gray-400 { color: #9ca3af; }
    .dark .dark\\:border-gray-600 { border-color: #4b5563; }
    .dark .dark\\:border-gray-700 { border-color: #374151; }
    .dark .dark\\:text-white { color: #fff; }
    .dark .dark\\:text-gray-600 { color: #d1d5db; }
    .dark .dark\\:bg-gray-700 { background-color: #374151; }
    .dark .dark\\:bg-gray-800\\/30 { background-color: rgb(31 41 55 / .3); }
    .dark .dark\\:bg-gray-800\\/50 { background-color: rgb(31 41 55 / .5); }
    .dark .dark\\:hover\\:bg-gray-600:hover { background-color: #4b5563; }
    .dark .dark\\:hover\\:bg-gray-700:hover { background-color: #374151; }
    .dark .dark\\:hover\\:text-white:hover { color: #fff; }
    .dark .dark\\:block { display: block; }
    .dark .dark\\:hidden { display: none; }
    .hover\\:bg-gray-100:hover { background-color: #f3f4f6; }
    .hover\\:bg-gray-300:hover { background-color: #d1d5db; }
    .hover\\:bg-gray-600:hover { background-color: #4b5563; }
    .hover\\:bg-gray-700:hover { background-color: #374151; }
    .hover\\:bg-gray-800:hover { background-color: #1f2937; }
    .hover\\:bg-orange-700:hover { background-color: #c2410c; }
    .hover\\:bg-purple-600:hover { background-color: #9333ea; }
    .hover\\:bg-purple-700:hover { background-color: #7e22ce; }
    .hover\\:border-purple-500:hover { border-color: #a855f7; }
    .hover\\:text-purple-300:hover { color: #d8b4fe; }
    .hover\\:text-purple-400:hover { color: #c084fc; }
    .hover\\:text-purple-600:hover { color: #9333ea; }
    .hover\\:text-white:hover { color: #fff; }
    .hover\\:ring-1:hover { box-shadow: 0 0 0 1px var(--tw-ring-color, rgb(0 0 0 / .05)); }
    .hover\\:ring-2:hover { box-shadow: 0 0 0 2px var(--tw-ring-color, rgb(0 0 0 / .05)); }
    .hover\\:ring-purple-500:hover { --tw-ring-color: #a855f7; }
    .group:hover .group-hover\\:opacity-100 { opacity: 1; }
    .group:hover .group-hover\\:visible { visibility: visible; }
    .group:hover .group-hover\\:scale-105 { transform: scale(1.05); }
    .focus\\:outline-none:focus { outline: 0; }
    .focus\\:border-purple-500:focus { border-color: #a855f7; }
    .focus\\:ring-2:focus { box-shadow: 0 0 0 2px rgb(168 85 247 / .45); }
    .focus\\:ring-purple-500:focus { --tw-ring-color: #a855f7; }
    /* Theme transition */
    * { transition: background-color 0.2s, border-color 0.2s, color 0.2s; }
    /* Lazy load images */
    img[loading="lazy"] { opacity: 0; transition: opacity 0.3s; }
    img[loading="lazy"].loaded { opacity: 1; }
    @media (max-width: 767px) {
      .site-nav { height: auto; min-height: 4rem; flex-wrap: wrap; gap: .5rem; padding-top: .75rem; padding-bottom: .75rem; }
      .site-nav > a { white-space: nowrap; }
      .site-nav-links { width: 100%; flex-wrap: wrap; gap: .75rem; font-size: .875rem; }
      .prose table { table-layout: fixed; overflow-wrap: anywhere; }
      .prose th, .prose td { padding: .5rem; }
    }
    @media (min-width: 640px) {
      .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .sm\\:inline { display: inline; }
    }
    @media (min-width: 768px) {
      .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .md\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
      .md\\:p-8 { padding: 2rem; }
      .md\\:p-10 { padding: 2.5rem; }
      .md\\:text-5xl { font-size: 3rem; }
      .md\\:text-6xl { font-size: 3.75rem; }
    }
    @media (min-width: 1024px) {
      .lg\\:grid { display: grid; }
      .lg\\:block { display: block; }
      .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .lg\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
      .lg\\:grid-cols-\\[1fr_280px\\] { grid-template-columns: 1fr 280px; }
      .lg\\:gap-12 { gap: 3rem; }
    }
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
    <nav class="site-nav max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/${locale}" class="text-2xl font-bold">🎮 GearLabGaming</a>
      <div class="site-nav-links flex items-center gap-4">
        <a href="/${locale}/products" class="text-gray-600 dark:text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white">${t(locale, 'nav.products')}</a>
        <a href="/${locale}/articles" class="text-gray-600 dark:text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white">${t(locale, 'nav.articles')}</a>
        <a href="/${locale}/categories" class="text-gray-600 dark:text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white">${t(locale, 'nav.categories')}</a>
        <a href="/${locale}/about" class="text-gray-600 dark:text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white">About</a>
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
      </div>
    </nav>
  </header>
  ${content}
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 px-4 text-center text-gray-500 dark:text-gray-400 mt-16">
    <p>${t(locale, 'footer.copyright')}</p>
    <p class="mt-2 text-sm"><a href="/${locale}/about" class="hover:text-purple-400">About & testing method</a> · <a href="/${locale}/affiliate-disclosure" class="hover:text-purple-400">Affiliate disclosure</a></p>
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


export const renderAbout = (locale: Locale) => wrapHTML('About GearLabGaming', `
    <section class="py-16 px-4"><div class="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
      <h1>About GearLabGaming</h1>
      <p>GearLabGaming publishes practical gaming gear reviews and buying guides for players who want clear recommendations backed by repeatable criteria.</p>
      <h2>How we evaluate products</h2>
      <p>We assess performance, comfort, build quality, features, software, compatibility, and value for the product's intended audience. Scores are category-specific and are not based on price alone.</p>
      <h2>What our reviews include</h2>
      <ul><li>Key specifications and real-world use cases</li><li>Strengths, trade-offs, and who should buy</li><li>Alternatives and comparison context</li><li>Update dates when pricing or firmware changes matter</li></ul>
      <h2>Specifications are not hands-on test results</h2>
      <p>Our buying guides may use manufacturer specifications and editorial comparisons. Unless a page explicitly describes a test setup, sample, procedure and measured results, do not interpret a recommendation or score as a standardized lab measurement. Published weights and dimensions are nominal specifications, not measurements taken by this site.</p>
      <h2>Sources and corrections</h2>
      <p>Check the exact model and revision against the manufacturer's documentation. Availability, firmware and delivered prices can change. We distinguish spending caps from live prices, and update recommendations when a documented correction changes the buying decision. Fit guidance is a starting point, not a guarantee of comfort.</p>
      <h2>Editorial independence</h2>
      <p>Retail links may earn a commission, but commissions do not change ratings, rankings, or recommendations. See our <a href="/${locale}/affiliate-disclosure">affiliate disclosure</a>.</p>
    </div></section>
  `, locale, `/${locale}/about`, {
    description: 'Learn how GearLabGaming evaluates gaming gear with repeatable criteria for performance, comfort, build quality, features, compatibility, value, and editorial independence.'
  })

export const renderDisclosure = (locale: Locale) => wrapHTML('Affiliate Disclosure', `
    <section class="py-16 px-4"><div class="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
      <h1>Affiliate Disclosure</h1>
      <p>Some links on GearLabGaming are affiliate links. If you purchase through one of these links, we may receive a commission at no additional cost to you.</p>
      <p>Our editorial team selects products and assigns ratings independently. Affiliate relationships do not determine which products we cover or how they are scored.</p>
      <p>Prices and availability can change at the retailer. Verify the final price, seller, warranty, and return policy before purchase.</p>
    </div></section>
  `, locale, `/${locale}/affiliate-disclosure`, {
    description: 'Read GearLabGaming\'s affiliate disclosure, including how retail commissions work, how recommendations remain independent, and what to check before buying gaming gear.'
  })
