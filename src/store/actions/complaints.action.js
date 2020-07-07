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

export const set_init_assigned_list = () => {
  return {
    type: actionTypes.SET_INIT_ASSIGNED_LIST
  }
}

export const update_complaints = (complaintObj) => {
  return dispatch => {
    axios.put('/complaints/' + complaintObj._id, complaintObj)
      .then(result => {
        if (complaintObj.estimated_time)
          complaintObj.estimated_time = complaintObj.estimated_time.toString()
        dispatch({
          type: actionTypes.UPDATE_COMPLAINTS,
          updatedObj: complaintObj
        })
      })
      .catch((err) => {
        console.log(JSON.stringify(err.response.data))
        dispatch(actions.show_toast("error", err.response.data))
        dispatch(actions.hide_toast())
      })
  }
}

export const get_complaint_count = (userid) => {
  return dispatch => {
    let Url = '/complaints/count/all'

    if (userid) {
      Url = "/complaints/count/user/" + userid;
    }
    axios.get(Url)
      .then(response => {
        dispatch({
          type: actionTypes.SET_COMPLAINT_COUNT,
          count: response.data.count
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const get_complaints = (pageNo, userid) => {

  return dispatch => {
    dispatch(init_complaints())
    let Url = '/complaints/'
    if (userid) {

      Url += 'user/' + userid + '/' + pageNo
    }
    else {
      Url += "all/" + pageNo
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

export const getAssignedPersonel = (department, name) => {
  return dispatch => {

    axios.get(`/user/assigned/all?department=${department}&name=${name}`)
      .then(response => {
        dispatch({
          type: actionTypes.SET_ASSIGNED_PERSONEL,
          data: response.data
        })

      })
      .catch(err => {
        console.log(err)
      })

  }
}