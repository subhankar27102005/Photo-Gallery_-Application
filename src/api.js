
const API_URL = "http://localhost:5000/api/photos";

// Get all photos from backend
export const getPhotos = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch photos");
        }

        return await response.json();

    } catch (error) {
        console.log("Get Photos Error:", error);
        throw error;
    }
};

// Upload photo to backend
export const uploadPhoto = async (file, title, category) => {
    try {
        const formData = new FormData();

        formData.append("image", file);
        formData.append("title", title);
        formData.append("category", category);

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Photo upload failed");
        }

        return await response.json();

    } catch (error) {
        console.log("Upload Error:", error);
        throw error;
    }
};

// Delete photo
export const deletePhoto = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Delete failed");
    }

    return await response.json();
};

// Convert backend image path into full URL
export const getImageUrl = (image) => {
    if (image?.startsWith("http")) {
        return image;
    }

    return `http://localhost:5000${image}`;
};
