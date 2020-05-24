const { User } = require("../model/User.model");

const add_user = ({ type, email, name, department, employee_id }) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      type,
      email,
      name,
      department,
      employee_id,
    });

    newUser
      .save()
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const get_user_by_id = (id) => {
  return new Promise((resolve, reject) => {
    User.find({ _id: id })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const get_all_users = () => {
  return new Promise((resolve, reject) => {
    User.find()
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const update_user_by_id = (id) => {
  return new Promise((resolve, reject) => {
    User.update({ _id: id }, { $set: { ...updation } })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const get_user_by_email = (email) => {
  return new Promise((resolve , reject) => {

    User.findOne({email : email})
    .then(result => resolve(result))
    .catch(err => reject(err))
  })

}

module.exports = {
  add_user,
  get_all_users,
  get_user_by_id,
  get_user_by_email,
  update_user_by_id,
};
