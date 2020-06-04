import * as actionTypes from '../actions/actionType'


const reducer = (state = false, action) => {

    switch (action.type) {
        case (actionTypes.SHOW_TOAST):
            return true
        case (actionTypes.HIDE_TOAST):
            return false
        default:
            return state
    }
}


export default reducer