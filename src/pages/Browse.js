import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import stores from '../data/stores';
import { CartContext } from '../context/CartContext';

function Browse() {
  const { storeName } = useParams();
  const decodedStoreName = decodeURIComponent(storeName);

  const allStores = Object.values(stores).flat();
  const store = allStores.find((s) => s.name === decodedStoreName);

  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleAddToCart = (product, index) => {
    const quantity = quantities[index] || 1;

    // ✅ Add store name to product before adding to cart
    const productWithStore = {
      ...product,
      store: store.name,
    };

    addToCart(productWithStore, quantity);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  if (!store) {
    return (
      <Container className="mt-4">
        <h3>Store not found.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🛍️ Products from {store.name}</h2>

      {showAlert && (
        <Alert variant="success" className="text-center">
          ✅ Item added to cart!
        </Alert>
      )}

      <Row>
        {store.products.map((product, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ₹{product.price}</Card.Text>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantities[index] || 1}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </Form.Group>
                <Button className="mt-2 w-100" onClick={() => handleAddToCart(product, index)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Browse;
