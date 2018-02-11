import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as actionsDisplay from '../../actions/display';
import Login from './login';
import Profile from './profile';
import NoMatch from  '../display/nomatch';

export function User(props) { 
  
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

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  display: state.display
})

export default connect(mapStateToProps)(User);