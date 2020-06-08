import * as actionTypes from './actionType'
import * as actions from './index.actions'
import axios from 'axios'
import { show_toast, hide_toast } from './toasts.action'

export const set_activities = (activityData) => {

    return {
        type: actionTypes.SET_ACTIVITIES,
        activityData: activityData
    }
}

export const init_activities = () => {
    return {
        type: actionTypes.INIT_ACTIVITIES
    }
}


export const get_activities = () => {

    return dispatch => {
        dispatch(init_activities())
        axios.get('/activities/')
            .then(response => {
                const stateObj = {}
                for (let i in response.data) {
                    stateObj[response.data[i]._id] = { ...response.data[i] };
                }
                dispatch(set_activities(stateObj))
            })
            .catch(err => {
                dispatch(actions.show_toast())
                dispatch(actions.hide_toast())
            })

    }
}

export const update_activities = (activity) => {
    return dispatch => {

        axios.get('/activities/' + activity._id)
            .then((result) => {
                console.log("this is resulting")
                console.log(result)
                dispatch({
                    type: actionTypes.UPDATE_ACTIVITIES,
                    activity: result.data[0]
                })
            })

    }

}


export const post_activities = (formData) => {

    return dispatch => {
        dispatch(actions.show_toast("success", "Posting Buzz, Please Wait..."))

        setTimeout(() => {
            dispatch(actions.hide_toast())
        }, 1000)
        axios.post('/activities/', formData)
            .then(response => {
                console.log(response.data)
                dispatch(actions.show_toast("success", "Post Created sucessfully.."))
                dispatch(actions.hide_toast())
                dispatch(update_activities(response.data))
            })
            .catch(err => {
                dispatch(actions.show_toast("error", err))
                dispatch(actions.hide_toast())
            })

    }
}


export const make_actions = (method, state, requestBody) => {
    return dispatch => {
        if (method === 'PUT') {
            axios.put(`/activities/actions`, requestBody)
                .then(response => {
                    dispatch(set_activities(state))
                })
        }
        else {
            axios.delete(`/activities/actions/${requestBody.user}/${requestBody.post_id}`)
                .then(response => {

                    dispatch(set_activities(state))
                })
                .catch(err => {
                    dispatch(show_toast())
                    dispatch(hide_toast())
                })
        }
    }
}