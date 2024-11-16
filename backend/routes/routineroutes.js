const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Routine = require("../models/Routine"); // Assuming you have a Routine model
const router = express.Router();

// Define the path to the uploads directory
const uploadDirectory = path.join(__dirname, "../uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  // filename: (req, file, cb) => {
  //   cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  // },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize upload middleware
const upload = multer({ storage });

router.post("/routines/create", upload.single("file"), async (req, res) => {
  const { username, title, description, difficulty, duration } = req.body;
  const file = req.file ? req.file.path : null;
  console.log(file);

  try {
    const newRoutine = new Routine({
      username,
      title,
      description,
      difficulty,
      duration,
      file, // Save the file path
    });

    await newRoutine.save();
    res.status(201).json({ message: "Routine created successfully!" });
  } catch (error) {
    console.error("Error creating routine:", error);
    res
      .status(500)
      .json({ message: "Error creating routine!", error: error.message });
  }
});

// Route to get all routines
router.get("/routines", async (req, res) => {
  try {
    const routines = await Routine.find();
    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routines", error });
  }
});

// Route to like a routine
router.post("/routines/:id/like", async (req, res) => {
  const { id } = req.params;

  try {
    const routine = await Routine.findById(id);
    if (!routine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    routine.likes = (routine.likes || 0) + 1;
    await routine.save();

    res.json(routine);
  } catch (error) {
    res.status(500).json({ message: "Error liking routine", error });
  }
});

router.get("/routines/top", async (req, res) => {
  try {
    const topRoutines = await Routine.find().sort({ likes: -1 }).limit(3);
    res.json(topRoutines);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
