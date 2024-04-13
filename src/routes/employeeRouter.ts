import { Router } from 'express';
import employeeController from '../controllers/employeeController.ts';

const router = Router();


router.get('/getAll', employeeController.getAll);
router.get('/get', employeeController.getById);
router.delete('/delete', employeeController.deleteById);
router.post('/create', employeeController.createItem);




export default router;