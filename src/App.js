import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ThankYou from './pages/Thankyou';
import AppNavbar from './components/NavbarComponent';
import ProtectedRoute from './components/ProtectedRoute';
import { LocationProvider } from './context/LocationContext';
import CheckoutForm from './pages/CheckoutForm';
function App() {
  return (
    <Router>
      <LocationProvider>
        <AppNavbar />
        <Routes>
          {/* Main homepage or redirect to browse */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Browse page */}
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse/:storeName" element={<Browse />} />

          {/* Cart & Protected Checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout/details" element={<CheckoutForm />} />
          {/* Order confirmation */}
          <Route path="/thankyou" element={<ThankYou />} />

          {/* ✅ Redirect old /select-location to browse */}
          <Route path="/select-location" element={<Navigate to="/browse" replace />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LocationProvider>
    </Router>
  );
}

export default App;
