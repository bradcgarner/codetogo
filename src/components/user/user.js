import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login';
import Profile from './profile';
import NoMatch from  '../display/nomatch';

export default function User(props) { 
  // Component function: simply a switch to display login or profile or to redirect

  return (
    <div className='user'>
      <Switch>
        <Route exact path = '/users/login'   component={Login}/>
        <Route exact path = '/users/profile' component={Profile}/>       
        <Route                               component={NoMatch}/>
      </Switch>
    </div>
  );
}