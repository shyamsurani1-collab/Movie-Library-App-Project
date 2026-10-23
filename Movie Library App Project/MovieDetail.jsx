import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById } from "../redux/movieSlice.js";

export default function MovieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedMovie, loading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-4">Loading movie details...</p>;

  if (error) return <p className="alert alert-danger">{error}</p>;

  if (!selectedMovie) return null;

  const movie = selectedMovie;

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-outline-light mb-4">
        ← Back to Movies
      </Link>

      <div className="row g-4">
        <div className="col-md-4">
          <img
            src={movie.poster}
            alt={movie.title}
            className="detail-poster"
          />
        </div>

        <div className="col-md-8">
          <h1>{movie.title}</h1>

          <h5 className="text-warning">
            ⭐ {movie.rating} / 10
          </h5>

          <p>
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>

          <p>
            <strong>Languages:</strong>{" "}
            {movie.languages?.join(", ")}
          </p>

          <h4 className="mt-4">Description</h4>
          <p className="overview">{movie.description}</p>
        </div>
      </div>
    </div>
  );
}   