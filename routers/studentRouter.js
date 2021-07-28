import express from 'express';
import { studentLogin, studentRegister} from '../controllers/studentController.js';
// import {registerValidation} from '../middlewares/validation.js';

const router = express.Router() ;

router.post('/student/register',[],studentRegister);
router.post('/student/login',studentLogin);

export default router;