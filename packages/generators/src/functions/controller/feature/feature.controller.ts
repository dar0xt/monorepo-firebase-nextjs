import { ActionType, NodePlopAPI } from 'plop'
import { plural } from 'pluralize'

const getTemplate = (): string => {
  return `
import { FirebaseFunctions } from "@/infrastructure/firebase/functions/FirebaseFunctions"
import { {{pascalCase featureName}}Service } from "@/service/{{camelCase featureName}}/{{camelCase featureName}}.service"
import { container, inject, injectable } from "tsyringe"
import {
  Create{{pascalCase featureName}}Request,
  Create{{pascalCase featureName}}Response,
  Delete{{pascalCase featureName}}Request,
  Delete{{pascalCase featureName}}Response,
  Get{{pascalCase featureName}}Request,
  Get{{pascalCase featureName}}Response,
  GetAll{{pascalCase featureName}}Request,
  GetAll{{pascalCase featureName}}Response,
  Update{{pascalCase featureName}}Request,
  Update{{pascalCase featureName}}Response,
  create{{pascalCase featureName}}RequestSchema,
  delete{{pascalCase featureName}}RequestSchema,
  get{{pascalCase featureName}}RequestSchema,
  update{{pascalCase featureName}}RequestSchema,
  get{{pascalCase featureName}}ResponseSchema,
  getAll{{pascalCase featureName}}ResponseSchema,
  create{{pascalCase featureName}}ResponseSchema,

} from "shared"


@injectable()
export class {{pascalCase featureName}}Controller {
  constructor(
    @inject("FirebaseFunctions") private functions: FirebaseFunctions,
    @inject("{{pascalCase featureName}}Service") private service: {{pascalCase featureName}}Service
  ) {}

  get() {
    return this.functions.onCall<Get{{pascalCase featureName}}Request, Get{{pascalCase featureName}}Response>(
      async (request) => {
        const { {{camelCase featureName}}Id } = get{{pascalCase featureName}}RequestSchema.parse(request.data)
        const {{camelCase featureName}} = await this.service.get({{camelCase featureName}}Id)
        return get{{pascalCase featureName}}ResponseSchema.parse({{camelCase featureName}})
      }
    )
  }
  getAll() {
    return this.functions.onCall<GetAll{{pascalCase featureName}}Request, GetAll{{pascalCase featureName}}Response>(
      async () => {
        const {{camelCase featureNamePluralized}} = await this.service.getAll()
        return getAll{{pascalCase featureName}}ResponseSchema.parse({{camelCase featureNamePluralized}})
      }
    )
  }
  create() {
    return this.functions.onCall<Create{{pascalCase featureName}}Request, Create{{pascalCase featureName}}Response>(
      async (request) => {
        const data = create{{pascalCase featureName}}RequestSchema.parse(request.data)
        const {{camelCase featureName}} = await this.service.create(data)
        return create{{pascalCase featureName}}ResponseSchema.parse({{camelCase featureName}})
      }
    )
  }
  update() {
    return this.functions.onCall<Update{{pascalCase featureName}}Request, Update{{pascalCase featureName}}Response>(
      async (request) => {
        const data = update{{pascalCase featureName}}RequestSchema.parse(request.data)
        await this.service.update(data)
        return
      }
    )
  }
  delete() {
    return this.functions.onCall<Delete{{pascalCase featureName}}Request, Delete{{pascalCase featureName}}Response>(
      async (request) => {
        const { {{camelCase featureName}}Id } = delete{{pascalCase featureName}}RequestSchema.parse(request.data)
        await this.service.delete({{camelCase featureName}}Id)
        return
      }
    )
  }
}

const controller = container.resolve({{pascalCase featureName}}Controller)
export const get{{pascalCase featureName}} = controller.get()
export const getAll{{pascalCase featureNamePluralized}} = controller.getAll()
export const create{{pascalCase featureName}} = controller.create()
export const update{{pascalCase featureName}} = controller.update()
export const delete{{pascalCase featureName}} = controller.delete()

`
}

const getAction = (featureName: string): ActionType => {
  const featureNamePluralized = plural(featureName)
  const data = { featureName, featureNamePluralized }
  return {
    type: 'add',
    data,
    path: './../../functions/src/controller/{{camelCase featureName}}/{{ camelCase featureName }}.controller.ts',
    templateFile:
      '../src/functions/controller/feature/feature.controller.ts.hbs',
  }
}

export const generateFunctionsController = (
  plop: NodePlopAPI,
  featureName: string
): ActionType => {
  plop.setPartial('functions.controller.feature.controller', getTemplate())
  return getAction(featureName)
}
