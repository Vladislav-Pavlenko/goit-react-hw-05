import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const makeNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink className={makeNavLinkClass} to="/">
        Home
      </NavLink>
      <NavLink className={makeNavLinkClass} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
