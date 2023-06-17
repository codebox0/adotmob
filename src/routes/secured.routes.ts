import {Router} from 'express'
import {getToken} from '../controllers/secured/token'
import {getTokenSchema} from '../dtos/token'
import {validateSchema} from '../utils/jwt.utils'

const router = Router()

router.post('/',validateSchema(getTokenSchema), getToken)

export default router