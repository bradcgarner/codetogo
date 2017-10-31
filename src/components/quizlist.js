import React from 'react';
import { connect } from 'react-redux';
import QuizLi from './quiz-li';
import * as actionsMode from '../actions/mode';
const deepAssign = require('deep-assign');


export function QuizList(props) {

  const handleQuizlistButton = () => {
    props.dispatch(actionsMode.gotoQuizlist());
  }

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
        <button className="gotoQuizListButton"onClick={()=>handleQuizlistButton()}>{addButtonLabel}</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizList);