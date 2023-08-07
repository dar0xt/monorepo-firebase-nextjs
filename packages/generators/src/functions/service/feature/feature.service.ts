import { ActionType, NodePlopAPI } from "plop"
import { plural } from "pluralize"

const getTemplate = (): string => {
  return `
import { FirebaseFirestore } from "@/infrastructure/firebase/firestore/FirebaseFirestore"
import { nanoid } from "nanoid"
import { inject, injectable } from "tsyringe"
import { Create{{pascalCase featureName}}DTO, Update{{pascalCase featureName}}DTO } from "./{{camelCase featureName}}.dto"

@injectable()
export class {{pascalCase featureName}}Service {
  constructor(
    @inject("FirebaseFirestore") private firestore: FirebaseFirestore
  ) {}

  async get({{camelCase featureName}}Id: string) {
    const {{camelCase featureName}} = await this.firestore.{{camelCase featureName}}.collection.doc({{camelCase featureName}}Id).get()
    const data = {{camelCase featureName}}.data()
    return data ?? null
  }
  async getAll() {
    const {{camelCase featureName}} = await this.firestore.{{camelCase featureName}}.collection.get()
    const data = {{camelCase featureName}}.docs.map((doc) => doc.data())
    return data 
  }
  async create(dto: Create{{pascalCase featureName}}DTO) {
    const {{camelCase featureName}}Id = nanoid()
    const createdAt = new Date()
    const updatedAt = new Date()

    const doc = await this.firestore.{{camelCase featureName}}.collection.add({
      ...dto,
      createdAt,
      updatedAt,
    })
    return {
      {{camelCase featureName}}Id: doc.id,
    }
  }
  async update(dto: Update{{pascalCase featureName}}DTO) {
    const updatedAt = new Date()
    await this.firestore.{{camelCase featureName}}.collection.doc(dto.{{camelCase featureName}}Id).update({
      ...dto,
      updatedAt,
    })
    return
  }
  async delete({{camelCase featureName}}Id: string) {
    await this.firestore.{{camelCase featureName}}.collection.doc({{camelCase featureName}}Id).delete()
    return
  }
}
`
}

const getAction = (featureName: string): ActionType => {
  const featureNamePluralized = plural(featureName)
  const data = { featureName, featureNamePluralized }
  return {
    type: "add",
    data,
    path: "./../../functions/src/service/{{camelCase featureName}}/{{ camelCase featureName }}.service.ts",
    templateFile: "../src/functions/service/feature/feature.service.ts.hbs",
  }
}

export const generateFunctionsService = (
  plop: NodePlopAPI,
  featureName: string
): ActionType => {
  plop.setPartial("functions.service.feature.service", getTemplate())
  return getAction(featureName)
}
