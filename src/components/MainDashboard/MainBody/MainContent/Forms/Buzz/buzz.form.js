import React, { useState } from "react";
import * as BuzzState from "./BuzzState.util";

import classes from "./buzz.module.css";
import Input from "../../../../UI/Input/input";
import Wrapper from "../../../../UI/Wrapper/Wrapper";
import ImgUpld from "../../../../UI/imageIcon/Imageicon";
import axios from "axios";

const ActivityForm = (props) => {
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
      setBuzzForm(BuzzState.Activity_Buzz);
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

    Object.keys(BuzzForm).forEach((keys) => {
       formData.append(keys , BuzzForm[keys].value)
    });
    formData.append('img' , attachmentPath)

    
    console.log('this is uploaded image')
    console.log(FormData.img)
    formData.append("email" , "saksham.sachdeva@tothenew.com");

    if (categoryValue === "Activity") {
      console.log("activity buzz created");
    
      axios
        .post("http://localhost:5000/activities", formData )
        .then((result) => console.log(result));
    } else if (categoryValue === "Lost&Found") {
    
  
    } else {
      alert("please select category to submit");
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
        <form className={classes.buzzForm}>
          <div className={classes.inputFields}>{formBody}</div>
          <div className={classes.categoryDiv}>
            <div className={classes.categoryFieldsDiv}>
              {categoryField}
              <ImgUpld fileuploadDisplayHandler={imageattachmentHandler} />
            </div>
            <button onClick={SubmitHandler} className={classes.submitbtn}>
              <i class="fas fa-location-arrow"></i>
            </button>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};

export default ActivityForm;
