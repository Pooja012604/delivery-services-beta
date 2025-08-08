import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import stores from '../data/stores';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate(); // ✅ Moved to top
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "admin") {
    return <Navigate to="/admin" />;
  }

  const handleViewProducts = (storeName) => {
    navigate(`/browse/${encodeURIComponent(storeName)}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🌐 Explore Our Trusted Stores</h2>

      {Object.entries(stores).map(([category, storeList]) => (
        <div key={category}>
          <h4 className="text-capitalize mt-4 mb-3">{category}</h4>
          <Row>
            {storeList.map((store, index) => (
              <Col key={index} md={4} sm={6} xs={12} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={store.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{store.name}</Card.Title>
                    <Card.Text><strong>Location:</strong> {store.location}</Card.Text>
                    <Card.Text>{store.description}</Card.Text>
                    <Button onClick={() => handleViewProducts(store.name)}>
                      View Products
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default Home;
