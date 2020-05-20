import React, { useState } from 'react'
import * as BuzzState from './BuzzState.util'
import Input from '../../../../UI/Input/input';

const ActivityForm = () => {

    const [BuzzForm, setBuzzForm] = useState(BuzzState.Activity_Buzz)




    const inputChangeHandler = (event, inputIdentifier) => {

        const currstate = { ...BuzzForm }
        const changeInput = { ...currstate[inputIdentifier] }
        changeInput.value = event.target.value;
        currstate[inputIdentifier] = changeInput;
        setBuzzForm(currstate);
    }


    

    const categoryHandler = (event) => {

        if (event.target.value === "Activity") {
            setBuzzForm(BuzzState.Activity_Buzz)
            return;
        }
        setBuzzForm(BuzzState.Valuable_Buzz)

    }



    const formBody = [];
    Object.keys(BuzzForm).forEach((keys) => {
        formBody.push(<Input type={BuzzForm[keys].elementType}
            key={keys}
            elementConfig={BuzzForm[keys].elementConfig}
            label={BuzzForm[keys].label}
            changed={(event) => inputChangeHandler(event, keys)}
        />)
    })




    const categoryField = (<Input type={BuzzState.Buzz_category.elementType}
        elementConfig={BuzzState.Buzz_category.elementConfig}
        label={BuzzState.Buzz_category.label}
        changed={(event) => categoryHandler(event)}
    />)



    return (
        <React.Fragment>
            <form>
                {formBody}
                {categoryField}
            </form>
        </React.Fragment>
    )
}


export default ActivityForm