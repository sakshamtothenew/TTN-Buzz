import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from "../../../../UI/Wrapper/Wrapper";
import classes from "./activity.module.css";
import { withRouter } from "react-router-dom";
import * as actions from '../../../../../../store/actions/index.actions'


const Activities = (props) => {

  const dispatch = useDispatch();

  const getActivities = () => dispatch(actions.get_activities());
  const makeChanges = (method, state, requestBody) => dispatch(actions.make_actions(method, state, requestBody))

  const user = useSelector(state => state.user.user)
  const toasts = useSelector(state => state.toasts)
  const activities = useSelector(state => state.activities)

  if (toasts) {
    console.log("toast called")
    toast.error(`error occured`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  }

  console.log(user)

  useEffect(() => {

    getActivities();

  }, [])

  const onlikehandler = (action, post_id) => {
    const requestBody = {
      value: action,
      user: user._id,
      post_id: post_id
    }
    let actionid = null;
    let activity = { ...activities };
    let state = { ...activity[post_id] }
    let method = null;
    if (action == "Like") {
      if (state.actionDetails.value === "Like") {
        state = Unlike(state);
        method = "DELETE"
        actionid = state.actionDetails._id
      }
      else {
        if (state.actionDetails.value === "Dislike") {
          state = changeDislikedToLiked(state)
          method = "PUT"
        }
        else {
          state = justLike(state)
          method = "PUT"
        }
      }
    }
    else {
      if (state.actionDetails.value === "Dislike") {
        state = undoDislike(state)
        method = "DELETE"
        actionid = state.actionDetails._id
      }
      else {
        if (state.actionDetails.value === "Like") {
          state = changeLikedToDisliked(state)
          method = "PUT"
        }
        else {
          state = justDislike(state)
          method = "PUT"
        }
      }
    }
    activity[post_id] = state;
    console.log(state)



    makeChanges(method, activity, requestBody)

  }


  const Unlike = (state) => {
    console.log(state.actionDetails)
    state.actionDetails.likeCount -= 1;
    state.actionDetails.value = null
    return state
  }

  const changeDislikedToLiked = (state) => {
    state.actionDetails.likeCount += 1;
    state.actionDetails.value = "Like";
    state.actionDetails.dislikeCount -= 1;
    return state
  }

  const justLike = (state) => {
    state.actionDetails.likeCount += 1;
    state.actionDetails.value = "Like"
    return state
  }

  const undoDislike = (state) => {
    state.actionDetails.dislikeCount -= 1;
    state.actionDetails.value = null
    return state
  }

  const changeLikedToDisliked = (state) => {
    state.actionDetails.likeCount -= 1;
    state.actionDetails.value = "Dislike"
    state.actionDetails.dislikeCount += 1;
    return state
  }

  const justDislike = (state) => {
    state.actionDetails.dislikeCount += 1;
    state.actionDetails.value = "Dislike"
    return state
  }

  const allActivities = [];

  Object.keys(activities).forEach((eactActivity) => {

    let imagepath = activities[eactActivity].image.path;

    const path = imagepath.split('/');
    imagepath = ["", path[path.length - 2], path[path.length - 1]].join('/')


    allActivities.push(<div className={classes.container}>
      <div className={classes.date}>
        <p><span className={classes.dt}>15</span>
          <span className={classes.slash}>/ </span>20</p>

      </div>
      <div className={classes.content}>

        <div className={classes.imagediv}>
          <img src={process.env.PUBLIC_URL + imagepath} alt="img" />
        </div>
        <div className={classes.userInfo}>
          <p className={classes.username}>saksham123
          <span className={classes.email}>saksham5ssachdeva</span>
            <span className={classes.time}>2h</span>
          </p>

        </div>
        <div className={classes.caption}>
          <p>{activities[eactActivity].content}</p>
        </div>
        <div className={classes.like}>
          <p>{activities[eactActivity].actionDetails.likeCount}</p>
          <button className={[classes.likebtn, (activities[eactActivity].actionDetails.value === "Like" ? classes.orange : classes.gray)].join(' ')}
            onClick={() => onlikehandler("Like", activities[eactActivity]._id)}>
            <i className="fas fa-thumbs-up"></i>
          </button>
          <p>{activities[eactActivity].actionDetails.dislikeCount}</p>
          <button className={[classes.likebtn, (activities[eactActivity].actionDetails.value === "Dislike" ? classes.orange : classes.gray)].join(' ')}
            onClick={() => onlikehandler("Dislike", activities[eactActivity]._id)}>
            <i className="fas fa-thumbs-down"></i>
          </button>
        </div>
      </div>
    </div>)
  })


  return (

    <Wrapper heading="Recent Buzz">
      <div className={classes.outercontainer}>
        {allActivities}
      </div>
      <ToastContainer />
    </Wrapper>



  );
};

export default withRouter(Activities);
