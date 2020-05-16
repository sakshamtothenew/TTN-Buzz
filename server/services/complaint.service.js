const {Complaints} = require('../model/Complaints.model')

const get_complaints_by_id = (id) => {
    return new Promise((resolve , reject)=> {
          
        Complaints.find({_id : id})
        .then(result => resolve(result))
        .catch(err => resolve(err))
    })
}


const get_complaints_by_status = (status) => {
   return new Promise((resolve , reject)=> {
    Complaints.find({status : status})
    .then((result => result))
    .catch(err=> reject(err))
   })
    
}


const create_complaint = ({
    department,
    createdBy,
    issuedId,
    Assigned_to,
    status
}) => {
    return new Promise((resolve , reject)=> {
      const newComplaints = new Complaints({
          department : department,
          createdBy : createdBy,
          issuedId : issuedId,
          Assigned_to : Assigned_to,
          status : status
      })  

      newComplaints.save()
      .then(result => resolve(result))
      .catch(err => reject(err))
    })
}

const get_all_complaints = () => {
    return new Promise((resolve , reject)=> {
        Complaints.find()
        .then(result =>resolve(result))
        .catch(err=> reject(err))
    })
}


const update_complaint_by_id = (id , updation) => {
    return new Promise((resolve , reject)=> {
        Complaints.update({_id : id},
            {$set : {...updation}})
        .then(result=> resolve(result))
        .catch(err => reject(err))
    })
}

const get_complaints_by_user = () => {

    return new Promise((resolve , reject)=> {
        Commplaint.find({createdBy : id})
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
}


module.exports = {
    get_complaints_by_id,
    get_complaints_by_status,
    get_complaints_by_user,
    update_complaint_by_id,
    create_complaint
}
