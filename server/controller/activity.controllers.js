const {
    get_all_activities,
    get_all_activities_by_userid,
    create_activities,
    delete_activities,
    update_activities_by_id
} = require('../services/activity.service')


const getAllActivities = (req, res) => {

    get_all_activities()
        .then(result => res.send(result))
        .catch(err => res.send(err))

}

const getAllActivitiesByUserId = (req, res) => {

    get_all_activities_by_userid(req.params.userid)
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

const createActivities = (req, res) => {
    create_activities(req.body)
        .then(result => {
            console.log(result);
            res.send(result)})
        .catch(err => {
            console.log(err);
            res.send(err)})
}

const updateActivitiesById = (req, res) => {

    update_activities_by_id(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err))

}

const deleteActivities = (req, res) => {
    delete_activities(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send(err))
}


module.exports = {
    getAllActivities,
    getAllActivitiesByUserId,
    createActivities,
    updateActivitiesById,
    deleteActivities
}