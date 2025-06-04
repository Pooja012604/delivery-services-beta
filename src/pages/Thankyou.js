import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ThankYou() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('orderDetails'));
    setOrderData(saved);
  }, []);

  return (
    <Container className="mt-5 text-center">
      <h2>🎉 Your Order Has Been Placed!</h2>
      <p className="mb-4">Thank you for using Delivery Services. Your package will be shipped via cargo shortly.</p>

      {orderData ? (
        <Card className="p-4 mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
          <h5>🧾 Order Summary</h5>
          <p><strong>Name:</strong> {orderData.fullName}</p>
          <p><strong>Address:</strong> {orderData.address}</p>
          <p><strong>Amount Paid:</strong> ₹{orderData.total}</p>
          <p><strong>Order ID:</strong> #{Math.floor(100000 + Math.random() * 900000)}</p>
        </Card>
      ) : (
        <p className="text-muted">No order details found. Please go back and place an order.</p>
      )}

      <Button as={Link} to="/browse" className="mt-4" variant="primary">
        Continue Shopping
      </Button>
    </Container>
  );
}

export default ThankYou;
