import React , {useState} from 'react'
import { useSelector } from 'react-redux'
import Complaints from '../../Forms/complaintForm/Complaints'
import ComplaintTable from '../Complaints/Complaints.Article'
import PreviewComplaints from '../../../../../PreviewComplaint/PreviewComplaint'
const ComplaintPage = (props) => {

    const [previewComplaint, setPreviewComplaint] = useState(null)


    const previewComplaintHandler = (ComplaintObj) => {
        setPreviewComplaint(ComplaintObj)
    }
    return (
        <div>
            <Complaints />
            <ComplaintTable showhandler={previewComplaintHandler} />
            {previewComplaint === null ? null : <PreviewComplaints complaint={previewComplaint} editable={false} />}
        </div>
    )
}

export default ComplaintPage