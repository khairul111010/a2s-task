import { body } from 'express-validator';

export const registerValidationRules = [
  body('username').isString().notEmpty().withMessage('Username must be a string'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

export const loginValidationRules = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').notEmpty().withMessage('Password is required'),
];