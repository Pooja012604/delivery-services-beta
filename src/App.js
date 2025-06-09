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
import { CartProvider } from './context/CartContext';
import CheckoutForm from './pages/CheckoutForm';
import AdminDashboard from "./pages/AdminDashboard";
import Wishlist from './pages/Wishlist'; // ✅ Add this

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <CartProvider>
        <LocationProvider>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" replace />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/browse/:storeName" element={<Browse />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} /> {/* ✅ New route */}
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/checkout/details" element={<CheckoutForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/select-location" element={<Navigate to="/browse" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LocationProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
