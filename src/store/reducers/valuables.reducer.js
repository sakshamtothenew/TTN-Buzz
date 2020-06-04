import * as actionTypes from '../actions/actionType'

const reducer = (state = [], action) => {

    switch (action.type) {
        case (actionTypes.SET_VALUABLES):
            return action.valuableData

        default:
            return state
    }
}

export default reducer