import React, { useEffect, useState } from 'react'
import {useDispatch , useSelector} from 'react-redux'
import classes from './MainDashboard.module.css'
import Header from './Header/Header'
import MainBody from './MainBody/MainBody'
import axios from 'axios'
import * as actions from '../../store/actions/index.actions'
const MainDashboard = () => {

    const dispatch = useDispatch();
    const  setUsers = () =>  dispatch(actions.setUser())

    useEffect(() => {

        console.log("dasboard updates")
        setUsers();
    
    }, [])
    return (
        <div className={classes.mainBody}>
            <Header />
            <MainBody  />
        </div>
    )
}

export default MainDashboard