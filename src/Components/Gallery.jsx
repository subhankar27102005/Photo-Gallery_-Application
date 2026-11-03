
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PhotoCard from "./PhotoCard";

import {
  uploadPhoto,
  getImageUrl,
  deletePhoto
} from "../api";

function Gallery({ photos, favorites, toggleFavorite, refreshPhotos }) {

  const { type } = useParams();

  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Nature");
  const [uploading, setUploading] = useState(false);

  // Remember deleted sample photos after page refresh
  const [deletedIds, setDeletedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("deletedPhotos")) || [];
    } catch {
      return [];
    }
  });

  const handleSearch = () => {
    setSearch(searchText.toLowerCase().trim());
  };

  // Upload photo
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      await uploadPhoto(file, file.name, category);

      await refreshPhotos();

      alert("Photo uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Photo upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Delete any photo
  const handleDelete = async (photo) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${photo.title}"?`
    );

    if (!confirmDelete) return;

    try {
      if (photo.isBackendPhoto) {
        // Delete uploaded photo from Node.js backend
        await deletePhoto(photo.id);
        await refreshPhotos();
      } else {
        // Hide sample photo and remember its ID
        const newDeletedIds = [
          ...deletedIds,
          `sample:${photo.id}`
        ];

        setDeletedIds(newDeletedIds);

        localStorage.setItem(
          "deletedPhotos",
          JSON.stringify(newDeletedIds)
        );
      }

      alert("Photo deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not delete photo.");
    }
  };

  // Prepare photos
  const allPhotos = photos
    .map((photo) => ({
      ...photo,
      url: photo.url || (
        photo.image ? getImageUrl(photo.image) : ""
      ),
      isBackendPhoto: Boolean(photo.image)
    }))
    .filter((photo) => {
      const deleteKey = photo.isBackendPhoto
        ? `backend:${photo.id}`
        : `sample:${photo.id}`;

      return !deletedIds.includes(deleteKey);
    });

  // Filter photos
  const filteredPhotos = allPhotos.filter((p) => {

    const matchCategory = type
      ? p.category?.toLowerCase() === type.toLowerCase()
      : true;

    const matchSearch =
      search === "all" ||
      (search === "favorites"
        ? favorites.some((f) => f.id === p.id)
        : (
            p.title?.toLowerCase().includes(search) ||
            p.category?.toLowerCase().includes(search)
          )
      );

    return matchCategory && matchSearch;
  });

  return (
    <main className="gallery-page">


      {/* SEARCH */}
      <section className="gallery-toolbar">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search photos..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="category-buttons">
          {[
            "All", "Nature", "City", "Animals",
            "Vehicles", "Football", "Food",
            "Travel", "Laptop", "Mountains",
            "Fashion", "Favorites"
          ].map((item) => (
            <button
              key={item}
              className={
                search === item.toLowerCase() ||
                (item === "All" && search === "")
                  ? "active-category"
                  : ""
              }
              onClick={() => {
                setSearch(item.toLowerCase());
                setSearchText("");
              }}
            >
              {item}
            </button>
          ))}
        </div>

      </section>

      {/* UPLOAD SECTION */}
      <section className="upload-panel">

        <div>
          <h3>Add a New Photograph</h3>
          <p>Choose an image and select its category.</p>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Nature">Nature</option>
          <option value="City">City</option>
          <option value="Animals">Animals</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Football">Football</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Laptop">Laptop</option>
          <option value="Mountains">Mountains</option>
          <option value="Fashion">Fashion</option>
        </select>

        <label className="upload-button">
          {uploading ? "Uploading..." : "+ Upload Photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            hidden
          />
        </label>

      </section>

      {/* PHOTO COUNT */}
      <div className="gallery-count">
        <h2>Our Collection</h2>
        <span>{filteredPhotos.length} Photos</span>
      </div>

      {/* PHOTO GRID */}
      <section className="gallery">

        {filteredPhotos.length === 0 ? (
          <div className="empty-gallery">
            <h3>No photos found</h3>
            <p>Try another category or search.</p>
          </div>
        ) : (
          filteredPhotos.map((photo) => (
            <PhotoCard
              key={`${photo.isBackendPhoto ? "backend" : "sample"}-${photo.id}`}
              photo={photo}
              allPhotos={filteredPhotos}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some(
                (f) => f.id === photo.id
              )}
              onDelete={handleDelete}
            />
          ))
        )}

      </section>

    </main>
  );
}

export default Gallery;
