const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
const message = require("./routes/message");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", user);
app.use("/api/message", message);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`Listen on port ${app.get("port")}`);
});
