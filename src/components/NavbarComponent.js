import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LocationContext } from '../context/LocationContext';
import { CartContext } from '../context/CartContext';

function NavbarComponent() {
  const { selectedCountry, setSelectedCountry } = useContext(LocationContext);
  const { cartItems } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const suggestionList = [
    'Dadu Sweets',
    'Return Gifts',
    'Gold Shops',
    'Pulla Reddy',
    'Ethnic Wear',
    'Home Decor',
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    const filtered = suggestionList.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand fw-bold text-white">
        <span role="img" aria-label="cart">🛍️</span> Delivery Services
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
        onClick={() => setIsNavCollapsed(!isNavCollapsed)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarNav">
        <div className="d-flex flex-grow-1 align-items-center mt-2 mt-lg-0">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search items or stores"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <select
            className="form-select me-3"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
          {user ? (
            <>
              <div className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
                <FaUser />
                <span>{user.name}</span>
              </div>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-light btn-sm">
              Login / Signup
            </Link>
          )}

          <Link to="/cart" className="position-relative btn btn-outline-light btn-sm d-flex align-items-center">
            <FaShoppingCart />
            <span className="ms-2">Cart</span>
            {cartCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.7rem' }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
