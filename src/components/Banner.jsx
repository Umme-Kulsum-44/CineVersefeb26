import React from 'react';
import { IMAGE_BASE_URL } from '../api/tmdb';
import './Banner.css';

function Banner({ movie }) {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}${movie?.backdrop_path})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">▶ Play</button>
          <button className="banner__button">ℹ More Info</button>
        </div>
        <p className="banner__description">
          {truncate(movie?.overview, 150)}
        </p>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
