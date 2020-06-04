import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { Table } from "react-bootstrap";
import Wrapper from '../../../../UI/Wrapper/Wrapper'
import Input from '../../../../UI/Input/input'
import axios from 'axios'
import classes from './Complaint.module.css'
const ComplaintTable = (props) => {
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

  const [complaints, setComplaints] = useState({})

  useEffect(() => {
    if (User.user === null) {
      setComplaints("loading")
    }
    else {
      let UserQuery = "";

      axios.get('/complaints/user/' + User._id)
        .then(response => {

          const stateObj = {}
          for (let i in response.data) {
            stateObj[response.data[i]._id] = { ...response.data[i] };
          }
          console.log(stateObj)
          setComplaints(stateObj)
        })
        .catch(err => {

          toast.error(`${err}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })

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
        <td><button onClick={() => props.showhandler(eachComplaint)}>{eachComplaint.issueId}</button></td>
        {User.type === "Admin" && props.editable ? <td>{eachComplaint.createdBy.name}</td> : null}
        < td > {eachComplaint.AssignedTo ? eachComplaint.AssignedTo : "UnAssigned"}</td >
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
