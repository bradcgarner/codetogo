import React from 'react';
import { connect } from 'react-redux';
import Question from './quiz-question';

export class Quiz extends React.Component {
  
  render() {

    const quizBody = this.props.mode.view === 'question' ? <Question /> : "<Results />" ;
    
    return (
    <div className="quiz">

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