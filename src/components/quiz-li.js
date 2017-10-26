import React from 'react';
import { connect } from 'react-redux';
import StatusBar from './question-statusbar';
// import QuizLiStatus from './quiz-li-status';
import * as actionsQuiz from '../actions/quiz';
const deepAssign = require('deep-assign');


export function QuizLi(props) {

  const thisQuiz = deepAssign({}, props.li);
  const id = thisQuiz.id;
  const attempt = thisQuiz.attempt;
  const category= thisQuiz.category || 'cat';
  const difficulty= thisQuiz.difficulty || 'dif';
  const name= thisQuiz.name || 'name';
  const user = deepAssign({}, props.user);
  console.log('deep assign of props.user @ quizli load', user);

  let isListed = false;
  props.user.quizzes.forEach(quiz=>{
    if (quiz.id===id) { isListed = true }
  });
  
  const handleTakeQuizButton = (option) => {
    props.dispatch(actionsQuiz.takeQuiz(thisQuiz, user, option))
  }

  const theQuiz = <div className="quizLi">
    <div className="quizLiName">{name}</div>
    <div className="quizLiCategory">{category}</div>
    <div className="quizLiDifficulty">{difficulty}</div>
  </div>;

  const statusBox = <StatusBar 
        mode={'quizlist'}
        total = {thisQuiz.total}
        completed = {thisQuiz.completed}
        correct = {thisQuiz.correct}
      />;

  const addButton =
  <i className="fa fa-list-ul smallIcon" aria-hidden="true"onClick={()=>handleTakeQuizButton('add')}>
    <span className="faText">Add</span>
  </i> ;
  // condition below needs to change to ===='dashboard' || the quiz is included in props.user.quizzes...
  let statusBoxOrAddButton = addButton;
  if ( isListed && props.mode.view === 'dashboard' ) {
    statusBoxOrAddButton = statusBox ;
  } else if ( isListed ) {
    statusBoxOrAddButton = <i class="fa fa-check smallIcon" aria-hidden="true"></i>
  }

  const takeButton = <i className="fa fa-hand-o-right smallIcon" aria-hidden="true" onClick={()=>handleTakeQuizButton('take')}>
    <span className="faText">Go!</span>
  </i>;
  
  return (
      <li>{theQuiz}{statusBoxOrAddButton}{takeButton}</li>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizLi);