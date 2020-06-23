import React from 'react'
import NavBar from '../NavBar/NavBar'
import MainContent from '../MainContent/MainContent'
import classes from './mainbody.module.css'
const MainBody = (props) => {

    return (
        <div className={classes.container}>
            <NavBar />
            <MainContent user={props.user} />
        </div>
    )
}

export default MainBody;