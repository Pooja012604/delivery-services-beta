import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.price * (parseInt(item.quantity) || 1),
    0
  );

  const moveToWishlist = async (item, index) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/wishlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ item })
      });

      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      navigate('/wishlist');
    } catch (err) {
      console.error('Error adding to wishlist:', err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <Alert variant="info">Your cart is empty.</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Store</th>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                const qty = parseInt(item.quantity) || 1;
                const total = item.price * qty;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.store}</td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{qty}</td>
                    <td>₹{total}</td>
                    <td>
                      <Button variant="secondary" className="me-2" onClick={() => moveToWishlist(item, index)}>
                        Move to Wishlist
                      </Button>
                      <Button variant="danger" onClick={() => removeFromCart(index)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h4 className="mt-3">Grand Total: ₹{grandTotal}</h4>
          <Button className="mt-3" onClick={() => navigate('/checkout')} variant="success">
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;
