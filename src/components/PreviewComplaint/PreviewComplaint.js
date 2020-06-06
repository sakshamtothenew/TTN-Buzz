import React, { useState } from 'react'
import classes from './Preview.module.css'
import Wrapper from '../MainDashboard/UI/Wrapper/Wrapper'
import Input from '../MainDashboard/UI/Input/input'
import { useSelector, useDispatch } from 'react-redux'
import * as action from '../../store/actions/index.actions'
import styles from '../MainDashboard/MainBody/MainContent/ArticleSection/Complaints/Complaint.module.css'
const PreviewComplaints = (props) => {

  const [editable, seteditable] = useState(false);
  const [inputField, setInputFields] = useState({
    AssignedTo: {
      elementType: "input",
      elementConfig: {
        placeholder: "Assigning To",
      },
      value: "",
      label: "",
      classname: "LFInput",
    },

    ETR: {
      elementType: "date",
      elementConfig: {
        type: "date",
        placeholder: "Estimated time",
      },
      value: "",
      label: "",
      classname: "Date",

    },

    status: {
      elementType: "select",
      elementConfig: {
        type: "text",
        placeholder: "Status",
        options: ["Open", "InProgress", "Resolved"],
      },
      value: "select status",
      label: "",
      classname: "CTSelect"
    }
  })
  const complaints = useSelector(state => state.complaints)
  const displayComplaint = { ...complaints[props.complaintId] }

  console.log(displayComplaint)
  const dispatch = useDispatch()

  const updateComplaints = (complaintObj) => dispatch(action.update_complaints(complaintObj))

  const editHandler = () => {
    seteditable(true)
  }
  const updateComplaintHandler = () => {
    const updatedObj = {
      _id: displayComplaint._id,
      Assigned_to: inputField["AssignedTo"].value,
      estimated_time: new Date(inputField['ETR'].value),
      status: inputField["status"].value
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
        <button
          onClick={editable ? updateComplaintHandler : editHandler}
          className={[editable ? classes.savebtn : classes.editbtn
            , props.editable ? classes.show : classes.hide].join(' ')}>
          {editable ? "Save" : "Edit"}
        </button>
        <h1 className={classes.issueid}>#{displayComplaint.issueId}</h1>
        <h2 className={classes.issueTitle}>{displayComplaint.issueTitle}</h2>
        <div className={styles[displayComplaint.status]}>
          {editable ?
            <Input
              type={inputField["status"].elementType}
              elementConfig={inputField["status"].elementConfig}
              label={inputField["status"].label}
              classname={inputField["status"].classname}
              value={inputField["status"].value}
              changed={(event) => inputChangeHandler(event, "status")}
            /> :
            <h5>{displayComplaint.status}</h5>}
        </div>
        <div className={classes.metaInfo}>
          <div>
            <h5>Locked By:</h5>
            <p>{displayComplaint.createdBy.name}</p>
          </div>
          <div>
            <h5>Locked On:</h5>
            <p>{displayComplaint.createdAt}</p>
          </div>

          <div>
            <h5>Assigned To:</h5>
            {editable ?
              <Input type={inputField["AssignedTo"].elementType}
                elementConfig={inputField["AssignedTo"].elementConfig}
                label={inputField["AssignedTo"].label}
                value={inputField["AssignedTo"].value}
                classname={inputField["AssignedTo"].classname}
                changed={(event) => inputChangeHandler(event, "AssignedTo")} />
              :
              <p>{displayComplaint.Assigned_to ?
                displayComplaint.Assigned_to :
                "UnAssigned"}</p>
            }</div>
          <div>
            <h5>Estimated Resolve Date </h5>
            {editable ?
              <Input type={inputField["ETR"].elementType}
                elementConfig={inputField["ETR"].elementConfig}
                label={inputField["ETR"].label}
                value={inputField["ETR"].value}
                changed={(event) => inputChangeHandler(event, "ETR")}
                classname={inputField["ETR"].classname}
              /> :
              <p>{displayComplaint.estimated_time ?
                displayComplaint.estimated_time :
                "UnAssigned"}</p>}
          </div>
        </div>
        <div>
          <h5>Complaint description:</h5>
          <p>{displayComplaint.description}</p>
        </div>

      </div>
    </Wrapper>
  )
}


export default PreviewComplaints