import React from "react";
import { Route, Switch } from "react-router-dom";
import Complaints from "./Forms/complaintForm/Complaints";
import ActivityForm from "./Forms/Buzz/buzz.form";
import ComplaintTable from "./ArticleSection/Complaints/Complaints.Article";
import Activities from "./ArticleSection/Activities/Activities.Article";

const MainContent = () => {
  const complaintPage = (
    <React.Fragment>
      <Complaints />
      <ComplaintTable />
    </React.Fragment>
  );

  const BuzzPage = (
    <React.Fragment>
      <ActivityForm />
      <Activities />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact render={() => BuzzPage} />
        <Route path="/Complaints" render={() => complaintPage} />
      </Switch>
    </React.Fragment>
  );
};

export default MainContent;
