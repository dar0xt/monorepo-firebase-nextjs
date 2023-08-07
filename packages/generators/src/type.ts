export type ValueObjectKey =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'date'

export type JsonSchema = {
  $schema: string
  feature: { name: string }
  attributes: Attribute[]
}
export type Attribute = {
  name: string
  type: ValueObjectKey
  immutable: boolean
  nullable: boolean
  shared: boolean
}
