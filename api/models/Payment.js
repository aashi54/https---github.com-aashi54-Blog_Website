
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentAmount: Number,
  paymentCurrency: String,
  paymentDate: Date,
  paymentMode: String,
  razorpayPaymentId: String,
  email: {
    type: String,
    ref: 'User',
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
