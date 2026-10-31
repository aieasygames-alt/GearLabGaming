import { parseHTML } from 'linkedom'

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function escapeJsonForHtml(value: string): string {
  return value.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}

export const ALLOWED_RICH_TEXT_TAGS = new Set([
  'a', 'blockquote', 'br', 'code', 'del', 'em', 'figcaption', 'figure', 'h2', 'h3', 'h4',
  'hr', 'img', 'li', 'ol', 'p', 'pre', 's', 'strong', 'table', 'tbody', 'td', 'th', 'thead',
  'tr', 'u', 'ul'
])

export const ALLOWED_RICH_TEXT_ATTRIBUTES: Record<string, Set<string>> = {
  a: new Set(['href', 'title']),
  img: new Set(['alt', 'height', 'src', 'title', 'width']),
  ol: new Set(['start']),
  td: new Set(['colspan', 'rowspan']),
  th: new Set(['colspan', 'rowspan'])
}

export function isSafeRichTextUrl(value: string, tagName: string): boolean {
  if (!value) return false
  if (tagName === 'img') return value.startsWith('/') || /^https:\/\//i.test(value)
  return value.startsWith('/') || value.startsWith('#') || /^https:\/\//i.test(value) || /^mailto:/i.test(value)
}

export function sanitizeRichText(value: unknown): string {
  const { document } = parseHTML(`<html><head></head><body>${String(value ?? '')}</body></html>`)
  const body = document.body
  if (!body) return ''

  const elements = Array.from(body.querySelectorAll('*')) as Array<{
    tagName: string
    attributes: ArrayLike<{ name: string; value: string }>
    childNodes: ArrayLike<unknown>
    getAttribute: (name: string) => string | null
    removeAttribute: (name: string) => void
    replaceWith: (...nodes: unknown[]) => void
    setAttribute: (name: string, value: string) => void
  }>
  for (const element of elements) {
    const tagName = element.tagName.toLowerCase()
    if (!ALLOWED_RICH_TEXT_TAGS.has(tagName)) {
      element.replaceWith(...Array.from(element.childNodes))
      continue
    }

    const allowedAttributes = ALLOWED_RICH_TEXT_ATTRIBUTES[tagName] || new Set<string>()
    for (const attribute of Array.from(element.attributes)) {
      const attributeName = attribute.name.toLowerCase()
      if (!allowedAttributes.has(attributeName)) {
        element.removeAttribute(attribute.name)
        continue
      }
      if ((attributeName === 'href' || attributeName === 'src') && !isSafeRichTextUrl(attribute.value.trim(), tagName)) {
        element.removeAttribute(attribute.name)
      }
    }

    if (tagName === 'a' && element.getAttribute('href')?.startsWith('http')) {
      element.setAttribute('rel', 'noopener noreferrer')
    }
  }

  return body.innerHTML
}

export function stripHtml(value: unknown): string {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}
