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
    let headerLabel = '';
    let username = this.props.user.id ? `${this.props.user.firstName}'s ` : 'New User\'s' ;
  
    if (this.props.match.url === 'landing') {
      // do nothing
  
    } else if (this.props.match.url === 'login') {
      headerLabel = 'Login';
    } else if (this.props.match.url === 'about') {
      headerLabel = 'About';
    } else if (this.props.match.url === 'profile' && this.props.user.id ) {
      headerLabel = `${username} Profile`;
    } else if (this.props.match.url === 'profile' ) {
      headerLabel = 'Create Account'
    } else if (this.props.match.url === 'dashboard') {
      headerLabel = `${username} Dashboard`
    } else if (this.props.match.url === 'quizlist') {
      headerLabel = 'Menu of Quizzes';
    } else if (this.props.match.url === 'question') {
      headerLabel = this.props.quiz.name;
    } else if (this.props.match.url === 'results') {
      headerLabel = this.props.quiz.name;
    } else if (this.props.match.url === 'accuracy') {
      // blank
    } else if (this.props.match.url === 'answer') {
      headerLabel = `See Key: ${this.props.quiz.name}`;
    }
  
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
  mode: state.mode
})

export default connect(mapStateToProps)(Header);