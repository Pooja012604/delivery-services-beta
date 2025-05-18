import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function CheckoutForm() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [showAlert, setShowAlert] = useState(false);

  // ✅ Fix: convert price & qty to numbers
  const cartTotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  const deliveryFee = 299;
  const totalPayable = cartTotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save order details for thank you page
    const orderSummary = {
      fullName: formData.fullName,
      address: formData.address,
      total: totalPayable,
    };
    localStorage.setItem('orderDetails', JSON.stringify(orderSummary));

    // Simulate payment
    setShowAlert(true);
    setTimeout(() => {
      clearCart();
      navigate('/thankyou');
    }, 2000);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🚚 Delivery & Payment</h2>

      {showAlert && (
        <Alert variant="success" className="text-center">
          ✅ Payment Successful! Redirecting to confirmation...
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Shipping Address */}
          <Col md={6}>
            <h5>Shipping Address</h5>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Complete Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          {/* Payment Fields */}
          <Col md={6}>
            <h5>Card Payment (Demo)</h5>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry (MM/YY)</Form.Label>
              <Form.Control
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <p className="text-muted small">* No actual payment is processed in this demo version.</p>
          </Col>
        </Row>

        {/* Order Summary */}
        <h5 className="mt-4">Order Summary</h5>
        <p>Cart Total: ₹{cartTotal}</p>
        <p>Delivery Fee: ₹{deliveryFee}</p>
        <h4>Total Payable: ₹{totalPayable}</h4>

        <div className="text-end mt-3">
          <Button type="submit" variant="success">
            Pay & Place Order
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default CheckoutForm;
