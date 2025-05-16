// src/pages/ThankYou.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h2>🎉 Thank You for Your Order!</h2>
      <p>Your items will be processed shortly. We appreciate your support!</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </div>
  );
};

export default ThankYou;
