import React, { useEffect , useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import MainDashboard from './components/MainDashboard/MainDashboard';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/Login/Login';
import SetUser from './components/SetUser/SetUser';
import * as actions from './store/actions/index.actions'
import HelpPage from './components/Help/Help';
import About from './components/About/About';

const App = () => {

  const dispatch = useDispatch();

  const setUser = useCallback(() => dispatch(actions.setUser()) , [dispatch])

  useEffect(() => {
    setUser()
  }, [setUser])

  const User = useSelector(state => state.user.user)

  let routes = (
    <Switch>
      <Route path='/home' render={() => <MainDashboard />} />
      <Route path='/About' render={() => <About />} />
      <Route path='/Contact' render={() => <HelpPage />} />
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
