const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const adminAuthRoutes = require("./routes/adminAuth");

dotenv.config();
connectDB();

const app = express();

/* ================= MIDDLEWARES ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ FIX: increase payload size (VERY IMPORTANT)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", adminAuthRoutes);
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/users", require("./routes/users"));

/* ================= SERVE UPLOADS ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.send("STC Portal Backend Running 🚀");
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);
