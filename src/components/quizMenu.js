import React from 'react';
import { connect } from 'react-redux';
import QuizLi from './quiz-li';
import * as actionsDisplay from '../actions/display';
const deepAssign = require('deep-assign');


export function QuizList(props) {

  const handleQuizlistButton = () => {
    if (props.user.id) {
      // props.dispatch(actionsDisplay.changeMode('dashboard', props.quiz));      
    }
  }

  const dashboardClass = props.user.id ? 'gotoQuizListButton' : 'gotoQuizListButton inactive' ;

  const quizLi = props.quiz.menuOfAllQuizzes.map((quiz, index)=>{
    return <QuizLi key={index} index={index} li={deepAssign({},quiz)} />
  })

  const addButtonLabel = 'Go to My Dashboard';
  
    return (
      <div className="quizlist">
        <h3 className="quizListHeader">Select A Quiz</h3>
        <ul className="quizUl">
          {quizLi}
        </ul>
        <button className={dashboardClass} onClick={()=>handleQuizlistButton()}>{addButtonLabel}</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizList);