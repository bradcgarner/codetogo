import React from 'react';
import { connect } from 'react-redux';
// import Back from './header-back';
import Burger from './header-burger';
import BurgerMenu from './header-burger-menu';

export function Header(props) {
  let headerLabel = '';
  let username = props.user.id ? `${props.user.firstName}'s ` : 'New User\'s' ;

  if (props.mode.view === 'landing') {
    // do nothing

  } else if (props.mode.view === 'login') {
    headerLabel = 'Login';
  } else if (props.mode.view === 'about') {
    headerLabel = 'About';
  } else if (props.mode.view === 'profile' && props.user.id ) {
    headerLabel = `${username} Profile`;
  } else if (props.mode.view === 'profile' ) {
    headerLabel = 'Create Account'
  } else if (props.mode.view === 'dashboard') {
    headerLabel = `${username} Dashboard`
  } else if (props.mode.view === 'quizlist') {
    headerLabel = 'Menu of Quizzes';
  } else if (props.mode.view === 'question') {
    headerLabel = props.quiz.name;
  } else if (props.mode.view === 'results') {
    headerLabel = props.quiz.name;
  } else if (props.mode.view === 'accuracy') {
    // blank
  } else if (props.mode.view === 'answer') {
    headerLabel = `See Key: ${props.quiz.name}`;
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

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Header);