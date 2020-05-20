import React from 'react'
import {Route , Switch} from 'react-router-dom'
import Complaints from './Forms/complaintForm/Complaints'
import ActivityForm from './Forms/Buzz/buzz.form'
import ValuableForm from './Forms/valuables/valuables.form'

const MainContent = () => {

    return (
        <React.Fragment>
            <Switch>
                <Route path ="/" exact render = {() => <ActivityForm /> } />
                <Route path = "/Complaints" render = {() => <Complaints />} />
            </Switch>
         {/* <Complaints />
            <ActivityForm />
            <ValuableForm /> */}
        </React.Fragment>


    )
}


export default MainContent