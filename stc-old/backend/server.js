const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
<<<<<<< HEAD
const path = require("path");
=======
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34

dotenv.config();
connectDB();

const app = express();

<<<<<<< HEAD
/* ================= MIDDLEWARES ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
=======
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
    credentials: true,
  })
);

app.use(express.json());

<<<<<<< HEAD
/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/applications", require("./routes/applications"));

/* ================= SERVE UPLOADS ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROOT ================= */
=======
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));

>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
app.get("/", (req, res) => {
  res.send("STC Portal Backend Running 🚀");
});

<<<<<<< HEAD
/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);


=======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
