import 'reflect-metadata'

import { FirebaseFunctions } from '@/infrastructure/firebase/functions/FirebaseFunctions'
import { container } from 'tsyringe'
import { Config } from './config/Config'
import { FirebaseApp } from './infrastructure/firebase/app/FirebaseApp'
import { FirebaseFirestore } from './infrastructure/firebase/firestore/FirebaseFirestore'
import { PostService } from './service/post/post.service'
container.register('FirebaseApp', { useClass: FirebaseApp })
container.register('FirebaseFunctions', { useClass: FirebaseFunctions })
container.register('FirebaseFirestore', { useClass: FirebaseFirestore })
container.register('Config', { useClass: Config })
container.register('PostService', { useClass: PostService })
