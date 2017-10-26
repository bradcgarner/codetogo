import React from 'react';
import { connect } from 'react-redux';
import Badges from './dashboard-badges';
import Recent  from './dashboard-recent';
import QuizLi from './quiz-li';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';
const deepAssign = require('deep-assign');

export function Dashboard(props) {

  const handleQuizlistButton = () => {
    if ( props.quiz.menuOfAllQuizzes.length > 1) {
      props.dispatch(actionsMode.gotoQuizlist());
    } else {
      props.dispatch(actionsQuiz.fetchQuizzes());      
    }
  }
  const listHeader = props.user.quizzes ? 'My Quizzes' : '' ;
  console.log('props.user.quizzes',props.user.quizzes)
  const quizLi = props.user.quizzes.map((quiz, index)=>{
    return <QuizLi key={index} li={deepAssign({},quiz)} />
  })
  const addButtonLabel = props.user.quizzes.length ? 'Add Another Quiz' : 'Add a Quiz';

    return (
      <div className="dashboard">
        <Badges />
        <Recent recent={props.user.recent}/>
        <h3 className="dashboardQuizListHeader">{listHeader}</h3>
        {quizLi}            
        <button className="gotoQuizListButton"onClick={()=>handleQuizlistButton()}>{addButtonLabel}</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Dashboard);