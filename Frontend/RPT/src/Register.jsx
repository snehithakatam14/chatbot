import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // reset error
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
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
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          border: 'none',
        }}
      >
        <h3
          className="card-title mb-4 text-center"
          style={{ fontWeight: '700', color: '#4a4a4a' }}
        >
          Register
        </h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label" style={{ fontWeight: '600', color: '#555' }}>
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
              autoFocus
              style={{
                borderRadius: '8px',
                padding: '12px 15px',
                fontSize: '1rem',
                borderColor: '#ced4da',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label" style={{ fontWeight: '600', color: '#555' }}>
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
              style={{
                borderRadius: '8px',
                padding: '12px 15px',
                fontSize: '1rem',
                borderColor: '#ced4da',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
            />
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              id="remember"
              className="form-check-input"
              checked={remember}
              onChange={() => setRemember(!remember)}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="remember" className="form-check-label" style={{ cursor: 'pointer', color: '#555', fontWeight: '500' }}>
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              padding: '12px',
              fontWeight: '600',
              fontSize: '1.1rem',
              borderRadius: '10px',
              backgroundColor: '#667eea',
              borderColor: '#667eea',
              boxShadow: '0 4px 12px rgba(102,126,234,0.5)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5a67d8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#667eea')}
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center" style={{ color: '#444' }}>
          Have an Account?{' '}
          <Link to="/login" className="text-decoration-none" style={{ color: '#667eea', fontWeight: '600' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}