import * as actionTypes from '../actions/actionType'

const initialState = {
    activity: null,
    show: false,
    edit: false
}

const reducers = (state = initialState, action) => {

    switch (action.type) {

        case (actionTypes.SET_MODAL_STATE):
            return {
                activity: action.activity,
                show: true,
                edit: action.edit
            }
        case (actionTypes.CLOSE_MODAL):
            return {
                ...state,
                show: action.show
            }
        case (actionTypes.UPDATE_MODAL_ACTIVITY):
            {
                const activityState = { ...state.activity }
                const comments = [...activityState.comments]

                for (let i in comments) {
                    if (comments[i]._id === action.replies[0].parent) {

                        activityState.comments[i].replies = [...action.replies]
                    }
                }
                return {
                    ...state,
                    activity: activityState
                }
            }
        case (actionTypes.UPDATE_PAGINATED_COMMENTS):
            {
                const activityState = { ...state.activity }
                // activityState.comments.concat(action.comments)
                const comments = [...activityState.comments, ...action.comments]
                activityState.comments = comments
                return {
                    ...state,
                    activity: activityState
                }
            }
        default:
            return { ...state }
    }
}


export default reducers