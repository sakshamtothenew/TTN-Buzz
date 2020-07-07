import * as actionTypes from './actionType'
import axios from 'axios'


export const get_all_users = () => {

    return dispatch => {

        axios.get('/user')
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }
}