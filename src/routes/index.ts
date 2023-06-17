import { Router } from 'express';
import interestPointRoutes from './interest-point.routes'
import initRoutes from './init.routes'

const router = Router();

router.use('/interestPoint', interestPointRoutes);
router.use('/initDatabase', initRoutes)

export default router;
