require("dotenv").config();
const express = require("express");
const request = require("request");
const router = express.Router();
const Payment = require("../models/Payment");


const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});




router.get("/order", (req, res) => {
  try {
    const options = {
      amount: 49900,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
    };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
    //  console.log(order.orderId);
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

router.post("/capture/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;
    const userEmail = req.body.userEmail;
    // console.log(userEmail);
   

    const options = {
      method: "POST",
      url: `https://api.razorpay.com/v1/payments/${paymentId}/capture`,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_SECRET}`
        ).toString("base64")}`,
      },
      form: {
        amount: 499 * 100, // amount == Rs 4.99 * 100
        currency: "INR",
      },
    };

    // request library
    request(options, async (error, response, body) => {
      if (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
      }

      // console.log('Status:', response.statusCode);
      // console.log('Headers:', JSON.stringify(response.headers));
      // console.log('Response:', body);
      // console.log(body.amount);

      if (response.statusCode === 200) {
        const responseBody = JSON.parse(body);
        const { order_id, amount, currency, method, razorpay_payment_id } =
          responseBody;
        const headers = JSON.parse(JSON.stringify(response.headers));
        const paydate = headers.date;

        
        const payment = new Payment({
          orderId: order_id,
          paymentAmount: amount,
          paymentCurrency: currency,
          paymentDate: paydate,
          paymentMode: method,
          razorpayPaymentId: razorpay_payment_id,
          email: userEmail,
        });
        // console.log(payment);
        

        await payment.save();

        return res.status(200).json({ order_id });

      } else {
        return res.status(500).json({ message: "Capture Failed" });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
});


router.get("/history/:email", async (req, res) => {
  try {
    const { email } = req.params;
  
    
    // Fetch payment history for the specified user's email
    const paymentHistory = await Payment.find({ email });
   
    // console.log(paymentHistory)
    res.status(200).json(paymentHistory);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
