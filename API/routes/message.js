const express = require("express");
const Message = require("../models/messages");
const passport = require("passport");
const router = express.Router();

require("../auth/strategies/jwt");

router.post(
  "/",
  passport.authenticate("jwt-strategy", { session: false }),
  async (req, res) => {
    const newMessage = new Message({
      content: req.body.content,
    });
    await newMessage.save();
    res.status(201).send("Mensaje enviado");
  }
);

router.get(
  "/",
  passport.authenticate("jwt-strategy", { session: false }),
  async (req, res) => {
    const message = await Message.find();
    res.status(200).json(message);
  }
);

module.exports = router;
