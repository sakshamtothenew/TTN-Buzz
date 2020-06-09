import React, { useState } from 'react'
import Complaints from './complaintForm/Complaints'
import ComplaintTable from './Complaints.Article'
import PreviewComplaints from '../PreviewComplaint/PreviewComplaint'
const ComplaintPage = (props) => {

  const [previewComplaintid, setPreviewComplaintid] = useState(null)

  const previewComplaintHandler = (ComplaintId) => {
    setPreviewComplaintid(ComplaintId)
  }
  return (
    <div>
      <Complaints />
      <ComplaintTable showhandler={previewComplaintHandler} userOnly={true} />
      {previewComplaintid === null ?
        null :
        <PreviewComplaints
          heading="Preview Complaint"
          complaintId={previewComplaintid}
          editable={false} />}
    </div>
  )
}

export default ComplaintPage