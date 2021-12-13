import { useParams } from 'react-router-dom';
import { fetchMovieByReview } from '../../api/api';
import { useState, useEffect } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function Rewiews() {
  const { moviesId } = useParams();

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    fetchMovieByReview(moviesId, 'reviews').then(data => {
      if (data.length > 0) {
        setMovies(data);
        setStatus(Status.RESOLVED);
      } else {
        setStatus(Status.REJECTED);
      }
    });
  }, [moviesId]);
  return (
    <>
      {status === Status.REJECTED && (
        <p>We don't have any revievs for this movie</p>
      )}
      {status === Status.RESOLVED &&
        movies.map(movie => (
          <div key={movie.id}>
            <h2>{movie.author}</h2>
            <p>{movie.content}</p>
          </div>
        ))}
    </>
  );
}

export default Rewiews;
