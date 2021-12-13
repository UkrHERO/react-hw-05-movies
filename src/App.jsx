import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Container from './components/Container/Container';
import Navigation from './components/Navigation/Navigation';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage'),
);
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

export default function App() {
  return (
    <Container>
      <Navigation />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="movies" element={<MoviesPage />}></Route>
          <Route
            path="movies/:moviesId/*"
            element={<MovieDetailsPage />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </Container>
  );
}
