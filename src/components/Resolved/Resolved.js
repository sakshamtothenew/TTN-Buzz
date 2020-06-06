import React, { useState } from 'react'
import PreviewComplaints from '../PreviewComplaint/PreviewComplaint'
import ComplaintTable from '../MainDashboard/MainBody/MainContent/ArticleSection/Complaints/Complaints.Article'
import { Route } from 'react-router-dom'
const ResolveTable = (props) => {

    const [previewComplaintId, setPreviewComplaintId] = useState(null)



    const previewComplaintHandler = (ComplaintId) => {
        setPreviewComplaintId(ComplaintId)
    }

    console.log(previewComplaintId)
    return (
        <div>
            <ComplaintTable editable={props.editable}  showhandler={previewComplaintHandler} />
            {previewComplaintId ? <PreviewComplaints 
            heading = "Preview Complaint (editable)"
            complaintId={previewComplaintId} 
            editable={true} /> : 
            null}
        </div>
    )


}

export default ResolveTable