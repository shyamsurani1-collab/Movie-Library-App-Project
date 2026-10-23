import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MovieSearch() {
  const [search, setSearch] = useState("");

  const { list } = useSelector((state) => state.movies);

  const filteredMovies = list.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">Search Movies</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Enter movie name..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="row g-4">
        {filteredMovies.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <div className="movie-card h-100">
              <img
                src={movie.poster}
                className="movie-poster"
                alt={movie.title}
              />

              <div className="p-3">
                <h5>{movie.title}</h5>
                <p>⭐ {movie.rating}</p>

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

      {filteredMovies.length === 0 && (
        <p className="text-light">No matching movies found.</p>
      )}
    </div>
  );
}