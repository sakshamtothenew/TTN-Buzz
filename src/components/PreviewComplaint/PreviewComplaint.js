import React, { useState } from 'react'
import classes from './Preview.module.css'
import Wrapper from '../MainDashboard/UI/Wrapper/Wrapper'
import Input from '../MainDashboard/UI/Input/input'
import { useSelector, useDispatch } from 'react-redux'
import * as action from '../../store/actions/index.actions'
const PreviewComplaints = (props) => {

    const [editable, seteditable] = useState(false);
    const [inputField, setInputFields] = useState({
        AssignedTo: {
            elementType: "input",
            elementConfig: {
                placeholder: "Assigning To",
            },
            value: "",
            label: "Assigned To",
            classname: "LFInput",
        },

        ETR: {
            elementType: "date",
            elementConfig: {
                type: "date",
                placeholder: "Estimated time",
            },
            value: "",
            label: "Estimated time",
            classname: "Date",
        },
    })
    const complaints = useSelector(state => state.complaints)
    const displayComplaint = { ...complaints[props.complaintId] }

    const dispatch = useDispatch()

    const updateComplaints = (complaintObj) => dispatch(action.update_complaints(complaintObj))

    const editHandler = () => {
        seteditable(true)
    }
    const updateComplaintHandler = () => {
        const updatedObj = {
            _id : displayComplaint._id,
            Assigned_to: inputField["AssignedTo"].value,
            estimated_time: inputField['ETR'].value
        }
        updateComplaints(updatedObj);
        seteditable(false);
    }

    const inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value)
        const currstate = { ...inputField };
        const changeInput = { ...currstate[inputIdentifier] };
        changeInput.value = event.target.value;
        currstate[inputIdentifier] = changeInput;
        setInputFields(currstate);
    }

console.log(displayComplaint.Assigned_to)

    return (
        <Wrapper heading={props.heading}>
            <div className={classes.container}>
                <button onClick={editable ? updateComplaintHandler : editHandler}
                    className={[classes.editbtn, props.editable ? classes.show : classes.hide].join(' ')}>
                    {editable ? "Save" : "Edit"}
                </button>
                <h1 className={classes.issueid}>#{displayComplaint.issueId}</h1>
                <h2 className={classes.issueTitle}>{displayComplaint.issueTitle}</h2>
                <div className={classes.metaInfo}>
                    <h5>{displayComplaint.createdBy.name}</h5>
                    <h5>date</h5>
                    {editable ?
                        <Input type={inputField["AssignedTo"].elementType}
                            elementConfig={inputField["AssignedTo"].elementConfig}
                            label={inputField["AssignedTo"].label}
                            value={inputField["AssignedTo"].value}
                            classname={inputField["AssignedTo"].classname}
                            changed={(event) => inputChangeHandler(event, "AssignedTo")} />
                        :
                        <h5>{displayComplaint.Assigned_to ?
                            displayComplaint.Assigned_to :
                            "UnAssigned"}</h5>
                    }
                    {editable ?
                        <Input type={inputField["ETR"].elementType}
                            elementConfig={inputField["ETR"].elementConfig}
                            label={inputField["ETR"].label}
                            value={inputField["ETR"].value}
                            changed={(event) => inputChangeHandler(event, "ETR")}
                            classname={inputField["ETR"].classname}
                        /> :
                        <h5>ETR</h5>}
                </div>
                <p>{displayComplaint.description}</p>
            </div>
        </Wrapper>
    )
}


export default PreviewComplaints