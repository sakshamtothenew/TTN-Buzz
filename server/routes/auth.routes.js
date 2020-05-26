const route = require('express').Router();
const passport = require('passport')



route.get('/google' , passport.authenticate('google' ,
 {scope : ['email' , 'profile']}))



route.get('/google/callback' , passport.authenticate('google') ,(req , res) => {

    res.redirect('http://localhost:3000/home')
})


route.get('/getuser' , (req , res) => {
    console.log(req.user)
     res.send(req.user);
})

route.get('/logout' , (req , res) => {
    req.logout();
    res.redirect('http://localhost:3000/')
})
module.exports = route 