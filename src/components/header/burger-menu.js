import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionsDisplay from '../../actions/display';
import * as actionsUser from '../../actions/user';
import { initialUser } from '../../reducers/initialState';

export function BurgerMenu(props) {
 // Component function: menu of options. 
 // Options are: logout, edit my profile, my dashboard, take another/change quiz, future statistical options
 // Settings is an option, that displays the settings modal

 const burgerMenuClass = props.display.menu ? 'burgerMenu burgerShow popover' : 'burgerMenu burgerHide popover' ;  
  
  const isLoggedIn = props.user.id ? true : false ;
  const loggedInClass = isLoggedIn ? '' : 'inactive' ;
  const loginClass = `${loggedInClass} loginButton`;
  // const profileClass = `${loggedInClass} profileButton`;
  // const quizListClass = 'quizListButton';
  const aboutClass = 'aboutButton';
  const settingsClass = `${loggedInClass} settingsButton`;

  const handleLoginButton = () => {
    if (isLoggedIn) {
      props.dispatch(actionsUser.updateUser(initialUser));
      props.history.push('/');
    } else {
      props.history.push('/users/login');
    }
  }
  const loginText = isLoggedIn ? 'Logout' : 'Login' ;
  const login = <li className={loginClass} onClick={()=>handleLoginButton(loginText)}>{loginText}</li> ;

  const profileText = isLoggedIn ? 'Profile' : 'Create Account' ;  
  const profile = props.match.url === '/users/profile' ? null : <Link to='/users/profile'>{profileText}</Link>

  const quizListText = props.match.url === '/lists' ? null : 'Lists of Quizzes' ;
  const quizList = props.match.url === '/lists' ? null : <Link to='/users/profile'>{quizListText}</Link>;

  const handleAboutButton = () => {
    props.dispatch(actionsDisplay.toggleAbout());
  }; // change this to a link    
  const about = props.match.url === '/home' ? null : <li className={aboutClass} onClick={()=>handleAboutButton()}>About</li> ;

  const handleSettingsButton = () => {
    props.dispatch(actionsDisplay.toggleSettings());
  }; // change this to a link    
  const settings = <li className={settingsClass} onClick={()=>handleSettingsButton()}>Settings</li> ;

  return (
      <div className={burgerMenuClass}>
        <ul>
          {login}
          {profile}
          {quizList}
          {about}
          {settings}
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