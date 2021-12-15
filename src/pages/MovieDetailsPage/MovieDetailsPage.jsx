import { useState, useEffect } from 'react';
import { useLocation, useParams, NavLink, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { fetchMovieById } from '../../api/api';
import { Routes, Route } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
const Cast = lazy(() => import('../Cast/Cast'));
const Rewiews = lazy(() => import('../Reviews/Reviews'));

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const location = useLocation();
  const navigation = useNavigate();

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchMovieById(moviesId).then(setMovies);
  }, [moviesId]);

  const goBack = () => {
    navigation(location?.state?.from ?? '/');
  };

  return (
    <>
      <button className={s.BtnBack} type="button" onClick={goBack}>
        Go back
      </button>
      {movies && (
        <div>
          <div className={s.Box}>
            <img src={`${IMG_URL}${movies.poster_path}`} alt="" />
            <div className={s.InfoBox}>
              <h2>
                {movies.title} ({new Date(movies.release_date).getFullYear()})
              </h2>
              <p>User score: {movies.vote_average * 10}%</p>
              <p className={s.Title}>Overview</p>
              <p>{movies.overview}</p>
              <p className={s.Title}>Genres</p>

              <p>{movies.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <p>Additional information:</p>

          <div className={s.BtnBox}>
            <NavLink
              to={`cast`}
              className={s.ActiveLink}
              style={({ isActive }) => ({
                color: isActive ? '#3f51b5' : '#fff',
                backgroundColor: isActive ? '#fff' : '#587fd4',
              })}
            >
              Cast
            </NavLink>
            <NavLink
              to={`rewiews`}
              className={s.ActiveLink}
              style={({ isActive }) => ({
                color: isActive ? '#3f51b5' : '#fff',
                backgroundColor: isActive ? '#fff' : '#587fd4',
              })}
            >
              Rewiews
            </NavLink>
          </div>
          <hr />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route path={`cast`} element={<Cast />}></Route>

              <Route path={`rewiews`} element={<Rewiews />}></Route>
            </Routes>
          </Suspense>
        </div>
      )}
    </>
  );
}
