import React, { useState } from 'react'
import Input from '../../../../UI/Input/input';

const ActivityForm = () => {

    const [activityForm, setactivityForm] = useState({
        activity: {
            elementType: "textarea",
            elementConfig: {
                type: "textarea",
                placeholder: "create Activity"
            },
            value: "",
            label: "Your Name"
        },


    })

    const inputChangeHandler = (event , inputIdentifier) => {

        const currstate = { ...activityForm }
        const changeInput = { ...currstate[inputIdentifier] }
        changeInput.value = event.target.value;
        currstate[inputIdentifier] = changeInput;
        setactivityForm(currstate);
    }

    const formBody = [];
    Object.keys(activityForm).forEach((keys) => {
        formBody.push(<Input type = {activityForm[keys].elementType}
            key={keys}
            elementConfig={activityForm[keys].elementConfig}
            label={activityForm[keys].label}
            changed={(event) => inputChangeHandler(event, keys)}
        />)
    })
    return (
        <React.Fragment>
            {formBody}
        </React.Fragment>
    )
}


export default ActivityForm