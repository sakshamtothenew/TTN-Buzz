import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import * as BuzzState from "./BuzzState.util";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from "./buzz.module.css";
import Input from "../../../../UI/Input/input";
import Wrapper from "../../../../UI/Wrapper/Wrapper";
import ImgUpld from "../../../../UI/imageIcon/Imageicon";
import * as actions from '../../../../../../store/actions/index.actions'
import { checkValidity } from '../Utility'


const ActivityForm = (props) => {

  const [BuzzForm, setBuzzForm] = useState(BuzzState.Activity_Buzz);
  const [attachmentPath, setAttachmentPath] = useState(null);
  const [formIsValid, setFormisValid] = useState(false);
  const [categoryValue, setCategoryValue] = useState(BuzzState.Buzz_category.value);
  const dispatch = useDispatch();
  const save_activities = (formData) => dispatch(actions.post_activities(formData))
  const save_valuables = (formData) => dispatch(actions.post_valuables(formData))

  const User = useSelector(state => state.user.user)
  const BuzzObj = {
    "Activity": {
      initialState: BuzzState.Activity_Buzz,
      action: save_activities
    },
    "Lost & Found": {
      initialState: BuzzState.Valuable_Buzz,
      action: save_valuables
    }
  }
  const inputChangeHandler = (event, inputIdentifier) => {
    const currstate = { ...BuzzForm };
    const changeInput = { ...currstate[inputIdentifier] };
    changeInput.touched = true;
    changeInput.value = event.target.value;
    changeInput.valid = checkValidity(changeInput.value, changeInput.validation)
    currstate[inputIdentifier] = changeInput;

    let formIsvalid = true;
    for (let i in currstate) {
      formIsvalid = currstate[i].valid && formIsvalid;
    }

    setFormisValid(formIsvalid)
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
    if (!formIsValid) {
      toast.error('form is invalid');
    }
    else {
      const formData = new FormData();
      formData.append('img', attachmentPath)
      formData.append('email', User.email)
      Object.keys(BuzzForm).forEach((keys) => {
        formData.append(keys, BuzzForm[keys].value)
      });
      setBuzzForm(BuzzObj[categoryValue].initialState)
      BuzzObj[categoryValue].action(formData)
    }
  };




  const formBody = [];
  Object.keys(BuzzForm).forEach((keys) => {
    formBody.push(
      <Input
        type={BuzzForm[keys].elementType}
        key={keys}
        elementConfig={BuzzForm[keys].elementConfig}
        invalid={!BuzzForm[keys].valid}
        touched={BuzzForm[keys].touched}
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
    <div className={classes.Formdiv} >
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
    </div >
  );
};

export default ActivityForm;
