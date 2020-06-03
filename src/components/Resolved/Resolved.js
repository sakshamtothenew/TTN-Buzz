import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from "react-bootstrap";
import Wrapper from '../MainDashboard/UI/Wrapper/Wrapper';
import Input from '../MainDashboard/UI/Input/input'
import axios from 'axios';

const ResolveTable = () => {

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

    const [Complaints, setComplaints] = useState({})
    useEffect(() => {
        axios.get('/complaints/')
            .then(response => {
                console.log(response.data)
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
                })
            })

    }, [])



    const statusChangedHandler = (event, ComplaintIdentifier) => {
        const currComplaints = { ...Complaints }
        const changedComplaint = { ...currComplaints[ComplaintIdentifier] }
        changedComplaint.status = event.target.value;
        currComplaints[ComplaintIdentifier] = changedComplaint;
        setComplaints(currComplaints);

    }


    let complaintList = [];


    Object.keys(Complaints).forEach((keys) => {
        const eachComplaint = Complaints[keys];
        complaintList.push(<tr>
            <td>{eachComplaint.department}</td>
            <td><a href="#">{eachComplaint.issueId}</a></td>
            <td>{eachComplaint.createdBy.name}</td>
            <td>{eachComplaint.AssignedTo ? eachComplaint.AssignedTo : "UnAssigned"}</td>
            <td>
                <Input
                    type={statusSelect.elementType}
                    elementConfig={statusSelect.elementConfig}
                    label={statusSelect.label}
                    classname={statusSelect.classname}
                    value={eachComplaint.status}
                    changed={(event) => statusChangedHandler(event, keys)}
                />
            </td>
        </tr>)

    })

    return (
        <Wrapper heading="Resolve Complaints">
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Department</th>
                        <th>Issue Id</th>
                        <th>Locked By</th>
                        <th>Assigned To</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {complaintList}
                </tbody>
            </Table>
            <ToastContainer />
        </Wrapper>
    )
}

export default ResolveTable