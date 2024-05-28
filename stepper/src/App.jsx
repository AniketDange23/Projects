import React, { useState } from 'react';
import { FaUser, FaShoppingCart, FaCreditCard, FaTruck } from 'react-icons/fa';
import CheckStepper from './CheckStepper';
import DeliveredComponent from './components/DeliveredComponent';
import PaymentComponent from './components/PaymentComponent';
import ShoppingComponent from './components/ShoppingComponent';
import CustomerComponent from './components/CustomerComponent';
import './App.css'
const Checkout = [
  {
    name: 'Customer Information',
    icon: <FaUser />,
    component: () => <CustomerComponent />,
  },
  {
    name: 'Order Information',
    icon: <FaShoppingCart />,
    component: () => <ShoppingComponent />,
  },
  {
    name: 'Payment',
    icon: <FaCreditCard />,
    component: () => <PaymentComponent />,
  },
  {
    name: 'Delivered',
    icon: <FaTruck />,
    component: () => <DeliveredComponent />,
  },
];

const App = () => {
 
  return (
    <div>
      <h2>Checkout</h2>
      <CheckStepper stepConfig={Checkout}  />
     
    </div>
  );
};

export default App;
