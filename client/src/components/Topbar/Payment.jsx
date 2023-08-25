import React from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import { useContext, useState, useEffect } from 'react';
import  { LoginSuccess } from  "../../Context/Actions"
import "./Payment.css"
import {AiFillCrown} from "react-icons/ai"
import PaymentHistory from '../../PaymentHistory';
import { Link } from "react-router-dom";

const Payment = () => {

  const { user, updateUser } = useContext(Context);
 const [isSubscribed, setIsSubscribed] = useState(user?.isSubscribed);
 const [showPaymentHistory, setShowPaymentHistory] = useState(false);

 useEffect(() => {
  if (user) {
    setIsSubscribed(user.isSubscribed);
  }
}, [user]);


const paymentHandler = async (e) => {
  e.preventDefault();
  const orderUrl = `/api/payment/order`;

  try {
    const response = await axios.get(orderUrl);
    const { data } = response;

    const options = {
      key: "rzp_test_fk45MovgJtODAb",
      name: "BlogSnap Subscription",
      description: "Some Description",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `/api/payment/capture/${paymentId}`;
          const captureResponse = await axios.post(url, {userEmail: user.email});

          if (user) {
            const userId = user._id;
            const updateSubscriptionStatus = await axios.put(
              `/api/users/${userId}/update-subscription`,
              {
                isSubscribed: true,
              }
            );

            if (updateSubscriptionStatus.status === 200) {
              updateUser({ ...user, isSubscribed: true }); // Update user context
              dispatch(LoginSuccess(updatedUser));
              setIsSubscribed(true);
          
            }
          }
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };

    const rzp1 = new window.Razorpay(options);

   
    rzp1.open();
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  setIsSubscribed(user?.isSubscribed);
}, [user]);


  return (
    <div className='App'>
      <header className='App-header'>
      {user ? (
          isSubscribed ? (
          
            <i className='premium'> <Link className="link" to="/payment-history"> <AiFillCrown className='icon' /> Premium User </Link> </i>
           
          ) : (
            <button onClick={paymentHandler}>Subscribe</button>
          )
        ) : (
          ''
        )}
        
      </header>
    </div>
  );
}

export default Payment;
