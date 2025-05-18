import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import storeData from '../data/stores';
import { LocationContext } from '../context/LocationContext';

function Home() {
  const navigate = useNavigate();
  const { country, state, city } = useContext(LocationContext);

  const handleStoreClick = (storeName) => {
    navigate(`/browse/${encodeURIComponent(storeName)}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🌍 Explore Our Trusted Stores</h2>

      {Object.entries(storeData).map(([category, stores]) => {
        const filteredStores =
          city && stores.some((store) => store.location === city)
            ? stores.filter((store) => store.location === city)
            : stores;

        return (
          <div key={category} className="mb-5">
            <h4 className="mb-3 text-capitalize">{category.replace('-', ' ')}</h4>

            {city && stores.every((store) => store.location !== city) && (
              <p className="text-muted ms-2">
                No stores available in <strong>{city}</strong>. Showing all stores instead.
              </p>
            )}

            <Row>
              {filteredStores.map((store, index) => (
                <Col md={4} sm={6} xs={12} key={index} className="mb-4">
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
                      <Button
                        variant="primary"
                        onClick={() => handleStoreClick(store.name)}
                      >
                        View Products
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </Container>
  );
}

export default Home;
