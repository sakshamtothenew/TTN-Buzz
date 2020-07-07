import * as actionTypes from '../actions/actionType'


const initialState = {
    users: []
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.SET_USERS_TABLE_DATA):
            return {
                ...state,
                users: [...action.userData]
            }
        case (actionTypes.UPDATE_USERS_DATA_TABLE):
            const currState = { ...state };
            const currStateUsers = [...currState.users];
            for (let i in currStateUsers) {
                if (currStateUsers[i]._id === action.updateData._id) {
                    currStateUsers[i].department = action.updateData.department;
                    currStateUsers[i].type = action.updateData.Role
                }
            }
            currState.users = currStateUsers
            return currState
        default:
            return state
    }
}


export default reducer