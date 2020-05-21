const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect(
  "mongodb://localhost:27017/TTN-Buzz",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongo connection created ..");
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", require("./routes/user.routes"));
app.use("/activities", require("./routes/activity.routes"));
app.use("/complaints", require("./routes/complaints.routes"));
app.use("/valuables", require("./routes/valuable.routes"));

app.listen(5000, () => {
  console.log("app is listening at port 5000...");
});
