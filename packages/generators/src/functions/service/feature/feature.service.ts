import { ActionType, NodePlopAPI } from 'plop'
import { plural } from 'pluralize'

const getTemplate = (): string => {
  return `
import { FirebaseFirestore } from "@/infrastructure/firebase/firestore/FirebaseFirestore"
import { inject, injectable } from "tsyringe"
import { Create{{pascalCase featureName}}DTO, Update{{pascalCase featureName}}DTO } from "./{{camelCase featureName}}.dto"

@injectable()
export class {{pascalCase featureName}}Service {
  constructor(
    @inject("FirebaseFirestore") private firestore: FirebaseFirestore
  ) {}

  async get({{camelCase featureName}}Id: string) {
    const snapshot = await this.firestore.{{camelCase featureName}}.collection.doc({{camelCase featureName}}Id).get()
    const data = snapshot.data()
    return data ? { ...data, {{camelCase featureName}}Id: snapshot.id } : null
  }

  async getAll() {
    const snapshot = await this.firestore.{{camelCase featureName}}.collection.get()
    const data = snapshot.docs.map((doc) => ({...doc.data(), {{camelCase featureName}}Id: doc.id}))
    return data 
  }

  async create(dto: Create{{pascalCase featureName}}DTO) {
    const createdAt = new Date()
    const updatedAt = new Date()

    const ref = await this.firestore.{{camelCase featureName}}.collection.add({
      ...dto,
      createdAt,
      updatedAt,
    })
    return {
      {{camelCase featureName}}Id: ref.id,
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
    type: 'add',
    data,
    path: './../../functions/src/service/{{camelCase featureName}}/{{ camelCase featureName }}.service.ts',
    templateFile: '../src/functions/service/feature/feature.service.ts.hbs',
  }
}

export const generateFunctionsService = (
  plop: NodePlopAPI,
  featureName: string
): ActionType => {
  plop.setPartial('functions.service.feature.service', getTemplate())
  return getAction(featureName)
}
