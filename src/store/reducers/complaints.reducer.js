import * as actionTypes from '../actions/actionType'



const reducer = (state = { data : {} , count : 0}, action) => {

    switch (action.type) {

        case (actionTypes.SET_COMPLAINTS):
            return { data :  action.complaints  , ...state}
        case (actionTypes.INIT_COMPLAINTS):
            return {...state}
        case (actionTypes.UPDATE_COMPLAINTS):
            state.data[action.updatedObj._id] = { ...state.data[action.updatedObj._id], ...action.updatedObj }
            console.log(state)
            return { ...state }

        default:
            return state
    }
}


export default reducer