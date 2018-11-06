import React from 'react';
import Main from './components/main';
import LogIn from './components/auth/login'
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () => (
  <Router>
    <Switch>
    	<Route exact path="/" render={() => (
		    <Redirect to="/app"/>
		)} />
    	<Route path="/app" component={Main} />
    	<Route path="/login" component={LogIn} />
    </Switch>
  </Router>
)
export default App;