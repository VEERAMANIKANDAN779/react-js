import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeatSelection from './components/SeatSelection';
import Checkout from './components/Checkout';
import Home from './components/Home';
import Signup from './components/Signup';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/SeatSelection" element={<SeatSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/"element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
