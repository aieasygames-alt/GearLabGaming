import type { CollectionConfig as SonicCollectionConfig } from '@sonicjs-cms/core'

type ExtendedFieldType = SonicCollectionConfig['schema']['properties'][string]['type'] | 'relation' | 'quill'

interface ExtendedFieldConfig {
  type: ExtendedFieldType
  title?: string
  description?: string
  required?: boolean
  default?: unknown
  placeholder?: string
  helpText?: string
  min?: number
  max?: number
  minimum?: number
  maximum?: number
  minLength?: number
  maxLength?: number
  pattern?: string
  enum?: string[]
  enumLabels?: string[]
  collection?: string | string[]
  relationTo?: string
  multiple?: boolean
  items?: ExtendedFieldConfig
  properties?: Record<string, ExtendedFieldConfig>
  format?: string
  widget?: string
}

export interface CollectionConfig extends Omit<SonicCollectionConfig, 'schema'> {
  schema: {
    type: 'object'
    properties: Record<string, ExtendedFieldConfig>
    required?: string[]
  }
}

// SonicJS supports these fields at runtime, but its published 2.8 schema types
// omit relation, quill, and their field options.
export const toSonicCollectionConfig = (config: CollectionConfig): SonicCollectionConfig =>
  config as unknown as SonicCollectionConfig
