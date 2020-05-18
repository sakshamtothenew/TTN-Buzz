const { Activity } = require('../model/Activity.model')
const { ISOdate, ObjectId } = require('../Utils/convertors')


const get_all_activities = () => {

    return new Promise((reject, resolve) => {

        Activity.find()
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

const get_all_activities_by_userid = (userId) => {

    return new Promise((resolve, reject) => {

        Activity.find({ createdBy: userId })
            .then(result => resolve(result))
            .catch(err => reject(err))
    })

}

const create_activities = ({
    createdBy,
    title,
    content,
    imageUrl,
    lastUpdated
}) => {
    return new Promise((resolve, reject) => {


        const createdBy_objectId = ObjectId(createdBy)
        const lastUpdated_toDate = ISOdate(lastUpdated);


        const newActivity = new Activity({
            createdBy: createdBy_objectId,
            title: title,
            content: content,
            imageUrl: imageUrl,
            lastUpdated: lastUpdated_toDate
        })

        newActivity.save()
            .then(result => resolve(result))
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}


const update_activities_by_id = (id, updation) => {
    return new Promise((resolve, reject) => {

        Activity.updateOne({ _id: id },
            { $set: { ...updation } })
            .then(result => resolve(result))
            .catch(err => reject(err))
    })

}

const delete_activities = (id) => {
    return new Promise((resolve, reject) => {

        Activity.deleteOne({ _id: id })
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}


module.exports = {
    get_all_activities,
    get_all_activities_by_userid,
    create_activities,
    delete_activities,
    update_activities_by_id
}