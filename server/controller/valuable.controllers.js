const {
  get_all_valuables,
  get_valuables_by_id,
  add_valuables,
  update_valuables_by_id,
  delete_valuables_by_id,
} = require("../services/valuables.service");

const getAllValuable = (req, res) => {
  get_all_valuables()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const getValuableById = (req, res) => {
  get_valuables_by_id(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const addValuables = (req, res) => {
console.log(req.body)

  add_valuables(req.body , req.file)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
      res.status(400)
      res.send(err);
    });
};

const updateValuablesById = (req, res) => {
  update_valuables_by_id(req.params.id, req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const deleteValuablesById = (req, res) => {
  delete_valuables_by_id(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

module.exports = {
  getAllValuable,
  getValuableById,
  addValuables,
  updateValuablesById,
  deleteValuablesById,
};
