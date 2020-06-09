import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import MainDashboard from './components/MainDashboard/MainDashboard';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/Login/Login';
import SetUser from './components/SetUser/SetUser';
import * as actions from './store/actions/index.actions'

const App = () => {

  const dispatch = useDispatch();

  const setUser = () => dispatch(actions.setUser())

  useEffect(() => {
    setUser()
  }, [])

  const User = useSelector(state => state.user.user)

  let routes = (
    <Switch>
      <Route path='/home' render={() => <MainDashboard />} />
      <Redirect to="/home" />
    </Switch>
  )

  if (!User) {
    routes = (
      <Switch>
        <Route path='/' exact render={() => <Login />} />
        <Route path='/auth/setUser' render={() => <SetUser />} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return routes;
}

export default App;
