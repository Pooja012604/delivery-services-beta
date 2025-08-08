import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function CheckoutForm() {
  const { cartItems, clearCart, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://delivery-services-beta.onrender.com/api/orders",
        {
          customerName: form.name,
          address: form.address,
          paymentType: "Card",
          items: cartItems,
          total: getTotalPrice(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Save order summary to localStorage for ThankYou page
      localStorage.setItem(
        "orderDetails",
        JSON.stringify({
          name: form.name,
          address: form.address,
          total: getTotalPrice(),
        })
      );

      clearCart();
      navigate('/thankyou');
    } catch (err) {
      console.error('❌ Order error:', err);
      console.log("Full error response:", err.response?.data);
      setError('Failed to place the order. Try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>🚚 Delivery & Payment</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <h5>Shipping Address</h5>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Complete Address</Form.Label>
              <Form.Control
                name="address"
                as="textarea"
                rows={3}
                required
                value={form.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <h5>Card Payment (Demo)</h5>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                name="cardNumber"
                required
                value={form.cardNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiry (MM/YY)</Form.Label>
              <Form.Control
                name="expiry"
                required
                value={form.expiry}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                name="cvv"
                required
                value={form.cvv}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-4">Order Summary</h5>
        <p>Cart Total: ₹{getTotalPrice()}</p>

        <Button type="submit" variant="success">
          Place Order
        </Button>
      </Form>
    </Container>
  );
}

export default CheckoutForm;
