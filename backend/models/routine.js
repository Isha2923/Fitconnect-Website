const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  file: {
    type: String,
  },
  likes: { type: Number, default: 0 }, // Likes count
});

module.exports = mongoose.model("Routine", routineSchema);
