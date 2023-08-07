import { Attribute } from "@/type"
import * as changeCase from "change-case"
import { ActionType, NodePlopAPI } from "plop"
import { plural } from "pluralize"

const getTemplate = (featureName: string, attributes: Attribute[]): string => {
  return `
import { {{pascalCase featureName}}Model } from "@/domain/{{camelCase featureName}}/{{camelCase featureName}}.model"
import { Firestore, FirestoreDataConverter } from "firebase-admin/firestore"
import { IFirestoreCollection } from "../IFirebaseCollection"

export class Firestore{{pascalCase featureName}}Collection
  implements IFirestoreCollection<{{pascalCase featureName}}Model>
{
  constructor(private readonly firestore: Firestore) {}
  get converter() {
    const converter: FirestoreDataConverter<{{pascalCase featureName}}Model> = {
      toFirestore: (model) => ({
        ${getToFirestoreArg(featureName, attributes)}
      }),
      fromFirestore: (snapshot) => {
        const data = snapshot.data()
        return {
          ${getFromFirestoreArg(featureName, attributes)}
        }
      },
    }
    return converter
  }
  get collection() {
    return this.firestore.collection("{{camelCase featureNamePluralized}}").withConverter(this.converter)
  }
}

`
}

const getToFirestoreArg = (
  featureName: string,
  attributes: Attribute[]
): string => {
  const camelCaseFeatureName = changeCase.camelCase(featureName)
  const camelCaseFeatureNameId = `${camelCaseFeatureName}Id`

  const items = attributes.map(({ name }) => {
    const camelCaseAttributeName = changeCase.camelCase(name)

    if (camelCaseFeatureNameId === camelCaseAttributeName) {
      return ""
    }

    return `${camelCaseAttributeName}: model.${camelCaseAttributeName},`
  })
  return items.join("\n")
}
const getFromFirestoreArg = (
  featureName: string,
  attributes: Attribute[]
): string => {
  const camelCaseFeatureName = changeCase.camelCase(featureName)
  const camelCaseFeatureNameId = `${camelCaseFeatureName}Id`

  const items = attributes.map(({ name, type }) => {
    const camelCaseAttributeName = changeCase.camelCase(name)

    if (camelCaseFeatureNameId === camelCaseAttributeName) {
      return ""
    }
    if (type === "date") {
      return `${camelCaseAttributeName}: data.${camelCaseAttributeName}.toDate(),`
    }
    return `${camelCaseAttributeName}: data.${camelCaseAttributeName},`
  })
  return items.join("\n")
}

const getAction = (featureName: string): ActionType => {
  const featureNamePluralized = plural(featureName)
  const data = { featureName, featureNamePluralized }
  return {
    type: "add",
    data,
    path: "./../../functions/src/infrastructure/firebase/firestore/{{camelCase featureName}}/{{ camelCase featureName }}.collection.ts",
    templateFile:
      "../src/functions/infrastructure/firebase/firestore/feature/feature.collection.ts.hbs",
  }
}

export const generateFunctionsFirestoreCollection = (
  plop: NodePlopAPI,
  featureName: string,
  attributes: Attribute[]
): ActionType => {
  plop.setPartial(
    "functions.infrastructure.firebase.firestore.feature.collection",
    getTemplate(featureName, attributes)
  )
  return getAction(featureName)
}
