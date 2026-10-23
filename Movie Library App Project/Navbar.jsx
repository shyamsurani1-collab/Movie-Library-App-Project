import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🎬 Movie Library
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          type="button"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link" to="/search">
              Search Movies
            </NavLink>

            <NavLink className="nav-link" to="/watchlist">
              Watchlist
            </NavLink>

            {isLoggedIn ? (
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            ) : (
              <Link className="btn btn-warning btn-sm" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}