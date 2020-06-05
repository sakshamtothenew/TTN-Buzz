import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Complaints from '../../Forms/complaintForm/Complaints'
import ComplaintTable from '../Complaints/Complaints.Article'
import PreviewComplaints from '../../../../../PreviewComplaint/PreviewComplaint'
const ComplaintPage = (props) => {

    const [previewComplaintid, setPreviewComplaintid] = useState(null)


    const previewComplaintHandler = (ComplaintId) => {
        setPreviewComplaintid(ComplaintId)
    }
    console.log(previewComplaintid)
    return (
        <div>
            <Complaints />
            <ComplaintTable showhandler={previewComplaintHandler} userOnly={true} />
            {previewComplaintid === null ? null : <PreviewComplaints complaintId={previewComplaintid} editable={false} />}
        </div>
    )
}

export default ComplaintPage