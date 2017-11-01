import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';
import * as actionsUser from '../actions/users';

export function BurgerMenu(props) {

  const burgerMenuClass = props.mode.burger ? 'burgerMenu burgerShow popover' : 'burgerMenu burgerHide popover' ;  
  
  const isLoggedIn = props.user.id ? true : false ;
  const loggedInClass = isLoggedIn ? '' : 'inactive' ;
  
  const handleLoginButton = option => {
    if (option === 'Logout') {
      const userReset = {
        id: null,
        firstName: '',
        lastName: '',
        username: '',
        quizzes: [],
        badges: '',
        recent: '',
        authToken: ''
      };
      props.dispatch(actionsMode.gotoLanding());
      props.dispatch(actionsUser.updateUserStore(userReset));
    } else {
      props.dispatch(actionsMode.gotoLogin());
    }
  }

  const loginText = isLoggedIn ? 'Logout' : 'Login' ;
  const login = <li onClick={()=>handleLoginButton(loginText)}>{loginText}</li> ;

  const handleDashboardButton = () => {
    if (isLoggedIn) {
      props.dispatch(actionsMode.gotoDashboard())
    }
  }
  const dashboard = <li className={loggedInClass} onClick={()=>handleDashboardButton()}>Dashboard</li> ; 

  const profileText = isLoggedIn ? 'Profile' : 'Create Account' ;  
  const handleProfileButton = () => props.dispatch(actionsMode.gotoProfile());    
  const profile = <li onClick={()=>handleProfileButton()}>{profileText}</li> ;

  const handleQuizListButton = () => {
    if (isLoggedIn) {
      props.dispatch(actionsMode.gotoQuizlist())
    }
  };    
  const quizList = <li className={loggedInClass} onClick={()=>handleQuizListButton()}>List of All Quizzes</li> ;

  const handleAboutButton = () => props.dispatch(actionsMode.gotoAbout());    
  const about = <li onClick={()=>handleAboutButton()}>About</li> ;

    return (
      <div className={burgerMenuClass}>
        <ul>
          {login}
          {dashboard}
          {profile}
          {quizList}
          {about}
        </ul>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(BurgerMenu);