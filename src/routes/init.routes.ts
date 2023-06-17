import {Router} from 'express'
import {initDatabase} from '../controllers/secured/token'

const router = Router()

router.get('/', initDatabase)

export default router