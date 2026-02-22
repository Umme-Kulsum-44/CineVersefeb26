import React from 'react';
import { IMAGE_BASE_URL } from '../api/tmdb';
import './MovieModal.css';

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>
        
        <div className="modal__banner">
          <img 
            src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title || movie.name}
          />
          <div className="modal__banner__gradient" />
          <div className="modal__banner__info">
            <h2>{movie.title || movie.name || movie.original_name}</h2>
            <div className="modal__buttons">
              <button className="modal__button modal__button--play">▶ Play</button>
              <button className="modal__button modal__button--add">+ My List</button>
            </div>
          </div>
        </div>

        <div className="modal__details">
          <div className="modal__stats">
            <span className="modal__rating">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span className="modal__year">{movie.release_date?.split('-')[0]}</span>
            <span className="modal__language">{movie.original_language?.toUpperCase()}</span>
          </div>
          
          <p className="modal__overview">{movie.overview}</p>
          
          <div className="modal__info">
            <p><strong>Popularity:</strong> {movie.popularity?.toFixed(0)}</p>
            <p><strong>Vote Count:</strong> {movie.vote_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
