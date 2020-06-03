import React from "react";
import NavElement from "./NavElements/NavElements";
import classes from './Navbar.module.css'

const NavBar = () => {
  return (
    <div className = {classes.NavBar}>
      <NavElement exact link="/home/Buzz">Buzz</NavElement>
      <NavElement link="/home/Complaints">Complaints</NavElement>
    </div>
  );
};
export default NavBar;
