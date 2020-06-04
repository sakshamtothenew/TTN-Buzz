import React from 'react'
import classes from './Preview.module.css'
import Wrapper from '../MainDashboard/UI/Wrapper/Wrapper'


const PreviewComplaints = (props) => {
console.log(props.complaint)
    return (
        <Wrapper heading={props.heading}>
            <div className={classes.container}>
                <h1 className={classes.issueid}>#{props.complaint.issueId}</h1>
                <h2 className={classes.issueTitle}>{props.complaint.issueTitle}</h2>
                <div className={classes.metaInfo}>
                    <h5>{props.complaint.createdBy.name}</h5>
                    <h5>date</h5>
                    <h5>{props.complaint.AssignedTo ?props.complaint.AssignedTo : "UnAssigned" }</h5>
                    <h5>ETR</h5>
                </div>
                <p>{props.complaint.description}</p>
            </div>
        </Wrapper>
    )
}


export default PreviewComplaints