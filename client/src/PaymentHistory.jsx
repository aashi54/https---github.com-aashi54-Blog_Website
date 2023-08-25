import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./PaymentHistory.css"; 
import { Context , useAuth} from "./context/Context";



const PaymentHistory = () => {
  const { user } = useContext(Context); 
 
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetchPaymentHistory(user.email);
  }, []);

  const fetchPaymentHistory = async (email) => {
    try {
      const response = await axios.get(`/api/payment/history/${email}`);
      setPaymentHistory(response.data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  return (
    <div className="payment-history-container">
      <h2>Payment History</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Payment Amount</th>
            <th>Payment Currency</th>
            <th>Payment Date</th>
            <th>Payment Mode</th>
            <th>Razorpay Payment ID</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.orderId}</td>
              <td>{payment.paymentAmount / 100}</td>
              <td>{payment.paymentCurrency}</td>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td>{payment.paymentMode}</td>
              <td>{payment.razorpayPaymentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
