import React from 'react';

const DeliveredComponent = () => {
  return (
    <div className="delivered-info">
      <h2>Delivered Information</h2>
      <div className="details">
        <p>Delivery Status: Delivered</p>
        <p>Tracking Number: 123456789</p>
        <p>Delivery Date: January 25, 2024</p>
        {/* Add more delivery details as needed */}
      </div>
    </div>
  );
};

export default DeliveredComponent;
