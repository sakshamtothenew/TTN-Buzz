import React from 'react'
import NavBar from '../NavBar/NavBar'
import MainContent from '../MainContent/MainContent'
import classes from './mainbody.module.css'
import UserProfile from '../UserProfile/UserProfile'
import { Route, Switch, Redirect } from 'react-router-dom'
import SuperAdmin from '../SuperAdmin/SuperAdmin'
const MainBody = (props) => {

    return (
        <div className={classes.container}>
            <Switch>
                <Route path="/home/dashboard" render={() =>
                    (<> <NavBar />
                        <MainContent user={props.user} /> </>)} />
                <Route path="/home/Profile" render={() => <UserProfile />} />
                <Route path='/home/SuperAdmin' render={() => <SuperAdmin />} />
                <Redirect to="/home/SuperAdmin" />
            </Switch>

        </div>
    )
}

export default MainBody;