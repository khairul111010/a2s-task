import { Router } from 'express';
import { login, register } from './AuthController';
import { loginValidationRules, registerValidationRules } from './validators/AuthValidators';
import validate from '../../../middlewares/validate';
const router = Router();

router.post('/register', registerValidationRules, validate, register);
router.post('/login', loginValidationRules, validate, login);

export default router;
