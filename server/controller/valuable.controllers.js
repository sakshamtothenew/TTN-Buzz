const {
    get_all_valuables,
    get_valuables_by_id,
    add_valuables,
    update_valuables_by_id,
    delete_valuables_by_id
} = require('../services/valuables.service')

const getAllValuable = (req, res) => {

    get_all_valuables()
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

const getValuableById = (req, res) => {

    get_valuables_by_id(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

const addValuables = (req, res) => {

    add_valuables(req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

const updateValuablesById = (req, res) => {

    update_valuables_by_id(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err))

}

const deleteValuablesById = (req, res) => {

    delete_valuables_by_id(id)
        .then(result => res.send(result))
        .catch(err => res.send(err))
}


module.exports = {
    getAllValuable,
    getValuableById,
    addValuables,
    updateValuablesById,
    deleteValuablesById
}