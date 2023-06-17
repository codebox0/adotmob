import {Router} from 'express'
import {get} from '../controllers/pass/get'
import {getAllPass} from '../controllers/pass/all'
import {addNewPass} from '../controllers/pass/add'
import {update} from '../controllers/pass/update'
import {removePass} from '../controllers/pass/delete'
import authenticate from '../middleware/authentication.middleware';
import {validateParamSchemaData, validateSchema} from '../utils/jwt.utils'
import {passSchema} from '../dtos/pass'
import {idSchema} from '../dtos/id'

const router = Router()

router.use(authenticate());

router.get('/', getAllPass)
router.get('/:id',validateParamSchemaData(idSchema), get)
router.post('/',validateSchema(passSchema), addNewPass)
router.patch('/:id',validateParamSchemaData(idSchema), validateSchema(passSchema), update)
router.delete('/:id',validateParamSchemaData(idSchema), removePass)


export default router