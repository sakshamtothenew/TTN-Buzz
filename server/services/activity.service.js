const { Activity } = require("../model/Activity.model");
const { get_user_by_email } = require("./user.service");
const { ISOdate, ObjectId } = require("../Utils/convertors");

const get_all_activities = () => {
  return new Promise((reject, resolve) => {
    Activity.find()
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const get_all_activities_by_userid = (userId) => {
  return new Promise((resolve, reject) => {
    Activity.find({ createdBy: userId })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const create_activities = (
  {
    email,
    activity,
  },
  {
    filename,
    path
  }) => {
  return new Promise((resolve, reject) => {

    console.log(email);
    let UserId = null;
    get_user_by_email(email)
      .then((result) => {

        UserId = result._id;

        const newActivity = new Activity({
          createdBy: UserId,
          content: activity,
          image: { filename, path }
        });

        newActivity
          .save()
          .then((result) => resolve(result))
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      })
      .catch((err) => reject(err));
  });
};

const update_activities_by_id = (id, updation) => {
  return new Promise((resolve, reject) => {
    Activity.updateOne({ _id: id }, { $set: { ...updation } })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const delete_activities = (id) => {
  return new Promise((resolve, reject) => {
    Activity.deleteOne({ _id: id })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};


const delete_all = () => {
   return new Promise((resolve , reject) => {
      Activity.remove()
      .then(result => resolve(result))
      .catch(err => reject(err))
   })
}
module.exports = {
  get_all_activities,
  get_all_activities_by_userid,
  create_activities,
  delete_activities,
  update_activities_by_id,
  delete_all
};
