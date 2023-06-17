import {Router} from 'express'
import {getInterest} from '../controllers/interestPoint/get'


const router = Router()

router.get('/', getInterest)
// router.get('/:id', validateParamSchemaData(idSchema), get)
router.post('/', getInterest)
// router.patch('/:id', validateParamSchemaData(idSchema), validateSchema(updatePlaceSchema), update)
// router.delete('/:id', validateParamSchemaData(idSchema), removePlace)

export default router