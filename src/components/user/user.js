import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as actionsDisplay from '../../actions/display';
import Login from './login';
import Profile from './profile';
import NoMatch from  '../display/nomatch';

export function User(props) { 
  
  return (

    <Switch>
      <div class='landing'>
        <Route path = '*'   component={Login}/>
        <Route path = '*' component={Profile}/>
        {/* <Route                        component={NoMatch}/> */}
      </div>
    </Switch>
  
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(User);