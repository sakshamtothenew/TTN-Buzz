import * as actionTypes from './actionType'
import axios from 'axios'
import { show_toast, hide_toast } from './toasts.action'

export const set_valuables = (valuables) => {

  return {
    type: actionTypes.SET_VALUABLES,
    valuableData: valuables
  }
}

export const init_valuables = () => {
  return {
    type: actionTypes.INIT_VALUABLES
  }
}

export const get_valuables = () => {
  return dispatch => {
    axios.get('/valuables')
      .then(response => {
        dispatch(set_valuables(response.data))
      })
      .catch(err => {
        dispatch(show_toast("error", err))
        dispatch(hide_toast())
      })
  }
}


export const post_valuables = (formData) => {

  return dispatch => {
    dispatch(show_toast("success", "Creating , Please Wait"))
    setTimeout(() => {
      dispatch(hide_toast())
    }, 1000)
    axios.post('/valuables/', formData)
      .then(response => {
        dispatch(show_toast("success", "Post Created"))
        dispatch(hide_toast())
        dispatch(get_valuables())
      })
      .catch(err => {
        dispatch(show_toast("error", err))
        dispatch(hide_toast())
      })
  }
}