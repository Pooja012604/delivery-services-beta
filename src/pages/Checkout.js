import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleOrder = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      alert('Please login to place the order.');
      navigate('/login');
      return;
    }

    // Optionally: Send order to backend or save it
    setCartItems([]);
    navigate('/thank-you');
  };

  const grandTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Review Your Order</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Store</th>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.store}</td>
              <td>{item.item}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4 className="mt-4 text-end">Total Payable: ₹{grandTotal}</h4>
      <div className="text-end mt-3">
        <Button variant="success" onClick={handleOrder}>Place Order</Button>
      </div>
    </div>
  );
};

export default Checkout;
