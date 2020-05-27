import React, { useEffect } from 'react'
import classes from './MainDashboard.module.css'
import Header from './Header/Header'
import MainBody from './MainBody/MainBody'
import axios from 'axios'
const MainDashboard = () => {

    useEffect(() => {
        axios.get('/auth/getuser')
            .then(result => {console.log(result)
                console.log('this happened')
            })
    } , [])
    return (
        <div className={classes.mainBody}>
            <Header />
            <MainBody />
        </div>
    )
}

export default MainDashboard