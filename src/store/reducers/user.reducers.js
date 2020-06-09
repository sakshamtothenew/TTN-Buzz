import * as actionTypes from '../actions/actionType'
const inititalState = {
    user : null ,
    loading : false
}

const reducers = (state = inititalState , action) => {

    switch(action.type) {

        case(actionTypes.SET_USERS):
            return {
                ...state ,
                user : action.userDetails ,
                loading : false
            } 
        case(actionTypes.GET_USERS):
            return {
                ...state ,
                loading : true
            }
        default: 
            return state 
    }
}


export default reducers