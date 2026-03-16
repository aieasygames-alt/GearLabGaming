/**
 * Price History Collection
 *
 * Track price changes for products over time
 */

import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'price-history',
  displayName: 'Price History',
  description: 'Historical price tracking for products',
  icon: '📈',

  schema: {
    type: 'object',
    properties: {
      product: {
        type: 'relation',
        title: 'Product',
        relationTo: 'products',
        required: true,
      },
      price: {
        type: 'number',
        title: 'Price (USD)',
        required: true,
      },
      currency: {
        type: 'select',
        title: 'Currency',
        enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
        default: 'USD',
      },
      source: {
        type: 'select',
        title: 'Source',
        enum: ['amazon', 'official', 'bestbuy', 'other'],
        enumLabels: ['Amazon', 'Official Store', 'Best Buy', 'Other'],
        default: 'amazon',
      },
      availability: {
        type: 'select',
        title: 'Availability',
        enum: ['in-stock', 'out-of-stock', 'pre-order', 'discontinued'],
        enumLabels: ['In Stock', 'Out of Stock', 'Pre-Order', 'Discontinued'],
        default: 'in-stock',
      },
      discount: {
        type: 'number',
        title: 'Discount Percentage',
        minimum: 0,
        maximum: 100,
      },
      notes: {
        type: 'textarea',
        title: 'Notes',
      },
    },
    required: ['product', 'price'],
  },

  listFields: ['product', 'price', 'source', 'availability', 'createdAt'],
  defaultSort: 'createdAt',
  defaultSortOrder: 'desc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig
