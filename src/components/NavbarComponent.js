import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LocationContext } from '../context/LocationContext';

function NavbarComponent() {
  const { selectedCountry, setSelectedCountry } = useContext(LocationContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (user?.isAdmin) return null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <span role="img" aria-label="logo" className="me-2">🛍️</span> Delivery Services
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-between`}>
          <div className="mx-auto w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search items or stores"
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className="d-flex align-items-center gap-3">
            <select
              className="form-select"
              style={{ maxWidth: '140px' }}
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="USA">USA</option>
              <option value="India">India</option>
            </select>

            {user ? (
              <>
                <span className="text-white d-flex align-items-center">
                  <FaUser className="me-2" /> {user.name}
                </span>
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-light">Login / Signup</Link>
            )}

            <Link className="btn btn-outline-light" to="/cart">
              <FaShoppingCart className="me-1" /> Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
