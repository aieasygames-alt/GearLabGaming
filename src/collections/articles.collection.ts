/**
 * Articles Collection
 *
 * Review articles, guides, comparisons
 */

import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'articles',
  displayName: 'Articles',
  description: 'Review articles, guides, and comparisons',
  icon: '📝',

  schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: 'Title',
        required: true,
        maxLength: 200,
      },
      slug: {
        type: 'slug',
        title: 'URL Slug',
        required: true,
        maxLength: 200,
      },
      type: {
        type: 'select',
        title: 'Article Type',
        enum: ['list', 'review', 'comparison', 'guide', 'news'],
        enumLabels: ['Best List', 'Single Review', 'Comparison', 'Guide/Tutorial', 'News'],
        required: true,
        default: 'list',
      },
      category: {
        type: 'relation',
        title: 'Category',
        relationTo: 'categories',
        required: true,
      },
      excerpt: {
        type: 'textarea',
        title: 'Excerpt',
        maxLength: 300,
        helpText: 'Short summary for listings and SEO',
      },
      featuredImage: {
        type: 'media',
        title: 'Featured Image',
      },
      content: {
        type: 'quill',
        title: 'Content',
        required: true,
      },
      featuredProducts: {
        type: 'relation',
        title: 'Featured Products',
        relationTo: 'products',
        multiple: true,
        helpText: 'Products mentioned in this article',
      },
      comparisonTable: {
        type: 'array',
        title: 'Comparison Table',
        items: {
          type: 'object',
          properties: {
            product: {
              type: 'relation',
              title: 'Product',
              relationTo: 'products',
            },
            rank: {
              type: 'number',
              title: 'Rank',
            },
            badge: {
              type: 'select',
              title: 'Badge',
              enum: ['best-overall', 'best-value', 'best-budget', 'best-premium', 'runner-up'],
              enumLabels: ['Best Overall', 'Best Value', 'Best Budget', 'Best Premium', 'Runner Up'],
            },
          },
        },
      },
      quickVerdict: {
        type: 'object',
        title: 'Quick Verdict',
        properties: {
          summary: { type: 'textarea', title: 'Summary', maxLength: 200 },
          topPick: { type: 'relation', title: 'Top Pick', relationTo: 'products' },
          valuePick: { type: 'relation', title: 'Value Pick', relationTo: 'products' },
        },
      },
      author: {
        type: 'relation',
        title: 'Author',
        relationTo: 'authors',
        required: true,
      },
      relatedArticles: {
        type: 'relation',
        title: 'Related Articles',
        relationTo: 'articles',
        multiple: true,
      },
      seo: {
        type: 'object',
        title: 'SEO Settings',
        properties: {
          title: { type: 'string', title: 'SEO Title', maxLength: 60 },
          description: { type: 'textarea', title: 'Meta Description', maxLength: 160 },
          keywords: { type: 'string', title: 'Keywords' },
          focusKeyword: { type: 'string', title: 'Focus Keyword' },
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
      updatedAt: {
        type: 'datetime',
        title: 'Last Updated',
      },
      readingTime: {
        type: 'number',
        title: 'Reading Time (minutes)',
        helpText: 'Estimated reading time',
      },
      featured: {
        type: 'boolean',
        title: 'Featured Article',
        default: false,
      },
    },
    required: ['title', 'slug', 'type', 'category', 'content', 'author'],
  },

  listFields: ['title', 'type', 'category', 'author', 'status', 'publishedAt'],
  searchFields: ['title', 'excerpt', 'content'],
  defaultSort: 'publishedAt',
  defaultSortOrder: 'desc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig
