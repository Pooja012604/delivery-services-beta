import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await axios.post('https://delivery-services-beta.onrender.com/api/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      Swal.fire({
        title: 'Registration Successful!',
        text: 'You can now log in.',
        icon: 'success',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
          />
        </Form.Group>

        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Button type="submit" className="w-100" variant="primary">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
