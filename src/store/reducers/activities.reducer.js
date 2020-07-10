import * as actiontype from '../actions/actionType'

const reducers = (state = { activity: {}, loading: false }, action) => {

    switch (action.type) {

        case (actiontype.SET_ACTIVITIES):
            return { ...state, activity: { ...state.activity, ...action.activityData }, loading: false }
        case (actiontype.INIT_ACTIVITIES):
            return { ...state, loading: true }
        case (actiontype.UPDATE_ACTIVITIES):
            const activity = { ...state.activity };
            activity[action.activity._id] = action.activity
            return { ...state, activity: activity, loading: false }
        case (actiontype.DELETE_BUZZ):
            const currState = { ...state.activity };
            delete currState[action.post_id];
            return { ...state, activity: currState }
        default:
            return state
    }
}


export default reducers