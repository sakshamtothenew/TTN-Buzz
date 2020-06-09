import React, { useState } from 'react'
import PreviewComplaints from '../PreviewComplaint/PreviewComplaint'
import ComplaintTable from '../Complaints/Complaints.Article'
const ResolveTable = (props) => {

  const [previewComplaintId, setPreviewComplaintId] = useState(null)

  const previewComplaintHandler = (ComplaintId) => {
    setPreviewComplaintId(ComplaintId)
  }
  return (
    <div>
      <ComplaintTable editable={props.editable} showhandler={previewComplaintHandler} />
      {previewComplaintId ? <PreviewComplaints
        heading="Preview Complaint (editable)"
        complaintId={previewComplaintId}
        editable={true} /> :
        null}
    </div>
  )
}

export default ResolveTable