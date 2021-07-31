require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  secret: process.env.JWT_SECRET,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
