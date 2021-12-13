import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <NavLink
      to="/"
      className={s.Link}
      style={({ isActive }) => ({
        color: isActive ? '#fff' : '#3f51b5',
        backgroundColor: isActive ? '#587fd4' : '#fff',
      })}
    >
      HOME
    </NavLink>

    <NavLink
      to="/movies"
      className={s.Link}
      style={({ isActive }) => ({
        color: isActive ? '#fff' : '#3f51b5',
        backgroundColor: isActive ? '#587fd4' : '#fff',
      })}
    >
      MOVIES
    </NavLink>
  </nav>
);

export default Navigation;
