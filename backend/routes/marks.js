const express = require("express");
const router = express.Router();
const Marks = require("../models/Marks");

// ADD MARKS (FACULTY)
router.post("/add", async (req, res) => {
  try {
    const { student, course, marks } = req.body;

    await Marks.findOneAndUpdate(
      { student, course },     // find existing record
      { marks },               // update marks
      { upsert: true, new: true }
    );

    res.json({ message: "Marks saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save marks" });
  }
});

// GET MARKS FOR A STUDENT
router.get("/student/:student", async (req, res) => {
  const marks = await Marks.find({ student: req.params.student });
  res.json(marks);
});

// GET COURSE STATISTICS
router.get("/stats/:course", async (req, res) => {
  const data = await Marks.find({ course: req.params.course });

  let total = 0;
  let grades = { S: 0, A: 0, B: 0, C: 0, D: 0, F: 0 };

  data.forEach(m => {
    total += m.marks;
    if (m.marks >= 90) grades.S++;
    else if (m.marks >= 80) grades.A++;
    else if (m.marks >= 70) grades.B++;
    else if (m.marks >= 60) grades.C++;
    else if (m.marks >= 50) grades.D++;
    else grades.F++;
  });

  res.json({
    average: data.length ? total / data.length : 0,
    grades
  });
});

module.exports = router;
