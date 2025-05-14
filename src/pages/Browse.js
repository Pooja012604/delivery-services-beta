import React, { useState, useRef, useContext } from 'react';
import { Container, Card, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const mockStores = [
  {
    name: "G. Pulla Reddy Sweets",
    location: "Hyderabad - Koti",
    image: "https://via.placeholder.com/300x180?text=Pulla+Reddy+Sweets",
    category: "Sweets & Snacks",
    description: "Renowned for pure ghee sweets, laddus, and traditional Indian snacks.",
    products: [
      { name: "Kaju Katli", price: 300 },
      { name: "Mysore Pak", price: 250 },
      { name: "Dry Fruit Laddu", price: 400 },
      { name: "Jangri", price: 280 }
    ]
  },
  {
    name: "Neeru's Emporio",
    location: "Hyderabad - Banjara Hills",
    image: "https://via.placeholder.com/300x180?text=Neerus+Emporio",
    category: "Ethnic Clothing",
    description: "Premium ethnic wear for weddings, festivals, and NRI gifting.",
    products: [
      { name: "Bridal Lehenga", price: 8500 },
      { name: "Kurti Set", price: 1800 },
      { name: "Saree Blouse", price: 750 }
    ]
  },
  {
    name: "Kalaniketan",
    location: "Secunderabad - MG Road",
    image: "https://via.placeholder.com/300x180?text=Kalaniketan",
    category: "Traditional Dresses",
    description: "Sarees, lehengas, and festive wear perfect for gifting and personal use.",
    products: [
      { name: "Kanchipuram Saree", price: 6200 },
      { name: "Silk Dupatta", price: 1200 }
    ]
  },
  {
    name: "Sri Krishna Jewellers",
    location: "Hyderabad - Punjagutta",
    image: "https://via.placeholder.com/300x180?text=Sri+Krishna+Jewellers",
    category: "Gold & Silver",
    description: "Trustworthy jewellers offering hallmark gold, silver idols, and return gifts.",
    products: [
      { name: "Gold Chain", price: 28500 },
      { name: "Silver Idol", price: 3500 }
    ]
  },
  {
    name: "Archies Gallery",
    location: "Secunderabad - Trimulgherry",
    image: "https://via.placeholder.com/300x180?text=Archies+Return+Gifts",
    category: "Return Gifts",
    description: "Event return gifts, decorative idols, photo frames, and seasonal specials.",
    products: [
      { name: "Gift Hamper Box", price: 550 },
      { name: "Decorative Lamp", price: 820 },
      { name: "Customized Keychain", price: 250 }
    ]
  }
];

function Browse() {
  const [showModal, setShowModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const nameRef = useRef();
  const qtyRef = useRef();
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (store) => {
    setSelectedStore(store);
    setSelectedProduct(store.products[0]); // Default selection
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <Container className="mt-4">
      <h2>Nearby Stores</h2>
      <Row className="mt-3">
        {mockStores.map((store, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card onClick={() => handleCardClick(store)} style={{ cursor: 'pointer' }}>
              <Card.Img variant="top" src={store.image} />
              <Card.Body>
                <Card.Title>{store.name}</Card.Title>
                <Card.Text>
                  {store.location}<br />
                  <strong>{store.category}</strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedStore && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedStore.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Location:</strong> {selectedStore.location}</p>
            <p><strong>Category:</strong> {selectedStore.category}</p>
            <p>{selectedStore.description}</p>

            <Form.Group className="mb-3">
              <Form.Label>Select Item</Form.Label>
              <Form.Select
                value={JSON.stringify(selectedProduct)}
                onChange={(e) => setSelectedProduct(JSON.parse(e.target.value))}
              >
                {selectedStore.products.map((item, idx) => (
                  <option key={idx} value={JSON.stringify(item)}>
                    {item.name} — ₹{item.price}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Select ref={qtyRef}>
                {[1, 2, 3, 4, 5].map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                ref={nameRef}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                const qty = parseInt(qtyRef.current?.value || 0);
                const name = nameRef.current?.value?.trim();

                if (!selectedProduct || !qty || !name) {
                  alert("Please enter your name and select a product.");
                  return;
                }

                const cartItem = {
                  customer: name,
                  store: selectedStore.name,
                  item: selectedProduct.name,
                  price: selectedProduct.price,
                  quantity: qty,
                  total: selectedProduct.price * qty
                };

                addToCart(cartItem);
                alert(`✅ Added ${qty} ${selectedProduct.name}(s) to cart from ${selectedStore.name}`);
                handleClose();
              }}
            >
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default Browse;
