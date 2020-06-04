import * as actionTypes from './actionType'
import axios from 'axios'

export const set_valuables = (valuables) => {

    return {
        type: actionTypes.SET_VALUABLES,
        valuableData: valuables
    }
}


export const get_valuables = () => {

    return dispatch => {

        axios.get('/valuables')
            .then(response => {
                dispatch(set_valuables(response.data))
            })
    }
}