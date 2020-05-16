const route = require('express').Router()
const {
    getAllActivities,
    getAllActivitiesByUserId,
    createActivities,
    updateActivitiesById,
    deleteActivities
} = require('../controller/activity.controllers')

route.get('/', getAllActivities)

route.get('/:userid', getAllActivitiesByUserId)

route.post('/', createActivities)

route.put('/:id', updateActivitiesById)

route.delete('/:id', deleteActivities)


module.exports = route