import {Router} from 'express'
import {getAllPlaces} from '../controllers/place/all'
import {get} from '../controllers/place/get'
import {add} from '../controllers/place/add'
import {update} from '../controllers/place/update'
import {removePlace} from '../controllers/place/delete'
import authenticate from '../middleware/authentication.middleware'
import {validateParamSchemaData, validateSchema} from '../utils/jwt.utils'
import {createPlaceSchema, updatePlaceSchema} from '../dtos/place'
import {idSchema} from '../dtos/id'


const router = Router()

router.use(authenticate())

router.get('/', getAllPlaces)
router.get('/:id', validateParamSchemaData(idSchema), get)
router.post('/', validateSchema(createPlaceSchema), add)
router.patch('/:id', validateParamSchemaData(idSchema), validateSchema(updatePlaceSchema), update)
router.delete('/:id', validateParamSchemaData(idSchema), removePlace)

export default router