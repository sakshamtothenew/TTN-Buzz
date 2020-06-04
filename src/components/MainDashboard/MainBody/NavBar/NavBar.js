import React from "react";
import { useSelector } from 'react-redux'
import NavElement from "./NavElements/NavElements";
import classes from './Navbar.module.css'

const NavBar = () => {

  const User = useSelector(state => state.user.user)
  return (
    <div className={classes.NavBar}>
      <NavElement exact link="/home/Buzz">Buzz</NavElement>
      <NavElement link="/home/Complaints">Complaints</NavElement>
      {User.type === "Admin" ? <NavElement link="/home/Resolved">Resolved</NavElement> : null}

    </div>
  );
};
export default NavBar;
