import React from 'react';

const ShoppingComponent = () => {
  return (
    <div className="shopping-info">
      <h2>Shopping Information</h2>
      <div className="details">
        <p>Items:</p>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
          <li>Product 3</li>
          {/* Add more shopping items as needed */}
        </ul>
        <p>Total Amount: $100</p>
        {/* Add more shopping details as needed */}
      </div>
    </div>
  );
};

export default ShoppingComponent;
