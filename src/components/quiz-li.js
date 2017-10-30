import React from 'react';
import { connect } from 'react-redux';
import StatusBar from './quiz-statusbar';
// import QuizLiStatus from './quiz-li-status';
import * as actionsQuiz from '../actions/quiz';
const deepAssign = require('deep-assign');


export function QuizLi(props) {

  console.log('quiz in li',props.li);
  
  const thisQuiz = deepAssign({}, props.li);
  const id = thisQuiz.id;
  const attempt = thisQuiz.attempt;
  const category= thisQuiz.category || 'cat';
  const difficulty= thisQuiz.difficulty || 1;
  const diffClass = `quizLiDifficulty diff${difficulty}`
  const name= thisQuiz.name || 'name';
  const user = deepAssign({}, props.user);
  const mode = props.mode.view;

  let isListed = false;
  props.user.quizzes.forEach(quiz=>{
    if (quiz.id===id) { isListed = true }
  });
  
  const handleTakeQuizButton = (option) => {
    props.dispatch(actionsQuiz.takeQuiz(thisQuiz, user, option, mode))
  }

  const theQuiz = <div className="quizIdentifier">
    <div className="quizLiName">{name}</div>
    <div className={diffClass}>{difficulty}
      <div className="quizLiTopLabel">difficulty</div>
    </div>
    <div className="quizLiCategory">{category}
      <div className="quizLiTopLabel">category</div>
    </div>
  </div>;

  const statusBox = 
    <div className="statusIconWrapper">
      <div className="quizLiTopLabel">scores</div>
      <StatusBar 
        name = {thisQuiz.name} // only included for debugging of the status bar on the QuizList
        mode={'quizlist'}
        total = {thisQuiz.total}
        completed = {thisQuiz.completed}
        correct = {thisQuiz.correct}
        current = {0}
        currentIndex = {0}
        attempt = {thisQuiz.attempt}
      />
    </div>;
      
  const addButton =
  <i className="fa fa-list-ul smallIcon" aria-hidden="true"onClick={()=>handleTakeQuizButton('add')}>
    <span className="faText">Add</span>
  </i> ;

  let attemptInner = attempt >= 0 ? '#' + (attempt + 1) : '' ;
  let attemptNumber =  <div className="statusBarAttempt">{attemptInner}
      <div className="quizLiTopLabel">attempts</div>
    </div>

  let statusBoxOrAddButton = addButton;
  if ( isListed && props.mode.view === 'dashboard' ) {
    statusBoxOrAddButton = statusBox ;
  } else if ( isListed ) {
    statusBoxOrAddButton = <i className="fa fa-check smallIcon" aria-hidden="true"></i>
  }

  const takeButton = <i className="fa fa-hand-o-right smallIcon go" aria-hidden="true" onClick={()=>handleTakeQuizButton('take')}>
    <span className="faText">Go!</span>
  </i>;
  
  return (
      <li className="quizLi">{theQuiz}{attemptNumber}{statusBoxOrAddButton}{takeButton}</li>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizLi);