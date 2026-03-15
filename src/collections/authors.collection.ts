/**
 * Authors Collection
 *
 * Content authors and reviewers
 */

import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'authors',
  displayName: 'Authors',
  description: 'Content authors and reviewers',
  icon: '👤',

  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: 'Full Name',
        required: true,
        maxLength: 100,
      },
      slug: {
        type: 'slug',
        title: 'URL Slug',
        required: true,
        maxLength: 100,
      },
      email: {
        type: 'string',
        title: 'Email',
        format: 'email',
      },
      avatar: {
        type: 'media',
        title: 'Avatar',
      },
      bio: {
        type: 'textarea',
        title: 'Biography',
        maxLength: 500,
      },
      title: {
        type: 'string',
        title: 'Title/Role',
        maxLength: 100,
        helpText: 'e.g., Senior Editor, Gaming Expert',
      },
      expertise: {
        type: 'array',
        title: 'Areas of Expertise',
        items: {
          type: 'select',
          enum: ['mice', 'keyboards', 'headsets', 'monitors', 'chairs', 'setups'],
          enumLabels: ['Gaming Mice', 'Keyboards', 'Headsets', 'Monitors', 'Chairs & Desks', 'Full Setups'],
        },
      },
      social: {
        type: 'object',
        title: 'Social Links',
        properties: {
          twitter: { type: 'string', title: 'Twitter Handle' },
          youtube: { type: 'string', title: 'YouTube Channel' },
          twitch: { type: 'string', title: 'Twitch Channel' },
          website: { type: 'string', title: 'Personal Website' },
        },
      },
      yearsExperience: {
        type: 'number',
        title: 'Years of Experience',
      },
      articles: {
        type: 'number',
        title: 'Articles Written',
        helpText: 'Auto-updated count',
      },
      isActive: {
        type: 'boolean',
        title: 'Active Author',
        default: true,
      },
    },
    required: ['name', 'slug'],
  },

  listFields: ['name', 'title', 'email', 'articles', 'isActive'],
  searchFields: ['name', 'bio', 'email'],
  defaultSort: 'name',
  defaultSortOrder: 'asc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig
