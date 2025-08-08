import React, { useContext, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Toast,
  ToastContainer,
  Spinner
} from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

function Browse() {
  const { storeName } = useParams();
  const decodedStoreName = decodeURIComponent(storeName);
  const { addToCart } = useContext(CartContext);

  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        const filtered = res.data.filter(
          (product) => product.storeId?.name === decodedStoreName
        );
        setProducts(filtered);
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to load products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [decodedStoreName]);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role === "admin") {
    return <Navigate to="/admin" />;
  }

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
      store: product.storeId?.name || "Unknown",
    };
    addToCart(productWithStore, quantity);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </Container>
    );
  }

  if (!products.length) {
    return (
      <Container className="mt-5 text-center">
        <h3>No products found for "{decodedStoreName}".</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🛍️ Products from {decodedStoreName}</h2>

      <ToastContainer className="position-fixed bottom-0 start-50 translate-middle-x mb-4" style={{ zIndex: 1055 }}>
        <Toast bg="success" show={showAlert} onClose={() => setShowAlert(false)} delay={2000} autohide>
          <Toast.Body className="text-white">✅ Item added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Row>
        {products.map((product, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.name}
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
