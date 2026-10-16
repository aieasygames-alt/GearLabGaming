# GSC opportunity optimization - 2026-10-16

## Published changes

- Reworked the 60HE comparison, small-hand mouse shortlist and $200 peripheral plan.
- Corrected the Huntsman switch technology distinction and separated 60HE/80HE model scope.
- Removed unsupported hands-on ranking wording from the small-hand article.
- Corrected featured-product IDs and 80HE product associations.
- Added contextual product-to-guide links and explicit related-article priority.
- Consolidated four old article paths with permanent redirects; excluded sources from discovery listings and sitemap.
- Redirected untranslated Chinese fallback pages to English; retained six editorial Chinese reviews with reciprocal hreflang, localized metadata and sitemap inclusion.
- Added API noindex response headers without blocking crawling of those directives.
- Fixed a pre-existing linkedom document-fragment parsing bug that suppressed article/review bodies.
- Kept legitimate search/comparison noindex and test-category 404 responses intact.

## Publication and recovery

Twenty D1 records were updated with optimistic concurrency guards and read-back verification. Original records and generated SQL are preserved locally in `.wrangler/seo-backups/gsc-1792159467/`; private operational backups are not committed. Content changes are reproducible via `scripts/optimize-gsc-opportunities.ts` (preview by default, `--apply` to publish).

Production Worker version: `d9a3c401-1bec-4341-8d92-9aec0c251aec`.

IndexNow accepted 52 canonical sitemap URLs with HTTP 200. This is not a Google indexing request or proof of inclusion. Google can discover the updated sitemap at the already-submitted URL. No GSC Validate Fix or manual Request Indexing action was performed.

## Verification

- TypeScript build and UI utility audit.
- SEO policy tests and fixture-based route integration tests, including actual body rendering.
- Live Chrome confirmation of published article content.
- Live canonical, indexability and response checks across sitemap URLs.

## Remaining uncertainty

The GSC report is historical. These changes do not guarantee crawling, indexing or ranking. Review the 18 previously discovered-but-not-indexed URLs after Google refreshes its reports; consolidated sources should become redirect exclusions rather than indexed pages. Product pricing and subjective fit still require buyer verification; budget figures are planning caps, not live offers.
