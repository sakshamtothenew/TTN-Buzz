const { User } = require("../model/User.model");
const { ObjectId } = require('../Utils/convertors')

const add_user = ({ type, email, name }) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      type,
      email,
      name,
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

const update_user_profile_data = (_id, updation) => {

  return new Promise((resolve, reject) => {

    User.findOneAndUpdate({ _id: ObjectId(_id) },
      { $set: updation }
    )
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })

  })
}

const update_user_by_id = (id, updation) => {
  console.log(updation)
  const { _id, department, Role } = updation;
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: ObjectId(_id) },
      {
        $set:
        {
          type: Role,
          department: department,
        }
      })
      .then(result => resolve(result))
      .catch(err => reject(err))

  })

};

const get_user_by_dept_and_id = (department, name) => {
  return new Promise((resolve, reject) => {
    const regExp = new RegExp(name, 'i');
    console.log(regExp)
    User.find({ department: department, name: regExp })
      .then(result => {
        console.log(result)
        resolve(result)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })

}

const get_user_by_email = (email) => {
  return new Promise((resolve, reject) => {

    User.findOne({ email: email })
      .then(result => resolve(result))
      .catch(err => reject(err))
  })

}

module.exports = {
  add_user,
  get_all_users,
  get_user_by_id,
  get_user_by_email,
  get_user_by_dept_and_id,
  update_user_by_id,
  update_user_profile_data
};
