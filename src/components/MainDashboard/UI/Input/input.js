import React from "react";
import classes from "./input.module.css";
const Input = (props) => {
  let inputElement = null;
  switch (props.type) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          type={props.elementConfig.type}
          placeholder={props.elementConfig.placeholder}
          value={props.value}
          className={classes[props.classname]}
        />
      );
      break;

    case "select":
      const options = props.elementConfig.options.map((eachOption) => {
        return <option key={eachOption}>{eachOption}</option>;
      });

      inputElement = <select onChange={props.changed}>{options}</select>;
      break;

    case "textarea":
        
      inputElement = (
        <textarea
          placeholder={props.elementConfig.placeholder}
          onChange={props.changed}
          value={props.value}
          type={props.elementConfig.type}
          className={classes[props.classname]}
        ></textarea>
      );
      break;

    default:
      inputElement = null;
  }

  return (
    <div classname = {classes.inputdiv}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
