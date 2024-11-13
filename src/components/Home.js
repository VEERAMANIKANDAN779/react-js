import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const busData = [
  { 
    id: 1, 
    route: 'Luxury Express', 
    details: 'Bus 1 - Comfortable seats, WiFi available.',
    price: '₹800',
    departure: '10:00 AM',
    arrival: '4:00 PM',
    features: ['WiFi', 'AC', 'Water Bottle', 'Charging Point']
  },
  { 
    id: 2, 
    route: 'Budget Shuttle', 
    details: 'Bus 2 - Reclining seats, Refreshments provided.',
    price: '₹600',
    departure: '11:30 AM',
    arrival: '5:30 PM',
    features: ['AC', 'Water Bottle', 'Emergency Contact']
  },
  { 
    id: 3, 
    route: 'Family Coach', 
    details: 'Bus 3 - Power outlets at every seat, In-seat entertainment.',
    price: '₹1000',
    departure: '9:00 AM',
    arrival: '3:00 PM',
    features: ['WiFi', 'AC', 'Entertainment System', 'Premium Seats', 'Snacks']
  },
];

const locations = [
  'chennai',
  'coimbatore',
  'pudukkottai',
  'trichy',
  'madurai'
];

const distanceMapping = {
  'chennai': { 'coimbatore': 500, 'pudukkottai': 400, 'trichy': 350, 'madurai': 600 },
  'coimbatore': { 'chennai': 500, 'pudukkottai': 300, 'trichy': 250, 'madurai': 400 },
  'pudukkottai': { 'chennai': 400, 'coimbatore': 300, 'trichy': 200, 'madurai': 300 },
  'trichy': { 'chennai': 350, 'coimbatore': 250, 'pudukkottai': 200, 'madurai': 150 },
  'madurai': { 'chennai': 600, 'coimbatore': 400, 'pudukkottai': 300, 'trichy': 150 },
};

const calculateDistance = (pickup, dropoff) => {
  if (pickup === dropoff) return 0;
  return distanceMapping[pickup][dropoff] || 'Distance not available';
};

const Home = () => {
  const navigate = useNavigate();
  const [expandedBusId, setExpandedBusId] = useState(null);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [distance, setDistance] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleToggle = (id) => {
    setExpandedBusId(expandedBusId === id ? null : id);
  };

  const handleCalculateDistance = () => {
    if (pickup && dropoff) {
      const dist = calculateDistance(pickup, dropoff);
      setDistance(dist);
      setSearchClicked(true);
    }
  };

  const handleSeatSelection = (busId) => {
    navigate(`/SeatSelection`);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">Bus Ticket Booking</div>
        <div className="nav-links">
          <button className="nav-link">Home</button>
          <button className="nav-link">My Bookings</button>
          <button className="nav-link">Support</button>
        </div>
      </nav>

      <header className="hero-section">
        <h1>Book Your Bus Journey</h1>
        <p>Travel with comfort and safety</p>
      </header>

      <main className="main-content">
        <div className="search-container">
          <div className="location-inputs">
            <div className="select-group">
              <label>Pickup Location:</label>
              <select 
                value={pickup} 
                onChange={(e) => setPickup(e.target.value)}
                className="location-select"
              >
                <option value="">Select Pickup</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc.charAt(0).toUpperCase() + loc.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="select-group">
              <label>Drop-off Location:</label>
              <select 
                value={dropoff} 
                onChange={(e) => setDropoff(e.target.value)}
                className="location-select"
              >
                <option value="">Select Drop-off</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc.charAt(0).toUpperCase() + loc.slice(1)}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleCalculateDistance}
              className="search-button"
              disabled={!pickup || !dropoff}
            >
              Search Buses
            </button>
          </div>

          {distance !== null && (
            <div className="distance-info">
              <p>Distance: <span>{distance} km</span></p>
            </div>
          )}
        </div>

        {searchClicked && (
          <div className="bus-list">
            <h2>Available Buses</h2>
            {busData.map((bus) => (
              <div key={bus.id} className="bus-card">
                <div className="bus-card-header">
                  <div className="bus-info">
                    <h3>{bus.route}</h3>
                    <p className="bus-timing">
                      {bus.departure} - {bus.arrival}
                    </p>
                  </div>
                  <div className="bus-price">
                    <p>{bus.price}</p>
                    <span>per seat</span>
                  </div>
                </div>

                <div className="bus-card-actions">
                  <button 
                    className="seat-select-btn"
                    onClick={() => handleSeatSelection(bus.id)}
                  >
                    Select Seats
                  </button>
                  <button 
                    className="details-btn"
                    onClick={() => handleToggle(bus.id)}
                  >
                    {expandedBusId === bus.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {expandedBusId === bus.id && (
                  <div className="bus-details">
                    <p>{bus.details}</p>
                    <div className="features-list">
                      {bus.features.map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We provide comfortable and reliable bus transportation services across Tamil Nadu.</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: support@busticket.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <button>Facebook</button>
              <button>Twitter</button>
              <button>Instagram</button>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .navbar {
          background-color: #ffffff;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .nav-brand {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2563eb;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
        }

        .nav-link {
          padding: 0.5rem 1rem;
          border: none;
          background: none;
          color: #4b5563;
          cursor: pointer;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        .hero-section {
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-section h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .search-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }

        .location-inputs {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .select-group {
          flex: 1;
          min-width: 200px;
        }

        .location-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          margin-top: 0.5rem;
        }

        .search-button {
          padding: 0.75rem 1.5rem;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: auto;
        }

        .search-button:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }

        .distance-info {
          margin-top: 1rem;
          padding: 1rem;
          background-color: #f0f9ff;
          border-radius: 4px;
        }

        .bus-list {
          margin-top: 2rem;
        }

        .bus-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .bus-card-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .bus-info h3 {
          color: #2563eb;
          margin-bottom: 0.5rem;
        }

        .bus-timing {
          color: #4b5563;
        }

        .bus-price {
          text-align: right;
        }

        .bus-price p {
          font-size: 1.25rem;
          font-weight: bold;
          color: #059669;
        }

        .bus-card-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .seat-select-btn {
          padding: 0.75rem 1.5rem;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .details-btn {
          padding: 0.75rem 1.5rem;
          background-color: white;
          color: #2563eb;
          border: 1px solid #2563eb;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .bus-details {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .feature-tag {
          padding: 0.25rem 0.75rem;
          background-color: #f0f9ff;
          color: #2563eb;
          border-radius: 9999px;
          font-size: 0.875rem;
        }

        .footer {
          background-color: #1f2937;
          color: white;
          padding: 3rem 2rem;
          margin-top: 4rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .footer-section h3 {
          margin-bottom: 1rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links button {
          padding: 0.5rem 1rem;
          background: none;
          border: 1px solid #9ca3af;
          color: #9ca3af;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .social-links button:hover {
          background-color: #9ca3af;
          color: #1f2937;
        }

        @media (max-width: 768px) {
          .location-inputs {
            flex-direction: column;
          }

          .nav-links {
            display: none;
          }

          .bus-card-header {
            flex-direction: column;
            gap: 1rem;
          }

          .bus-price {
            text-align: left;
          }

          .bus-card-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;