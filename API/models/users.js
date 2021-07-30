const mongoose = require("mongoose");
const config = require("../config");
const Schema = mongoose.Schema;

mongoose.connect(
  config.dbUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DB connected")
);

const userSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
