import React from 'react';
import MainDashboard from './components/MainDashboard/MainDashboard';
import { Switch, Route } from 'react-router-dom'
import Login from './components/LandingPage/Login/Login';

const App = () => {
  return (
    <Switch>
      <Route path='/' exact render={() => <Login />} />
      <Route path='/home' render={() => <MainDashboard />} />
    </Switch>
  );
}

export default App;
