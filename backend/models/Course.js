const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  duration: String,
  fee: String,
  image: String,
  description: String,
  code: String,
});

<<<<<<< HEAD
module.exports = mongoose.model("Course", courseSchema);
=======
module.exports = mongoose.model("Course", courseSchema);
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
