import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionsDisplay from '../../actions/display';
import ListItem from './listItem';

export class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goToMenu: true,
      goToDashboard: false,
      menu: true,
      dashboard: false,
    }
  }

  goToDashboard() {
    if(this.state.goToDashboard){
      this.setState({dashboard: true, menu: false})
    }
  }
  goToMenu() {
    if(this.state.goToMenu){
      this.setState({menu: true, dashboard: false})
    }
  }
  render() {

    const listHeader = this.props.match.url === '/lists/dashboard' ?
      'My Quizzes' : 'Select A Quiz' ;

    const quizList = this.state.menu ? this.props.general.menuOfAllQuizzes : this.props.quizList ;
    const quizListArray = Array.isArray(quizList) ? quizList : [] ;
    const listItems = quizListArray.map((quiz, index)=>{
      return <ListItem key={index} index={index} li={quiz} />
    });
    const goToMenuLabel = quizListArray.length ? 'Add Another Quiz' : 'Add a Quiz';

    const goToMenuClass = this.state.goToMenu ? 'goToMenuButton' : 'goToMenuButton inactive' ;
    const goToDashboardClass = this.state.goToDashboard ? 'goToDashboardButton' : 'goToDashboardButton inactive' ;

    return (
      <div className="lists">
        <h3 className="quizListHeader">{listHeader}</h3>
        <ul className="quizList">
          {listItems}
        </ul> 
        <div className='listSelectionButtons'>
          <button className={goToDashboardClass}
            onClick={()=>this.goToDashboard()}>Go To My Dashboard</button>
          <button className={goToMenuClass}
            onClick={()=>this.goToMenu()}>{goToMenuLabel}</button>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  quizList: state.quizList,
  display: state.display,
  general: state.general,
})

export default connect(mapStateToProps)(Lists);