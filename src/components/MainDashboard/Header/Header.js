import React from 'react'
import Banner from './Banner/Banner'


const Header = () => {

    return (
        <React.Fragment>
            <div>this is logo</div>
            <div><a href ="/auth/logout">this is logout</a></div>
            <Banner />
        </React.Fragment>
    )
}


export default Header