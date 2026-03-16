/**
 * Categories Collection
 *
 * Product categories: Mice, Keyboards, Headsets, Monitors, Chairs
 */

import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'categories',
  displayName: 'Categories',
  description: 'Product categories for gaming gear',
  icon: '📁',

  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: 'Category Name',
        required: true,
        maxLength: 100,
      },
      slug: {
        type: 'slug',
        title: 'URL Slug',
        required: true,
        maxLength: 100,
      },
      description: {
        type: 'textarea',
        title: 'Description',
        maxLength: 500,
        helpText: 'Category description for SEO',
      },
      icon: {
        type: 'string',
        title: 'Icon',
        helpText: 'Emoji or icon class',
        maxLength: 50,
      },
      parent: {
        type: 'relation',
        title: 'Parent Category',
        relationTo: 'categories',
        helpText: 'For sub-categories',
      },
      order: {
        type: 'number',
        title: 'Display Order',
        default: 0,
        helpText: 'Lower numbers appear first',
      },
      seo: {
        type: 'object',
        title: 'SEO Settings',
        properties: {
          title: {
            type: 'string',
            title: 'SEO Title',
            maxLength: 60,
          },
          description: {
            type: 'textarea',
            title: 'Meta Description',
            maxLength: 160,
          },
          keywords: {
            type: 'string',
            title: 'Keywords',
            helpText: 'Comma-separated keywords',
          },
        },
      },
      isActive: {
        type: 'boolean',
        title: 'Active',
        default: true,
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
              name: { type: 'string', title: '分类名称', maxLength: 100 },
              description: { type: 'textarea', title: '描述', maxLength: 500 },
            },
          },
          fr: {
            type: 'object',
            title: 'Français (French)',
            properties: {
              name: { type: 'string', title: 'Nom de catégorie', maxLength: 100 },
              description: { type: 'textarea', title: 'Description', maxLength: 500 },
            },
          },
          es: {
            type: 'object',
            title: 'Español (Spanish)',
            properties: {
              name: { type: 'string', title: 'Nombre de categoría', maxLength: 100 },
              description: { type: 'textarea', title: 'Descripción', maxLength: 500 },
            },
          },
          ru: {
            type: 'object',
            title: 'Русский (Russian)',
            properties: {
              name: { type: 'string', title: 'Название категории', maxLength: 100 },
              description: { type: 'textarea', title: 'Описание', maxLength: 500 },
            },
          },
        },
      },
    },
    required: ['name', 'slug'],
  },

  listFields: ['name', 'slug', 'order', 'isActive'],
  searchFields: ['name', 'description'],
  defaultSort: 'order',
  defaultSortOrder: 'asc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig
