const route = require('express').Router()


route.get('/:id' , getComplaintsById)

route.get('/:id/:status' , getComplaintsByStatus )

route.post('/' , createComplaint)


route.get('/' , getAllComplaints)

route.put('/:id' , updateComplaintById)


module.exports = route