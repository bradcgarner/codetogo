import React from 'react';
import { connect } from 'react-redux';
import Badges from './dashboard-badges';
import Recent  from './dashboard-recent';
import QuizLi from './quiz-li';
import * as actionsMode from '../actions/mode';
const deepAssign = require('deep-assign');

export class Dashboard extends React.Component {

  handleQuizlistButton(){
    this.props.dispatch(actionsMode.changeMode('quizlist', this.props.quiz));
  }

  render() {

    const {quizzes, recent} = this.props.user;
  
    const listHeader = quizzes ? 'My Quizzes' : '' ;
    const quizLi = quizzes.map((quiz, index)=>{
      return <QuizLi key={index} index={index} li={deepAssign({},quiz)} />
    });
    const addButtonLabel = quizzes.length ? 'Add Another Quiz' : 'Add a Quiz';

    return (
      <div className="dashboard">
        <Badges />
        <Recent recent={recent}/>
        <h3 className="dashboardQuizListHeader">{listHeader}</h3>
        <ul className="quizUl">
          {quizLi}
        </ul>            
        <button className="gotoQuizListButton"onClick={()=>this.handleQuizlistButton()}>{addButtonLabel}</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Dashboard);