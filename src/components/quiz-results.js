import React from 'react';
import { connect } from 'react-redux';
import ResultsScore from './quiz-results-score';
import * as actionsMode from '../actions/mode';

export function Results(props) {

  const handleGotoAnotherQuizButton = () => {
    if ( props.user.id ) {
      props.dispatch(actionsMode.gotoDashboard() )
    } else {
      props.dispatch(actionsMode.gotoQuizlist() )
    }
  } 
  let keyClass = props.mode.option === 'key' ? 'resultsOptions showOption' : 'resultsOptions hideOption';
  let accuracyClass = props.mode.option === 'accuracy' ? 'resultsOptions showOption' : 'resultsOptions hideOption';

  const handleShowNextButton = (option) => {
    if (option === 'key' && props.mode.option === 'key') {
      props.dispatch(actionsMode.toggleOption('none'));
    } else if (option === 'accuracy' && props.mode.option === 'accuracy') {
      props.dispatch(actionsMode.toggleOption('none'));
    } else {
      props.dispatch(actionsMode.toggleOption(option));
    } 
  } 

  const handleGotoAccuracyButton = (option) => {
    if (option === 'key') {
      props.dispatch(actionsMode.gotoKey() )
    } else {
      props.dispatch(actionsMode.gotoResults() )      
    }
  } 

    return (
      <div className="results">
        <ResultsScore />

        <button className="showNextOptionButton" onClick={()=>handleShowNextButton('accuracy')}>Review My Answers</button>
        <div className={accuracyClass}>
          <div className="showOptionParagraph">
            <p>'Coming soon! This will allow you to see your answers, and which answers were correct, but it will not disclose the correct answers if you answered incorrectly. After this, you can take the quiz again for credit.  You will also see links to additional resources for continued learning.</p>
          </div>
          <button className="goToOptionButton" onClick={()=>handleGotoAccuracyButton('accuracy')}>Let's Check Now</button>
        </div>

        <button className="showNextOptionButton" onClick={()=>handleShowNextButton('key')}>See The Key</button>
        <div className={keyClass}>
          <div className="showOptionParagraph">
            <p>'Coming soon! This will allow you to see all the correct answers, and will provide links to other resources for continued learning.  After seeing the key, you can take the quiz again, but not for credit.</p>
          </div>
          <button className="goToOptionButton" onClick={()=>handleGotoAccuracyButton('key')}>Go To The Key</button>
        </div>

        <button className="showNextOptionButton" onClick={()=>handleGotoAnotherQuizButton()}>Take Another Quiz</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Results);