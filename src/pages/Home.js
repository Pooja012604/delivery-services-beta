import React from 'react';
import { Container } from 'react-bootstrap';
import stores from '../data/stores';

function Home() {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🌍 Explore Our Trusted Stores</h2>

      {Object.entries(stores).map(([category, storeList]) => (
        <div key={category} className="mb-5">
          <h4 className="mb-3">{category}</h4>
          <div className="d-flex flex-wrap gap-4">
            {storeList.map((store, index) => (
              <div key={index} className="card" style={{ width: '18rem' }}>
                <img src={store.image} className="card-img-top" alt={store.name} />
                <div className="card-body">
                  <h5 className="card-title">{store.name}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {store.location}
                  </p>
                  <p className="card-text">{store.description}</p>
                  <a href={`/browse/${encodeURIComponent(store.name)}`} className="btn btn-primary">
                    View Products
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
}

export default Home;
