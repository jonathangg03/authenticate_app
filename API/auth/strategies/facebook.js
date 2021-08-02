const passport = require("passport");
const { Strategy } = require("passport-facebook");
const axios = require("axios");
const { facebook } = require("../../../config");

const FacebookStrategy = new Strategy(
  {
    clientID: facebook.clientAppId,
    clientSecret: facebook.clientAppSecret,
    // callbackURL: "https://twitter.com/jonathangg_03",
    callbackURL:
      "https://authenticate-app-j.herokuapp.com/api/user/auth/facebook/callback",
    profileFields: ["id", "email", "displayName"],
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      const email = profile.email
        ? profile.email
        : `${profile.id}@facebook.com`;
      const response = await axios({
        url: "https://authenticate-app-j.herokuapp.com/api/user/sign-provider",
        method: "post",
        data: {
          name: profile.name,
          email: email,
          password: profile.id,
        },
      });

      if (!response.data) {
        return done(null, false, { message: "Problem with loggin" });
      }

      return done(null, response.data);
    } catch (error) {
      done(error);
    }
  }
);

passport.use("facebook-auth", FacebookStrategy);
