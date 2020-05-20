import React from 'react'
import classes from './MainDashboard.module.css'
import Header from './Header/Header'
import MainBody from './MainBody/MainBody'
const MainDashboard = () => {

    return (
        <div className={classes.mainBody}>
            <Header />
            <MainBody />
        </div>
    )
}

export default MainDashboard