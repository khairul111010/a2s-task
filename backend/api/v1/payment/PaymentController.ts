import PaymentService from "./PaymentService"

// @desc Payment Create Intent
// route POST /api/v1/payment/create-payment-intent
// @access Private
const createPaymentIntent = async (req:any, res:any) => {
  const { amount } = req.body;
  try {
    if (req.user.id) { 
      const paymentIntent = await PaymentService.paymentIntent(amount,req.user.id)
      res.json(paymentIntent);
    }
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

// @desc Payment Confirmation
// route POST /api/v1/payment/confirm-payment
// @access Private
const confirmPayment = async (req:any, res:any) => {
  const { paymentIntentId } = req.body;
  try {
    const payment = await PaymentService.confirmPayment(paymentIntentId, req.user.id)
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

// @desc Payment Status
// route GET /api/v1/payment/status
// @access Private
const getPaymentStatus = async (req:any, res:any) => {
  try {
    const payments = await PaymentService.getAllPayments(req.user.id);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

export { createPaymentIntent, confirmPayment, getPaymentStatus };
