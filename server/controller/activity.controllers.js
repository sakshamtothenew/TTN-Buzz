const {
  get_all_activities,
  get_all_activities_by_userid,
  get_activity_by_id,
  get_comments_by_postid,
  create_comment_on_post,
  create_activities,
  delete_activities,
  update_activities_by_id,
  delete_all,
  update_actions,
  delete_actions
} = require("../services/activity.service");

const cloudinary = require('cloudinary');

const getAllActivities = (req, res) => {
  get_all_activities()
    .then((result) =>{
      console.log(result)
    res.send(result)})
    .catch((err) => {
      console.log(err)
      res.send(err)});
};

const getAllActivitiesByUserId = (req, res) => {
  get_all_activities_by_userid(req.params.userid)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const getActivityById = (req, res) => {
  get_activity_by_id(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.send(err))
}
const createActivities = async (req, res) => {

  if (req.file) {
    req.file = await cloudinary.v2.uploader.upload(req.file.path)
  }
  else {
    req.file = { filename: null, secure_url: null }
  }

  create_activities(req.body, req.file)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400)
      res.send(err);
    });
};


const createComment = (req, res) => {
  console.log(req.body)
  create_comment_on_post(req.body)

    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400)
      res.send(err)
    })
}

const getComment = (req, res) => {
  const post_id = req.params.postId;
  get_comments_by_postid(post_id)
    .then(result => res.send(result))
    .catch(err => {
      res.status(400)
      res.send(err)
    })
}

const updateActivitiesById = (req, res) => {
  update_activities_by_id(req.params.id, req.body)
    .then((result) => res.send(result))
    .catch((err) => {
      res.status(500)
      res.send(err)
    });
};

const deleteActivities = (req, res) => {
  delete_activities(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const deleteAll = (req, res) => {

  delete_all()
    .then(result => res.send(result))
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}

const updateActions = (req, res) => {

  const post_id = req.body.post_id;
  const user = req.body.user;
  const value = req.body.value;
  update_actions(post_id, user, value)
    .then(result => res.send(result))
    .catch(err => {
      res.status(500)
      res.send(err);
    })

}

const deleteAction = (req, res) => {
  const user = req.params.user;
  const post = req.params.post
  delete_actions(user, post)
    .then(response => res.send(response))
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}
module.exports = {
  getAllActivities,
  getActivityById,
  getAllActivitiesByUserId,
  createActivities,
  getComment,
  createComment,
  updateActivitiesById,
  deleteActivities,
  deleteAll,
  updateActions,
  deleteAction
};
