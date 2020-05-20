import React from 'react'
import NavElement from './NavElements/NavElements'


const NavBar = () => {

    return (
        <React.Fragment>
            <NavElement link="/">Buzz</NavElement>
            <NavElement link="/Complaints">Complaints</NavElement>
        </React.Fragment>)
}

export default NavBar