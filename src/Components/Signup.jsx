
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: username,
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed!");
        return;
      }

      setMessage("Account created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      setMessage("Backend connection failed!");
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>📝 Signup</h2>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>

        <form onSubmit={handleSignup}>

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
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          {message && (
            <p className="auth-message">{message}</p>
          )}

          <button type="submit">
            Create Account
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup;
