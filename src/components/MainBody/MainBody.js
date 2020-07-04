import React from 'react'
import NavBar from '../NavBar/NavBar'
import MainContent from '../MainContent/MainContent'
import classes from './mainbody.module.css'
import UserProfile from '../UserProfile/UserProfile'
import { Route, Switch, Redirect } from 'react-router-dom'
const MainBody = (props) => {

    return (
        <div className={classes.container}>
            <Switch>
                <Route path="/home/dashboard" render={() =>
                    (<> <NavBar />
                        <MainContent user={props.user} /> </>)} />
                <Route path="/home/Profile" render={() => <UserProfile />} />
                <Redirect to="/home/Profile" />
            </Switch>

        </div>
    )
}

export default MainBody;