import React, { useEffect, useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from "../../UI/Wrapper/Wrapper";
import classes from "./activity.module.css";
import { withRouter } from "react-router-dom";
import * as actions from '../../../store/actions/index.actions'
import moment from 'moment'

const Activities = (props) => {

  const dispatch = useDispatch();

  const getActivities = useCallback(() => dispatch(actions.get_activities()), [dispatch]);
  const makeChanges = (method, state, requestBody) => dispatch(actions.make_actions(method, state, requestBody))

  const user = useSelector(state => state.user.user)
  const toasts = useSelector(state => state.toasts)
  const activities = useSelector(state => state.activities)

  if (toasts.show) {
    if (toasts.type === "error") {
      toast.error(`${toasts.message}`)
    }
    else {
      toast.success(`${toasts.message}`)
    }
  }

  useEffect(() => {
    getActivities();
  }, [getActivities])

  const onlikehandler = (action, post_id) => {
    const requestBody = {
      value: action,
      user: user._id,
      post_id: post_id
    }
    // let actionid = null;
    let activity = { ...activities };
    let state = { ...activity[post_id] }
    let method = null;
    if (action === "Like") {
      if (state.actionDetails.value === "Like") {
        state = Unlike(state);
        method = "DELETE"

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
    makeChanges(method, activity, requestBody)

  }

  const Unlike = (state) => {

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

  const dateConverter = (date) => {

    const month = date.split('-')[1];
    const day = date.split('-')[2].split('T')[0]
    const year = date.split('-')[0]
    const combinedDate = [year, month, day].join('')

    const timedifference = moment(combinedDate, 'YYYYMMDD').fromNow()

    return {
      day: day,
      month: month,
      timedifference: timedifference
    }
  }

  const allActivities = [];

  const sortedActivities = Object.keys(activities)

  sortedActivities.sort((a, b) => {
    if (activities[a].createdAt < activities[b].createdAt) {
      return 1
    }
    else {
      return -1
    }

  })
  sortedActivities.forEach((eachActivity) => {
    const { day, month, timedifference } = dateConverter(activities[eachActivity].createdAt)
    allActivities.push(<div className={classes.container} key={activities[eachActivity]._id}>
      <div className={classes.date} >
        <p><span className={classes.dt}>{day}</span>
          <span className={classes.slash}>/ </span>{month}</p>
      </div>
      <div className={classes.content}>

        {activities[eachActivity].image['secure_url'] ?
          <div className={classes.imagediv}>
            <img src={activities[eachActivity].image['secure_url']} alt="img" />  </div> :
          null
        }

        <div className={classes.userInfo}>
          <p className={classes.username}>{activities[eachActivity].userDetails.name}
            <span className={classes.email}>{activities[eachActivity].userDetails.email}</span>
            <span className={classes.time}>{timedifference}</span>
          </p>
        </div>
        <div className={classes.caption}>
          <p>{activities[eachActivity].content}</p>
        </div>
        <div className={classes.like}>
          <p>{activities[eachActivity].actionDetails.likeCount}</p>
          <button className={[classes.likebtn, (activities[eachActivity].actionDetails.value === "Like" ? classes.orange : classes.gray)].join(' ')}
            onClick={() => onlikehandler("Like", activities[eachActivity]._id)}>
            <i className="fas fa-thumbs-up"></i>
          </button>
          <p>{activities[eachActivity].actionDetails.dislikeCount}</p>
          <button className={[classes.likebtn, (activities[eachActivity].actionDetails.value === "Dislike" ? classes.orange : classes.gray)].join(' ')}
            onClick={() => onlikehandler("Dislike", activities[eachActivity]._id)}>
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
