const { Complaints } = require("../model/Complaints.model");
const { get_user_by_email } = require('./user.service')
const { ObjectId } = require('../Utils/convertors')
const { sendEmail } = require('../Config/nodeMailer')
const get_complaints_by_id = (id) => {
  return new Promise((resolve, reject) => {
    Complaints.find({ _id: id })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const get_complaints_by_status = (status) => {
  return new Promise((resolve, reject) => {
    Complaints.find({ status: status })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const create_complaint = ({
  name,
  department,
  description,
  email,
  issueTitle,
  status,
}, {
  filename,
  secure_url
}) => {
  return new Promise((resolve, reject) => {
    get_user_by_email(email)
      .then((result => {
        const issueId = newIssueId();
        const userid = result._id
        const newComplaints = new Complaints({
          department: department,
          createdBy: { userid: userid, name: name },
          description,
          issueId: issueId,
          issueTitle: issueTitle,
          status: status,
          image: { filename, secure_url }
        });

        newComplaints
          .save()
          .then((result) => {
            sendEmail(
              email,
              'Complaint raised succesfully',
              'Hi, Your complaint is now Open, Please Wait till concern department contact You.`'
            )
            resolve(result)
          })
          .catch((err) => reject(err));
      }))
      .catch(err => reject(err))

  });
};

const get_all_complaints = (page, filterField, filterValue) => {

  const limits = 7;
  const skips = (page - 1) * limits
  return new Promise((resolve, reject) => {
    let query = {};
    if (filterField !== 'null' && filterValue !== 'null') {
      query = filterField === "department" ?
        { department: filterValue } :
        { status: filterValue }
    }
    Complaints.find(query).skip(skips).limit(limits)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      });
  });
};

const get_Complaint_count = (userid, filterField, filterValue) => {

  return new Promise((resolve, reject) => {
    let query = null;
    if (userid) {
      query = { "createdBy.userid": ObjectId(userid) }
    }
    if (filterField !== 'null' && filterValue !== 'null') {
      query = filterField === "department" ?
        { ...query, department: filterValue } :
        { ...query, status: filterValue }
    }

    Complaints.count(query)
      .then((result) => {
        resolve({ count: result })
      })
      .catch(err => {
        reject(err)
      })
  })
}

const update_complaint_by_id = (id, updation) => {


  const Assigned_to = updation["Assigned_to"], estimated_time = updation["estimated_time"];
  const status = updation["status"]
  return new Promise((resolve, reject) => {
    Complaints.updateOne({ _id: id }, {
      $set: {
        Assigned_to: Assigned_to,
        estimated_time: estimated_time,
        status: status
      }
    })
      .then((result) => {
        sendEmail(
          'saksham.sachdeva@tothenew.com',
          'Complaint Status Changed!!',
          `Your complaint status changed to ${status}`
        )
        resolve(result)
      })
      .catch((err) => reject(err));
  });
};

const get_complaints_by_user = (id, pageNo, filterField, filterValue) => {
  const limits = 7;
  const skips = (pageNo - 1) * limits
  return new Promise((resolve, reject) => {
    let query = {}
    if (filterField !== 'null' && filterValue !== 'null') {
      query = filterField === "department" ?
        { department: filterValue } :
        { status: filterValue }
    }
    
    Complaints.find({ "createdBy.userid": ObjectId(id), ...query })
      .skip(skips)
      .limit(limits)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      });
  });
};

const newIssueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}
module.exports = {
  get_complaints_by_id,
  get_complaints_by_status,
  get_complaints_by_user,
  get_all_complaints,
  update_complaint_by_id,
  create_complaint,
  get_Complaint_count
};
