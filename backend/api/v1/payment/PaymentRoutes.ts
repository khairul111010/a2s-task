import { Router } from 'express';
import { authenticate } from '../../../middlewares/authenticate';
import { confirmPayment, createPaymentIntent, getPaymentStatus } from './PaymentController';
import { confirmPaymentValidationRules, paymentIntentValidationRules } from './validators/PaymentValidators';
import validate from '../../../middlewares/validate';
const router = Router();

router.post('/create-payment-intent', paymentIntentValidationRules, validate, authenticate, createPaymentIntent);
router.post('/confirm-payment', confirmPaymentValidationRules, validate, authenticate, confirmPayment);
router.get('/status', authenticate, getPaymentStatus);

export default router;
