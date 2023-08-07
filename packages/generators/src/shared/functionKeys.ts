import * as changeCase from "change-case";
import { ActionType } from "plop";
import { plural } from "pluralize";

const transform = (
  template: string,
  data: { featureName: string; featureNamePluralized: string },
): string => {
  const pascalCaseFeatureName = changeCase.pascalCase(data.featureName);
  const pascalCaseFeatureNamePluralized = changeCase.pascalCase(
    data.featureNamePluralized,
  );
  const newGetKey = `get${pascalCaseFeatureName}: 'get${pascalCaseFeatureName}',`;
  const newGetAllKey = `getAll${pascalCaseFeatureNamePluralized}: 'getAll${pascalCaseFeatureNamePluralized}',`;
  const newCreateKey = `create${pascalCaseFeatureName}: 'create${pascalCaseFeatureName}',`;
  const newUpdateKey = `update${pascalCaseFeatureName}: 'update${pascalCaseFeatureName}',`;
  const newDeleteKey = `delete${pascalCaseFeatureName}: 'delete${pascalCaseFeatureName}',`;
  const newTemplate = template
    .replace(newGetKey + "\n", "") // 元々ある場合は削除
    .replace(newGetAllKey + "\n", "")
    .replace(newCreateKey + "\n", "")
    .replace(newUpdateKey + "\n", "")
    .replace(newDeleteKey + "\n", "")
    .replace(
      /(\/\/ name of function \(Don't delete this line\))/,
      `$1\n${newGetKey}\n${newGetAllKey}\n${newCreateKey}\n${newUpdateKey}\n${newDeleteKey}`,
    );

  return newTemplate;
};

const getAction = (featureName: string): ActionType => {
  const featureNamePluralized = plural(featureName);
  const data = { featureName, featureNamePluralized };
  return {
    type: "modify",
    data,
    transform,
    path: "./../../shared/src/functionKeys.ts",
  };
};

export const generateSharedFunctionKeys = (featureName: string): ActionType => {
  return getAction(featureName);
};
