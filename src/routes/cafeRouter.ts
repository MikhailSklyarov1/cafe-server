import { Router } from 'express';
import cafeController from '../controllers/cafeController.ts';

const router = Router();


router.get('/getAll', cafeController.getAll);
router.get('/get', cafeController.getById);
router.delete('/delete', cafeController.deleteById);
router.post('/create', cafeController.createItem);
router.put('/update', cafeController.updateItem);




export default router;