import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { useSelector } from 'react-redux'
import classes from "./MainContent.module.css";
import BuzzPage from '../BuzzPage/BuzzPage'
import ComplaintPage from "../Complaints/ComplaintsPage";
import ResolveTable from "../Resolved/Resolved";

const MainContent = (props) => {

  const User = useSelector(state => state.user.user)
  return (
    <div className={classes.MainContent}>
      <Switch>
        <Route path="/home/dashboard/Buzz" exact render={() => <BuzzPage />} />
        <Route path="/home/dashboard/Complaints" render={() => <ComplaintPage />} />
        {User.type === "Admin" ? <Route path='/home/dashboard/Resolved' render={() => <ResolveTable editable={true} />} /> : null}
        <Redirect to="/home/dashboard/Buzz" />
      </Switch>
    </div>
  );
};

export default withRouter(MainContent);
