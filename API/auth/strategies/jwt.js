const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Users = require("../../models/users");
require("dotenv").config();

const JWTStrategy = new Strategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (tokenPayload, done) => {
    try {
      const user = await Users.find({ email: tokenPayload.email });

      if (!user) {
        return done("Unauthorized", false);
      }

      delete user.password;

      done(null, { ...user });
    } catch (err) {
      return done(err);
    }
  }
);

passport.use("jwt-strategy", JWTStrategy);
