import React from 'react';
import { connect } from 'react-redux';
import ListItem from './listItem';
import * as actionsDisplay from '../../actions/display';

export function QuizMenu(props) {

  const handleQuizlistButton = () => {
    if (props.user.id) {
      // props.dispatch(actionsDisplay.changeMode('dashboard', props.quiz));      
    }
  }

  const dashboardClass = props.user.id ? 'gotoQuizListButton' : 'gotoQuizListButton inactive' ;

  const menuOfAllQuizzes = Array.isArray(props.general.menuOfAllQuizzes) ? props.general.menuOfAllQuizzes : [] ;
  const quizLi = menuOfAllQuizzes.map((quiz, index)=>{
    return <ListItem key={index} index={index} li={Object.assign({},quiz)} />
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
  display: state.display,
  general: state.general,
  quizList: state.quizList,
})

export default connect(mapStateToProps)(QuizMenu);