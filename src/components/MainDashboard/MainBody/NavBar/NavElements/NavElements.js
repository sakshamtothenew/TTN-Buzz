import React from 'react'
import {NavLink} from 'react-router-dom'
const NavElement = (props) => {

    return(
        <div>
            <NavLink to = {props.link}
             exact = {props.exact}
            >{props.children}</NavLink>
        </div>
    )
}

export default NavElement