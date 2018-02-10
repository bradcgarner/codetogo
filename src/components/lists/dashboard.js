import React from 'react';
import { connect } from 'react-redux';
import ListItem from './listItem';
import * as actionsDisplay from '../../actions/display';

export class Dashboard extends React.Component {

  handleQuizlistButton(){
    // this.props.dispatch(actionsDisplay.changeMode('quizMenu', this.props.quiz));
  }

  render() {

    const quizList = this.props.quizList;
  
    const listItem = quizList.map((quiz, index)=>{
      return <ListItem key={index} index={index} li={Object.assign({},quiz)} />
    });
    const addButtonLabel = quizList.length ? 'Add Another Quiz' : 'Add a Quiz';

    return (
      <div className="dashboard quizListContainer">
        <ul className="quizList">
          {listItem}
        </ul>            
        <button className="gotoQuizListButton"onClick={()=>this.handleQuizlistButton()}>{addButtonLabel}</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  display: state.display
})

export default connect(mapStateToProps)(Dashboard);