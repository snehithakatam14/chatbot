import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); // Added for tracking success status
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage('');
    setIsSuccess(null);

    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setIsSuccess(true);
        setMessage(data.message);
        window.location.href = '/';
      } else {
        setIsSuccess(false);
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Something went wrong. Try again.');
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        <h2
          className="text-center mb-4 fw-bold"
          style={{ color: '#4a4a4a', fontWeight: '700' }}
        >
          Welcome Back!
        </h2>

        {message && (
          <div
            className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} text-center`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="form-label fw-semibold"
              style={{ color: '#555' }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`form-control form-control-lg ${
                errors.email ? 'is-invalid' : ''
              }`}
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
                boxShadow: '0 0 8px rgba(102, 126, 234, 0.3)',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="form-label fw-semibold"
              style={{ color: '#555' }}
            >
              Password
            </label>
            <div className="input-group input-group-lg shadow-sm">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                  borderColor: '#ced4da',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                style={{
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                  borderLeft: 'none',
                  fontWeight: '600',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
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
            <label
              htmlFor="remember"
              className="form-check-label"
              style={{ cursor: 'pointer', color: '#555', fontWeight: '500' }}
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 shadow-sm fw-bold"
            style={{
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: '#667eea',
              borderColor: '#667eea',
              boxShadow: '0 4px 12px rgba(102,126,234,0.5)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5a67d8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#667eea')}
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center" style={{ color: '#444' }}>
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-decoration-none"
            style={{ color: '#667eea', fontWeight: '600' }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}