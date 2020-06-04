import * as actionTypes from '../actions/actionType'



const reducer = (state = {}, action) => {

    switch (action.type) {

        case (actionTypes.SET_COMPLAINTS):
            return { ...action.complaints }

        default:
            return state
    }
}


export default reducer