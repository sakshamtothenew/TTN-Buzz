import React from 'react'
import Complaints from './Forms/complaintForm/Complaints'
import ActivityForm from './Forms/activityForm/activity.form'
import ValuableForm from './Forms/valuables/valuables.form'

const MainContent = () => {

    return (
        <React.Fragment>
            <Complaints />
            <ActivityForm />
            <ValuableForm />
        </React.Fragment>


    )
}


export default MainContent