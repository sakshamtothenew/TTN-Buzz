import React from 'react'
import classes from './header.module.css'
import ttnlogo from '../../assets/ttnlogo.png'
import { useSelector } from 'react-redux'

const Header = () => {

  const user = useSelector(state => state.user.user)
  return (
    <React.Fragment>
      <div className = {classes.container}>
        <div className={classes.logo}>
          <img src={ttnlogo} alt="ttnlogo" />
        </div>
        <div className={classes.logout}><a href="/auth/logout">logout</a></div>
      </div>
      <div className={classes.banner}>
        <div className ={classes.userinfo}>
            <img src = {user.picture} alt = "userimg"/>
            <p>Hi, {user.name}</p>
        </div>
        <h2 className={classes.bannerText}>
          POSTING YOUR THOUGHT  NEVER BEEN SO EASY..
       </h2>
      </div>
    </React.Fragment>
  )
}

export default Header