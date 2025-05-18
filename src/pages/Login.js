import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate successful login — in real app, you'd verify credentials
    const dummyUser = { name: email.split('@')[0], email };
    localStorage.setItem('user', JSON.stringify(dummyUser));

    navigate('/');
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email or Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 mb-3">
          Login
        </Button>

        <p className="text-center">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </Form>
    </Container>
  );
}

export default Login;
