import { body } from 'express-validator';

export const paymentIntentValidationRules = [
  body('amount').isNumeric().notEmpty().withMessage('Amount must be a number'),
];

export const confirmPaymentValidationRules = [
  body('paymentIntentId').isString().notEmpty().withMessage('paymentIntentId must be a string'),
];