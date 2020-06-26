import * as actionTypes from './actionType'
import * as actions from './index.actions'
import axios from 'axios'
import { show_toast, hide_toast } from './toasts.action'


export const set_activities = (activityData) => {
  return {
    type: actionTypes.SET_ACTIVITIES,
    activityData: activityData
  }
}
export const init_activities = () => {
  return {
    type: actionTypes.INIT_ACTIVITIES
  }
}

export const set_comments = (comments) => {
  return {
    type: actionTypes.POST_COMMENTS,
    comments: comments
  }
}

export const get_activities = () => {
  return dispatch => {
    dispatch(init_activities())
    axios.get('/activities/')
      .then(response => {
        console.log(response.data)
        const stateObj = {}
        for (let i in response.data) {
          stateObj[response.data[i]._id] = { ...response.data[i] };
        }
        dispatch(set_activities(stateObj))
      })
      .catch(err => {
        dispatch(actions.show_toast("error", err))
        dispatch(actions.hide_toast())
      })
  }
}

export const update_activities = (activity) => {
  return dispatch => {
    axios.get('/activities/' + activity._id)
      .then((result) => {
        dispatch({
          type: actionTypes.UPDATE_ACTIVITIES,
          activity: result.data[0]
        })
      })

  }

}

export const post_activities = (formData) => {
  return dispatch => {
    dispatch(actions.show_toast("success", "Posting Buzz, Please Wait..."))
    setTimeout(() => {
      dispatch(actions.hide_toast())
    }, 1000)
    axios.post('/activities/', formData)
      .then(response => {
        dispatch(actions.show_toast("success", "Post Created sucessfully.."))
        dispatch(actions.hide_toast())
        dispatch(update_activities(response.data))
      })
      .catch(err => {
        dispatch(actions.show_toast("error", err))
        dispatch(actions.hide_toast())
      })
  }
}


export const make_actions = (method, state, requestBody) => {
  return dispatch => {
    if (method === 'PUT') {
      axios.put(`/activities/actions`, requestBody)
        .then(response => {
          dispatch(set_activities(state))
        })
    }
    else {
      axios.delete(`/activities/actions/${requestBody.user}/${requestBody.post_id}`)
        .then(response => {
          dispatch(set_activities(state))
        })
        .catch(err => {
          dispatch(show_toast())
          dispatch(hide_toast())
        })
    }
  }
}

export const set_modal_state = (activity_id) => {
  return dispatch => {
    axios.get('/activities/' + activity_id)
      .then(response => {
        console.log(response.data)
        dispatch({
          type: actionTypes.SET_MODAL_STATE,
          activity: response.data[0]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}


export const close_modal = (activityId) => {
  return {
    type: actionTypes.CLOSE_MODAL,
    show: false
  }
}

export const getPaginatedcomments = (activityId, pageNo) => {
  return dispatch => {

    const Url = '/activities/comment/' + activityId + '?pageno=' + pageNo;

    axios.get(Url)
      .then(response => {
        console.log(response.data)
        dispatch({
          type: actionTypes.UPDATE_PAGINATED_COMMENTS,
          comments: response.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const get_replies = (comment_id) => {
  return dispatch => {
    axios.get('/activities/comment/replies/' + comment_id)
      .then(response => {
        console.log(response.data)
        dispatch({
          type: actionTypes.UPDATE_MODAL_ACTIVITY,
          replies: response.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const post_comments = (data) => {

  return dispatch => {
    const postId = data.post_id
    axios.post('/activities/comment/' + postId, data)
      .then(response => {
        dispatch(get_activities())
      })
      .catch(err => {
        console.log(err)
      })
  }
}