import React from "react";

import classes from "./wrapper.module.css";

const Wrapper = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperHeading}>
        <h3>{props.heading}</h3>
      </div>
      <div className={classes.body}>{props.children}</div>
    </div>
  );
};

export default Wrapper;
