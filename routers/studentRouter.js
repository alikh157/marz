import express from 'express';
import {studentRegister} from '../controllers/studentController';
import {studentRegisterValidation} from '../middlewares/validation' ;
import {studentRegisterSanitization} from "../middlewares/sanitization";

const router = express.Router();

router.post('/student/register', [studentRegisterSanitization, studentRegisterValidation], studentRegister);


export default router;