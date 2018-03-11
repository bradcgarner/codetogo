import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import * as actionsDisplay from '../../actions/display';
import * as actionsUser from '../../actions/user';
import { initialUser } from '../../reducers/initialState';

export function BurgerMenu(props) {
 // Component function: menu of options. 
 // Options are: logout, edit my profile, my dashboard, take another/change quiz, future statistical options
 // Settings is an option, that displays the settings modal

  const handleLoginButton = () => {
    if (isLoggedIn) {
      props.dispatch(actionsUser.loadUser(initialUser));
      props.dispatch(actionsDisplay.toggleMenu());
      props.history.push('/');
    } else {
      props.history.push('/users/login');
      props.dispatch(actionsDisplay.toggleMenu());
    }
  } 
  const handleProfileButton = () => {
    props.history.push('/users/profile');
    props.dispatch(actionsDisplay.toggleMenu());
  } 
  const handleQuizListButton = () => {
    props.history.push('/lists');
    props.dispatch(actionsDisplay.toggleMenu());
  } 
  const handleAboutButton = () => {
    props.history.push('/');
    props.dispatch(actionsDisplay.toggleMenu());
  } 
  const handleSettingsButton = () => {
    props.history.push('/settings');
    props.dispatch(actionsDisplay.toggleMenu());
  } 
  const handleSpacedRepButton = () => {
    props.dispatch(actionsDisplay.toggleSpacedRepGraphic())
    props.dispatch(actionsDisplay.toggleMenu());
  } 

  const burgerMenuClass = props.display.menu ? 'burgerMenu burgerShow popover' : 'burgerMenu burgerHide popover' ;  
  
  const isLoggedIn = props.user.id ? true : false ;
  const loggedInClass = isLoggedIn ? '' : 'inactive' ;

  const loginClass    = `loginMenuItem     ${loggedInClass}`;
  const profileClass  = `profileMenuItem   ${loggedInClass}`;
  const quizListClass = 'quizListMenuItem';
  const aboutClass    = 'aboutMenuItem';
  const settingsClass = `settingsMenuItem  ${loggedInClass}`;
  const spacedRepClass= `spacedrepMenuItem ${loggedInClass}`;

  const loginText = isLoggedIn ? 'Logout' : 'Login' ;
  const login = <li className={loginClass} 
    onClick={()=>handleLoginButton(loginText)}>
      {loginText}
  </li> ;

  const profileText = isLoggedIn ? 'Profile' : 'Create Account' ;  
  const profile = props.match.url === '/users/profile' ? null : 
    <li className={profileClass} 
    onClick={()=>handleProfileButton()}>
      {profileText}
  </li>

  const quizListText = props.match.url === '/lists' ? null : 'Lists of Quizzes' ;
  const quizList = props.match.url === '/lists' ? null : 
    <li className={quizListClass}
      onClick={()=>handleQuizListButton()}>
        {quizListText}
    </li> ;

  const about = props.match.url === '/home' ? null : 
    <li className={aboutClass}
      onClick={()=>handleAboutButton()}>
        About
    </li> ;

  const settings = isLoggedIn ?
    <li className={settingsClass}
      onClick={()=>handleSettingsButton()}>
        Settings
    </li> : null ;

  const spacedRepText = props.display.spacedRepGraphic ? 'Hide Algorithm' : 'Show Algorithm' ;
  const spacedRep = isLoggedIn && props.match.url === '/quizzes' ?
    <li className={spacedRepClass} 
      onClick={()=>handleSpacedRepButton()}>
        {spacedRepText}
    </li> : null ;

  return (
      <div className={burgerMenuClass}>
        <ul>
          {login}
          {profile}
          {quizList}
          {about}
          {settings}
          {spacedRep}
        </ul>
      </div>
    );
}

export const mapStateToProps = state => ({
  display: state.display,
  quiz: state.quiz,
  user: state.user,
})

export default connect(mapStateToProps)(BurgerMenu);