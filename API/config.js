require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  secret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  twitter: {
    consumerApiKey: process.env.TWITTER_API_KEY,
    consumerApiSecret: process.env.TWITTER_API_SECRET,
  },
};
