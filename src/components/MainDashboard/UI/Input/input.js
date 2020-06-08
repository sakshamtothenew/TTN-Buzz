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
          className={props.touched && props.invalid ? classes.invalid : classes.valid}
        />
      );
      break;

    case "select":
      const options = props.elementConfig.options.map((eachOption) => {
        return <option key={eachOption}>{eachOption}</option>;
      });

      inputElement = (
        <select
          value={props.value}
          onChange={props.changed}
          className={props.touched && props.invalid ? classes.invalid : classes.valid}>
          <option hidden>{props.value}</option>
          {options}
        </select>);
      break;

    case "textarea":
      inputElement = (
        <textarea
          placeholder={props.elementConfig.placeholder}
          onChange={props.changed}
          value={props.value}
          type={props.elementConfig.type}
          disabled={props.elementConfig.disabled}
          className={props.touched && props.invalid ? classes.invalid : classes.valid}

        ></textarea>
      );
      break;

    case "date":
      inputElement = (
        <input
          type={props.elementConfig.type}
          placeholder={props.elementConfig.placeholder}
          value={props.value}
          onChange={props.changed}
          className={props.touched && props.invalid ? classes.invalid : classes.valid}
        />
      )
      break;
    default:
      inputElement = null;
  }

  return (
    <div className={[classes.inputdiv, classes[props.classname]].join(' ')}>
      {!props.label ? null : <label>{props.label}</label>}
      {inputElement}
    </div>
  );
};

export default Input;
