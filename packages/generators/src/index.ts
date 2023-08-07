import { readFileSync } from 'fs'
import { NodePlopAPI } from 'plop'
import { generateFunctionsControllerIndex } from './functions/controller'
import { generateFunctionsControllerFeatureIndex } from './functions/controller/feature'
import { generateFunctionsController } from './functions/controller/feature/feature.controller'
import { generateFunctionsModel } from './functions/domain/feature/feature.model'
import { generateFirebaseFirestore as generateFunctionsFirebaseFirestore } from './functions/infrastructure/firebase/firestore/FirebaseFirestore'
import { generateFunctionsFirestoreCollection } from './functions/infrastructure/firebase/firestore/feature/feature.collection'
import { generateFunctionsIoc } from './functions/ioc'
import { generateFunctionsDTO } from './functions/service/feature/feature.dto'
import { generateFunctionsService } from './functions/service/feature/feature.service'
import { generateFunctionsServiceTest } from './functions/service/feature/feature.service.test'
import { generateSharedFunctionKeys } from './shared/functionKeys'
import { generateInterfacesIndex as generateSharedInterfacesIndex } from './shared/interface'
import { generateInterfacesValidationIndex as generateSharedInterfacesValidationIndex } from './shared/interface/feature'
import { generateInterfacesValidation as generateSharedInterfacesValidation } from './shared/interface/feature/feature.validation'
import { JsonSchema } from './type'

export default function run(plop: NodePlopAPI) {
  // controller generator
  plop.setGenerator('generator', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'jsonPath',
        message: 'json path please',
        default: './schema/sample.json',
      },
    ],
    actions: (_data) => {
      const { jsonPath } = _data as { jsonPath: string }
      const res = JSON.parse(readFileSync(jsonPath, 'utf-8')) as JsonSchema
      const featureName = res.feature.name
      const attributes = res.attributes

      return [
        /* functions */
        generateFunctionsIoc(featureName),
        generateFunctionsController(plop, featureName),
        generateFunctionsControllerFeatureIndex(plop, featureName),
        generateFunctionsControllerIndex(featureName),
        generateFunctionsModel(plop, featureName, attributes),
        generateFunctionsDTO(plop, featureName, attributes),
        generateFunctionsService(plop, featureName),
        generateFunctionsServiceTest(plop, featureName, attributes),
        generateFunctionsFirestoreCollection(plop, featureName, attributes),
        generateFunctionsFirebaseFirestore(featureName),
        // /* shared */
        generateSharedInterfacesValidationIndex(plop, featureName),
        generateSharedInterfacesValidation(plop, featureName, attributes),
        generateSharedInterfacesIndex(featureName),
        generateSharedFunctionKeys(featureName),
      ]
    },
  })
}
