import React, { useState, useContext } from 'react'; // removed useEffect
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import { LocationContext } from '../context/LocationContext';
import { CartContext } from '../context/CartContext';

function NavbarComponent() {
  const { selectedCountry, setSelectedCountry } = useContext(LocationContext);
  const { cartItems } = useContext(CartContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (user?.isAdmin) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/">
          🛍️ 2pea's Delivery Services
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
            <input type="text" className="form-control" placeholder="Search items or stores" />
          </div>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
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

                <Link className="btn btn-outline-light" to="/wishlist">
                  <FaHeart />
                </Link>

                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-outline-light" to="/login">Login / Signup</Link>
            )}

            <Link className="btn btn-outline-light position-relative" to="/cart">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
