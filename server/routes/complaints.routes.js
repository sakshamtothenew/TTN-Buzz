const route = require('express').Router()

const {
    getAllComplaints,
    getComplaintsById,
    getComplaintsByStatus,
    createComplaint,
    updateComplaintById,
    getComplaintsByUserId
} = require('../controller/complaints.controllers')


route.get('/:id', getComplaintsById)

route.get('/status/:status', getComplaintsByStatus)

route.post('/', createComplaint)

route.get('/user/:id', getComplaintsByUserId)

route.get('/', getAllComplaints)

route.put('/:id', updateComplaintById)


module.exports = route