import * as actionTypes from '../actions/actionType'

const initialState = {
    show: false,
    message: null,
    type: null
}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.SHOW_TOAST):
            return {
                ...state,
                ...action.toast
            }
        case (actionTypes.HIDE_TOAST):
            return { ...state, ...action.toast }
        default:
            return state
    }
}


export default reducer