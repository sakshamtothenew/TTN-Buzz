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
  const loading = useSelector(state => state.user.loading)


  const [complaints, setComplaints] = useState([])
  useEffect(() => {
    if (User.user === null) {
      setComplaints("loading")
    }
    else {
      axios.get('/complaints/user/' + User.user._id)
        .then(response => {
          setComplaints(response.data)
        })
        .catch(err =>{

          toast.error(`${err}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        } )

    }
  }, [])

  let complaintList;
  if (Array.isArray(complaints)) {
    complaintList = complaints.map((eachComplaint) => {
      return (<tr>
        <td>{eachComplaint.department}</td>
        <td><a href="#">{eachComplaint.issueId}</a></td>
        <td>{eachComplaint.AssignedTo ? eachComplaint.AssignedTo : "UnAssigned"}</td>
        <td>{eachComplaint.createdBy.name}</td>
        <td className={classes[eachComplaint.status]}>{eachComplaint.status}</td>
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
            <th>Locked To</th>
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
