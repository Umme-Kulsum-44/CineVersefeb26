import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar ${show && 'navbar--black'}`}>
      <div className="navbar__left">
        <h1 className="navbar__logo">CineVerse</h1>
        <div className="navbar__links">
          <span>Home</span>
          <span>TV Shows</span>
          <span>Movies</span>
          <span>New & Popular</span>
          <span>My List</span>
        </div>
      </div>
      <div className="navbar__right">
        <span className="navbar__icon">🔍</span>
        <span className="navbar__icon">🔔</span>
        <div className="navbar__profile" onClick={() => setShowDropdown(!showDropdown)}>
          <img 
            className="navbar__avatar"
            src="https://i.imgur.com/6VBx3io.png"
            alt="Avatar"
          />
          {showDropdown && (
            <div className="navbar__dropdown">
              <div className="navbar__user">{user?.name}</div>
              <div className="navbar__email">{user?.email}</div>
              <button onClick={onLogout} className="navbar__logout">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
