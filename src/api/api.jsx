const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'aa727a14ec53ccfa36e5d33634f18406';

let url = '';

let searchMovies = `${BASE_URL}/search/movie`;
let trendMovies = `${BASE_URL}/trending/movie/week`;

const fetchMovies = async (page = 1, query) => {
  if (query) {
    url = `${searchMovies}?api_key=${API_KEY}&query=${query}&page=${page}`;
  } else {
    url = `${trendMovies}?api_key=${API_KEY}&page=${page}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

const fetchMovieById = async id => {
  url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
  try {
    const response = await fetch(url);
    const movie = await response.json();
    url = '';
    return movie;
  } catch (error) {
    console.log(error);
  }
};

const fetchMovieByCast = async (id, category) => {
  url = `${BASE_URL}/movie/${id}/${category}?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const movie = await response.json();
    url = '';
    return movie.cast;
  } catch (error) {
    console.log(error);
  }
};

const fetchMovieByReview = async (id, category) => {
  url = `${BASE_URL}/movie/${id}/${category}?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const movie = await response.json();
    url = '';
    return movie.results;
  } catch (error) {
    console.log(error);
  }
};

export { fetchMovies, fetchMovieById, fetchMovieByReview, fetchMovieByCast };
