import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/index.actions'
const SuperAdmin = () => {

    const dispatch = useDispatch();
    const get_all_users = () => dispatch(actions.get_all_users())

    useEffect(() => {
        get_all_users()
    }, [])

    return (
        <div>this is super admin</div>
    )
}


export default SuperAdmin