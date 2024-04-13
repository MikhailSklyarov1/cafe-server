import { Router } from 'express';
import cafeRouter from './cafeRouter.ts';
import employeeRouter from './employeeRouter.ts';
import gameRouter from './gameRouter.ts';

const router = Router();

router.use('/cafe', cafeRouter);
router.use('/game', gameRouter);
router.use('/employee', employeeRouter);

export default router;