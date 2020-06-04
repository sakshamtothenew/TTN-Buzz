import React from 'react'
import Banner from './Banner/Banner'
import classes from './header.module.css'
import ttnlogo from '../../../assets/ttnlogo.png'

const Header = () => {

    return (
        <React.Fragment>
            <div>
                <div className = {classes.logo}>
                    <img src = {ttnlogo} />
                </div>
                <div className = {classes.logout}><a href="/auth/logout">logout <i class="fas fa-sign-out-alt"></i></a></div>
            </div>
            <Banner />
        </React.Fragment>
    )
}


export default Header