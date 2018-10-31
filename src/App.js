import React, { Component } from 'react';
import Main from './components/main';
import LogIn from './components/auth/login'
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const App = () => (
  <Router>
    <div>
    	<Route exact path="/" render={() => (
		    <Redirect to="/login"/>
		)} />
    	<Route exact path="/app" component={Main} />
    	<Route exact path="/login" component={LogIn} />
    </div>
  </Router>
)
export default App;