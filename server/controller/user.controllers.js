const {
  add_user,
  get_all_users,
  get_user_by_id,
  update_user_by_id,
  get_user_by_dept_and_id,
  update_user_profile_data
} = require("../services/user.service");

const addUser = (req, res) => {
  add_user(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const getUserById = (req, res) => {
  get_user_by_id(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const getAllUsers = (req, res) => {
  get_all_users()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const updateUserById = (req, res) => {

  update_user_by_id(req.params.id, req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const updateUserProfileData = (req, res) => {

  const _id = req.params.id;
  update_user_profile_data(_id, req.body)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.err(500)
      res.send(err)
    })
}
const getUserByDepartmentAndName = (req, res) => {
  const department = req.query.department;
  const name = req.query.name;
  get_user_by_dept_and_id(department, name)
    .then(result => {
      console.log(result)
      res.send(result)
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send(err)
    })
}

module.exports = {
  addUser,
  getUserById,
  getAllUsers,
  updateUserById,
  getUserByDepartmentAndName,
  updateUserProfileData
};
