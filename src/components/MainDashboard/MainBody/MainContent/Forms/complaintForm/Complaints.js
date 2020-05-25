import React, { useState } from "react";
import { issueTitles } from "./IssueTitle";
import Input from "../../../../UI/Input/input";
import classes from "./Complaint.module.css";
import Wrapper from "../../../../UI/Wrapper/Wrapper";
import ImgUpld from "../../../../UI/imageIcon/Imageicon";
import axios from 'axios'

const Complaints = () => {
  const [attachment , setAttachment] = useState(null);
  const [ComplaintForm, setComplaintFormState] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name",
      },
      value: "",
      label: "Your Name",
      classname: "LFInput",
    },

    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Enter email",
      },

      value: "",
      label: "Your Email",
      classname: "LFInput",
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
      label: "Issue Title",
      classname: "LFSelect",
    },

    description: {
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




  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();

    Object.keys(ComplaintForm).forEach(keys => {

      formData.append(keys ,ComplaintForm[keys].value)
    })

    formData.append("img" , attachment);
    formData.append("status" , "Open")
    axios
    .post('http://localhost:5000/complaints' , formData)
    .then(result => {
       console.log(result)
    })
 
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
        classname={ComplaintForm[keys].classname}
        value={ComplaintForm[keys].value}
      />
    );
  });





  return (
    <div className={classes.container}>
      <Wrapper heading="Complaints">
        <form className={classes.ComDiv}>
          {formBody}
         <ImgUpld  fileuploadDisplayHandler = {fileuploadDisplayHandler}/>
          <div className={classes.btndiv}>
            <button  onClick = {submitHandler}  className={classes.submitBtn}>Submit</button>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};




export default Complaints;
