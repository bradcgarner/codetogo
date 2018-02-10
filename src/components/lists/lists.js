import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import QuizMenu from './quizMenu';
import * as actionsDisplay from '../../actions/display';
import { Switch, Route, Redirect } from 'react-router-dom';
import NoMatch from  '../display/nomatch';

export function Lists(props) {

  return (
    <main className="lists">
      <Switch>
        <Route exact path = '/lists/dashboard' component={Dashboard}/>
        <Route exact path = '/lists/quizmenu'  component={QuizMenu}/>
        <Route                                 component={NoMatch}/>
      </Switch>
    </main>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizMenu);