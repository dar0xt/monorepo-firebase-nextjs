import * as changeCase from 'change-case'
import { ActionType, NodePlopAPI } from 'plop'
import { Attribute } from '../../../type'

const getTemplate = (featureName: string, attributes: Attribute[]): string => {
  return `
import { z } from "zod"

// attributes
${getAttributes(attributes)}

// Get
export const get{{pascalCase featureName}}RequestSchema = z.object({
  {{camelCase featureName}}Id
})
export const get{{pascalCase featureName}}ResponseSchema = z.nullable(
  z.object({
   ${getGetFeatureResponse(attributes)}
  })
)
// GetAll
export const getAll{{pascalCase featureName}}RequestSchema = z.void()
export const getAll{{pascalCase featureName}}ResponseSchema = z.array(
  z.object({
   ${getGetFeatureResponse(attributes)}
  })
)

// Create
export const create{{pascalCase featureName}}RequestSchema = z.object({
  ${getCreateFeatureRequest(featureName, attributes)}
})
export const create{{pascalCase featureName}}ResponseSchema = z.object({
  {{camelCase featureName}}Id
})

// Update
export const update{{pascalCase featureName}}RequestSchema = z.object({
  ${getUpdateFeatureRequest(featureName, attributes)}
})
export const update{{pascalCase featureName}}ResponseSchema = z.void()

// Delete
export const delete{{pascalCase featureName}}RequestSchema = z.object({
  {{camelCase featureName}}Id
})
export const delete{{pascalCase featureName}}ResponseSchema = z.void()

// Type
export type Get{{pascalCase featureName}}Request = z.infer<typeof get{{pascalCase featureName}}RequestSchema>
export type Get{{pascalCase featureName}}Response = z.infer<typeof get{{pascalCase featureName}}ResponseSchema>
export type GetAll{{pascalCase featureName}}Request = z.infer<typeof getAll{{pascalCase featureName}}RequestSchema>
export type GetAll{{pascalCase featureName}}Response = z.infer<typeof getAll{{pascalCase featureName}}ResponseSchema>
export type Create{{pascalCase featureName}}Request = z.infer<typeof create{{pascalCase featureName}}RequestSchema>
export type Create{{pascalCase featureName}}Response = z.infer<typeof create{{pascalCase featureName}}ResponseSchema>
export type Update{{pascalCase featureName}}Request = z.infer<typeof update{{pascalCase featureName}}RequestSchema>
export type Update{{pascalCase featureName}}Response = z.infer<typeof update{{pascalCase featureName}}ResponseSchema>
export type Delete{{pascalCase featureName}}Request = z.infer<typeof delete{{pascalCase featureName}}RequestSchema>
export type Delete{{pascalCase featureName}}Response = z.infer<typeof delete{{pascalCase featureName}}ResponseSchema>

`
}

const getAttributes = (attributes: Attribute[]): string => {
  const items = attributes.map(({ name, type, nullable }) => {
    const camelCaseAttributeName = changeCase.camelCase(name)

    switch (type) {
      case 'string':
        if (nullable) {
          return `const ${camelCaseAttributeName} = z.nullable(z.string())`
        }
        return `const ${camelCaseAttributeName} = z.string()`
      case 'number':
        if (nullable) {
          return `const ${camelCaseAttributeName} = z.nullable(z.number())`
        }
        return `const ${camelCaseAttributeName} = z.number()`
      case 'integer':
        if (nullable) {
          return `const ${camelCaseAttributeName} = z.nullable(z.number().int())`
        }
        return `const ${camelCaseAttributeName} = z.number()`
      case 'boolean':
        if (nullable) {
          return `const ${camelCaseAttributeName} = z.nullable(z.boolean())`
        }
        return `const ${camelCaseAttributeName} = z.boolean()`
      case 'date':
        if (nullable) {
          return `const ${camelCaseAttributeName} = z.nullable(z.date())`
        }
        return `const ${camelCaseAttributeName} = z.date()`
      default:
        throw Error(`Invalid type: ${type}`)
    }
  })
  return items.join('\n')
}
const getGetFeatureResponse = (attributes: Attribute[]): string => {
  const items = attributes.map(({ name, type }) => {
    const camelCaseAttributeName = changeCase.camelCase(name)
    if (type === 'date') {
      return `${camelCaseAttributeName}: ${camelCaseAttributeName}.transform((date) => date.toISOString()),`
    }
    return `${camelCaseAttributeName},`
  })
  return items.join('\n')
}
const getCreateFeatureRequest = (
  featureName: string,
  attributes: Attribute[]
): string => {
  const camelCaseFeatureName = changeCase.camelCase(featureName)
  const camelCaseFeatureNameId = `${camelCaseFeatureName}Id`
  const items = attributes.map(({ name }) => {
    const camelCaseAttributeName = changeCase.camelCase(name)
    if (
      [camelCaseFeatureNameId, 'createdAt', 'updatedAt'].includes(
        camelCaseAttributeName
      )
    ) {
      return ''
    }
    return `${camelCaseAttributeName},`
  })
  return items.join('\n')
}
const getUpdateFeatureRequest = (
  featureName: string,
  attributes: Attribute[]
): string => {
  const camelCaseFeatureName = changeCase.camelCase(featureName)
  const camelCaseFeatureNameId = `${camelCaseFeatureName}Id`
  const items = attributes.map(({ name }) => {
    const camelCaseAttributeName = changeCase.camelCase(name)
    if (camelCaseFeatureNameId === camelCaseAttributeName) {
      return `${camelCaseAttributeName},`
    }
    if (['createdAt', 'updatedAt'].includes(camelCaseAttributeName)) {
      return ''
    }
    return `${camelCaseAttributeName}: z.optional(${camelCaseAttributeName}),`
  })
  return items.join('\n')
}
const getAction = (featureName: string): ActionType => {
  const data = { featureName }
  return {
    type: 'add',
    data,
    path: './../../shared/src/interface/{{camelCase featureName}}/{{ camelCase featureName }}.validation.ts',
    templateFile: '../src/shared/interface/feature/feature.validation.ts.hbs',
  }
}

export const generateInterfacesValidation = (
  plop: NodePlopAPI,
  featureName: string,
  attributes: Attribute[]
): ActionType => {
  plop.setPartial(
    'shared.interface.feature.validation',
    getTemplate(featureName, attributes)
  )
  return getAction(featureName)
}
