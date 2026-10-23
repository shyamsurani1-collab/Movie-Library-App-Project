import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice.js";

export default function MovieList() {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Movie Collection</h2>

      {loading && <p>Loading movies...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && list.length === 0 && (
        <p>No movies found.</p>
      )}

      <div className="row g-4">
        {list.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <div className="movie-card h-100">
              <img
                src={movie.poster}
                className="movie-poster"
                alt={movie.title}
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />

              <div className="p-3">
                <h5>{movie.title}</h5>
                <p>⭐ {movie.rating}</p>
                <p className="small">
                  {movie.releaseDate}
                </p>

                <Link
                  to={`/movie/${movie.id}`}
                  className="btn btn-warning w-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}