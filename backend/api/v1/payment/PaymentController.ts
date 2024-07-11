import { Request, Response } from 'express';
import Stripe from 'stripe';
import { Payment } from '../../../models';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2020-08-27' });

const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { userId: req.user.id },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
};

const confirmPayment = async (req: Request, res: Response) => {
  const { paymentIntentId, status } = req.body;
  try {
    const payment = await Payment.create({
      amount: req.body.amount,
      status,
      userId: req.user.id,
    });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Payment confirmation failed' });
  }
};

const getPaymentStatus = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll({ where: { userId: req.user.id } });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Fetching payment status failed' });
  }
};

export { createPaymentIntent, confirmPayment, getPaymentStatus };
