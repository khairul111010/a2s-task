import Stripe from "stripe";
import { Payment } from "../../../models";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const paymentIntent = async (amount: number, userId: number) => {
  const result = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
    metadata: { userId },
  });
  return { clientSecret: result.client_secret, client_id: result.id };
};

const confirmPayment = async (paymentIntentId: string, userId: number) => {
  const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
    payment_method: "pm_card_visa",
    return_url: "http://localhost:1234",
  });
  const payment = await Payment.create({
    amount: paymentIntent.amount,
    status: paymentIntent.status,
    userId,
  });
  return payment;
};

const getAllPayments = async (userId: number) => {
  const payments = await Payment.findAll({ where: { userId } });
  return payments;
};

export default { paymentIntent, confirmPayment, getAllPayments };
