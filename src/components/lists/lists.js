import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import QuizMenu from './quizMenu';
import * as actionsDisplay from '../../actions/display';
import { Switch, Route, Redirect } from 'react-router-dom';
import NoMatch from  '../display/nomatch';

export function Lists(props) {

  const listHeader = this.props.url.match === '/lists/dashboard' ?
    'My Quizzes' : 'Select A Quiz' ;

  return (
    <div className="lists">
      <h3 className="quizListHeader">{listHeader}</h3>
      <Switch>
        <Route exact path = '/lists/dashboard' component={Dashboard}/>
        <Route exact path = '/lists/quizmenu'  component={QuizMenu}/>
        <Route                                 component={NoMatch}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  display: state.display
})

export default connect(mapStateToProps)(QuizMenu);