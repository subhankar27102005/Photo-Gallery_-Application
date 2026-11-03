
import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Gallery from "./Components/Gallery";
import Favorites from "./Components/Favorites";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

import photosData from "./data";
import { getPhotos } from "./api";

import "./App.css";

function App() {

  // Existing photos from data.js
  const [photos] = useState(photosData);

  // Backend photos
  const [backendPhotos, setBackendPhotos] = useState([]);

  // Favorites
  const [favorites, setFavorites] = useState([]);

  // Login user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Fetch photos from backend
  const refreshBackendPhotos = useCallback(async () => {
    try {
      const data = await getPhotos();

      setBackendPhotos(data);

      console.log("Backend photos loaded:", data);

    } catch (error) {
      console.log("Backend connection error:", error);
    }
  }, []);

  // Load backend photos when application starts
  useEffect(() => {
    refreshBackendPhotos();
  }, [refreshBackendPhotos]);

  // Combine frontend and backend photos
  const allPhotos = [...photos, ...backendPhotos];

  // Toggle favorite
  const toggleFavorite = (photo) => {

    setFavorites((previousFavorites) => {

      const alreadyFavorite = previousFavorites.some(
        (f) => f.id === photo.id
      );

      if (alreadyFavorite) {
        return previousFavorites.filter(
          (f) => f.id !== photo.id
        );
      }

      return [...previousFavorites, photo];

    });

  };

  return (

    <div className={darkMode ? "dark" : ""}>

      {user ? (

        <>

          <Navbar
            user={user}
            setUser={setUser}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <Routes>

            {/* Home page */}
            <Route
              path="/"
              element={
                <Gallery
                  photos={allPhotos}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  refreshPhotos={refreshBackendPhotos}
                />
              }
            />

            {/* Category page */}
            <Route
              path="/category/:type"
              element={
                <Gallery
                  photos={allPhotos}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  refreshPhotos={refreshBackendPhotos}
                />
              }
            />

            {/* Favorites page */}
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />

          </Routes>

        </>

      ) : (

        <Routes>

          <Route
            path="/"
            element={<Login setUser={setUser} />}
          />

          <Route
            path="/signup"
            element={<Signup setUser={setUser} />}
          />

        </Routes>

      )}

    </div>

  );

}

export default App;
