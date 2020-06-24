import * as actionTypes from '../actions/actionType'

const initialState = {
    activity: null,
    show: false
}

const reducers = (state = initialState, action) => {

    switch (action.type) {

        case (actionTypes.SET_MODAL_STATE):
            return {
                activity: action.activity,
                show: true
            }
        case (actionTypes.CLOSE_MODAL):
            return {
                ...state,
                show: action.show
            }
        default:
            return { ...state }
    }
}


export default reducers