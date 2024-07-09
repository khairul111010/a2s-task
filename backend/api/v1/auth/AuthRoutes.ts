import { Router } from 'express';
import { getUsers } from './AuthController';
const router = Router();

router.get('/', getUsers);

export default router;
