import express from 'express';
import {teacherLogin, teacherRegister} from '../controllers/teacherController.js';
import {teacherLoginValidation, teacherRegisterValidation} from '../middlewares/validation.js';
import {teacherLoginSanitization, teacherRegisterSanitization} from "../middlewares/sanitization";

const router = express.Router();

router.post('/teacher/register', [teacherRegisterSanitization, teacherRegisterValidation], teacherRegister);
router.post('/teacher/login', [teacherLoginSanitization,teacherLoginValidation], teacherLogin);

export default router;