import {Router} from 'express'
import {getAllUsers} from '../controllers/user/all'
import {get} from '../controllers/user/get'
import {add} from '../controllers/user/add'
import {update} from '../controllers/user/update'
import {getPlaceList} from '../controllers/user/placeList'
import {checkAccessPlace} from '../controllers/user/canAccesPlace'
import {removeUser} from '../controllers/user/delete'
import authenticate from '../middleware/authentication.middleware'
import {validateParamSchemaData, validateSchema} from '../utils/jwt.utils'
import {createUserSchema, updateUserSchema} from '../dtos/user'
import {idSchema} from '../dtos/id'

const router = Router()

router.use(authenticate())

router.get('/', getAllUsers)
router.get('/:id', validateParamSchemaData(idSchema), get)
router.get('/:id/placeList', validateParamSchemaData(idSchema), getPlaceList)
router.post('/canAccessPlace', checkAccessPlace)
router.post('/', validateSchema(createUserSchema), add)
router.patch('/:id', validateParamSchemaData(idSchema), validateSchema(updateUserSchema), update)
router.delete('/:id', validateParamSchemaData(idSchema), removeUser)

export default router