import React from 'react';
import { connect } from 'react-redux';
import StatusBar from './quiz-statusbar';
import Question from './quiz-question';
import Results  from './quiz-results';

export class Quiz extends React.Component {
  
  render() {

    const quizBody = this.props.mode.view === 'question' ? <Question /> : <Results /> ;
    
    return (
    <div className="quiz">
      <StatusBar 
        mode={this.props.mode.view}
        quiz = {this.props.quiz} // only included for debugging of the status bar on the QuizList
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