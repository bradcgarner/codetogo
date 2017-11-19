import React from 'react';
import { connect } from 'react-redux';
import * as actionsQuiz from '../actions/quiz';
import * as actionsUser from '../actions/users';
import Burger from './header-burger';
import BurgerMenu from './header-burger-menu';

export class Header extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionsQuiz.fetchQuizzes());

    if (this.props.mode.view !== 'question' &&
    ( this.props.quiz.cacheForUser.completed || this.props.quiz.cacheForUser.correct ) &&
    this.props.quiz.id ) {
      this.props.dispatch(actionsUser.updateScoreFromCache(
        this.props.quiz.id,
        this.props.quiz.cacheForUser.completed,
        this.props.quiz.cacheForUser.correct
      ));
      this.props.dispatch(actionsQuiz.clearUserCache());
    }
  }

 

  render() {
    let headerLabel = '';
    let username = this.props.user.id ? `${this.props.user.firstName}'s ` : 'New User\'s' ;
  
    if (this.props.mode.view === 'landing') {
      // do nothing
  
    } else if (this.props.mode.view === 'login') {
      headerLabel = 'Login';
    } else if (this.props.mode.view === 'about') {
      headerLabel = 'About';
    } else if (this.props.mode.view === 'profile' && this.props.user.id ) {
      headerLabel = `${username} Profile`;
    } else if (this.props.mode.view === 'profile' ) {
      headerLabel = 'Create Account'
    } else if (this.props.mode.view === 'dashboard') {
      headerLabel = `${username} Dashboard`
    } else if (this.props.mode.view === 'quizlist') {
      headerLabel = 'Menu of Quizzes';
    } else if (this.props.mode.view === 'question') {
      headerLabel = this.props.quiz.name;
    } else if (this.props.mode.view === 'results') {
      headerLabel = this.props.quiz.name;
    } else if (this.props.mode.view === 'accuracy') {
      // blank
    } else if (this.props.mode.view === 'answer') {
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