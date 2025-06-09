import React, { useEffect, useState, useContext } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function SaveLater() {
  const [savedItems, setSavedItems] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('saveLater')) || [];
    setSavedItems(stored);
  }, []);

  const moveToCart = (itemToMove) => {
    // Add item to cart via context
    addToCart(itemToMove, itemToMove.quantity || 1);

    // Remove from saveLater
    const updated = savedItems.filter(
      (item) => !(item.name === itemToMove.name && item.store === itemToMove.store)
    );
    setSavedItems(updated);
    localStorage.setItem('saveLater', JSON.stringify(updated));
  };

  const handlePlaceOrder = (item) => {
    // Add the item to cart
    addToCart(item, item.quantity || 1);

    // Clear this item from saveLater
    const updated = savedItems.filter(
      (i) => !(i.name === item.name && i.store === item.store)
    );
    setSavedItems(updated);
    localStorage.setItem('saveLater', JSON.stringify(updated));

    // Go to checkout
    navigate('/checkout');
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">🕓 Saved for Later</h2>

      {savedItems.length === 0 ? (
        <Alert variant="info">You have no items saved for later.</Alert>
      ) : (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Store</th>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.store}</td>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity || 1}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => moveToCart(item)}
                  >
                    Move to Cart
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handlePlaceOrder(item)}
                  >
                    Place Order Now
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default SaveLater;
