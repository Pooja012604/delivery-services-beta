import React, { useContext, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LocationContext } from '../context/LocationContext';
import axios from 'axios';

const data = {
  USA: {
    California: ['Los Angeles', 'San Francisco'],
    Texas: ['Houston', 'Dallas'],
  },
  India: {
    Telangana: ['Hyderabad', 'Warangal'],
    Karnataka: ['Bangalore', 'Mysore'],
  },
  UK: {
    England: ['London', 'Manchester'],
    Scotland: ['Edinburgh', 'Glasgow'],
  },
};

function SelectLocation() {
  const { country, state, city, setCountry, setState, setCity } = useContext(LocationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!country && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
              params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
              },
            });

            const address = res.data.address;
            const detectedCountry = address.country;
            const detectedState = address.state || address.county;
            const detectedCity = address.city || address.town || address.village;

            if (detectedCountry && data[detectedCountry]) {
              setCountry(detectedCountry);
              if (data[detectedCountry][detectedState]) {
                setState(detectedState);
                if (data[detectedCountry][detectedState].includes(detectedCity)) {
                  setCity(detectedCity);
                }
              }
            }
          } catch (error) {
            console.error('Geolocation lookup failed:', error);
          }
        },
        (err) => {
          console.warn('Geolocation not available or denied', err);
        }
      );
    }
  }, []);

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    setCountry(selected);
    setState('');
    setCity('');
  };

  const handleStateChange = (e) => {
    const selected = e.target.value;
    setState(selected);
    setCity('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (country && state && city) {
      navigate('/');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">🌍 Select Your Delivery Location</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Select value={country} onChange={handleCountryChange}>
            <option value="">-- Select Country --</option>
            {Object.keys(data).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {country && (
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Select value={state} onChange={handleStateChange}>
              <option value="">-- Select State --</option>
              {Object.keys(data[country]).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        {state && (
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">-- Select City --</option>
              {data[country][state].map((ct) => (
                <option key={ct}>{ct}</option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <Button variant="primary" type="submit" disabled={!country || !state || !city}>
          Save Location
        </Button>
      </Form>
    </Container>
  );
}

export default SelectLocation;
