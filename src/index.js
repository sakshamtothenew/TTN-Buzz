import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import userReducers from './store/reducers/user.reducers'
import activitiesReducer from './store/reducers/activities.reducer'
import complaintReducer from './store/reducers/complaints.reducer'
import valuableReducer from './store/reducers/valuables.reducer'
import modalReducer from './store/reducers/modal.reducer'
import toastReducer from './store/reducers/toast.reducer'
import thunk from 'redux-thunk'
import './index.css';

import App from './App';

import * as serviceWorker from './serviceWorker';

const Enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  user: userReducers,
  activities: activitiesReducer,
  complaints: complaintReducer,
  valuables: valuableReducer,
  toasts: toastReducer,
  modal: modalReducer
})
const store = createStore(rootReducer,
  Enhancers(
    applyMiddleware(thunk)))
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
