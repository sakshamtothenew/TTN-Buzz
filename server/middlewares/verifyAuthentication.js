const verifyAuth = (req , res , next) => {
    if(req.user)
    {
        next()
    }
    else {
        res.status(401)
        res.send({message : "Unauthorised!!"})
    }
}

module.exports = verifyAuth