import React from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import classes from './Navbar.module.css'

const NavBar = () => {


  const activeStyle = {
    fontWeight: "bold",
    color: "#faad05"
  }

  const User = useSelector(state => state.user.user)
  return (
    <div className={classes.NavBar}>
      <div className={classes.navElement}>
        <NavLink to='/home/Buzz' exact activeStyle={activeStyle}><span>Buzz</span>
          <i className={"fa fa-angle-right " + classes.righticon} aria-hidden="true"></i>
        </NavLink>

      </div>
      <div className={classes.navElement}>
        <NavLink to='/home/Complaints' activeStyle={activeStyle}><span>Complaints</span>
          <i className={"fa fa-angle-right " + classes.righticon} aria-hidden="true"></i>
        </NavLink>
      </div>
      {User.type === "Admin" ? <div className={classes.navElement}>
        <NavLink to='/home/Resolved' activeStyle={activeStyle}><span>Resolved</span>
          <i className={"fa fa-angle-right " + classes.righticon} aria-hidden="true"></i>
        </NavLink>
      </div> : null}
      <div className={classes.footer}>
        <p className={classes.copyright}>&copy; 2020 TO THE NEW DIGITAL</p>
        <div className={classes.contactInfo}>
          <p><NavLink to="/About">About</NavLink></p>
          <p><NavLink to="/Contact">Help</NavLink></p>
        </div>
      </div>
    </div>



  );
};
export default NavBar;
