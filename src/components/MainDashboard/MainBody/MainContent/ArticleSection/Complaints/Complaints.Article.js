import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { Table } from "react-bootstrap";
import Wrapper from '../../../../UI/Wrapper/Wrapper'
import axios from 'axios'
import classes from './Complaint.module.css'
const ComplaintTable = (props) => {
  const User = useSelector(state => state.user)
  
  const [complaints, setComplaints] = useState({})

  useEffect(() => {
    if (User.user === null) {
      setComplaints("loading")
    }
    else {
      axios.get('/complaints/user/' + User.user._id)
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



  let complaintList = [];
  if (typeof complaints === "object") {
    Object.keys(complaints).forEach((keys) => {
      const eachComplaint = complaints[keys];

      complaintList.push(<tr>
        <td>{eachComplaint.department}</td>
        <td><a href="#">{eachComplaint.issueId}</a></td>
        <td>{eachComplaint.AssignedTo ? eachComplaint.AssignedTo : "UnAssigned"}</td>
        <td className={classes[eachComplaint.status]} >{eachComplaint.status}</td>
      </tr>)
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
