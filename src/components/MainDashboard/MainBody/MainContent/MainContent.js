import React from "react";
import { Route, Switch, Redirect , withRouter} from "react-router-dom";
import classes from "./MainContent.module.css";
import BuzzPage from './BuzzPage/BuzzPage'
import ComplaintPage from "./ArticleSection/Complaints/ComplaintsPage";


const MainContent = (props) => {



  
  return (
    <div className={classes.MainContent}>

      <Switch>
        <Route path="/home/Buzz" exact render={() => <BuzzPage user={props.user} />} />
        <Route path="/home/Complaints" render={() => <ComplaintPage user={props.user} />} />
        <Redirect to ="/home/Buzz" />
      </Switch>
    </div>
  );
};

export default withRouter(MainContent);
