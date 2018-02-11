import React from 'react';
import { connect } from 'react-redux';
import * as actionsQuiz from '../../actions/quiz';

export function ListItem(props) {
  
  const thisQuiz = props.li; // props.li is one of user.quizzes or menuOfAllQuizzes
  const id = thisQuiz.id;
  const category = thisQuiz.category || 'cat' ;
  const difficulty = thisQuiz.difficulty || 1 ;
  const score = thisQuiz.score || 0 ;
  const listItemDifficulty = `listItemDifficulty diff${difficulty}`
  const name = thisQuiz.name || 'name';
  const mode = props.display.view;

  const topLabelDifficulty = props.index === 0 ? <div className="listItemTopLabel listItemTopLabelDifficulty">difficulty</div> : '' ;
  const topLabelCategory = props.index === 0 ? <div className="listItemTopLabel listItemTopLabelCategory">category</div> : '' ;
  const topLabelScore = props.index === 0 ? <div className="listItemTopLabel listItemTopLabelScores">scores</div> : '' ;

  let isListed = false;
  if (Array.isArray(props.quizList)) {
    props.quizList.forEach(quiz=>{
      if (quiz.id===id) { isListed = true }
    });
  }

  const handleTakeQuizButton = next => {
    props.dispatch(actionsQuiz.takeQuiz(thisQuiz, props.user, next))
  }
  
  return (
    <li className="listItem">
      <div className="listItemName">{name}</div>
      <div className={listItemDifficulty}>
        {difficulty}
        {topLabelDifficulty}
      </div>
      <div className="listItemCategory">
        {category}
        {topLabelCategory}
      </div>
      <div className="listItemScore">
        {score}
        {topLabelScore}
      </div>;
      <i className="fa fa-hand-o-right smallIcon go"
        aria-hidden="true" 
        onClick={()=>handleTakeQuizButton('take')}>
        <span className="faText">Go!</span>
      </i>
    </li>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quizList: state.quizList,
  display: state.display
})

export default connect(mapStateToProps)(ListItem);