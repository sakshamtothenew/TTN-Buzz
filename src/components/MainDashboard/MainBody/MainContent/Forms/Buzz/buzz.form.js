import React, { useState } from "react";
import * as BuzzState from "./BuzzState.util";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from "./buzz.module.css";
import Input from "../../../../UI/Input/input";
import Wrapper from "../../../../UI/Wrapper/Wrapper";
import ImgUpld from "../../../../UI/imageIcon/Imageicon";
import axios from "axios";

const ActivityForm = (props) => {
  console.log(BuzzState.Activity_Buzz)
  const [BuzzForm, setBuzzForm] = useState(BuzzState.Activity_Buzz);
  const [attachmentPath, setAttachmentPath] = useState(null);
  const [categoryValue, setCategoryValue] = useState(
    BuzzState.Buzz_category.value
  );

  const inputChangeHandler = (event, inputIdentifier) => {
    const currstate = { ...BuzzForm };
    const changeInput = { ...currstate[inputIdentifier] };
    changeInput.value = event.target.value;
    currstate[inputIdentifier] = changeInput;
    setBuzzForm(currstate);
  };

  const categoryHandler = (event) => {
    setCategoryValue(event.target.value);

    if (event.target.value === "Activity") {
      const state = { ...BuzzState.Activity_Buzz }
      const activity = { ...state.activity }
      const eleConfig = { ...activity.elementConfig }
      eleConfig.disabled = false;
      eleConfig.placeholder = "create Buzz.."
      activity.elementConfig = eleConfig;
      state.activity = activity
      setBuzzForm(state);
      return;
    }
    setBuzzForm(BuzzState.Valuable_Buzz);
  };

  const imageattachmentHandler = (event) => {
    console.log(event.target.files[0]);

    setAttachmentPath(event.target.files[0]);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('img', attachmentPath)


    if (categoryValue === "Activity") {


      Object.keys(BuzzForm).forEach((keys) => {
        formData.append(keys, BuzzForm[keys].value)
      });

      formData.append("email", "saksham.sachdeva@tothenew.com");

      axios
        .post("/activities", formData)
        .then((result) => {
          if (result.status === 200)
            toast.success('New Activity Created', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        });

    } else if (categoryValue === "Lost & Found") {


      Object.keys(BuzzForm).forEach((keys) => {

        formData.append(keys, BuzzForm[keys].value)
      });

      axios
        .post('http://localhost:5000/valuables', formData)
        .then(result => console.log(result))

    } else {
      toast.error('Please Choose Category', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };



  const formBody = [];
  Object.keys(BuzzForm).forEach((keys) => {
    formBody.push(
      <Input
        type={BuzzForm[keys].elementType}
        key={keys}
        elementConfig={BuzzForm[keys].elementConfig}
        label={BuzzForm[keys].label}
        changed={(event) => inputChangeHandler(event, keys)}
        classname={BuzzForm[keys].classname}
        value={BuzzForm[keys].value}
      />
    );
  });

  const categoryField = (
    <Input
      type={BuzzState.Buzz_category.elementType}
      elementConfig={BuzzState.Buzz_category.elementConfig}
      label={BuzzState.Buzz_category.label}
      changed={(event) => categoryHandler(event)}
      classname={BuzzState.Buzz_category.classname}
      value={categoryValue}
    />
  );

  return (
    <div className={classes.Formdiv}>
      <Wrapper heading="Create Buzz">
        <form onSubmit={(event) => SubmitHandler(event)} className={classes.buzzForm}>
          <div className={classes.inputFields}>{formBody}</div>
          <div className={classes.categoryDiv}>
            <div className={classes.categoryFieldsDiv}>
              {categoryField}
              <ImgUpld fileuploadDisplayHandler={imageattachmentHandler} />
            </div>
            <button className={classes.submitbtn}>
              <i className="fas fa-location-arrow"></i>
            </button>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};

export default ActivityForm;
