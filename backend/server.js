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

/* ✅ HOME PAGE (shows data) */
app.get("/", async (req, res) => {
  try {
    const User = require("./models/User");
    const Marks = require("./models/Marks");

    const totalUsers = await User.countDocuments();
    const totalMarks = await Marks.countDocuments();

    const sampleUsers = await User.find(
      {},
      { username: 1, role: 1, _id: 0 }
    ).limit(10);

    const sampleMarks = await Marks.find(
      {},
      { student: 1, course: 1, marks: 1, _id: 0 }
    ).limit(10);

    res.json({
      status: "✅ IA-Portal Backend Running",
      database: "✅ MongoDB Connected",
      totalUsers,
      totalMarks,
      sampleUsers,
      sampleMarks,
      time: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      status: "⚠️ Backend running but error in fetching data",
      error: err.message,
    });
  }
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/marks", marksRoutes);

// ✅ Render requires dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
