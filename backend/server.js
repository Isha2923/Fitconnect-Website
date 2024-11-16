// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// require("dotenv").config();

// const userRoutes = require("./routes/userroutes");
// const routineRoutes = require("./routes/routineroutes");

// const bodyParser = require("body-parser");

// // Connect to MongoDB
// connectDB();

// const app = express();
// app.use(express.json()); //to parse json requests

// // Middleware
// app.use(
//   cors({
//     origin: "http://127.0.0.1:5500", // Replace with your frontend URL
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Allow cookies to be sent with requests
//   })
// );
// //app.use(cors());
// // Use the routine routes
// app.use("/api", routineRoutes); // Mount the routes at `/api`

// // Routes
// app.use("/api/users", userRoutes);
// //app.use("/api/routines", routineRoutes);

// app.get("/api/routines/top", async (req, res) => {
//   try {
//     const topRoutines = await Routine.find().sort({ likes: -1 }).limit(3);
//     res.json(topRoutines);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });

// // Start server
// const PORT = 5500;
// //process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );
require("dotenv").config(); // Make sure to load dotenv at the top

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/userroutes");
const routineRoutes = require("./routes/routineroutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // Add this

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json()); // to parse json requests
app.use(cookieParser()); // Middleware to parse cookies

const jwtSecret = process.env.JWT_SECRET;

// Middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Use the routine routes
app.use("/api", routineRoutes); // Mount the routes at `/api`
app.use("/api/users", userRoutes); // User routes

app.get("/api/routines/top", async (req, res) => {
  try {
    const topRoutines = await Routine.find().sort({ likes: -1 }).limit(3);
    res.json(topRoutines);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Middleware to check authentication (optional)
// const authenticateJWT = (req, res, next) => {
//   const token = req.cookies.token; // Assuming you store the token in cookies
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403); // Forbidden
//       }
//       req.user = user; // Attach user to request
//       next();
//     });
//   } else {
//     res.sendStatus(401); // Unauthorized
//   }
// };

// Start server
const PORT = 5500;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
