import * as actionTypes from './actionType'
import axios from 'axios'


export const get_all_users = () => {

    return dispatch => {

        axios.get('/users')
        .then(response => {
            console.log(response.data)
        })
    }
}