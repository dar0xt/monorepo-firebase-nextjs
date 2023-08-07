import * as changeCase from 'change-case'
import { ActionType, NodePlopAPI } from 'plop'
import { Attribute } from '../../../type'

const getTemplate = (featureName: string, attributes: Attribute[]): string => {
  return `
export type Create{{pascalCase featureName}}DTO = {
   ${getCreateArgs(featureName, attributes)}
}

export type Update{{pascalCase featureName}}DTO = {
  ${getUpdateArgs(featureName, attributes)}
}
`
}

const getCreateArgs = (
  featureName: string,
  attributes: Attribute[]
): string => {
  const camelCaseFeatureName = changeCase.camelCase(featureName)
  const camelCaseFeatureNameId = `${camelCaseFeatureName}Id`
  const items = attributes.map(({ name, type, nullable }) => {
    const camelCaseFeatureName = changeCase.camelCase(name)
    if (
      [camelCaseFeatureNameId, 'createdAt', 'updatedAt'].includes(
        camelCaseFeatureName
      )
    ) {
      return ''
    }
    switch (type) {
      case 'integer':
        if (nullable) {
          return `${name}: number | null`
        }
        return `${name}: number`
      case 'date':
        if (nullable) {
          return `${name}: Date | null`
        }
        return `${name}: Date`
      default:
        if (nullable) {
          return `${name}: ${type} | null`
        }
        return `${name}: ${type}`
    }
  })
  return items.join('\n')
}
const getUpdateArgs = (
  featureName: string,
  attributes: Attribute[]
): string => {
  const camelCaseFeatureName = changeCase.camelCase(featureName)
  const camelCaseFeatureNameId = `${camelCaseFeatureName}Id`
  const items = attributes.map(({ name, type, nullable }) => {
    const camelCaseAttributeName = changeCase.camelCase(name)

    if (camelCaseFeatureNameId === camelCaseAttributeName) {
      return `${camelCaseFeatureNameId}: string`
    }
    if (['createdAt', 'updatedAt'].includes(camelCaseFeatureName)) {
      return ''
    }

    switch (type) {
      case 'integer':
        if (nullable) {
          return `${name}?: number | null`
        }
        return `${name}?: number`
      case 'date':
        if (nullable) {
          return `${name}?: Date | null`
        }
        return `${name}?: Date`
      default:
        if (nullable) {
          return `${name}?: ${type} | null`
        }
        return `${name}?: ${type}`
    }
  })
  return items.join('\n')
}

const getAction = (featureName: string): ActionType => {
  const data = { featureName }
  return {
    type: 'add',
    data,
    path: './../../functions/src/service/{{camelCase featureName}}/{{ camelCase featureName }}.dto.ts',
    templateFile: '../src/functions/service/feature/feature.dto.ts.hbs',
  }
}

export const generateFunctionsDTO = (
  plop: NodePlopAPI,
  featureName: string,
  attributes: Attribute[]
): ActionType => {
  plop.setPartial(
    'functions.service.feature.dto',
    getTemplate(featureName, attributes)
  )
  return getAction(featureName)
}
