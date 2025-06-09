import React, { useContext, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import stores from '../data/stores';
import { CartContext } from '../context/CartContext';

function Browse() {
  const { storeName } = useParams();
  const decodedStoreName = decodeURIComponent(storeName);
  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role === "admin") {
    return <Navigate to="/admin" />;
  }

  const allStores = Object.values(stores).flat();
  const store = allStores.find((s) => s.name === decodedStoreName);

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleAddToCart = (product, index) => {
    const quantity = quantities[index] || 1;

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

      {/* Toast - centered bottom */}
      <ToastContainer
        className="position-fixed bottom-0 start-50 translate-middle-x mb-4"
        style={{ zIndex: 1055 }}
      >
        <Toast
          bg="success"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white">✅ Item added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>

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
