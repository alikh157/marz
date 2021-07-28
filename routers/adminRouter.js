import express from 'express';
import {adminLogin, adminRegister} from '../controllers/adminController';
import {adminLoginValidation} from "../middlewares/validation";
import {adminLoginSanitization} from "../middlewares/sanitization";
import authorization from "../middlewares/authorization";
import JoiError from "../Exceptions/validationError";

const router = new express.Router();
router.post('/admin/login', [adminLoginSanitization,adminLoginValidation], adminLogin);
router.post('/admin/register', [authorization], adminRegister);

export default router;