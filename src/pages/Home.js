import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import storeData from '../data/stores';
import { Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleStoreClick = (storeName) => {
    navigate(`/browse?store=${encodeURIComponent(storeName)}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🌍 Explore Our Trusted Stores</h2>

      {Object.entries(storeData).map(([category, stores]) => (
        <div key={category} className="mb-5">
          <h4 className="mb-3 text-capitalize">{category.replace('-', ' ')}</h4>
          <Row>
            {stores.map((store, index) => (
              <Col md={4} sm={6} xs={12} key={index} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={store.image}
                    alt={store.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{store.name}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {store.location}
                      <br />
                      <small>{store.description}</small>
                    </Card.Text>
                    <Link to={`/browse/${encodeURIComponent(store.name)}`}>
                        <Button variant="primary">View Products</Button>
                     </Link>
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
