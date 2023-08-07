import * as changeCase from "change-case"
import { ActionType, NodePlopAPI } from "plop"
import { Attribute } from "../../../type"

const getTemplate = (featureName: string, attributes: Attribute[]): string => {
  return `
export type {{pascalCase featureName}}Model = {
  ${getModelAttributes(featureName, attributes)}
}
`
}

const getModelAttributes = (
  featureName: string,
  attributes: Attribute[]
): string => {
  const camelCaseFeatureName = changeCase.camelCase(featureName)
  const camelCaseFeatureNameId = `${camelCaseFeatureName}Id`
  const items = attributes.map(({ name, type, nullable }) => {
    const camelCaseFeatureName = changeCase.camelCase(name)
    if (camelCaseFeatureNameId === camelCaseFeatureName) {
      return ""
    }
    switch (type) {
      case "string":
        if (nullable) {
          return `${name}: string | null`
        }
        return `${name}: string`
      case "number":
      case "integer":
        if (nullable) {
          return `${name}: number | null`
        }
        return `${name}: number`
      case "boolean":
        if (nullable) {
          return `${name}: boolean | null`
        }
        return `${name}: boolean`
      case "date":
        if (nullable) {
          return `${name}: Date | null`
        }
        return `${name}: Date`
      default:
        throw Error(`Invalid type: ${type}`)
    }
  })
  return items.join("\n")
}
const getAction = (featureName: string): ActionType => {
  const data = { featureName }
  return {
    type: "add",
    data,
    path: "./../../functions/src/domain/{{camelCase featureName}}/{{ camelCase featureName }}.model.ts",
    templateFile: "../src/functions/domain/feature/feature.model.ts.hbs",
  }
}

export const generateFunctionsModel = (
  plop: NodePlopAPI,
  featureName: string,
  attributes: Attribute[]
): ActionType => {
  plop.setPartial(
    "functions.domain.feature.model",
    getTemplate(featureName, attributes)
  )
  return getAction(featureName)
}
