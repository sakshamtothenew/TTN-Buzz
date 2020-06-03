import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/index.actions'
import { Redirect } from 'react-router-dom';
const SetUser = () => {

    const dispatch = useDispatch();

    const setUser = () => dispatch(actions.setUser())
    const user = useSelector(state => state.user.user);
    console.log(user, "=========")
    useEffect(() => {
        setUser();
    })

    return (
        <Redirect to="/home" />)

}

export default SetUser;