import React from 'react';
import Complaints from './components/MainDashboard/MainBody/MainContent/Forms/complaintForm/Complaints';
import ActivityForm from './components/MainDashboard/MainBody/MainContent/Forms/activityForm/activity.form';
import ValuableForm from './components/MainDashboard/MainBody/MainContent/Forms/valuables/valuables.form';


function App() {
  return (
    <React.Fragment>
  <Complaints />
      <ActivityForm />
      <ValuableForm />
    </React.Fragment>
     
  );
}

export default App;
