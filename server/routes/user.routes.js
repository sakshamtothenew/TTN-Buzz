const route = require('express').Router();
const {
    addUser,
    getUserById,
    getAllUsers,
    updateUserById
} = require('../controller/user.controllers')
route.post('/', addUser)

route.get('/:id', getUserById)

route.get('/', getAllUsers)

route.put('/:id', updateUserById)

module.exports = route;