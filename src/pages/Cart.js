import React, { useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <Container className="mt-4">
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in your cart yet.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Store</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
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
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(idx)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="text-end">Total Amount: ₹{totalAmount}</h4>
          <div className="text-end">
            <Button variant="success" as={Link} to="/checkout">
  Proceed to Checkout
</Button>

          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;
