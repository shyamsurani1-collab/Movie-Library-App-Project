import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    if (!username.trim()) return;

    dispatch(login());
    navigate("/");
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Movie Library Login</h2>

        <p className="text-secondary">
          Enter your name to continue.
        </p>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter your name"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <button className="btn btn-warning w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}