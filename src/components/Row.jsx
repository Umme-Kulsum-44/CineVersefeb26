import React, { useEffect, useState } from 'react';
import { fetchMovies, IMAGE_BASE_URL } from '../api/tmdb';
import MovieModal from './MovieModal';
import './Row.css';

function Row({ title, category }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies(category).then(data => {
      if (data?.results) {
        setMovies(data.results);
      }
    });
  }, [category]);

  return (
    <>
      <div className="row">
        <h2 className="row__title">{title}</h2>
        <div className="row__posters">
          {movies.map(movie => (
            <img
              key={movie.id}
              className="row__poster"
              src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title || movie.name}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      </div>
      
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </>
  );
}

export default Row;
