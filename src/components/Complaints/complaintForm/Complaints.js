import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { issueTitles } from "./IssueTitle";
import Input from "../../UI/Input/input";
import classes from "./Complaint.module.css";
import Wrapper from "../../UI/Wrapper/Wrapper";
import ImgUpld from "../../UI/imageIcon/Imageicon";
import { checkValidity } from '../../MainBody/MainContent/Forms/Utility'
import * as actions from '../../../store/actions/index.actions'
import { useDispatch } from "react-redux";

const Complaints = () => {

  const dispatch = useDispatch();

  const save_complaints = (formData) => dispatch(actions.post_complaints(formData))
  const [attachment, setAttachment] = useState(null);
  const [ComplaintForm, setComplaintFormState] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name",
      },
      validation: {
        required: true
      },
      value: "",
      label: "Your Name",
      classname: "LFInput",
      valid: false,
      touched: false
    },

    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Enter email",
      },
      validation: {
        required: true,
        isEmail: true
      },
      value: "",
      label: "Your Email",
      classname: "LFInput",
      valid: false,
      touched: false
    },

    department: {
      elementType: "select",
      elementConfig: {
        placeholder: "Select department",
        options: ["IT", "HR", "Admin", "Transport", "Food", "Finance"],
      },
      validation: {
        required: true
      },
      value: "Select Department",
      label: "department",
      classname: "LFSelect",
      valid: false,
      touched: false
    },

    issueTitle: {
      elementType: "select",
      elementConfig: {
        placeholder: "Issue title",
        options: ["choose department first.."],
        disabled: true
      },
      value: "Select Issue-Title",
      label: "Issue Title",
      classname: "LFSelect",
      valid: false,
      touched: false
    },

    description: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "Description..",
      },
      validation: {
        required: true
      },
      value: "",
      label: "Your Concern",
      classname: "LFTextarea",
      valid: false,
      touched: false
    },
  });

  const [formIsValid, setFormValid] = useState(false)

  const inputChangeHandler = (event, inputIdentifier) => {
    const currstate = { ...ComplaintForm };
    const changeInput = { ...currstate[inputIdentifier] };
    changeInput.value = event.target.value;
    changeInput.touched = true;
    changeInput.valid = checkValidity(changeInput.value, changeInput.validation)
    currstate[inputIdentifier] = changeInput;
    if (inputIdentifier === "department") {
      let updateIssue = { ...currstate["issueTitle"] };
      updateIssue.elementConfig.options = [...issueTitles[event.target.value]];
      updateIssue.elementConfig.disabled = false
      currstate["issueTitle"] = updateIssue;
    }

    let formisvalid = true;
    for (let i in currstate) {
      formisvalid = currstate[i].valid && formisvalid
    }
    setFormValid(formisvalid);
    setComplaintFormState(currstate);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      toast.error("form is invalid")
    }
    else {
      const formData = new FormData();
      Object.keys(ComplaintForm).forEach(keys => {
        formData.append(keys, ComplaintForm[keys].value)
      })

      formData.append("img", attachment);
      formData.append("status", "Open")
      save_complaints(formData);
    }
  }

  const fileuploadDisplayHandler = (event) => {
    setAttachment(event.target.files[0])
  };

  const formBody = [];
  Object.keys(ComplaintForm).forEach((keys) => {
    formBody.push(
      <Input
        type={ComplaintForm[keys].elementType}
        key={keys}
        elementConfig={ComplaintForm[keys].elementConfig}
        label={ComplaintForm[keys].label}
        changed={(event) => inputChangeHandler(event, keys)}
        disabled={ComplaintForm[keys].disabled ? ComplaintForm[keys].disabled : false}
        classname={ComplaintForm[keys].classname}
        invalid={!ComplaintForm[keys].valid}
        touched={ComplaintForm[keys].touched}
        value={ComplaintForm[keys].value}
      />
    );
  });

  return (
    <div className={classes.container}>
      <Wrapper heading="Complaints">
        <form className={classes.ComDiv}>
          {formBody}
          <ImgUpld fileuploadDisplayHandler={fileuploadDisplayHandler} />
          <div className={classes.btndiv}>
            <button onClick={submitHandler} className={classes.submitBtn}>Submit</button>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};




export default Complaints;
