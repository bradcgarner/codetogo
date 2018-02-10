import React from 'react';
import { connect } from 'react-redux';
import * as actionsQuiz from '../actions/quiz';
const deepAssign = require('deep-assign');


export function QuizLi(props) {
  
  const thisQuiz = props.li; // props.li is one of user.quizzes or menuOfAllQuizzes
  const id = thisQuiz.id;
  const attempt = thisQuiz.attempt;
  const category= thisQuiz.category || 'cat';
  const difficulty= thisQuiz.difficulty || 1;
  const diffClass = `quizLiDifficulty diff${difficulty}`
  const name= thisQuiz.name || 'name';
  const user = deepAssign({}, props.user);
  const mode = props.mode.view;

  const topLabelAttempt = (props.index === 0 && mode === 'dashboard') ? <div className="quizLiTopLabel">attempts</div> : '' ;
  const topLabelDifficulty = props.index === 0 ? <div className="quizLiTopLabel">difficulty</div> : '' ;
  const topLabelCategory = props.index === 0 ? <div className="quizLiTopLabel">category</div> : '' ;
  const topLabelScore = props.index === 0 ? <div className="quizLiTopLabel">scores</div> : '' ;

  let isListed = false;
  props.user.quizzes.forEach(quiz=>{
    if (quiz.id===id) { isListed = true }
  });

  const handleTakeQuizButton = next => {
    props.dispatch(actionsQuiz.takeQuiz(thisQuiz, user, next))
  }

  const theQuiz = <div className="quizIdentifier">
    <div className="quizLiName">{name}</div>
    <div className={diffClass}>{difficulty}
      {topLabelDifficulty}
    </div>
    <div className="quizLiCategory">{category}
      {topLabelCategory}
    </div>
  </div>;
      
  let attemptInner = attempt >= 0 ? '#' + (attempt) : '' ;
  let attemptNumber =  <div className="statusBarAttempt">{attemptInner}
    {topLabelAttempt}
  </div>
        
  const addButton =
    <i className="fa fa-list-ul smallIcon" aria-hidden="true"onClick={()=>handleTakeQuizButton('add')}>
    <span className="faText">Add</span>
  </i> ;


  const statusBox = 
  <div className="statusIconWrapper">
    {topLabelScore}

  </div>;

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
    <li className="quizLi">
      {theQuiz}
      {attemptNumber}
      {statusBoxOrAddButton}
      {takeButton}
    </li>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizLi);