import React from "react";

import classes from "./wrapper.module.css";

const Wrapper = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperHeading}>
        <h4>{props.heading}</h4>
      </div>
      <div className={classes.body}>{props.children}</div>
    </div>
  );
};

export default Wrapper;
