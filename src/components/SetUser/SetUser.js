import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions/index.actions'
import { Redirect } from 'react-router-dom';
const SetUser = () => {

    const dispatch = useDispatch();

    const setUser = () => dispatch(actions.setUser())
    useEffect(() => {
        setUser();
    })

    return (
        <Redirect to="/home" />)

}

export default SetUser;