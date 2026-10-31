import { BASE_URL } from '../constants'

export function formatSitemapDate(timestamp: unknown): string {
  const value = Number(timestamp)
  if (!Number.isFinite(value) || value <= 0) return new Date().toISOString().slice(0, 10)
  return new Date(value < 10_000_000_000 ? value * 1000 : value).toISOString().slice(0, 10)
}

export function formatContentDate(timestamp: unknown, locale: string): string {
  const value = Number(timestamp)
  const date = Number.isFinite(value) && value > 0
    ? new Date(value < 10_000_000_000 ? value * 1000 : value)
    : new Date()
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale)
}

export function toIsoDate(timestamp: unknown): string | undefined {
  const value = Number(timestamp)
  if (!Number.isFinite(value) || value <= 0) return undefined
  return new Date(value < 10_000_000_000 ? value * 1000 : value).toISOString()
}

export function toAbsoluteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    return new URL(value, BASE_URL).toString()
  } catch {
    return undefined
  }
}
