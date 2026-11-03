
import React, { useState } from "react";

function PhotoCard({
  photo,
  allPhotos = [],
  toggleFavorite,
  isFavorite,
  onDelete
}) {

  const [selectedIndex, setSelectedIndex] = useState(null);

  // Open fullscreen image
  const openImage = () => {
    const index = allPhotos.findIndex(
      (p) => p.id === photo.id
    );

    setSelectedIndex(index);
  };

  // Close fullscreen
  const closeImage = () => {
    setSelectedIndex(null);
  };

  // Next image
  const nextImage = (e) => {
    e.stopPropagation();

    setSelectedIndex((prev) =>
      (prev + 1) % allPhotos.length
    );
  };

  // Previous image
  const prevImage = (e) => {
    e.stopPropagation();

    setSelectedIndex((prev) =>
      (prev - 1 + allPhotos.length) % allPhotos.length
    );
  };

  return (
    <>
      <div className="photo-card">

        <img
          src={photo.url}
          alt={photo.title}
          onClick={openImage}
          onDoubleClick={(e) => {
            e.stopPropagation();
            toggleFavorite(photo);
          }}
        />

        <h4>{photo.title}</h4>

        {/* Favorite button */}
        <button onClick={() => toggleFavorite(photo)}>
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {/* Delete button for uploaded photos */}
        {photo.isBackendPhoto && (
          <button
            className="delete-btn"
            onClick={() => onDelete(photo)}
          >
            🗑️ Delete
          </button>
        )}

      </div>

      {/* FULLSCREEN MODAL */}
      {selectedIndex !== null && allPhotos[selectedIndex] && (

        <div className="modal" onClick={closeImage}>

          <button
            className="prev"
            onClick={prevImage}
          >
            ⟨
          </button>

          <img
            src={allPhotos[selectedIndex].url}
            className="modal-img"
            alt="Full screen"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="next"
            onClick={nextImage}
          >
            ⟩
          </button>

          <button
            className="close"
            onClick={closeImage}
          >
            ✕
          </button>

        </div>

      )}

    </>
  );
}

export default PhotoCard;
