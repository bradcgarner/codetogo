import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';
import * as actionsUser from '../../actions/user';

export function BurgerMenu(props) {
 // Component function: menu of options. 
 // Options are: logout, edit my profile, my dashboard, take another/change quiz, future statistical options
 // Settings is an option, that displays the settings modal

 const burgerMenuClass = props.burger ? 'burgerMenu burgerShow popover' : 'burgerMenu burgerHide popover' ;  
  
  const isLoggedIn = props.user.id ? true : false ;
  const loggedInClass = isLoggedIn ? '' : 'inactive' ;
  
  const handleLoginButton = option => {
    if (option === 'Logout') {
      const userReset = {
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        quizzes: [{id: ''}], // resetting to [] doesn't work
        badges: '',
        recent: '',
        authToken: ''
      };
      // props.dispatch(actionsDisplay.changeMode('landing', props.quiz));
      props.dispatch(actionsUser.updateUser(userReset));
    } else {
      // props.dispatch(actionsDisplay.changeMode('login', props.quiz));
    }
  }

  const loginText = isLoggedIn ? 'Logout' : 'Login' ;
  const login = <li onClick={()=>handleLoginButton(loginText)}>{loginText}</li> ;

  const handleDashboardButton = () => {
    if (isLoggedIn) {
      // props.dispatch(actionsDisplay.changeMode('dashboard', props.quiz))
    }
  }
  const dashboard = <li className={loggedInClass} onClick={()=>handleDashboardButton()}>Dashboard</li> ; 

  const profileText = isLoggedIn ? 'Profile' : 'Create Account' ;  
  const handleProfileButton = null ; // change this to a link
  const profile = <li onClick={()=>handleProfileButton()}>{profileText}</li> ;

  const handleQuizListButton = () => {
    if (isLoggedIn) {
      // props.dispatch(actionsDisplay.changeMode('quizlist', props.quiz))
    }
  };    
  const quizList = <li className={loggedInClass} onClick={()=>handleQuizListButton()}>List of All Quizzes</li> ;

  const handleAboutButton = null; // change this to a link    
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
  display: state.display,
  quiz: state.quiz,
  user: state.user,
})

export default connect(mapStateToProps)(BurgerMenu);