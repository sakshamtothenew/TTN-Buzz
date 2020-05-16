const route = require('express').Router();

route.post('/' , addUser)

route.get('/:id' , getUserById)

route.get('/' , getAllUsers)

route.put('/:id' , updateUserById)

module.exports = route;