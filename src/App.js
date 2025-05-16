import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import ThankYou from './pages/Thankyou';
import AppNavbar from './components/Navbar'; // ✅ navigation bar
import ProtectedRoute from './components/ProtectedRoute'; // ✅ protects checkout

function App() {
  return (
    <Router>
      <AppNavbar /> {/* ✅ shows on every page */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse/:storeName" element={<Browse />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
