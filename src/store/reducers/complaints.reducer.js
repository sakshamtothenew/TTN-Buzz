import * as actionTypes from '../actions/actionType'



const reducer = (state = {}, action) => {

    switch (action.type) {

        case (actionTypes.SET_COMPLAINTS):
            return { ...action.complaints }
        case (actionTypes.INIT_COMPLAINTS):
            return {}
        case (actionTypes.UPDATE_COMPLAINTS):
            state[action.updatedObj._id] = { ...state[action.updatedObj._id], ...action.updatedObj }
            console.log(state)
            return { ...state }

        default:
            return state
    }
}


export default reducer