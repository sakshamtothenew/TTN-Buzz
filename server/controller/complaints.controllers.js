const
    {
        get_complaints_by_id,
        get_complaints_by_status,
        get_all_complaints,
        get_complaints_by_user,
        update_complaint_by_id,
        create_complaint
    } = require('../services/complaint.service')
const getComplaintsById = (req, res) => {

    get_complaints_by_id(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send(err))
}


const getComplaintsByStatus = (req, res) => {

    get_complaints_by_status(req.params.status)
        .then(result => res.send(result))
        .catch(err => res.send(err))

}

const createComplaint = (req, res) => {

    create_complaint(req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err))

}

const getAllComplaints = (req, res) => {

    get_all_complaints()
        .then(result => res.send(result))
        .catch(err => res.send(err))

}

const updateComplaintById = (req, res) => {

    update_complaint_by_id(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err))

}

const getComplaintsByUserId = (req, res) => {

    get_complaints_by_user(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

module.exports = {
    getAllComplaints,
    getComplaintsById,
    getComplaintsByStatus,
    createComplaint,
    updateComplaintById,
    getComplaintsByUserId
}