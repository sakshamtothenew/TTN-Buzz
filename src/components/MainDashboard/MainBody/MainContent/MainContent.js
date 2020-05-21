import React from "react";
import { Route, Switch } from "react-router-dom";
import Complaints from "./Forms/complaintForm/Complaints";
import ActivityForm from "./Forms/Buzz/buzz.form";
import ComplaintTable from "./ArticleSection/Complaints/Complaints.Article";
import Activities from "./ArticleSection/Activities/Activities.Article";
import classes from "./MainContent.module.css";

const MainContent = () => {
  const complaintPage = (
    <div>
      <Complaints />
      <ComplaintTable />
    </div>
  );

  const BuzzPage = (
    <div>
      <ActivityForm />
      <Activities />
    </div>
  );

  return (
    <div className = {classes.MainContent}>
      <Switch>
        <Route path="/" exact render={() => BuzzPage} />
        <Route path="/Complaints" render={() => complaintPage} />
      </Switch>
    </div>
  );
};

export default MainContent;
