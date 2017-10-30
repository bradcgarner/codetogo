import React from 'react';
import { connect } from 'react-redux';
import ResultsScore from './quiz-results-score';
import * as actionsMode from '../actions/mode';

export function Results(props) {

  const handleGotoAnotherQuizButton = () => {
    if ( props.user.id ) {
      console.log('also check to make sure user has un-taken quizzes on the list') 
      props.dispatch(actionsMode.gotoDashboard() )
    } else {
      props.dispatch(actionsMode.gotoQuizlist() )
    }
  } 

  const handleGotoAccuracyButton = () => {
    props.dispatch(actionsMode.gotoResults() )
  } 

    return (
      <div className="results">
        <ResultsScore />
        <button className="checkAccuracyButton" onClick={()=>handleGotoAccuracyButton()}>Check Accuracy</button>
        <button className="takeAnotherQuizButton" onClick={()=>handleGotoAnotherQuizButton()}>Take Another Quiz</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Results);