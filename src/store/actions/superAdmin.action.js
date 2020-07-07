import * as actionTypes from './actionType'
import axios from 'axios'


export const get_all_users = () => {

    return dispatch => {

        axios.get('/user/')
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: actionTypes.SET_USERS_TABLE_DATA,
                    userData: response.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}


export const update_userDetails = (update) => {

    return dispatch => {
        const id = update._id
        axios.put('/user/' + id, update)
            .then(result => {
                dispatch({
                    type: actionTypes.UPDATE_USERS_DATA_TABLE,
                    updateData: update
                })
                console.log(result);
            })
            .catch(err => {
                console.log(err)
            })

    }
}