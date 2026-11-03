import React from "react";
import PhotoCard from "./PhotoCard";

function Favorites({ favorites, toggleFavorite }) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>❤️ Favorites</h2>

      <div className="gallery">
        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          favorites.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              toggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Favorites;