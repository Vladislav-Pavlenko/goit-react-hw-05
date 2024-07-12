import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchFilmsByNavigationId } from "../../tmdb-api";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
const ErrorMessage = lazy(() =>
  import("../../components/ErrorMessage/ErrorMessage")
);
const Loader = lazy(() => import("../../components/Loader/Loader"));
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [film, setFilm] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState("");
  const filmId = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function getImages() {
      try {
        setLoader(true);
        setError(false);
        const promise = await fetchFilmsByNavigationId(filmId);
        setFilm(promise);
        setGenres(
          promise.genres.map((item) => {
            return item.name + " ";
          })
        );
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getImages();
  }, [filmId]);

  return (
    <main>
      <Suspense fallback={<div>Loading page code...</div>}>
        {loader && <Loader />}
        {error && <ErrorMessage />}
      </Suspense>
      <Link className={css.go_back_btn} to={backLinkRef.current}>
        Go back
      </Link>
      <section className={css.details}>
        <img
          className={css.img}
          src={"https://image.tmdb.org/t/p/w500/" + film.poster_path}
          alt={film.title}
        />
        <div className={css.info_container}>
          <h1>{film.title}</h1>
          <p>User score: {film.vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{film.overview}</p>
          <h3>Genres</h3>
          <p>{genres}</p>
        </div>
      </section>
      <section className={css.aditional_info}>
        <h2 className={css.aditional_title}>Aditional information</h2>
        <ul className={css.aditional_list}>
          <li className={css.aditional_item}>
            <Link className={css.aditional_link} to="cast">
              Cast
            </Link>
          </li>
          <li className={css.aditional_item}>
            <Link className={css.aditional_link} to="reviews">
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading page code...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
}
