import React from 'react';

const PaymentComponent = () => {
  return (
    <div className="payment-info">
      <h2>Payment Information</h2>
      <div className="details">
        <p>Payment Method: Credit Card</p>
        <p>Card Number: xxxx-xxxx-xxxx-1234</p>
        <p>Expiration Date: 12/25</p>
        {/* Add more payment details as needed */}
      </div>
    </div>
  );
};

export default PaymentComponent;
