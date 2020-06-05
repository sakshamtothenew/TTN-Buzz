import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { Table } from "react-bootstrap";
import Wrapper from '../../../../UI/Wrapper/Wrapper'
import Input from '../../../../UI/Input/input'
import classes from './Complaint.module.css'
import * as actions from '../../../../../../store/actions/index.actions'
const ComplaintTable = (props) => {


  const dispatch = useDispatch();
  const getComplaints = (userid) => dispatch(actions.get_complaints(userid))
  const setComplaints = (complaints) => dispatch(actions.set_complaints(complaints))
  const toasts =  useSelector(state => state.toasts)
  const complaints = useSelector(state => state.complaints);


  const User = useSelector(state => state.user.user)
  const [statusSelect, setStatusSelect] = useState({
    elementType: "select",
    elementConfig: {
      type: "text",
      placeholder: "Status",
      options: ["Open", "InProgress", "Resolved"],
    },
    value: "",
    label: "",
    classname: "CTSelect"
  })

  if (toasts) {
    toast.error(`error occured`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  useEffect(() => {
    if (User.user === null) {
      setComplaints("loading")
    }
    else {
     if(props.userOnly)
      getComplaints(User._id)
      else {
        getComplaints()
      }
    }
  }, [])


  const statusChangedHandler = (event, ComplaintIdentifier) => {
    const currComplaints = { ...complaints }
    const changedComplaint = { ...currComplaints[ComplaintIdentifier] }
    changedComplaint.status = event.target.value;
    currComplaints[ComplaintIdentifier] = changedComplaint;
    setComplaints(currComplaints);

  }



  let complaintList = [];
  if (typeof complaints === "object") {
    Object.keys(complaints).forEach((keys) => {
      const eachComplaint = complaints[keys];

      complaintList.push(<tr>
        <td>{eachComplaint.department}</td>
        <td><button onClick={() => props.showhandler(eachComplaint._id)}>{eachComplaint.issueId}</button></td>
        {User.type === "Admin" && props.editable ? <td>{eachComplaint.createdBy.name}</td> : null}
        < td > {eachComplaint.Assigned_to ? eachComplaint.Assigned_to : "UnAssigned"}</td >
        <td className={classes[eachComplaint.status]} >{
          User.type === "Admin" && props.editable ?
            <Input
              type={statusSelect.elementType}
              elementConfig={statusSelect.elementConfig}
              label={statusSelect.label}
              classname={statusSelect.classname}
              value={eachComplaint.status}
              changed={(event) => statusChangedHandler(event, keys)}
            /> :
            eachComplaint.status}</td>
      </tr >)
    })
  }
  else {
    complaintList = "Loading..."
  }

  return (
    <Wrapper heading="Your Complaints">
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>Department</th>
            <th>Issue Id</th>
            {User.type === "Admin" && props.editable ? <th>Locked By</th> : null}
            <th>Assigned To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {complaintList}
        </tbody>
      </Table>
      <ToastContainer />
    </Wrapper>
  );




};

export default ComplaintTable;
