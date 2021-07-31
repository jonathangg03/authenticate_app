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
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
