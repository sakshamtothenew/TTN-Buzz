import * as actionTypes from './actionType'
import * as actions from './index.actions'
import axios from 'axios'

export const set_complaints = (allComplaints) => {
  return {
    type: actionTypes.SET_COMPLAINTS,
    complaints: allComplaints
  }
}

export const init_complaints = () => {
  return {
    type: actionTypes.INIT_COMPLAINTS
  }
}

export const update_complaints = (complaintObj) => {
  return dispatch => {
    axios.put('/complaints/' + complaintObj._id, complaintObj)
      .then(result => {
        if (complaintObj.estimated_time)
          complaintObj.estimated_time = complaintObj.estimated_time.toString()
          console.log(complaintObj)
        dispatch({
          type: actionTypes.UPDATE_COMPLAINTS,
          updatedObj: complaintObj
        })
      })
      .catch(err => {
        dispatch(actions.show_toast("error", err))
        dispatch(actions.hide_toast())
      })
  }
}

export const get_complaints = (userid) => {
  return dispatch => {
    dispatch(init_complaints())
    let Url = '/complaints/'
    if (userid) {
      Url += 'user/' + userid
    }
    axios.get(Url)
      .then(response => {

        const stateObj = {}
        for (let i in response.data) {
          stateObj[response.data[i]._id] = { ...response.data[i] };
        }

        dispatch(set_complaints(stateObj))
      })
      .catch((err) => {
        dispatch(actions.show_toast("error", err))
        setTimeout(() => {
          dispatch(actions.hide_toast())

        }, 1000)
      })
  }
}

export const post_complaints = (formData) => {
  return dispatch => {
    dispatch(actions.show_toast("success", "creating Complaint.."))
    setTimeout(() => {
      dispatch(actions.hide_toast())
    }, 1000)
    axios.post('/complaints/', formData)
      .then(response => {
        dispatch(actions.show_toast("success", "Complaint Locked!!"))
        dispatch(actions.hide_toast())
        dispatch(get_complaints(response.data.createdBy.userid))
      })
      .catch(err => {
        dispatch(actions.show_toast("error", err))
        dispatch(actions.hide_toast())
      })
  }
}

