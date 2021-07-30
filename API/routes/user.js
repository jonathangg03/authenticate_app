const express = require("express");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("../config");
require("dotenv").config();
require("../auth/strategies/basic");

router.post("/sign-up", async (req, res) => {
  const userTaken = await Users.find({ email: req.body.email });
  if (userTaken.length > 0) {
    return res.status(500).send({ error: "Error al crear el usuario" });
  }
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const newUser = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPass,
  });

  await newUser.save();
  return res.status(201).send("Usuario creado");
});

router.get("/:token", (req, res) => {
  jwt.verify(req.params.token, config.secret, (err, decode) => {
    if (err) {
      console.error(err);
    }
    res.status(200).json({
      firstName: decode.firstName,
      lastName: decode.lastName,
      email: decode.email,
      id: decode.sub,
    });
  });
});

router.post("/sign-in", (req, res, next) => {
  passport.authenticate("basic-strategy", (error, user, info) => {
    try {
      if (error || !user) {
        const err = new Error(info);
        return next(err);
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          console.log(error);
          return next(error);
        }

        const payload = {
          sub: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({ token, user: { ...payload } });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get("/", (req, res) => {
  Users.find().then((users) => res.status(200).json(users));
});

module.exports = router;
