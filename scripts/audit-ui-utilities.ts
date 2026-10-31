import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

function getSourceFiles(dir: string): string[] {
  let files: string[] = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      files = files.concat(getSourceFiles(fullPath))
    } else if (entry.endsWith('.ts') && !entry.includes('.bak') && !entry.includes('.tmp')) {
      files.push(fullPath)
    }
  }
  return files
}

const srcDir = fileURLToPath(new URL('../src', import.meta.url))
const files = getSourceFiles(srcDir)
const source = files.map((file) => readFileSync(file, 'utf8')).join('\n')
const style = source.match(/<style>([\s\S]*?)<\/style>/)?.[1] || ''

const tokens = new Set<string>()
for (const match of source.matchAll(/class="([^"]+)"/g)) {
  for (const token of match[1].split(/\s+/)) {
    if (token && !token.includes('${') && !token.includes("'") && !token.includes('}')) tokens.add(token)
  }
}

const ignored = new Set([
  'prose', 'prose-lg', 'dark:prose-invert', 'compare-choice'
])

function selectorFor(token: string): string {
  return `.${token.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1')}`
}

function hasSelector(token: string): boolean {
  const escaped = selectorFor(token)
  const cssEscaped = escaped.replaceAll('\\', '\\\\')
  return style.includes(escaped) || style.includes(cssEscaped)
}

const missing = [...tokens]
  .filter((token) => !ignored.has(token) && !/^(?:item\.level|:|===|\?|prose-|hover:prose-a:)/.test(token))
  .filter((token) => !hasSelector(token))
  .sort()

if (missing.length) {
  console.error('Undefined UI utility classes:\n' + missing.map((token) => `- ${token}`).join('\n'))
  process.exit(1)
}

console.log(`UI utility audit passed: ${tokens.size} classes checked.`)
