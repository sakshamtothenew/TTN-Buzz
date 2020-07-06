import React, { useState, useEffect } from 'react'
import classes from './Preview.module.css'
import Wrapper from '../UI/Wrapper/Wrapper'
import Input from '../UI/Input/input'
import { useSelector, useDispatch } from 'react-redux'
import * as action from '../../store/actions/index.actions'
import styles from '../Complaints/Complaint.module.css'
import { checkValidity } from '../../Util/Utility'
import { toast } from 'react-toastify'
import moment from 'moment'
import * as actions from '../../store/actions/index.actions'
const PreviewComplaints = (props) => {
  const assignedPersonal = useSelector(state => state.complaints.assignedPersonals);

  const setInitList = () => dispatch(action.set_init_assigned_list())
  const [formIsValid, setFormisValid] = useState(false)
  const complaints = useSelector(state => state.complaints.data)

  const [editable, seteditable] = useState(false);
  const [inputField, setInputFields] = useState({
    AssignedTo: {
      elementType: "input",
      elementConfig: {
        placeholder: "Assigning To",
      },
      validation: {
        required: true,
      },
      value: "",
      label: "",
      classname: "LFInput",
      valid: false,
      touched: false
    },

    ETR: {
      elementType: "date",
      elementConfig: {
        type: "date",
        placeholder: "Estimated time",
      },
      validation: {
        required: true,
        isDate: true
      },
      value: "",
      label: "",
      classname: "Date",
      valid: false,
      touched: false
    },

    status: {
      elementType: "select",
      elementConfig: {
        type: "text",
        placeholder: "Status",
        options: ["Open", "InProgress", "Resolved"],
      },
      validation: {
        required: true,
        checkOptions: true
      },
      value: "select status",
      label: "",
      classname: "PCSelect",
      valid: false,
      touched: false
    }
  })



  useEffect(() => {
    seteditable(false)
  }, [props.complaintId])

  useEffect(() => {
    setInitList()
  }, [props.complaintId])



  let displayComplaint = null
  if (Object.keys(complaints).length !== 0)
    displayComplaint = { ...complaints[props.complaintId] }

  const dispatch = useDispatch()
  const getUserBydeptandName = (department, name) => dispatch(actions.getAssignedPersonel(department, name))

  const updateComplaints = (complaintObj) => dispatch(action.update_complaints(complaintObj))
  const setInitialInputState = () => {
    let currstate = { ...inputField };
    let Assigned = { ...currstate["AssignedTo"] }
    let estimated = { ...currstate["ETR"] }
    let status = { ...currstate["status"] }
    Assigned.value = "";
    estimated.value = "";
    status.value = "select status"
    currstate["AssignedTo"] = Assigned
    currstate["ETR"] = estimated
    currstate["status"] = status;
    setInputFields(currstate)

  }

  const editHandler = () => {
    let currstate = { ...inputField };
    let Assigned = { ...currstate["AssignedTo"] }
    let estimated = { ...currstate["ETR"] }
    let status = { ...currstate["status"] }
    if (displayComplaint.Assigned_to) {
      Assigned.value = displayComplaint.Assigned_to;
      Assigned.valid = true
    }
    if (displayComplaint["estimated_time"]) {
      estimated.value = displayComplaint["estimated_time"]
      estimated.valid = true
    }
    status.value = displayComplaint.status
    status.valid = true
    currstate["AssignedTo"] = Assigned
    currstate["ETR"] = estimated
    currstate["status"] = status;
    updateValidation(currstate)
    setInputFields(currstate)
    seteditable(true)
  }



  const updateComplaintHandler = () => {
    if (!formIsValid) {
      toast.error("formisInvalid")
    }
    else {
      const updatedObj = {
        _id: displayComplaint._id,
        Assigned_to: inputField["AssignedTo"].value,
        estimated_time: new Date(inputField['ETR'].value),
        status: inputField["status"].value
      }
      updateComplaints(updatedObj);
      setInitialInputState();
      seteditable(false);
    }
  }

  const updateValidation = (currstate) => {
    let formIsvalid = true
    for (let i in currstate) {
      formIsvalid = currstate[i].valid && formIsvalid
    }
    setFormisValid(formIsvalid);
  }

  const inputChangeHandler = (event, inputIdentifier) => {
    if (inputIdentifier === "AssignedTo") {
      AssignmentChangeHandler(event.target.value)
    }
    const currstate = { ...inputField };
    const changeInput = { ...currstate[inputIdentifier] };
    changeInput.value = event.target.value;
    changeInput.touched = true;
    changeInput.valid = checkValidity(changeInput.value, changeInput.validation,
      changeInput.elementConfig.options ? changeInput.elementConfig.options : undefined)
    currstate[inputIdentifier] = changeInput;
    updateValidation(currstate)
    setInputFields(currstate);
  }

  const AssignmentChangeHandler = (value) => {
    const department = displayComplaint.department;
    const name = value;

    setTimeout(() => {
      getUserBydeptandName(department, name)
      console.log(value)

    }, 500)

  }

  const onAssignedSelectHandler = (event, assignedName) => {
    const currstate = { ...inputField };
    const changeInput = { ...currstate["AssignedTo"] };
    changeInput.value = assignedName
    changeInput.valid = checkValidity(changeInput.value, changeInput.validation,
      changeInput.elementConfig.options ? changeInput.elementConfig.options : undefined)
    currstate["AssignedTo"] = changeInput;
    setInitList()
    updateValidation(currstate)
    setInputFields(currstate);
  }
  let assignedList = [];

  if (assignedPersonal.length > 0) {
    assignedList.push(<ul className={classes.assignedList}>
      {assignedPersonal.map(o => <li onClick={(event) => onAssignedSelectHandler(event, o.name)}>{o.name}</li>)}
    </ul>)
  }


  let preview = (<Wrapper>
    <span className={classes.defaultText}>
      Please Select A Complaint
      </span>
  </Wrapper>)

  if (Object.keys(displayComplaint).length !== 0) {
    const date = moment(displayComplaint.estimated_time).format('llll')
    const locked_date = moment(displayComplaint.createdAt).format('llll')

    preview = (

      <Wrapper heading={props.heading}>
        <button onClick={() => props.previewComplaintHandler(undefined)} className={classes.closebtn}>
          <i className="fas fa-times"></i>
        </button>
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
                invalid={!inputField["status"].valid}
                touched={inputField["status"].touched}
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
              <p>{locked_date}</p>
            </div>

            <div>
              <h5>Assigned To:</h5>
              {editable ?
                <Input type={inputField["AssignedTo"].elementType}
                  elementConfig={inputField["AssignedTo"].elementConfig}
                  label={inputField["AssignedTo"].label}
                  value={inputField["AssignedTo"].value}
                  invalid={!inputField["AssignedTo"].valid}
                  touched={inputField["AssignedTo"].touched}
                  classname={inputField["AssignedTo"].classname}
                  changed={(event) => inputChangeHandler(event, "AssignedTo")} />
                :
                <p>{displayComplaint.Assigned_to ?
                  displayComplaint.Assigned_to :
                  "UnAssigned"}</p>
              }{
                assignedList
              }</div>
            <div>
              <h5>Estimated Resolve Date </h5>
              {editable ?
                <Input type={inputField["ETR"].elementType}
                  elementConfig={inputField["ETR"].elementConfig}
                  label={inputField["ETR"].label}
                  value={inputField["ETR"].value}
                  invalid={!inputField["ETR"].valid}
                  touched={inputField["ETR"].touched}
                  changed={(event) => inputChangeHandler(event, "ETR")}
                  classname={inputField["ETR"].classname}
                /> :
                <p>{displayComplaint.estimated_time ?
                  date :
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


  return (
    <div className={classes.outerContainer}>
      {preview}
    </div>)
}


export default PreviewComplaints