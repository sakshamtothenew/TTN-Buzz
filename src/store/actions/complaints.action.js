import * as actionTypes from './actionType'
import axios from 'axios'


export const set_complaints = (allComplaints) => {

    return {
        type: actionTypes.SET_COMPLAINTS,
        complaints: allComplaints
    }
}


export const get_complaints = (userid) => {

    return dispatch => {
        let Url = '/complaints/'
        if (userid) {
            Url += 'user/' + userid
        }
        axios.get(Url)
            .then(response => {

                const stateObj = {}
                for (let i in response.data) {
                    stateObj[response.data[i]._id] = { ...response.data[i] };
                }

                dispatch(set_complaints(stateObj))
            })
    }


}

