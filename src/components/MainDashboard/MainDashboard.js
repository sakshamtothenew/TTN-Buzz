import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classes from './MainDashboard.module.css'
import Header from '../Header/Header'
import MainBody from '../MainBody/MainBody'
import * as actions from '../../store/actions/index.actions'
const MainDashboard = () => {

    const dispatch = useDispatch();
    const setUsers = () => dispatch(actions.setUser())

    useEffect(() => {
        setUsers();
    }, [])

    return (
        <div className={classes.mainBody}>
            <Header />
            <MainBody />
        </div>
    )
}

export default MainDashboard