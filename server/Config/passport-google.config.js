const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const { CLIENT_ID, CLIENT_SECRET } = require('./google_keys')
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
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    }, (accessToken, refreshToken, profile, email, done) => {
        console.log("yaha pe code aya")
        let newToken = null;
        jwt.sign({ email: email._json.email, name: email._json.name },
            'secretkey',
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
