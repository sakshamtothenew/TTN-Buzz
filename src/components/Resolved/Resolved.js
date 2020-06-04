import React, { useState } from 'react'
import PreviewComplaints from '../PreviewComplaint/PreviewComplaint'
import ComplaintTable from '../MainDashboard/MainBody/MainContent/ArticleSection/Complaints/Complaints.Article'
import { Route } from 'react-router-dom'
const ResolveTable = (props) => {

    const [previewComplaint, setPreviewComplaint] = useState({})



    const previewComplaintHandler = (ComplaintObj) => {
        setPreviewComplaint(ComplaintObj)
    }
    return (
        <div>
            <ComplaintTable editable={props.editable} showhandler={previewComplaintHandler} />
            {previewComplaint.issueId ? <PreviewComplaints complaint={previewComplaint} editable={true} /> : null}
        </div>
    )


}

export default ResolveTable