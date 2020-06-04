import * as actiontype from '../actions/actionType'

const reducers = (state = {}, action) => {

    switch (action.type) {

        case (actiontype.SET_ACTIVITIES):
            return { ...action.activityData }
        default:
            return state
    }
}


export default reducers