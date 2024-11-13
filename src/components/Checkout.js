// Checkout.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedSeats = params.get('seats')?.split(',') || [];

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>You have selected the following seats:</p>
      <ul>
        {selectedSeats.map((seat, index) => (
          <li key={index}>{seat}</li>
        ))}
      </ul>
      <button onClick={() => alert('Proceeding to payment...')}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
