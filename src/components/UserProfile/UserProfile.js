import React from 'react'
import classes from './Userprofile.module.css'
import { useSelector } from 'react-redux'

const UserProfile = () => {


    const user = useSelector(state => state.user.user)


    const style = {
        background: `url(${user.picture}) center center/cover `,
        borderRadius: "50%",
        height: "200px",
        width: "200px",
    }
    return (
        <div className={classes.container}>
            <div style={style} className={classes.imageSection}>
            </div>
            <div className={classes.infoSection}>
                <div className = {classes.name}>
                    <h3>{user.name}</h3>
                    <h5>Trainee</h5>
                </div>
                <div className = {classes.about}>
                    <p><i class="fa fa-building" aria-hidden="true"></i> To The New Pvt. Ltd</p>
                    <p><i class="fa fa-globe" aria-hidden="true"></i> Mean</p>
                    <p><i class="fa fa-id-card-o" aria-hidden="true"></i> 4113</p>
                </div>

            </div>
        </div>
    )
}


export default UserProfile