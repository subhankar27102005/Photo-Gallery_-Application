
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ user, setUser, darkMode, setDarkMode }) {

  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAccountOpen(false);
    navigate("/");
  };

  const username =
    user?.name || user?.username || user?.email || "User";

  return (
    <header className="main-navbar">

      {/* BRAND */}
      <NavLink to="/" className="navbar-brand">
        <span className="brand-icon">📷</span>
        <span>Frame Gallery</span>
      </NavLink>

      {/* NAVIGATION */}
      <nav className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Favorites
        </NavLink>
      </nav>

      {/* RIGHT SIDE */}
      <div className="navbar-actions">

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title="Change theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* ACCOUNT MENU */}
        <div className="account-container">

          <button
            className="account-button"
            onClick={() => setAccountOpen(!accountOpen)}
            aria-expanded={accountOpen}
            title="My account"
          >
            <span className="account-avatar">👤</span>
            <span className="account-name">{username}</span>
            <span className="account-arrow">
              {accountOpen ? "▲" : "▼"}
            </span>
          </button>

          {accountOpen && (
            <div className="account-dropdown">

              <div className="account-details">
                <strong>{username}</strong>
                <small>Logged in</small>
              </div>

              <button
                className="dropdown-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;
