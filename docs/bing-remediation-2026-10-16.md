# Bing Webmaster remediation - 2026-10-16

## Confirmed root cause and fixes

The production Worker had no secrets configured. SonicJS rejects production bootstrap when JWT_SECRET is absent rather than accepting its insecure development fallback. A cryptographically random JWT_SECRET was installed directly as a Cloudflare Worker secret; no value is stored in the repository or report. An anonymous request changed from HTTP 500 to the CMS's expected HTTP 401. Previously signed sessions may need reauthentication.

Admin and authentication responses receive X-Robots-Tag: noindex, nofollow, noarchive and private/no-store caching. The public navigation no longer links to admin. Authentication enforcement is retained, not bypassed.

The two historically most-cited mouse guides retain their existing canonical URLs. Additive editorial improvements provide a comparison-factor table, explicit specification versus testing limits, a repeatable buyer fit checklist and exact-model manufacturer sources. The buying guide now has an answer-first summary and relevant related-article links. No lab results, original product photographs, backlinks or claims of restored citations were fabricated.

The public About page clarifies that specifications and editorial recommendations are not standardized hands-on measurements.

## AI citation diagnosis baseline

Bing's 30-day report covers 2026-09-11 through 2026-10-10, before these changes. Site daily citation totals fell from 344 (09-27 through 10-03) to 74 (10-04 through 10-10), a 78.5% decrease.

The URL-level drilldown for `how-to-choose-gaming-mouse-2026` confirms 268 total monthly citations. It fell from 70 in the earlier week (10+9+17+10+5+9+10) to 11 in the later week (3+4+4 on the only displayed nonzero dates), an 84.3% decrease. Thus the decline does involve this specific existing asset, not merely the old setup URL migration. Query samples include `what to look for in gaming mice` (122), `what to look for in a mouse` (48), `gaming mouse buying guide` (17), and `gaming mouse comparison factors` (12).

This locates a material decline but does not establish causation. Bing labels samples provisional; an automatic topic label incorrectly maps a mouse query to Dog Breeds & Care. The historical body-rendering bug is a plausible concern, not proven cause. No claim is made that changes have recovered AI citations.

## Items that are not immediate code fixes

- Bing's old duplicate-description warning: checked English URLs already return distinct descriptions. Recheck current sitemap metadata rather than rewrite based solely on stale warnings.
- External authority: Bing reports no available backlink data and recommends quality referring domains. Real editorial citations require third-party choices; no paid/spam links or outreach were submitted.
- Original research: real measurements and photographs require physical samples and an actual recorded test. A documented buyer checklist is not represented as original lab data.
- Recrawling and canonical migration require search-engine processing. IndexNow acceptance is not proof of indexing.

## Validation

Type checking, SEO policy tests, route regression tests and UI utility audit. Production verification checks anonymous admin/auth status and private headers, public body rendering and metadata, and canonical URL redirects. Content publishing uses original-record backups, optimistic concurrency guards and read-back verification.

Production Worker version: `f8ab2786-6971-4fdd-8456-ecb1432d2498`.

Final live verification passed for all 52 sitemap URLs: no missing descriptions, no duplicate descriptions, and all self-canonical tags matched. `/admin` returned 401 and `/auth/login` returned 200; both carried the expected noindex and private/no-store headers. Both mouse guides rendered the source and buyer-checklist blocks, and public navigation contained no admin link.

`npm run build`, SEO policy tests, route integration tests, the UI utility audit (337 classes), and `git diff --check` passed. The minimal route-test D1 fixture does not implement CMS migration writes: CMS bootstrap logs that fixture limitation and catches it before authentication assertions. The production HTTP checks independently verified the actual deployed routes.

Manufacturer-link spot checks returned 200 for Razer and the redirected Logitech page. Pulsar returned 429 to the automated request, so its current page content could not be independently verified during this run. The guide explicitly asks readers to check exact-model specifications; no new numerical claims rely on that unverified response.

IndexNow accepted the two updated guide URLs and `/en/about` with HTTP 200. This confirms submission acceptance, not recrawling, indexing, ranking or citation recovery.
