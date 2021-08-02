const express = require("express");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("../config");

require("../auth/strategies/basic");
require("../auth/strategies/google");
require("../auth/strategies/twiter");

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

        const token = jwt.sign(payload, config.secret, {
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

router.post("/sign-provider", async (req, res) => {
  //Aquí debemos crear o traer un usuario de la DB dependiendo sí existe o no, pero se creará con los datos de google, que definimos en la estrategia
  const user = await Users.find({
    email: req.body.email,
  });

  if (user.length > 0) {
    const payload = {
      sub: user[0]._id,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      email: user[0].email,
    };
    const token = jwt.sign(payload, config.secret, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token, user: { ...payload } });
  }

  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const newUser = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPass,
  });
  await newUser.save();

  const payload = {
    sub: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  };
  const token = jwt.sign(payload, config.secret, {
    expiresIn: "1h",
  });
  return res.status(201).json({ token, user: { ...payload } });
});

router.get(
  "/auth/google",
  passport.authenticate("google-auth", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google-auth", { session: false }),
  (req, res) => {
    res.cookie("token", req.user.token);
    res.redirect("http://localhost:3001");
  }
);

router.get("/auth/twitter", passport.authenticate("twitter-auth"));

router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter-auth", { session: false }),
  (req, res) => {
    res.cookie("token", req.user.token);
    res.redirect("http://localhost:3001");
  }
);

module.exports = router;
