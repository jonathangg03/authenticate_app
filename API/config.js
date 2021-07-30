require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  secret: process.env.JWT_SECRET,
};
