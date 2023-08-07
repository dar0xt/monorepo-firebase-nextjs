import * as changeCase from 'change-case'
import { ActionType } from 'plop'

const transform = (template: string, data: { featureName: string }): string => {
  const pascalCaseFeatureName = changeCase.pascalCase(data.featureName)
  const camelCaseFeatureName = changeCase.camelCase(data.featureName)
  const newImportPath = `import { Firestore${pascalCaseFeatureName}Collection } from './${camelCaseFeatureName}/${camelCaseFeatureName}.collection'`
  const newDeclaration = `public readonly ${camelCaseFeatureName}: Firestore${pascalCaseFeatureName}Collection`
  const newInstantiation = `this.${camelCaseFeatureName} = new Firestore${pascalCaseFeatureName}Collection(this.firestore)`
  const newTemplate = template
    .replace(newImportPath + '\n', '') // 元々ある場合は削除
    .replace(
      /(import \{ FirebaseApp \} from '\.\.\/app\/FirebaseApp')/,
      `$1\n${newImportPath}`
    )
    .replace(newDeclaration + '\n', '')
    .replace(/(public readonly firestore: Firestore)/, `$1\n${newDeclaration}`)
    .replace(newInstantiation + '\n', '')
    .replace(
      /(this.firestore = getFirestore\(app\.app\))/,
      `$1\n${newInstantiation}`
    )
  return newTemplate
}

const getAction = (featureName: string): ActionType => {
  const data = { featureName }
  return {
    type: 'modify',
    data,
    transform,
    path: './../../functions/src/infrastructure/firebase/firestore/FirebaseFirestore.ts',
  }
}

export const generateFirebaseFirestore = (featureName: string): ActionType => {
  return getAction(featureName)
}
