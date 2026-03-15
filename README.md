# GearLabGaming

Gaming Gear Reviews & Guides - Built with SonicJS CMS on Cloudflare Workers

## 🚀 Tech Stack

- **CMS**: [SonicJS](https://sonicjs.com/) - Edge-native headless CMS
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (optional)
- **Framework**: Hono

## 📁 Project Structure

```
GearLabGaming/
├── src/
│   ├── index.ts              # Main entry point
│   ├── collections/          # Content models
│   │   ├── categories.collection.ts
│   │   ├── products.collection.ts
│   │   ├── articles.collection.ts
│   │   └── authors.collection.ts
│   └── routes/               # Custom routes (optional)
├── migrations/               # Database migrations
├── public/                   # Static assets
├── wrangler.toml            # Cloudflare config
├── package.json
└── tsconfig.json
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Frontend: http://localhost:8787
# Admin: http://localhost:8787/admin
```

## 🚢 Deployment

```bash
# Deploy to Cloudflare Workers
npm run deploy

# Run database migrations
npm run db:migrate
```

## 📝 Content Collections

| Collection | Description |
|------------|-------------|
| **Categories** | Product categories (Mice, Keyboards, etc.) |
| **Products** | Gaming gear products with reviews |
| **Articles** | Blog posts, guides, comparisons |
| **Authors** | Content authors and reviewers |

## 🔗 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/admin` | Admin dashboard |
| `/api` | REST API |
| `/api/collections` | List all collections |
| `/api/{collection}` | CRUD operations |

## 📊 Database

Using Cloudflare D1 (SQLite):
- Database ID: `76d8fbcb-a3b3-478e-9460-3423f3b0eda4`

## 📄 License

MIT
