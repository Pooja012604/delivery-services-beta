import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import stores from '../data/stores';
import { CartContext } from '../context/CartContext';

function Browse() {
  const { storeName } = useParams();
  const decodedStoreName = decodeURIComponent(storeName);

  // Flatten all store categories into one array
  const allStores = Object.values(stores).flat();
  const store = allStores.find((s) => s.name === decodedStoreName);

  const { addToCart } = useContext(CartContext);

  // ✅ Shared quantity state, mapped by product index
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({ ...prev, [index]: parseInt(value) }));
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
      <h2 className="mb-1">{store.name}</h2>
      <p className="text-muted">
        <strong>Location:</strong> {store.location} &nbsp; | &nbsp;
        <strong>Category:</strong> {store.category}
      </p>
      <hr />

      <Row>
        {store.products.map((product, index) => {
          const qty = quantities[index] || 1;

          return (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="h-100 shadow-sm">
                {product.image && (
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>₹{product.price}</Card.Text>
                    <Form.Group className="mb-2">
                      <Form.Label>Quantity:</Form.Label>
                      <Form.Select
                        value={qty}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() =>
                      addToCart({
                        store: store.name,
                        item: product.name,
                        price: product.price,
                        quantity: qty,
                        total: product.price * qty,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Browse;
