import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import QuizMenu from './quizMenu';
import * as actionsDisplay from '../../actions/display';
import { Switch, Route, Redirect } from 'react-router-dom';
import NoMatch from  '../display/nomatch';

export function Lists(props) {

  return (
    <Switch>
      <main className="lists">
        <Route path = '*' component={Dashboard}/>
        <Route path = '8'  component={QuizMenu}/>
        {/* <Route                           component={NoMatch}/> */}
      </main>
    </Switch>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizMenu);