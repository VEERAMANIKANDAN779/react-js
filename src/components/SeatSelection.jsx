import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeatSelection.css'; // Ensure this file contains your CSS

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const toggleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatNumber)) {
        return prevSelected.filter(seat => seat !== seatNumber);
      }
      return [...prevSelected, seatNumber];
    });
  };

  const handleCheckout = () => {
    const seats = selectedSeats.join(',');
    navigate(`/checkout?seats=${seats}`);
  };

  return (
    <div className="seat-selection">
      <h2>Select Your Seats</h2>
      <div className="seats-grid">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            className={`seat ${selectedSeats.includes(index + 1) ? 'selected' : ''}`}
            onClick={() => toggleSeatSelection(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <div className="selected-seats">
          <h3>Selected Seats: {selectedSeats.join(', ')}</h3>
        </div>
      )}
      {selectedSeats.length > 0 && (
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
};

export default SeatSelection;
