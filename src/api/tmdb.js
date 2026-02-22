const API_KEY = 'fc7d5944bee59f738bddac46dec68f1a';
const BASE_URL = 'https://api.themoviedb.org/3';

const categories = {
  trending: `/trending/movie/week?api_key=${API_KEY}`,
  topRated: `/movie/top_rated?api_key=${API_KEY}`,
  action: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentary: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export const fetchMovies = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}${categories[category]}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null;
  }
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
