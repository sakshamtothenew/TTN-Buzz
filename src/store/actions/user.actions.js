import * as actionTypes from './actionType'
import axios from 'axios'

export const saveUsers = (user) => {
  return {
    type: actionTypes.SET_USERS,
    userDetails: user
  }
}

export const getUsers = () => {
  return {
    type: actionTypes.GET_USERS
  }
}

export const setUser = () => {
  return dispatch => {
    dispatch(getUsers())
    axios.get('/auth/getuser')
      .then(response => {

        dispatch(saveUsers(response.data))
      })
      .catch(err => {

      })
  }
}

export const update_user_details = (_id, updateObj) => {

  return dispatch => {

    axios.put('/user/profile/' + _id, updateObj)
  }
}