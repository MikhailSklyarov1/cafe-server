import { Router } from 'express';
import gameController from '../controllers/gameController.ts';

const router = Router();


router.get('/getAll', gameController.getAll);
router.get('/get', gameController.getById);
router.delete('/delete', gameController.deleteById);
router.post('/create', gameController.createItem);




export default router;