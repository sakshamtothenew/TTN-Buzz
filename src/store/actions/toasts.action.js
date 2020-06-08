import * as actionTypes from './actionType'



export const show_toast = (type , message) => {

    return {
        type: actionTypes.SHOW_TOAST,
        toast : {
            show : true ,
            message,
            type
        }
    }
}

export const hide_toast = () => {


    return {
        type: actionTypes.HIDE_TOAST,
        toast : {
            show : false
        }
    }

}