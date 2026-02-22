import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Row from './components/Row';
import Auth from './components/Auth';
import { fetchMovies } from './api/tmdb';
import './App.css';

function App() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      fetchMovies('trending').then(data => {
        if (data?.results?.length > 0) {
          setFeaturedMovie(data.results[0]);
        }
      });
    }
  }, [user]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (isLoading) {
    return <div className="app">Loading...</div>;
  }

  if (!user) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />
      {featuredMovie && <Banner movie={featuredMovie} />}
      <Row title="Trending Now" category="trending" />
      <Row title="Top Rated" category="topRated" />
      <Row title="Action Movies" category="action" />
      <Row title="Comedy Movies" category="comedy" />
      <Row title="Horror Movies" category="horror" />
      <Row title="Romance Movies" category="romance" />
      <Row title="Documentaries" category="documentary" />
    </div>
  );
}

export default App;
