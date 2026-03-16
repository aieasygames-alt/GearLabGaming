/**
 * Comments Collection
 *
 * User comments on products and articles
 */

import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'comments',
  displayName: 'Comments',
  description: 'User comments and reviews',
  icon: '💬',

  schema: {
    type: 'object',
    properties: {
      product: {
        type: 'relation',
        title: 'Product',
        relationTo: 'products',
      },
      article: {
        type: 'relation',
        title: 'Article',
        relationTo: 'articles',
      },
      author: {
        type: 'object',
        title: 'Author',
        properties: {
          name: { type: 'string', title: 'Name', required: true },
          email: { type: 'email', title: 'Email' },
          website: { type: 'string', title: 'Website' },
        },
      },
      content: {
        type: 'textarea',
        title: 'Comment',
        required: true,
        maxLength: 2000,
      },
      rating: {
        type: 'number',
        title: 'Rating',
        minimum: 1,
        maximum: 5,
      },
      parent: {
        type: 'relation',
        title: 'Parent Comment',
        relationTo: 'comments',
      },
      status: {
        type: 'select',
        title: 'Status',
        enum: ['pending', 'approved', 'rejected', 'spam'],
        enumLabels: ['Pending', 'Approved', 'Rejected', 'Spam'],
        default: 'pending',
      },
      ipAddress: {
        type: 'string',
        title: 'IP Address',
      },
      userAgent: {
        type: 'string',
        title: 'User Agent',
      },
    },
    required: ['content'],
  },

  listFields: ['author.name', 'content', 'rating', 'status', 'createdAt'],
  defaultSort: 'createdAt',
  defaultSortOrder: 'desc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig
