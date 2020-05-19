import React, { useState } from 'react'
import { issueTitles } from './IssueTitle'
import Input from '../../../../UI/Input/input'
const Complaints = () => {
    const [ComplaintForm, setComplaintFormState] = useState({


        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Name"
            },
            value: "",
            label: "Your Name"
        },


        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Enter email",
            },

            value: "",
            label: "Your Email"
        },


        department: {
            elementType: "select",
            elementConfig: {
                placeholder: "Select department",
                options: ["IT", "HR", "Admin", "Transport", "Food", "Finance"],
            },

            value: "",
            label: "Department"
        },


        issueTitle: {
            elementType: "select",
            elementConfig: {
                placeholder: "Issue title",
                options: ["--"]
            },
            value: "",
            label: "Issue Title"
        },


        Description: {
            elementType: "textarea",
            elementConfig: {
                type: "text",
                placeholder: "Description",

            },
            value: "",
            label: "Your Concern"

        },

    })


    const inputChangeHandler = (event, inputIdentifier) => {

        const currstate = { ...ComplaintForm }
        const changeInput = { ...currstate[inputIdentifier] }
        changeInput.value = event.target.value;
        currstate[inputIdentifier] = changeInput;

        if (inputIdentifier === "department") {

            let updateIssue = { ...currstate["issueTitle"] }
            updateIssue.elementConfig.options = [...issueTitles[event.target.value]]
            currstate["issueTitle"] = updateIssue;

        }
        setComplaintFormState(currstate);


    }

  const formBody = [];
     Object.keys(ComplaintForm).forEach((keys) => {

        
        formBody.push(<Input type={ComplaintForm[keys].elementType}
            key = {keys}
            elementConfig={ComplaintForm[keys].elementConfig}
            label={ComplaintForm[keys].label}
            changed={(event) => inputChangeHandler(event, keys)}
        />)
    })
    return (
        <React.Fragment>
            <form>
                {formBody}
            </form>
        </React.Fragment>
    )
}


export default Complaints
