import * as actiontype from '../actions/actionType'

const reducers = (state = {}, action) => {

    switch (action.type) {

        case (actiontype.SET_ACTIVITIES):
            return { ...action.activityData }
        case (actiontype.INIT_ACTIVITIES):
            return {}
        case (actiontype.UPDATE_ACTIVITIES): 
            state[action.activity._id] = action.activity;
            return {...state}
        default:
            return state
    }
}


export default reducers