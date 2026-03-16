/**
 * Products Collection
 *
 * Gaming gear products for review
 */

import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'products',
  displayName: 'Products',
  description: 'Gaming gear products and reviews',
  icon: '🎮',

  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: 'Product Name',
        required: true,
        maxLength: 200,
      },
      brand: {
        type: 'string',
        title: 'Brand',
        required: true,
        maxLength: 100,
      },
      slug: {
        type: 'slug',
        title: 'URL Slug',
        required: true,
        maxLength: 200,
      },
      category: {
        type: 'relation',
        title: 'Category',
        relationTo: 'categories',
        required: true,
      },
      images: {
        type: 'media',
        title: 'Product Images',
        multiple: true,
      },
      price: {
        type: 'number',
        title: 'Price (USD)',
        required: true,
      },
      priceRange: {
        type: 'select',
        title: 'Price Range',
        enum: ['budget', 'mid-range', 'premium', 'ultra-premium'],
        enumLabels: ['Budget (<$50)', 'Mid-Range ($50-$100)', 'Premium ($100-$200)', 'Ultra-Premium ($200+)'],
      },
      specs: {
        type: 'object',
        title: 'Specifications',
        properties: {
          weight: { type: 'string', title: 'Weight' },
          dimensions: { type: 'string', title: 'Dimensions' },
          connectivity: {
            type: 'select',
            title: 'Connectivity',
            enum: ['wired', 'wireless', 'both'],
            enumLabels: ['Wired', 'Wireless', 'Both'],
          },
          additionalSpecs: {
            type: 'textarea',
            title: 'Additional Specs',
            helpText: 'JSON or text format',
          },
        },
      },
      rating: {
        type: 'object',
        title: 'Rating',
        properties: {
          overall: {
            type: 'number',
            title: 'Overall Score',
            minimum: 0,
            maximum: 10,
          },
          buildQuality: {
            type: 'number',
            title: 'Build Quality',
            minimum: 0,
            maximum: 10,
          },
          performance: {
            type: 'number',
            title: 'Performance',
            minimum: 0,
            maximum: 10,
          },
          value: {
            type: 'number',
            title: 'Value for Money',
            minimum: 0,
            maximum: 10,
          },
        },
      },
      pros: {
        type: 'array',
        title: 'Pros',
        items: {
          type: 'string',
        },
      },
      cons: {
        type: 'array',
        title: 'Cons',
        items: {
          type: 'string',
        },
      },
      reviewContent: {
        type: 'quill',
        title: 'Full Review',
      },
      verdict: {
        type: 'textarea',
        title: 'Verdict',
        maxLength: 500,
      },
      translations: {
        type: 'object',
        title: 'Translations',
        helpText: 'Multi-language content (zh, fr, es, ru)',
        properties: {
          zh: {
            type: 'object',
            title: '中文 (Chinese)',
            properties: {
              name: { type: 'string', title: '产品名称' },
              verdict: { type: 'textarea', title: '总结', maxLength: 500 },
              pros: { type: 'array', title: '优点', items: { type: 'string' } },
              cons: { type: 'array', title: '缺点', items: { type: 'string' } },
              reviewContent: { type: 'quill', title: '完整评测' },
            },
          },
          fr: {
            type: 'object',
            title: 'Français (French)',
            properties: {
              name: { type: 'string', title: 'Nom du produit' },
              verdict: { type: 'textarea', title: 'Verdict', maxLength: 500 },
              pros: { type: 'array', title: 'Avantages', items: { type: 'string' } },
              cons: { type: 'array', title: 'Inconvénients', items: { type: 'string' } },
              reviewContent: { type: 'quill', title: 'Avis complet' },
            },
          },
          es: {
            type: 'object',
            title: 'Español (Spanish)',
            properties: {
              name: { type: 'string', title: 'Nombre del producto' },
              verdict: { type: 'textarea', title: 'Veredicto', maxLength: 500 },
              pros: { type: 'array', title: 'Ventajas', items: { type: 'string' } },
              cons: { type: 'array', title: 'Desventajas', items: { type: 'string' } },
              reviewContent: { type: 'quill', title: 'Reseña completa' },
            },
          },
          ru: {
            type: 'object',
            title: 'Русский (Russian)',
            properties: {
              name: { type: 'string', title: 'Название продукта' },
              verdict: { type: 'textarea', title: 'Вердикт', maxLength: 500 },
              pros: { type: 'array', title: 'Плюсы', items: { type: 'string' } },
              cons: { type: 'array', title: 'Минусы', items: { type: 'string' } },
              reviewContent: { type: 'quill', title: 'Полный обзор' },
            },
          },
        },
      },
      bestFor: {
        type: 'select',
        title: 'Best For',
        enum: [
          'fingertip-grip',
          'claw-grip',
          'palm-grip',
          'fps-games',
          'moba-games',
          'mmorpg-games',
          'budget',
          'premium',
          'wireless',
          'lightweight'
        ],
        enumLabels: [
          'Fingertip Grip',
          'Claw Grip',
          'Palm Grip',
          'FPS Games',
          'MOBA Games',
          'MMORPG Games',
          'Budget Friendly',
          'Premium',
          'Wireless',
          'Lightweight'
        ],
        multiple: true,
      },
      affiliateLinks: {
        type: 'object',
        title: 'Affiliate Links',
        properties: {
          amazon: { type: 'string', title: 'Amazon URL' },
          official: { type: 'string', title: 'Official Store URL' },
          bestBuy: { type: 'string', title: 'Best Buy URL' },
        },
      },
      seo: {
        type: 'object',
        title: 'SEO Settings',
        properties: {
          title: { type: 'string', title: 'SEO Title', maxLength: 60 },
          description: { type: 'textarea', title: 'Meta Description', maxLength: 160 },
          keywords: { type: 'string', title: 'Keywords' },
        },
      },
      status: {
        type: 'select',
        title: 'Status',
        enum: ['draft', 'published', 'archived'],
        enumLabels: ['Draft', 'Published', 'Archived'],
        default: 'draft',
      },
      publishedAt: {
        type: 'datetime',
        title: 'Published Date',
      },
      featured: {
        type: 'boolean',
        title: 'Featured Product',
        default: false,
      },
    },
    required: ['name', 'brand', 'slug', 'category', 'price'],
  },

  listFields: ['name', 'brand', 'category', 'price', 'rating.overall', 'status', 'featured'],
  searchFields: ['name', 'brand', 'description'],
  defaultSort: 'createdAt',
  defaultSortOrder: 'desc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig
