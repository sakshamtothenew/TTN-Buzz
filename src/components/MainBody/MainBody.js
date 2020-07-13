import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../NavBar/NavBar'
import MainContent from '../MainContent/MainContent'
import classes from './mainbody.module.css'
import UserProfile from '../UserProfile/UserProfile'
import { Route, Switch, Redirect } from 'react-router-dom'
import SuperAdmin from '../SuperAdmin/SuperAdmin'
import RolePage from '../RolePage/RolePage'
const MainBody = (props) => {

    const [routes, setRoutes] = useState("role")
    const user = useSelector(state => state.user.user)
    const setRoleHandler = (event) => {

        sessionStorage.setItem("initialLoading", true)
        sessionStorage.setItem("role", event.target.value)
        setRoutes(event.target.value)
    }

    useEffect(() => {

        if (user.email === "saksham.sachdeva@tothenew.com") {
            console.log("runs")
            const initialLoading = sessionStorage.getItem("initialLoading");
            if (initialLoading) {
                const role = sessionStorage.getItem('role')
                console.log(role)
                setRoutes(role)
            }
        }
        else {
            setRoutes(user.type)
        }

    }, [])

    let route = null
    switch (routes) {

        case "role":
            route = (<Switch>
                <Route path="/home/Rolepage" render={() => <RolePage setRoleHandler={setRoleHandler} />} />
                <Redirect to="/home/Rolepage" />
            </Switch>)
            break;
        case "SuperAdmin":
            route = (<Switch>
                <Route path='/home/SuperAdmin' render={() => <SuperAdmin />} />
                <Route path="/home/Profile" render={() => <UserProfile />} />
                <Redirect to="/home/SuperAdmin" />
            </Switch>)
            break;
        case ("Admin" || "Employee"):
            route = (<Switch>
                <Route path="/home/dashboard" render={() =>
                    (<> <NavBar />
                        <MainContent user={props.user} /> </>)} />
                <Route path="/home/Profile" render={() => <UserProfile />} />
                <Route path='/home/SuperAdmin' render={() => <SuperAdmin />} />
                <Redirect to="/home/dashboard" />
            </Switch>)


    }


    return (
        <div className={classes.container}>
            {route}
        </div>
    )
}

export default MainBody;