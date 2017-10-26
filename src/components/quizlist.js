import React from 'react';
import { connect } from 'react-redux';
import QuizLi from './quiz-li';
const deepAssign = require('deep-assign');


export function QuizList(props) {

  const quizLi = props.quiz.menuOfAllQuizzes.map((quiz, index)=>{
    return <QuizLi key={index} li={deepAssign({},quiz)} />
  })
  
    return (
      <div className="quizlist">
        <ul>
          {quizLi}
        </ul>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizList);