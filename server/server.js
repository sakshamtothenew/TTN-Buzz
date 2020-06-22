
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./Config/passport-google.config')

const app = express();

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongo connection created ..");
  }
);

require('./Config/CloudinaryConfig')
app.use(
  cookieSession({
    maxAge: process.env.COOKIE_MAX_AGE,
    keys: [process.env.COOKIE_SECRET]
  })
)

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session())

app.use("/user", require("./routes/user.routes"));
app.use("/activities", require("./routes/activity.routes"));
app.use("/complaints", require("./routes/complaints.routes"));
app.use("/valuables", require("./routes/valuable.routes"));
app.use('/auth', require('./routes/auth.routes'))


app.listen(process.env.PORT || 5000, () => {
  console.log("app is listening at port", process.env.PORT);
});
