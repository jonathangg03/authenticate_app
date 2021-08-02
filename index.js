const express = require("express");
const cors = require("cors");
const user = require("./API/routes/user");
const config = require("./config");
const session = require("express-session");
const passport = require("passport");
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", user);

app.set("port", config.port);

app.listen(app.get("port"), () => {
  console.log(`Listen on port ${app.get("port")}`);
});
