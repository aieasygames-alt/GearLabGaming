import { execFileSync } from 'node:child_process'

const now = Math.floor(Date.now() / 1000)
const updates = [
  ['lg-27gp850-b-ultragear-review', 'https://www.amazon.com/LG-27GP850-B-Ultragear-Compatible-Adjustable/dp/B093MTSTKD?th=1', '/media/products/lg-27gp850-b.png'],
  ['hyperx-cloud-iii-wireless-review', 'https://www.amazon.com/HyperX-Cloud-III-Multi-Platform-Detachable/dp/B0F6NZWPTC?th=1', '/media/products/hyperx-cloud-iii.png'],
  ['wooting-60he-review', 'https://wooting.io/zh-CN/wooting-60he-v2', '/media/products/wooting-60he.png'],
  ['lamzu-atlantis-mini-review', 'https://www.amazon.com/Lamzu-Atlantis-Mini-Champion-Lightweight/dp/B0D9BKWP3G?th=1', '/media/products/lamzu-atlantis-mini.png']
] as const

const quote = (value: string) => value.replaceAll("'", "''")
const sql = updates.map(([slug, url, image]) => `UPDATE content SET data=json_set(json_set(data, '$.affiliateLinks.amazon', '${quote(url)}'), '$.images', json_array('${image}')), updated_at=${now} WHERE slug='${slug}';`).join('\n')
execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', '--remote', '--command', sql], { stdio: 'inherit' })
console.log(`Updated ${updates.length} affiliate links in remote D1.`)
