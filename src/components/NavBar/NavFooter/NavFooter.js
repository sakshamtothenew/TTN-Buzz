import React from 'react'
import classes from './Navfoot.module.css'
import {NavLink} from 'react-router-dom'
const NavFooter = () => {


    return (
        <React.Fragment>
            <p className={classes.copyright}>&copy; 2020 TO THE NEW DIGITAL</p>
            <div className={classes.contactInfo}>
                <p><NavLink to="/About">About</NavLink></p>
                <p><NavLink to="/Contact">Help</NavLink></p>
            </div>
        </React.Fragment>
    )
}


export default NavFooter