const {
  get_all_valuables,
  get_valuables_by_id,
  add_valuables,
  update_valuables_by_id,
  delete_valuables_by_id,
} = require("../services/valuables.service");

const cloudinary = require('cloudinary')

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
  if (req.file) {
    cloudinary.v2.uploader.upload(req.file.path)
      .then(result => {
        req.file = result
        console.log("this is req.file", req.file)

        add_valuables(req.body, req.file)
          .then((result) => {
            console.log(result)
            res.send(result);
          })
          .catch((err) => {
            console.log(err)
            res.status(400)
            res.send(err);
          });
      })
      .catch(err => {
        console.log(err)
      });
  }
}


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
