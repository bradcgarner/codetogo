import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import ListItem from './listItem';

export class Lists extends React.Component {
  // Component function: all quiz lists are rendered via Lists, varying based on props. Lists set up currently are dashboard (user's quizzes) and menuOfQuizzes (all quizzes)

  constructor(props) {
    super(props);
    this.state = {
      goToMenu: false,
      goToDashboard: false,
      menu: true,
      dashboard: false,
      isLoggedIn: false ,
    }
  }

  componentDidMount(){
    this.setStateToDashboard();
  }

  setStateToDashboard() {
    if(this.props.user.id) {
      this.setState({ isLoggedIn: true });
      if(typeof this.props.quizList === 'object') {
        let firstQuiz = this.props.quizList[Object.keys(this.props.quizList)[0]];
        if(typeof  firstQuiz === 'object') {
          if(typeof firstQuiz.category === 'string') {
            this.setState({
              dashboard: true,
              menu: false,
              goToMenu: true,
              goToDashboard: false,
            });
          }
        }
      }
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

    const listHeader = this.state.dashboard ? 'My Quizzes' : 'Select A Quiz' ;
    const score      = this.state.dashboard ? 'Score'      : '' ;

    const goToMenuClass      = this.state.goToMenu      ? 'goToMenuButton' : 'goToMenuButton inactive' ;
    const goToDashboardClass = this.state.goToDashboard ? 'goToDashboardButton' : 'goToDashboardButton inactive' ;

    let quizListArray = [];
    if(this.state.menu){
      quizListArray = Array.isArray(this.props.general.menuOfAllQuizzes) ? this.props.general.menuOfAllQuizzes : []
    } else {
      for(let key in this.props.quizList) quizListArray.push(this.props.quizList[key]);
      // should we sort here?
    }

    const listItems = quizListArray.map((quiz, index)=>{
      const userHas = this.state.dashboard ? true :
        this.props.quizList[quiz.id] ? true : false ;
      return <ListItem
        key={index} 
        index={index} 
        quiz={quiz} 
        userHas={userHas}
        dashboard={this.state.dashboard} 
        isLoggedIn={this.state.isLoggedIn}
        history={this.props.history}
      />
    });
    const goToMenuLabel = quizListArray.length ? 'Add Another Quiz' : 'Add a Quiz';

    const listSelectionButtons = this.state.isLoggedIn ?
      <div className='listSelectionButtons'>
        <button className={goToDashboardClass}
          onClick={()=>this.goToDashboard()}>Go To My Dashboard</button>
        <button className={goToMenuClass}
          onClick={()=>this.goToMenu()}>{goToMenuLabel}</button>
      </div> : null ;

    return (
      <div className="lists">
        <h3 className="quizListHeader">{listHeader}</h3>
        <table className="quizList">
        <thead>
            <tr>
              <th style={{textAlign: "left", width: "50%"}}>Quiz</th>
              <th style={{textAlign: "left", width: "21%"}}>Category</th>
              <th style={{width: "21%"}}>Difficulty</th>
              <th style={{width: "20%"}}>{score}</th>
              <th style={{width: "8%"}}>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table> 
        {listSelectionButtons}
      </div>
    );
  };
}

export const mapStateToProps = state => ({
  general: state.general, // used for menu of all quizzes
  quizList: state.quizList, // users list of quizzes
  user: state.user, // user logged in
})

export default connect(mapStateToProps)(Lists);