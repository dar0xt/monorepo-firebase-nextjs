import { ActionType, NodePlopAPI } from 'plop'

const getTemplate = (): string => {
  return 'export * from "./{{camelCase featureName}}.validation"'
}

const getAction = (featureName: string): ActionType => {
  const data = { featureName }
  return {
    type: 'add',
    data,
    path: './../../shared/src/interface/{{camelCase featureName}}/index.ts',
    templateFile: '../src/shared/interface/feature/index.ts.hbs',
  }
}

export const generateInterfacesValidationIndex = (
  plop: NodePlopAPI,
  featureName: string
): ActionType => {
  plop.setPartial('shared.interface.feature.index', getTemplate())
  return getAction(featureName)
}
