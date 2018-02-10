import React from 'react';
import { connect } from 'react-redux';
import Question from './question';
import { Switch, Route, Redirect } from 'react-router-dom';
import NoMatch from  '../display/nomatch';

export class Quiz extends React.Component {
  
  render() {
    
    return (
      <main className="quiz">
        <Switch>
          <Route exact path = '/quizzes'  component={Question}/>
          <Route                          component={NoMatch}/>
        </Switch>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Quiz);