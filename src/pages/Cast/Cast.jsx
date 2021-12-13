import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieByCast } from '../../api/api';
import s from './Cast.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function Cast() {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState();

  useEffect(() => {
    fetchMovieByCast(moviesId, 'credits').then(setMovies);
  }, [moviesId]);

  return (
    <>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <img
                className={s.Photo}
                src={movie.profile_path && `${IMG_URL}${movie.profile_path}`}
                alt=""
              />
              <p>{movie.original_name}</p>
              <p>Character: {movie.character}</p>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Cast;
