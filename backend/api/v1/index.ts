import { Router } from 'express';
import AuthRoutes from "./auth/AuthRoutes"

const router = Router()

router.use('/auth', AuthRoutes)

export default router