import React, { useState } from 'react'
import Input from '../../../../UI/Input/input'

const ValuableForm = () => {

    const [valuableForm, setValuableForm] = useState({
        category: {
            elementType: "select",
            elementConfig: {
                placeholder: "type",
                options: ["Lost", "Found"]
            },
            value: "",
            label: "Category"
        },
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Name"
            },
            value: "",
            label: "Your Name"
        },
        description: {
            elementType: "textarea",
            elementConfig: {
                type: "textarea",
                placeholder: "Description.."
            },
            value: "",
            label: "item describe"
        },
        item_type: {
            elementType: "select",
            elementConfig: {
                type: "text",
                placeholder: "Name",
                options: ["Electronics", "Wallets", "File/Doc", "Kid", "Accessory", "others"]
            },
            value: "",
            label: "category"
        },

    })

    const inputChangeHandler = (event, inputIdentifier) => {

        const currstate = { ...valuableForm }
        const changeInput = { ...currstate[inputIdentifier] }
        changeInput.value = event.target.value;
        currstate[inputIdentifier] = changeInput;
        setValuableForm(currstate);
    }

    const formBody = [];

    Object.keys(valuableForm).forEach((keys) => {

        console.log(valuableForm[keys].elementType)
        formBody.push(<Input type={valuableForm[keys].elementType}
            key={keys}
            elementConfig={valuableForm[keys].elementConfig}
            label={valuableForm[keys].label}
            changed={(event) => inputChangeHandler(event, keys)}
        />)
    })




    return (
        <React.Fragment>
            {formBody}
        </React.Fragment>
    )
}


export default ValuableForm