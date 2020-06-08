const { Activity } = require("../model/Activity.model");
const { get_user_by_email } = require("./user.service");
const { Action } = require('../model/actions.model')
const {ObjectId}   =  require('../Utils/convertors')
const get_all_activities = () => {
  return new Promise((reject, resolve) => {

    Activity.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
    ])
      .then(async (result) => {
        for (let i in result) {
          await get_action_count(result[i]._id, result[i].userDetails._id)
            .then(actionDetails => {
              result[i].actionDetails = { ...actionDetails }
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        }
        resolve(result)
      })
      .catch(err => reject(err))
  });
};

const get_activity_by_id = (id) => {
  return new Promise((resolve, reject) => {
    Activity.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
    ])
      .then(async (result) => {
        console.log("this is from result============================")
        console.log(result)
        for (let i in result) {
          await get_action_count(result[i]._id, result[i].userDetails._id)
            .then(actionDetails => {
              result[i].actionDetails = { ...actionDetails }
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        }
        resolve(result)
      })
      .catch(err => reject(err))
  });

}
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
    original_filename,
    secure_url
  }) => {

  console.log("this is user email", email)
  return new Promise((resolve, reject) => {

    let UserId = null;

    get_user_by_email(email)
      .then((result) => {

        UserId = result._id;
        const newActivity = new Activity({
          createdBy: UserId,
          content: activity,
          image: { original_filename, secure_url }
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
  return new Promise((resolve, reject) => {
    Activity.remove()
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

const delete_actions = (user, post_id) => {
  return new Promise((resolve, reject) => {
    Action.deleteOne({ pushed_by: user, post_id: post_id })
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}
const get_action_count = async (post_id, user) => {
  return new Promise((resolve, reject) => {
    const actionDetails = {};
    Action.findOne({ post_id: post_id, pushed_by: user })
      .then(action => {
        if (!action) {
          actionDetails.value = null
        }
        else {
          actionDetails.value = action.value
          actionDetails._id = action._id
        }

        Action.count({ post_id: post_id, value: "Like" })
          .then(likeCount => {

            if (!likeCount) {
              actionDetails.likeCount = 0;
            }

            actionDetails.likeCount = likeCount

            Action.count({ post_id: post_id, value: "Dislike" })
              .then(dislikeCount => {

                if (!dislikeCount) {
                  actionDetails.dislikeCount = 0;
                }
                else { actionDetails.dislikeCount = dislikeCount }
                resolve(actionDetails)
              })
              .catch(err => reject(err))
          })
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}

const update_actions = (post_id, user, value) => {
  return new Promise((resolve, reject) => {
    Action.findOne({ post_id: post_id, pushed_by: user })
      .then(action => {
        if (!action) {

          new Action({
            pushed_by: user,
            post_id: post_id,
            value: value
          })
            .save()
            .then(result => resolve(result))
            .catch(err => reject(err))

        }
        else {

          Action.updateOne({ post_id: post_id }, { $set: { value: value } })
            .then(result => resolve(result))
            .catch(err => reject(err))

        }
      })
      .catch(err => reject(err))
  })
}
module.exports = {
  get_all_activities,
  get_all_activities_by_userid,
  get_activity_by_id,
  create_activities,
  delete_activities,
  update_activities_by_id,
  delete_all,
  update_actions,
  delete_actions
};
