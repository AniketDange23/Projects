import React from 'react';

const CustomerComponent = () => {
  return (
    <div className="customer-info">
      <h2>Customer Information</h2>
      <div className="details">
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <p>Address: 123 Main Street, City, Country</p>
        {/* Add more customer details as needed */}
      </div>
    </div>
  );
};

export default CustomerComponent;
