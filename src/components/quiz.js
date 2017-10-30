import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import StatusBar from './quiz-statusbar';
import Question from './quiz-question';
import Results  from './quiz-results';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';
const deepAssign = require('deep-assign');

export class Quiz extends React.Component {
  
  render() {

    const quizBody = this.props.mode.view === 'question' ? <Question /> : <Results /> ;
    
    return (
    <div className="quiz">
      <StatusBar 
        mode={this.props.mode.view}
        name = {this.props.quiz.name} // only included for debugging of the status bar on the QuizList
        total = {this.props.quiz.total}
        originalLength = {this.props.quiz.originalLength}
        currentIndex = {this.props.quiz.currentIndex}
        completed = {this.props.quiz.completed}
        correct = {this.props.quiz.correct}
        attempt = {this.props.quiz.attempt}
      />

      {quizBody}
  
    </div>
  );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Quiz);