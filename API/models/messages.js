const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DB connected")
);

const userSchema = new Schema({
  content: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("message", userSchema);
