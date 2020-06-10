import React from 'react'
import classes from './header.module.css'
import ttnlogo from '../../assets/ttnlogo.png'

const Header = () => {
  return (
    <React.Fragment>
      <div>
        <div className={classes.logo}>
          <img src={ttnlogo} alt="ttnlogo"/>
        </div>
        <div className={classes.logout}><a href="/auth/logout">logout</a></div>
      </div>
      <div className={classes.banner}>
        <h2 className={classes.bannerText}>
          POSTING YOUR THOUGHT WAS NEVER BEEN SO EASY..
       </h2>
      </div>
    </React.Fragment>
  )
}

export default Header