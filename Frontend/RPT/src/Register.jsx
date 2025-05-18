import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, remember })
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        window.location.href = '/';
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: '20px',
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          maxWidth: '450px',
          width: '100%',
          borderRadius: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          border: 'none',
        }}
      >
        <h3 className="card-title mb-4 text-center text-dark fw-bold">
          Register
        </h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold text-secondary">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-secondary">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              id="remember"
              className="form-check-input"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label htmlFor="remember" className="form-check-label text-secondary">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#667eea', borderColor: '#667eea' }}
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-secondary">
          Have an Account?{' '}
          <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: '#667eea' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}