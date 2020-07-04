import React from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import classes from './Navbar.module.css'
import NavFooter from "./NavFooter/NavFooter";

const NavBar = () => {


  const activeStyle = {
    fontWeight: "bold",
    color: "#faad05"
  }

  const User = useSelector(state => state.user.user)
  return (
    <div className={classes.container}>
      <div className={classes.NavBar} >
        <div className={classes.navElement}>
          <NavLink to='/home/dashboard/Buzz' exact activeStyle={activeStyle}><span>Buzz</span>
            <i className={"fa fa-angle-right " + classes.righticon} aria-hidden="true"></i>
          </NavLink>

        </div>
        <div className={classes.navElement}>
          <NavLink to='/home/dashboard/Complaints' activeStyle={activeStyle}><span>Complaints</span>
            <i className={"fa fa-angle-right " + classes.righticon} aria-hidden="true"></i>
          </NavLink>
        </div>
        {User.type === "Admin" ? <div className={classes.navElement}>
          <NavLink to='/home/dashboard/Resolved' activeStyle={activeStyle}><span>Resolved</span>
            <i className={"fa fa-angle-right " + classes.righticon} aria-hidden="true"></i>
          </NavLink>
        </div> : null}
        <div className={classes.footer}>
          <NavFooter />

        </div>
      </div>
      <div className={classes.footer1}>
        <NavFooter />
      </div>
    </div >

  );
};
export default NavBar;
