import * as changeCase from 'change-case'
import { ActionType } from 'plop'

const transform = (template: string, data: { featureName: string }): string => {
  const camelCaseFeatureName = changeCase.camelCase(data.featureName)
  const newExportPath = `export * from './${camelCaseFeatureName}'`
  const newTemplate = template
    .replace(newExportPath, '') // 元々ある場合は削除
    .concat(newExportPath)
  return newTemplate
}

const getAction = (featureName: string): ActionType => {
  const data = { featureName }
  return {
    type: 'modify',
    data,
    transform,
    path: './../../functions/src/controller/index.ts',
  }
}

export const generateFunctionsControllerIndex = (
  featureName: string
): ActionType => {
  return getAction(featureName)
}
