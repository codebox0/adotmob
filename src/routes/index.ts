import { Router } from 'express';
import interestPointRoutes from './interest-point.routes'

const router = Router();

router.use('/interestPoint', interestPointRoutes);

export default router;
