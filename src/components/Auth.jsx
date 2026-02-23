import React, { useState } from 'react';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://cineverse-backend-1efh.onrender.com';

console.log('API_URL:', API_URL);
console.log('Environment:', import.meta.env);

function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    password: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting to register at:', `${API_URL}/api/register`);
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      alert('Registration successful! Please login.');
      setIsLogin(true);
      setFormData({ ...formData, name: '', email: '', phone: '' });
    } catch (err) {
      console.error('Registration error:', err);
      if (err.message === 'Failed to fetch') {
        setError(`Cannot connect to backend at ${API_URL}. Backend status: Check if server is running.`);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting to login at:', `${API_URL}/api/login`);
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.userId,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err) {
      console.error('Login error:', err);
      if (err.message === 'Failed to fetch') {
        setError(`Cannot connect to backend at ${API_URL}. Backend status: Check if server is running.`);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__background">
        <div className="auth__gradient" />
      </div>
      
      <div className="auth__container">
        <div className="auth__box">
          <div className="auth__logo">CineVerse</div>
          
          <h2 className="auth__title">{isLogin ? 'LOGIN' : 'Sign up'}</h2>
          
          {error && <div className="auth__error">{error}</div>}
          
          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            <input
              type="text"
              name="userId"
              placeholder={isLogin ? "Username or Email" : "User ID"}
              value={formData.userId}
              onChange={handleChange}
              required
              className="auth__input"
            />
            
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="auth__input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="auth__input"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="auth__input"
                />
              </>
            )}
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth__input"
            />
            
            <button 
              type="submit" 
              className="auth__button"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isLogin ? 'SIGN IN' : 'Create an Account')}
            </button>
          </form>
          
          <div className="auth__toggle">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}>
              {isLogin ? 'Sign up' : 'Login'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
