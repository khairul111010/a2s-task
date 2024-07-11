import { Router } from 'express';
import AuthRoutes from "./auth/AuthRoutes"
import PaymentRoutes from "./payment/PaymentRoutes"

const router = Router()

router.use('/auth', AuthRoutes)
router.use('/payment', PaymentRoutes)

export default router