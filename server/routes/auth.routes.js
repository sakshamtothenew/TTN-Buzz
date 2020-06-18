const route = require('express').Router();
const passport = require('passport')



route.get('/google', passport.authenticate('google',
    { scope: ['email', 'profile'] }))



route.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect(process.env.CLIENT_URL + 'auth/setUser')
})


route.get('/getuser', (req, res) => {
    res.send(req.user);
})

route.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL)
})
module.exports = route 
  