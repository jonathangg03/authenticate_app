const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
const config = require("./config");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", user);

app.set("port", config.port);

app.listen(app.get("port"), () => {
  console.log(`Listen on port ${app.get("port")}`);
});
