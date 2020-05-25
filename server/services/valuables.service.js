const { valuables } = require("../model/valuables.model");
const { get_user_by_email } = require('./user.service')

const get_all_valuables = () => {
  return new Promise((resolve, reject) => {
    valuables
      .find()
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const get_valuables_by_id = (id) => {
  return new Promise((resolve, reject) => {
    valuables({ _id: id })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};


const add_valuables = ({
  category,
  type,
  email,
  description,
} , 
{
  filename ,
  path
}
) => {
  return new Promise((resolve, reject) => {

    get_user_by_email(email)
      .then(result => {
        
        const userId =  result === null ? null : result._id
        const newValuable = new valuables({
          category : category,
          createdBy: userId,
          description : description,
          type : type,
          image : {
            filename,
            path
          }
        });

        newValuable
          .save()
          .then((result) => resolve(result))
          .catch((err) => reject(err));
      })
      .catch(err => reject(err));

  })
};

const update_valuables_by_id = (id, updation) => {
  return new Promise((resolve, reject) => {
    valuables
      .update({ _id: id }, { $set: { ...updation } })
      .then((results) => resolve(results))
      .catch((err) => reject(err));
  });
};

const delete_valuables_by_id = (id) => {
  return new Promise((resolve, reject) => {
    valuables
      .deleteOne({ _id: id })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

module.exports = {
  get_all_valuables,
  get_valuables_by_id,
  add_valuables,
  update_valuables_by_id,
  delete_valuables_by_id,
};
