import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMovies } from '../../api/api';
import s from './MoviesPage.module.css';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  const location = useLocation();

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    query && fetchMovies(1, query).then(setMovies);
    setQuery('');
  };

  return (
    <>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button className={s.SearchFormButton} type="submit"></button>

        <input
          className={s.SearchFormInput}
          value={query}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
      </form>
      {movies && (
        <ul className={s.List}>
          {movies.map(movie => (
            <li key={movie.id} className={s.Item}>
              <Link
                to={{
                  pathname: `${movie.id}`,
                  state: location,
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

MoviesPage.propTypes = {
  onSubmit: PropTypes.func,
};

export default MoviesPage;
