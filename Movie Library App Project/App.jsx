
import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/authSlice.js";

import Navbar from "./components/Navbar.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieSearch from "./components/MovieSearch.jsx";
import MovieDetail from "./components/MovieDetail.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// LOGIN PAGE
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const destination =
    location.state?.from?.pathname || "/watchlist";

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    // Demo login only. Password is not saved.
    localStorage.setItem("movieUser", "true");
    localStorage.setItem("movie-email", email.trim());

    dispatch(login());

    navigate(destination, { replace: true });
  }

  return (
    <div className="container login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <p className="eyebrow">WELCOME TO MOVIE LIBRARY</p>

        <h1>Login</h1>

        <p className="muted">
          Enter your email and password to continue.
        </p>

        <label htmlFor="email" className="form-label">
          Email Address
        </label>

        <input
          id="email"
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>

        <input
          id="password"
          type="password"
          className="form-control mb-3"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          className="btn btn-warning w-100"
        >
          Login
        </button>

        <p className="muted mt-3 mb-0">
          Demo login only. Real password verification requires
          backend authentication.
        </p>
      </form>
    </div>
  );
}

// WATCHLIST PAGE
function WatchlistPage() {
  const [movies, setMovies] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("movie-watchlist") || "[]"
      );
    } catch {
      return [];
    }
  });

  function removeMovie(id) {
    const updatedMovies = movies.filter(
      (movie) => movie.id !== id
    );

    setMovies(updatedMovies);

    localStorage.setItem(
      "movie-watchlist",
      JSON.stringify(updatedMovies)
    );
  }

  return (
    <div className="container py-4">
      <div className="section-heading">
        <div>
          <p className="eyebrow mb-1">SAVED FOR LATER</p>
          <h1>My Watchlist</h1>
        </div>

        <span className="count-pill">
          {movies.length} movies
        </span>
      </div>

      {movies.length === 0 && (
        <div className="empty-state">
          <h2>Your watchlist is empty</h2>

          <p>Add movies from the home page.</p>

          <Link to="/" className="btn btn-warning">
            Browse Movies
          </Link>
        </div>
      )}

      <div className="row g-4">
        {movies.map((movie) => (
          <div
            className="col-6 col-md-4 col-lg-3"
            key={movie.id}
          >
            <article className="movie-card h-100">
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />

              <div className="p-3">
                <h3 className="movie-title">
                  {movie.title}
                </h3>

                <Link
                  to={`/movie/${movie.id}`}
                  className="btn btn-warning btn-sm w-100 mb-2"
                >
                  Movie Details
                </Link>

                <button
                  className="btn btn-outline-danger btn-sm w-100"
                  onClick={() => removeMovie(movie.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

// MAIN APP
export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("movie-email");
    navigate("/login");
  }

  return (
    <>
      <Navbar />

      {isLoggedIn && (
        <div className="container text-end pt-2">
        </div>
      )}

      <main className="page-content">
        <Routes>
          <Route
            path="/"
            element={<MovieList />}
          />

          <Route
            path="/search"
            element={<MovieSearch />}
          />

          <Route
            path="/movie/:id"
            element={<MovieDetail />}
          />

          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage />
              )
            }
          />

          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <WatchlistPage />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>

      <footer className="footer">
        © 2026 Movie Library
        <span> · </span>
        Built with React, Redux Toolkit and JSON Server
      </footer>
    </>
  );
}
