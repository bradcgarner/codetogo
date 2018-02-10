import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import QuizMenu from './quizMenu';
import * as actionsDisplay from '../../actions/display';

export function Lists(props) {

  return (
    <div className="lists">
      <Dashboard/>
      <QuizMenu/>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizMenu);