
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    if (!username.trim()) {
      setMessage("Please enter username!");
      return;
    }

    if (email.trim().toLowerCase() !== "admin@gmail.com") {
      setMessage("Invalid email!");
      return;
    }

    if (!password.trim()) {
      setMessage("Invalid password!");
      return;
    }

    const user = {
      name: username.trim(),
      email: email.trim()
    };

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>🔐 Login</h2>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Signup</Link>
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Enter Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && (
            <p className="auth-message">{message}</p>
          )}

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  );
}

export default Login;
