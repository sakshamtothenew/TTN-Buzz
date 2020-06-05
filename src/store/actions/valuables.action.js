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
                dispatch(show_toast())
                dispatch(hide_toast())
            })
    }
}