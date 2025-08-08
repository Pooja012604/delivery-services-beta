import React, { useEffect, useState, useContext } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        console.log("\ud83d\udce5 Loaded wishlist:", data);
        setWishlistItems(data);
      } catch (err) {
        console.error('Error loading wishlist:', err);
      }
    };
    fetchWishlist();
  }, []);

  const moveToCart = async (itemToMove) => {
    addToCart(itemToMove, itemToMove.quantity || 1);
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ itemName: itemToMove.name })
      });

      const updated = wishlistItems.filter(i => i.name !== itemToMove.name);
      setWishlistItems(updated);
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  const removeFromWishlist = async (index, name) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ itemName: name })
      });

      const updated = [...wishlistItems];
      updated.splice(index, 1);
      setWishlistItems(updated);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">💖 Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <Alert variant="info">No items in wishlist.</Alert>
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
            {wishlistItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.store}</td>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity || 1}</td>
                <td>
                  <Button variant="primary" className="me-2" onClick={() => moveToCart(item)}>Add to Cart</Button>
                  <Button variant="danger" onClick={() => removeFromWishlist(index, item.name)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Wishlist;
