import React from "react";
import { Route, Switch } from "react-router-dom";
import Complaints from "./Forms/complaintForm/Complaints";
import ComplaintTable from "./ArticleSection/Complaints/Complaints.Article";
import classes from "./MainContent.module.css";
import BuzzPage from './BuzzPage/BuzzPage'
const MainContent = (props) => {
  const complaintPage = (
    <div>
      <Complaints />
      <ComplaintTable />
    </div>
  );

 

  return (
    <div className = {classes.MainContent}>
      <Switch>
        <Route path="/home" exact render={() => <BuzzPage user = {props.user}/>} />
        <Route path="/home/Complaints" render={() => complaintPage} />
      </Switch>
    </div>
  );
};

export default MainContent;
