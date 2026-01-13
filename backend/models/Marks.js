const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  student: String,
  course: String,
  marks: Number
});

MarksSchema.index({ student: 1, course: 1 }, { unique: true });
module.exports = mongoose.model("Marks", MarksSchema);
