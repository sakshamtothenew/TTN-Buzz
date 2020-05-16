const route = require('express').Router()

const {
    getAllComplaints,
    getComplaintsById,
    getComplaintsByStatus,
    createComplaint,
    updateComplaintById
} = require('../controller/complaints.controllers')


route.get('/:id', getComplaintsById)

route.get('/:id/:status', getComplaintsByStatus)

route.post('/', createComplaint)


route.get('/', getAllComplaints)

route.put('/:id', updateComplaintById)


module.exports = route