import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./navEle.module.css";
const NavElement = (props) => {

    const activeStyle = {
      fontWeight : "bold",
      color : "#faad05"
    }
  return (
    <div className={classes.navElement}>
      <NavLink to={props.link} 
      exact={props.exact}
      activeStyle = {activeStyle} >
        {props.children}
      </NavLink>
    </div>
  );
};

export default NavElement;
