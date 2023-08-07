import { ActionType, NodePlopAPI } from 'plop'

const getTemplate = (): string => {
  return 'export * from "./{{camelCase featureName}}.controller"'
}

const getAction = (featureName: string): ActionType => {
  const data = { featureName }
  return {
    type: 'add',
    data,
    path: './../../functions/src/controller/{{camelCase featureName}}/index.ts',
    templateFile: '../src/functions/controller/feature/index.ts.hbs',
  }
}

export const generateFunctionsControllerFeatureIndex = (
  plop: NodePlopAPI,
  featureName: string
): ActionType => {
  plop.setPartial('functions.controller.feature.index', getTemplate())
  return getAction(featureName)
}
