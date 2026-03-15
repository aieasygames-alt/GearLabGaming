/**
 * Seed Admin User
 *
 * Run this script to create an initial admin user
 *
 * Usage: npx tsx scripts/seed-admin.ts
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gearlabgaming.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123'

async function seedAdmin() {
  console.log('🌱 Seeding admin user...')
  console.log(`📧 Email: ${ADMIN_EMAIL}`)

  // Note: This script is a placeholder
  // In production, you would use the SonicJS API to create the user
  // or use the admin UI to create the first user

  console.log(`
  ⚠️  Manual Setup Required

  1. Start the dev server: npm run dev
  2. Open http://localhost:8787/admin
  3. Create your admin account through the UI

  Or use the SonicJS CLI (if available):
  npx sonicjs create-user --email ${ADMIN_EMAIL} --role admin
  `)

  console.log('✅ Seed script completed')
}

seedAdmin().catch(console.error)
