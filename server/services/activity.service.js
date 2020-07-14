const { Activity } = require("../model/Activity.model");
const { Comments } = require('../model/Comments.model')
const { get_user_by_email } = require("./user.service");
const { Action } = require('../model/actions.model')
const { ObjectId } = require('../Utils/convertors')

const get_all_activities = (pageNo) => {
  return new Promise((resolve, reject) => {
    const limit = 10;
    const skips = (pageNo - 1) * limit;
    Activity.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skips },
      { $limit: limit },
      {
        $lookup: {
          from: "comments",
          let: { postid: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$post_id", "$$postid"] } } },
          { $limit: 3 },
          {
            $lookup: {
              from: "users",
              let: { userid: "$pushed_by" },
              pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userid"] } } }],
              as: "commentUser"
            },
          },
          { $unwind: "$commentUser" }
          ],
          as: "comments"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "userDetails"
        },

      },
      { $unwind: "$userDetails" },
    ])
      .then(async (result) => {
        for (let i in result) {
          await get_action_count(result[i]._id, result[i].userDetails._id)
            .then(actionDetails => {
              result[i].actionDetails = { ...actionDetails }
            })
        }
        resolve(result)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  });
};

const get_activity_by_id = (id) => {
  return new Promise((resolve, reject) => {
    Activity.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: "comments",
          let: { postid: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$post_id", "$$postid"] } } },
          { $limit: 7 },
          {
            $lookup: {
              from: "users",
              let: { userid: "$pushed_by" },
              pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userid"] } } }],
              as: "commentUser"
            },
          },
          {
            $lookup: {
              from: "comments",
              let: { parentid: "$_id" },
              pipeline: [{ $match: { $expr: { $eq: ["$parent", "$$parentid"] } } },
              { $group: { _id: null, count: { $sum: 1 } } },
              { $project: { _id: 0, count: 1 } }],
              as: "commentRepliesCount"
            }
          },
          { $unwind: "$commentUser" }
          ],
          as: "comments"
        }
      },
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
              reject(err)
            })
        }
        resolve(result)
      })
      .catch(err => reject(err))
  });
}

const get_comments_by_postid = (postId, pageNo) => {
  return new Promise((resolve, reject) => {
    const limit = 7;
    const skips = (pageNo - 1) * limit
    Comments.aggregate([
      { $match: { post_id: ObjectId(postId) } },
      { $skip: skips },
      { $limit: limit },
      {
        $lookup: {
          from: "comments",
          let: { parent: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$parent", "$$parent"] } } },
          { $group: { _id: null, count: { $sum: 1 } } }],
          as: "commentRepliesCount"
        },
      },
      {
        $lookup: {
          from: "users",
          let: { userid: "$pushed_by" },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userid"] } } }],
          as: "commentUser"
        },
      },
      { $unwind: "$commentUser" }
    ])
      .then(result => {
        console.log("comments", result)
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const create_comment_on_post = ({ content, pushed_by, post_id, parent }) => {
  return new Promise((resolve, reject) => {

    post_id = ObjectId(post_id)
    Activity.findOneAndUpdate({ _id: post_id }, { $inc: { comments_count: 1 } })
      .then((result) => {
        const newComment = new Comments({
          content,
          pushed_by,
          post_id,
          parent
        })

        newComment
          .save()
          .then(result => {

            Comments.aggregate([
              { $match: { _id: ObjectId(result._id) } },
              {
                $lookup: {
                  from: "comments",
                  let: { parent: "$_id" },
                  pipeline: [{ $match: { $expr: { $eq: ["$parent", "$$parent"] } } },
                  { $group: { _id: null, count: { $sum: 1 } } }],
                  as: "commentRepliesCount"
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { userid: "$pushed_by" },
                  pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userid"] } } }],
                  as: "commentUser"
                },
              },
              { $unwind: "$commentUser" }
            ])
              .then(res => {
                console.log(res)
                resolve(res)
              })
              .catch(err => {
                console.log(err)
              })
          })
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })

  })
}

const get_comment_replies = (commentid) => {
  return new Promise((resolve, reject) => {
    Comments.aggregate([
      { $match: { parent: ObjectId(commentid) } },
      {
        $lookup: {
          from: "users",
          let: { userid: "$pushed_by" },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userid"] } } },
          { $project: { _id: 0, name: 1, email: 1, type: 1 } }],
          as: "replyUser"
        }
      },
      { $unwind: "$replyUser" }

    ])
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
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
            reject(err);
          });
      })
      .catch((err) => reject(err));
  });
};

const update_activities_by_id = (id, updation) => {
  const { content } = updation;
  return new Promise((resolve, reject) => {
    Activity.findOneAndUpdate({ _id: ObjectId(id) },
      { $set: { content: content } })
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
  get_comments_by_postid,
  create_comment_on_post,
  get_comment_replies,
  create_activities,
  delete_activities,
  update_activities_by_id,
  delete_all,
  update_actions,
  delete_actions
};




