import * as actionTypes from '../actions/actionType'

const initialState = {
    data: {},
    count: 0
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case (actionTypes.SET_COMPLAINTS):
            return { ...state, data: { ...action.complaints } }
        case (actionTypes.INIT_COMPLAINTS):
            return { ...state }
        case (actionTypes.UPDATE_COMPLAINTS):
            state.data[action.updatedObj._id] = { ...state.data[action.updatedObj._id], ...action.updatedObj }
            return { ...state }
        case (actionTypes.SET_COMPLAINT_COUNT):
            return { ...state, count: action.count }
        default:
            return state
    }
}


export default reducer