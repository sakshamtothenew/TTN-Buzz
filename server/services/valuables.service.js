const { valuables } = require("../model/valuables.model");

const get_all_valuables = () => {
  return new Promise((resolve, reject) => {
    valuables
      .find()
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const get_valuables_by_id = (id) => {
  return new Promise((resolve, reject) => {
    valuables({ _id: id })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};


const add_valuables = ({
  type,
  createdBy,
  createdDate,
  item_description,
  note,
  category,
}) => {
  return new Promise((resolve, reject) => {
    const newValuable = new valuables({
      type,
      createdBy,
      createdDate,
      item_description,
      note,
      category,
    });

    newValuable
      .save()
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const update_valuables_by_id = (id, updation) => {
  return new Promise((resolve, rejject) => {
    valuables
      .update({ _id: id }, { $set: { ...updation } })
      .then((results) => resolve(results))
      .catch((err) => reject(err));
  });
};

const delete_valuables_by_id = (id) => {
  return new Promise((resolve, reject) => {
    valuables
      .deleteOne({ _id: id })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

module.exports = {
  get_all_valuables,
  get_valuables_by_id,
  add_valuables,
  update_valuables_by_id,
  delete_valuables_by_id,
};
