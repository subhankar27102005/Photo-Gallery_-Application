
const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// =====================================
// UPLOAD FOLDER
// =====================================

const uploadFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// =====================================
// PHOTO JSON DATABASE
// =====================================

const dbFile = path.join(__dirname, "photos.json");

if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, "[]");
}

const getPhotos = () => {
    return JSON.parse(fs.readFileSync(dbFile, "utf8"));
};

const savePhotos = (photos) => {
    fs.writeFileSync(dbFile, JSON.stringify(photos, null, 2));
};

// =====================================
// USER JSON DATABASE
// =====================================

const usersFile = path.join(__dirname, "users.json");

if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, "[]");
}

const getUsers = () => {
    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// =====================================
// REGISTER NEW ACCOUNT
// =====================================

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return res.status(400).json({
                message: "Enter a valid email address"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters"
            });
        }

        const users = getUsers();

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = users.find(
            user => user.email === normalizedEmail
        );

        if (existingUser) {
            return res.status(409).json({
                message: "This email is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now().toString(),
            name: name.trim(),
            email: normalizedEmail,
            passwordHash: hashedPassword
        };

        users.push(newUser);
        saveUsers(users);

        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
});

// =====================================
// LOGIN ACCOUNT
// =====================================

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const users = getUsers();

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = users.find(
            user => user.email === normalizedEmail
        );

        if (!existingUser) {
            return res.status(401).json({
                message: "Account not found. Please create an account."
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed"
        });
    }
});

// =====================================
// DISPLAY UPLOADED IMAGES
// =====================================

app.use("/uploads", express.static(uploadFolder));

// =====================================
// MULTER CONFIGURATION
// =====================================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },

    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

// =====================================
// HOME ROUTE
// =====================================

app.get("/", (req, res) => {
    res.send("Photo Gallery Backend is Working!");
});

// =====================================
// GET ALL PHOTOS
// =====================================

app.get("/api/photos", (req, res) => {
    res.json(getPhotos());
});

// =====================================
// UPLOAD PHOTO
// =====================================

app.post("/api/photos", upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please select an image"
            });
        }

        const photos = getPhotos();

        const newPhoto = {
            id: Date.now().toString(),
            title: req.body.title || "Untitled",
            category: req.body.category || "Nature",
            image: "/uploads/" + req.file.filename
        };

        photos.push(newPhoto);
        savePhotos(photos);

        res.status(201).json({
            message: "Photo uploaded successfully",
            photo: newPhoto
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// =====================================
// DELETE PHOTO
// =====================================

app.delete("/api/photos/:id", (req, res) => {
    const photos = getPhotos();

    const photo = photos.find(
        p => p.id === req.params.id
    );

    if (!photo) {
        return res.status(404).json({
            message: "Photo not found"
        });
    }

    const updatedPhotos = photos.filter(
        p => p.id !== req.params.id
    );

    savePhotos(updatedPhotos);

    const filename = path.basename(photo.image);
    const imagePath = path.join(uploadFolder, filename);

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    res.json({
        message: "Photo deleted successfully"
    });
});

// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {
    console.log(
        `Backend running at http://localhost:${PORT}`
    );
});
