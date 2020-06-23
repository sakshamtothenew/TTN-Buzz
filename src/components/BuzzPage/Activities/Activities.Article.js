import React, { useEffect, useCallback, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from "../../UI/Wrapper/Wrapper";
import Input from '../../UI/Input/input'
import classes from "./activity.module.css";
import { withRouter } from "react-router-dom";
import * as actions from '../../../store/actions/index.actions'
import { checkValidity } from '../../../Util/Utility'
import moment from 'moment'
import BuzzModal from "../BuzzModal/BuzzModal";

const Activities = (props) => {

  const dispatch = useDispatch();

  const getActivities = useCallback(() => dispatch(actions.get_activities()), [dispatch]);
  const makeChanges = (method, state, requestBody) => dispatch(actions.make_actions(method, state, requestBody))
  const post_comments = (data) => dispatch(actions.post_comments(data))
  const user = useSelector(state => state.user.user)
  const toasts = useSelector(state => state.toasts)
  const activities = useSelector(state => state.activities)

  const [commentInput, setCommentInput] = useState(null)


  if (toasts.show) {
    if (toasts.type === "error") {
      toast.error(`${toasts.message}`)
    }
    else {
      toast.success(`${toasts.message}`)
    }
  }

  const inputObj = {
    elementType: "textarea",
    elementConfig: {
      type: "textarea",
      placeholder: "Add Comment..",
    },
    validation: {
      required: true
    },
    value: "",
    label: "",
    classname: "Comment",
    valid: false,
    touched: false
  }

  useEffect(() => {
    getActivities();
  }, [getActivities])

  useEffect(() => {
    let commentInputArray = {}
    Object.keys(activities).forEach((keys) => {
      commentInputArray[keys] = { ...inputObj }

    })
    setCommentInput(commentInputArray)
  }, [activities])
  const onlikehandler = (action, post_id) => {
    const requestBody = {
      value: action,
      user: user._id,
      post_id: post_id
    }

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

  const commentChangedHandler = (event, inputIdentifier) => {
    const currstate = { ...commentInput };
    const currStateInput = { ...currstate[inputIdentifier] }

    currStateInput.value = event.target.value;
    currStateInput.valid = checkValidity(currStateInput.value, currStateInput.validation)
    currstate[inputIdentifier] = currStateInput;
    setCommentInput(currstate)
  }


  const postCommentHandler = (event, inputIdentifier) => {

    const commentPostData = {};
    commentPostData.content = commentInput[inputIdentifier].value
    commentPostData.post_id = activities[inputIdentifier]._id;
    commentPostData.pushed_by = user._id
    post_comments(commentPostData);
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

    const comments = activities[eachActivity].comments.map(eachComment => {

      return (
        <p className={classes.eachComment}><strong>{eachComment.commentUser.name} </strong>{eachComment.content}</p>
      )
    })

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
        <div className={classes.comments}>
          <h6>Comment</h6>
          {activities[eachActivity].comments_count > 3 ?
            <p>view all {activities[eachActivity].comments_count} comments</p> : null}
          {comments.length > 0 ? comments : <p>no Comments</p>}
        </div>
        {commentInput !== null && Object.keys(commentInput).length !== 0 ? <div className={classes.commentSection}> <Input type={commentInput[eachActivity].elementType}
          elementConfig={commentInput[eachActivity].elementConfig}
          label={commentInput[eachActivity].label}
          changed={(event) => commentChangedHandler(event, eachActivity)}
          classname={commentInput[eachActivity].classname}
          value={commentInput[eachActivity].value}
        />
          <button disabled={!commentInput[eachActivity].valid} onClick={(event) => postCommentHandler(event, eachActivity)} className={classes.postButton}>Post</button>
        </div> : null
        }
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
