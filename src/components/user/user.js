import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';
import Login from './login';
import Profile from './profile';

export function User(props) { 
  
  return (
    <div class='landing'>
      <Login/>
      <Profile/>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(User);