const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const { User } = require('../model/User.model')
const jwt = require('jsonwebtoken')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  }, (accessToken, refreshToken, profile, email, done) => {
    let newToken = null;
    jwt.sign({ email: email._json.email, name: email._json.name },
      process.env.JWT_SECRET,
      { expiresIn: '60s' },
      (err, token) => {
        newToken = token
      }
    )
    User.findOne({ email: email._json.email })
      .then(user => {
        if (user) {
          done(null, user)
        }
        else {
          new User({
            type: "Employee",
            email: email._json.email,
            name: email._json.name,
            token: newToken
          }).save()
            .then(newuser => {
              done(null, newuser)
            })
            .catch((err) => {
              done(err, null)
            })
        }
      })
  })
)
