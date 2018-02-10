import React from 'react';
import { connect } from 'react-redux';
import * as actionsQuiz from '../../actions/quiz';
import * as actionsGeneral from '../../actions/general';
import Burger from './burger';
import BurgerMenu from './burger-menu';
import Back from './back';
import SettingsModal from './settings-modal';

export class Header extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionsGeneral.initialize());
  }

  render() {
    let username = this.props.user.id ? `${this.props.user.firstName}'s ` : 'New User\'s' ;
    const path = this.props.match.url;
    const headerLabel = 
      path === 'landing' ? 'Welcome1' :
      path === '/users/login' ? 'Login' :
      path === '/users/profile' && this.props.user.id  ?  `${username} Profile` : 
      path === '/users/profile'  ?  'Create Account' :
      path === '/lists/dashboard' ? `${username} Dashboard` :
      path === '/lists/quizmenu' ?  'Menu of Quizzes' : 
      path === '/quiz' ?  this.props.quiz.name : 
      path === 'answer' ?  `See Key: ${this.props.quiz.name}` :
      'Welcome!';
  
      return (
        <header className="headerContainer">
          <BurgerMenu />
          <div className="header">
            <h1 className="headerLabel">{headerLabel}</h1>
            <Burger />
          </div>
        </header>
      );
  }
  
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  display: state.display
})

export default connect(mapStateToProps)(Header);