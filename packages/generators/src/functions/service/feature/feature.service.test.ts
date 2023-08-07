import * as changeCase from 'change-case'
import { ActionType, NodePlopAPI } from 'plop'
import { plural } from 'pluralize'
import { Attribute } from '../../../type'

const getTemplate = (featureName: string, attributes: Attribute[]): string => {
  return `
import { container } from "tsyringe"
import { {{pascalCase featureName}}Service } from "./{{camelCase featureName}}.service"

describe("{{pascalCase featureName}}Service", () => {
  const service = container.resolve({{pascalCase featureName}}Service)
  const mockCreateInput = {
    ${getMockCreateInput(featureName, attributes)}
  }

  it("should get a {{camelCase featureName}}", async () => {
    const created = await service.create(mockCreateInput)
    const result = await service.get(created.{{camelCase featureName}}Id)
    expect(result).toEqual({
      {{camelCase featureName}}Id: created.{{camelCase featureName}}Id,
      ...mockCreateInput,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it("should get all {{camelCase featureNamePluralize}}", async () => {
    await service.create(mockCreateInput)
    await service.create(mockCreateInput)
    const result = await service.getAll()
    expect(result).toHaveLength(2)
  })

  it("should create a {{camelCase featureName}}", async () => {
    const result = await service.create(mockCreateInput)
    expect(result).toEqual({ {{camelCase featureName}}Id: expect.any(String) })
  })

  it("should update a {{camelCase featureName}}", async () => {
    const created = await service.create(mockCreateInput)
    const updateValues = {
      ${getUpdateValues(featureName, attributes)}
    }
    await service.update({
      {{camelCase featureName}}Id: created.{{camelCase featureName}}Id,
      ...updateValues,
    })
    const result = await service.get(created.{{camelCase featureName}}Id)
    expect(result).toEqual({
      {{camelCase featureName}}Id: created.{{camelCase featureName}}Id,
      ...updateValues,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it("should delete a {{camelCase featureName}}", async () => {
    const created = await service.create(mockCreateInput)
    await service.delete(created.{{camelCase featureName}}Id)
    const result = await service.get(created.{{camelCase featureName}}Id)
    expect(result).toBeNull()
  })
})

`
}
const getMockCreateInput = (
  featureName: string,
  attributes: Attribute[]
): string => {
  const camelCaseFeatureName = changeCase.camelCase(featureName)
  const camelCaseFeatureNameId = `${camelCaseFeatureName}Id`
  const items = attributes.map(({ name, type }) => {
    const camelCaseFeatureName = changeCase.camelCase(name)
    if (
      [camelCaseFeatureNameId, 'createdAt', 'updatedAt'].includes(
        camelCaseFeatureName
      )
    ) {
      return ''
    }
    switch (type) {
      case 'integer':
      case 'number':
        return `${name}: 1,`
      case 'date':
        return `${name}: new Date(),`
      case 'boolean':
        return `${name}: true,`
      case 'string':
        return `${name}: "${name}",`
      default:
        throw Error('not implemented')
    }
  })
  return items.join('\n')
}

const getUpdateValues = (
  featureName: string,
  attributes: Attribute[]
): string => {
  const camelCaseFeatureName = changeCase.camelCase(featureName)
  const camelCaseFeatureNameId = `${camelCaseFeatureName}Id`
  const items = attributes.map(({ name, type }) => {
    const camelCaseFeatureName = changeCase.camelCase(name)
    if (
      [camelCaseFeatureNameId, 'createdAt', 'updatedAt'].includes(
        camelCaseFeatureName
      )
    ) {
      return ''
    }
    switch (type) {
      case 'integer':
      case 'number':
        return `${name}: 2,`
      case 'date':
        return `${name}: new Date(),`
      case 'boolean':
        return `${name}: false,`
      case 'string':
        return `${name}: "updated ${name}",`
      default:
        throw Error('not implemented')
    }
  })
  return items.join('\n')
}

const getAction = (featureName: string): ActionType => {
  const featureNamePluralize = plural(featureName)
  const data = { featureName, featureNamePluralize }
  return {
    type: 'add',
    data,
    path: './../../functions/src/service/{{camelCase featureName}}/{{ camelCase featureName }}.service.test.ts',
    templateFile:
      '../src/functions/service/feature/feature.service.test.ts.hbs',
  }
}

export const generateFunctionsServiceTest = (
  plop: NodePlopAPI,
  featureName: string,
  attributes: Attribute[]
): ActionType => {
  plop.setPartial(
    'functions.service.feature.service.test',
    getTemplate(featureName, attributes)
  )
  return getAction(featureName)
}
