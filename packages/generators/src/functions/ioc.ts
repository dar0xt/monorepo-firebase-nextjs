import * as changeCase from "change-case";
import { ActionType } from "plop";

const transform = (template: string, data: { featureName: string }): string => {
  const camelCaseFeatureName = changeCase.camelCase(data.featureName);
  const pascalCaseFeatureName = changeCase.pascalCase(data.featureName);

  const newImportPath = `import { ${pascalCaseFeatureName}Service } from './service/${camelCaseFeatureName}/${camelCaseFeatureName}.service'`;
  const newRegister = `container.register('${pascalCaseFeatureName}Service', { useClass: ${pascalCaseFeatureName}Service })`;
  const newTemplate = template
    .replace(newImportPath, "") // 元々ある場合は削除
    .replace(newRegister, "")
    .concat(newImportPath + "\n" + newRegister);
  return newTemplate;
};

const getAction = (featureName: string): ActionType => {
  const data = { featureName };
  return {
    type: "modify",
    data,
    transform,
    path: "./../../functions/src/ioc.ts",
  };
};

export const generateFunctionsIoc = (featureName: string): ActionType => {
  return getAction(featureName);
};
