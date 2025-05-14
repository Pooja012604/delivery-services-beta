import React, { useContext } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleOrder = () => {
    alert('🎉 Order placed successfully!');
    setCartItems([]); // Clear cart
    navigate('/'); // Redirect to Home or Browse
  };

  return (
    <Container className="mt-4">
      <h2>✅ Review Your Order</h2>

      {cartItems.length === 0 ? (
        <Alert variant="info">No items in cart. Please add products first.</Alert>
      ) : (
        <>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Store</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.customer}</td>
                  <td>{item.store}</td>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="text-end">Total Payable: ₹{totalAmount}</h4>
          <div className="text-end">
            <Button variant="success" onClick={handleOrder}>
              Place Order
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Checkout;
