import React, { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { Table } from "react-bootstrap";
import Wrapper from '../UI/Wrapper/Wrapper'
import Input from '../UI/Input/input'
import classes from './Complaint.module.css'
import * as actions from '../../store/actions/index.actions'
import Page from "../UI/Pages/Pages";
const ComplaintTable = (props) => {

  const dispatch = useDispatch();
  const getComplaints = useCallback((pageno, userid) => dispatch(actions.get_complaints(pageno, userid)), [dispatch])
  const setComplaints = useCallback((complaints) => dispatch(actions.set_complaints(complaints)), [dispatch])
  const getComplaintCount = useCallback((userid) => dispatch(actions.get_complaint_count(userid)), [dispatch])
  const toasts = useSelector(state => state.toasts)
  const complaints = useSelector(state => state.complaints.data);
  const updateComplaints = (complaintObj) => dispatch(actions.update_complaints(complaintObj))
  const User = useSelector(state => state.user.user)
  const complaintCount = useSelector(state => state.complaints.count)
  const [sorting, setSorting] = useState({ field: null, order: -1 })

  // const [statusSelect, setStatusSelect] = useState()

  const statusSelect = {
    elementType: "select",
    elementConfig: {
      type: "text",
      placeholder: "Status",
      options: ["Open", "InProgress", "Resolved"],
    },
    value: "",
    label: "",
    classname: "CTSelect"
  }

  if (toasts.show) {
    if (toasts.type === "error")
      toast.error(`${toasts.message}`)
    else {
      toast.success(`${toasts.message}`)
    }
  }

  useEffect(() => {
    if (User.user === null) {
      setComplaints("loading")
    }
    else {
      if (props.userOnly) {
        getComplaintCount(User._id)
        getComplaints(1, User._id)
      }
      else {

        getComplaintCount()
        getComplaints(1)
      }
    }
  }, [setComplaints, getComplaints, User._id, props.userOnly, User.user, getComplaintCount])

  const sortComplaints = (field, order) => {

    setSorting({ field: field, order: order })

  }

  const pageChangeHandler = (pageNo) => {
    props.userOnly ?
      getComplaints(pageNo, User._id) :
      getComplaints(pageNo)

  }

  const statusChangedHandler = (event, ComplaintIdentifier) => {
    const currComplaints = { ...complaints }
    const changedComplaint = { ...currComplaints[ComplaintIdentifier] }
    changedComplaint.status = event.target.value;
    currComplaints[ComplaintIdentifier] = changedComplaint;
    let Assigned = changedComplaint["Assigned_to"] ? changedComplaint["Assigned_to"] : null;
    let estimated_time = changedComplaint["estimated_time"] ? changedComplaint["estimated_time"] : null
    updateComplaints({
      _id: changedComplaint._id,
      status: event.target.value,
      Assigned_to: Assigned,
      estimated_time: estimated_time
    })
    setComplaints(currComplaints);
  }


  let complaintList = [];
  let sortedComplaints = [];
  if (typeof complaints === "object") {

    sortedComplaints = Object.keys(complaints)
    sortedComplaints.sort((a, b) => {
      if (complaints[a][sorting.field])
        if (complaints[a][sorting.field] > complaints[b][sorting.field]) {
          return 1 * sorting.order
        }
        else if (complaints[a][sorting.field] < complaints[b][sorting.field]) {
          return -1 * sorting.order
        }
      return 0

    })

    for (let i in sortedComplaints) {
      const eachComplaint = complaints[sortedComplaints[i]]
      complaintList.push(<tr key={eachComplaint._id}>
        <td>{eachComplaint.department}</td>
        <td><button className={classes.prevbtn} onClick={() => props.showhandler(eachComplaint._id)}>{eachComplaint.issueId}</button></td>
        {User.type === "Admin" && props.editable ? <td>{eachComplaint.createdBy.name}</td> : null}
        < td > {eachComplaint.Assigned_to ? eachComplaint.Assigned_to : "UnAssigned"}</td >
        <td className={classes[eachComplaint.status]} >{
          User.type === "Admin" && props.editable ?
            <React.Fragment>
              <Input
                type={statusSelect.elementType}
                elementConfig={statusSelect.elementConfig}
                label={statusSelect.label}
                classname={statusSelect.classname}
                value={eachComplaint.status}
                changed={(event) => statusChangedHandler(event, sortedComplaints[i])}
              />
              <i className={"fa fa-angle-down " + classes.downicon}></i>
            </React.Fragment>
            :
            eachComplaint.status}</td>
      </tr >)
    }
  }
  else {
    complaintList = "Loading..."
  }

  let pages = []
  for (let i = 1; i <= Math.ceil(complaintCount / 7); i++) {

    pages.push(<Page key = {i} pageNo={i} pageChange={() => pageChangeHandler(i)} />)
  }
  return (
    <Wrapper heading="Your Complaints">
      <div className={classes.container}>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th onClick={() => sortComplaints("department", (-1 * sorting.order))}>Department
            <i className="fas fa-sort"></i>
              </th>
              <th>Issue Id</th>
              {User.type === "Admin" && props.editable ? <th>Locked By</th> : null}
              <th>Assigned To</th>
              <th onClick={() => sortComplaints("status", (-1 * sorting.order))}>Status
            <i className="fas fa-sort"></i>

              </th>
            </tr>
          </thead>
          <tbody className={classes.tableBody}>
            {complaintList}
          </tbody>
        </Table>
      </div>
      <div className={classes.pages}>
        {pages}
      </div>
      <ToastContainer />
    </Wrapper>
  );
};

export default ComplaintTable;
