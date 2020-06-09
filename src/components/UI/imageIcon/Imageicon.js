import React from "react";
import classes from './img.module.css'

const ImgUpld = (props) => {
  return (
    <React.Fragment>
      <label className={classes.icon} htmlFor="file">
        <i className="fas fa-image"></i>
      </label>
      <input
        onChange={props.fileuploadDisplayHandler}
        className={classes.attachment}
        id="file"
        type="file"
      ></input>
    </React.Fragment>
  );
};

export default  ImgUpld;