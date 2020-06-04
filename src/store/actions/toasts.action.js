import * as actionTypes from './actionType'



export const show_toast = () => {

    return {
        type: actionTypes.SHOW_TOAST,
    }
}

export const hide_toast = () => {


    return {
        type: actionTypes.HIDE_TOAST
    }

}