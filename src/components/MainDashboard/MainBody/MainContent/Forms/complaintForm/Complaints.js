import React, { useState } from "react";
import { issueTitles } from "./IssueTitle";
import Input from "../../../../UI/Input/input";
import classes from "./Complaint.module.css";
import Wrapper from "../../../../UI/Wrapper/Wrapper";
const Complaints = () => {
  const [ComplaintForm, setComplaintFormState] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name",
      },
      value: "",
      label: "Your Name",
      classname : "LFInput"
    },

    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Enter email",
      },

      value: "",
      label: "Your Email",
      classname : "LFInput"
    },

    department: {
      elementType: "select",
      elementConfig: {
        placeholder: "Select department",
        options: ["IT", "HR", "Admin", "Transport", "Food", "Finance"],
      },

      value: "Select Department",
      label: "department",
      classname: "LFSelect",
    },

    issueTitle: {
      elementType: "select",
      elementConfig: {
        placeholder: "Issue title",
        options: ["choose department first.."],
      },
      value: "Select Issue-Title",
      label : "Issue Title",
      classname: "LFSelect",
    },

    Description: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "Description..",
      },
      value: "",
      label: "Your Concern",
      classname: "LFTextarea",
    },
  });

  const inputChangeHandler = (event, inputIdentifier) => {
    const currstate = { ...ComplaintForm };
    const changeInput = { ...currstate[inputIdentifier] };
    changeInput.value = event.target.value;
    currstate[inputIdentifier] = changeInput;

    if (inputIdentifier === "department") {
      let updateIssue = { ...currstate["issueTitle"] };
      updateIssue.elementConfig.options = [...issueTitles[event.target.value]];
      currstate["issueTitle"] = updateIssue;
    }
    setComplaintFormState(currstate);
  };

  const fileuploadDisplayHandler = (event) => {
    console.log(event.target.value)
  }

  const formBody = [];
  Object.keys(ComplaintForm).forEach((keys) => {
    formBody.push(
      <Input
        type={ComplaintForm[keys].elementType}
        key={keys}
        elementConfig={ComplaintForm[keys].elementConfig}
        label={ComplaintForm[keys].label}
        changed={(event) => inputChangeHandler(event, keys)}
        classname={ComplaintForm[keys].classname}
        value = {ComplaintForm[keys].value}
      />
    );
  });
  return (
    <div className = {classes.container}>
      <Wrapper heading="Complaints">
        <form className={classes.ComDiv}>{formBody}
        <label className = {classes.icon} for ="file">
        <i class="fas fa-image "></i>
        </label>
        <input onChange = {fileuploadDisplayHandler} className = {classes.attachment} id ="file" type = "file"></input>
         <button className = {classes.submitBtn}>Submit</button>
        </form>
      </Wrapper>
    </div>
  );
};

export default Complaints;
