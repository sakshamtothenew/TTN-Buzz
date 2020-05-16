const route = require('express').Router()


route.get('/', getallActivities)

route.get('/:userid', getallActivitiesByUserId)

route.post('/', createActivities)

route.put('/:id', updateActivitiesByID)

route.delete('/:id', deleteActivities)


module.exports = route