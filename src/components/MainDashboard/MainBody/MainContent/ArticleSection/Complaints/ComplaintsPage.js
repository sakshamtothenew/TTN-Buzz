import React from 'react'
import { useSelector } from 'react-redux'
import Complaints from '../../Forms/complaintForm/Complaints'
import ComplaintTable from '../Complaints/Complaints.Article'
const ComplaintPage = (props) => {

    const loading = useSelector(state => state.user.loading)
    return (
        <div>
            <Complaints />
            {loading ? <div>Loading</div> : <ComplaintTable />}
        </div>
    )
}

export default ComplaintPage