import { useState } from "react";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const [movies, setMovies] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist") || "[]");
    } catch {
      return [];
    }
  });

  function removeMovie(id) {
    const updated = movies.filter((movie) => movie.id !== id);

    setMovies(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Watchlist</h2>

      {movies.length === 0 && (
        <p>Your watchlist is empty.</p>
      )}

      <div className="row g-4">
        {movies.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <div className="movie-card h-100">
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />

              <div className="p-3">
                <h5>{movie.title}</h5>

                <Link
                  to={`/movie/${movie.id}`}
                  className="btn btn-warning w-100 mb-2"
                >
                  Details
                </Link>

                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => removeMovie(movie.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
