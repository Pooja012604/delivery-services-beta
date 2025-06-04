import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
import { CartProvider } from './context/CartContext'; // ✅ Added
import CheckoutForm from './pages/CheckoutForm';
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <CartProvider> {/* ✅ Wrap entire app with CartProvider */}
        <LocationProvider>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Admin route protection */}
            <Route
              path="/admin"
              element={
                user?.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* Browsing & Shopping */}
            <Route path="/browse" element={<Browse />} />
            <Route path="/browse/:storeName" element={<Browse />} />
            <Route path="/cart" element={<Cart />} />

            {/* Protected Checkout */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/checkout/details" element={<CheckoutForm />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Order confirmation */}
            <Route path="/thankyou" element={<ThankYou />} />

            {/* Redirects */}
            <Route path="/select-location" element={<Navigate to="/browse" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LocationProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
