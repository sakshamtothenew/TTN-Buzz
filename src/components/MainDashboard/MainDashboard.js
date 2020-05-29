import React, { useEffect, useState } from 'react'
import classes from './MainDashboard.module.css'
import Header from './Header/Header'
import MainBody from './MainBody/MainBody'
import axios from 'axios'
const MainDashboard = () => {
  const [user , setuser] = useState(null)
    useEffect(() => {
        axios.get('/auth/getuser')
            .then(result => {console.log(result)
                const user = result.data
                console.log('this happened')
                setuser(user)
            })
    } , [])
    return (
        <div className={classes.mainBody}>
            <Header />
            <MainBody user = {user} />
        </div>
    )
}

export default MainDashboard