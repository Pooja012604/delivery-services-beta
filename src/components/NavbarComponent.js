import React, { useContext } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LocationContext } from '../context/LocationContext';

function NavbarComponent() {
  const { country, setCountry } = useContext(LocationContext);
  const navigate = useNavigate();

  const countryOptions = ['USA', 'India', 'UK', 'Canada', 'Australia'];
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); // ✅ controlled redirect instead of reload
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span role="img" aria-label="logo" className="me-2">🛍️</span>
          <strong>Delivery Services</strong>
        </Navbar.Brand>

        <Form className="d-flex mx-auto w-50">
          <FormControl
            type="search"
            placeholder="Search items or stores"
            className="me-2"
            aria-label="Search"
          />
        </Form>

        <Nav className="align-items-center">
          <Form.Select
            value={country}
            onChange={handleCountryChange}
            className="me-3"
            style={{ width: '140px' }}
          >
            <option value="">Country</option>
            {countryOptions.map((ctry) => (
              <option key={ctry}>{ctry}</option>
            ))}
          </Form.Select>

          {user ? (
            <Dropdown align="end" className="me-3">
              <Dropdown.Toggle variant="outline-light" size="sm">
                👤 {user.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/orders">My Orders</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              variant="outline-light"
              size="sm"
              onClick={handleLoginClick}
            >
              Login / Signup
            </Button>
          )}

          <Button
            variant="outline-light"
            size="sm"
            onClick={() => navigate('/cart')}
            className="ms-2"
          >
            🛒 Cart
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;