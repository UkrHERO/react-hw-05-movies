import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../../api/api';
import s from './HomePage.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    fetchMovies().then(data => {
      if (data.length > 0) {
        setMovies(data);
        setStatus(Status.RESOLVED);
      } else {
        setStatus(Status.REJECTED);
      }
    });
  }, []);

  return (
    <>
      {status === Status.RESOLVED && (
        <ul className={s.List}>
          {movies.map(movie => (
            <li key={movie.id} className={s.Item}>
              <Link to={`movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
