import React from 'react';
import { connect } from 'react-redux';
import * as actionsQuiz from '../../actions/quiz';

export function ListItem(props) {
  // Component function: each ListItem represents 1 quiz. Appears in either dashboard or list of quizzes, with different props. 
  // Entry point for all quizzes.
  
  const thisQuiz = props.quiz; // props.li is one of user.quizzes or menuOfAllQuizzes
  const difficultyClass = `listItemDifficulty diff${thisQuiz.difficulty}`
  const scoreClass = props.dashboard ? 'listItemScore' : 'hidden' ;
  const takeQuizOption = props.dashboard ? 'take' : 'add' ;
  
  // USE props.userHas FOR FORMATTING!

  const handleTakeQuizButton = next => {
    props.dispatch(actionsQuiz.takeQuiz(thisQuiz.id, props.user.id, takeQuizOption, props.user.authToken))
    .then(()=>{
      props.history.push('/quizzes');
    })
  }
  const takeQuizButton = props.isLoggedIn ?
    <div className='take-quiz-container'
      onClick={()=>handleTakeQuizButton('take')} >
      <i className="fas fa-hand-point-right smallIcon take-quiz"
        aria-hidden="true"> </i>
    </div> : null ;
  
  return (
    <tr className="listItem">
      <td>{thisQuiz.name}</td>
      <td>
        {thisQuiz.category}
      </td>
      <td>
        {thisQuiz.topic}
      </td>
      <td style={{textAlign: "center"}}>
        <div className={difficultyClass}>
          {thisQuiz.difficulty}
        </div>
      </td>
      <td className={scoreClass}  style={{textAlign: "center"}}>
        {thisQuiz.score}
      </td>
      <td className="listItemGo">
        {takeQuizButton}
      </td>
    </tr>
  );
}

export const mapStateToProps = state => ({
  quizList: state.quizList,
  user: state.user,
})

export default connect(mapStateToProps)(ListItem);