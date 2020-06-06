import * as actionTypes from './actionType'
import * as actions from './index.actions'
import axios from 'axios'

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


export const make_actions = (method, state, requestBody) => {
    return dispatch => {
        if (method === 'PUT') {
            axios.put(`/activities/actions`, requestBody)
                .then(response => {
                    console.log(response.data)
                    dispatch(set_activities(state))
                })
        }
        else {
            axios.delete(`/activities/actions/${requestBody.user}/${requestBody.post_id}`)
                .then(response => {
                    console.log(response.data)
                    dispatch(set_activities(state))
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}