console.log("SERVER FILE EXECUTED");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const marksRoutes = require("./routes/marks");

const app = express();

app.use(
  cors({
    origin: ["https://ia-portal-oobw.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// ✅ Use ENV variable for DB (Render/Cloud)
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Recommended: add /api prefix for production
app.use("/api/auth", authRoutes);
app.use("/api/marks", marksRoutes);

// ✅ Render requires dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
