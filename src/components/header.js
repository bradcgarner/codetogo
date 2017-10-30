import React from 'react';
import { connect } from 'react-redux';
import Home from './header-home';
import Settings from './header-settings';

export function Header(props) {
  let home = '';
  let header = '';
  let settings = '';
  let username = props.user.id ? `${props.user.firstName}'s ` : 'New User\'s' ;

  if (props.mode.view === 'landing') {
    // do nothing

  } else if (props.mode.view === 'login') {
    home =<Home where={'landing'} label={'Back'}/>; 
    header = <h1 className="headerLabel">Login</h1>;

  } else if (props.mode.view === 'about') {
    home =<Home where={'landing'} label={'Back'}/>; 
    header = <h1 className="headerLabel">About</h1>;

  } else if (props.mode.view === 'profile' && props.user.id ) {
    home =<Home where={'dashboard'} label={'Dashboard'}/>; 
    header = <h1 className="headerLabel">{username} Profile</h1>

  } else if (props.mode.view === 'profile' ) {
    home =<Home where={'landing'} label={'Back'}/>; 
    header = <h1 className="headerLabel">Create Account</h1>

  } else if (props.mode.view === 'dashboard') {
    home =<Home where={'profile'} label={'Profile'}/>; 
    header = <h1 className="headerLabel">{username} Dashboard</h1>
    settings = <Settings type ={'user'} />;

  } else if (props.mode.view === 'quizlist') {
    home =<Home where={'dashboard'} label={'Dashboard'}/>; 
    header = <h1 className="headerLabel">Menu of Quizzes</h1>;
    settings = <Settings type={'user'}/>;
    
  } else if (props.mode.view === 'question') {
    home =<Home where={'dashboard'} label={'Dashboard'}/>; 
    header = <h1 className="headerLabel">{props.quiz.name}</h1>;
    settings = <Settings type={'quiz'}/>;
    
  } else if (props.mode.view === 'results') {
    home =<Home where={'dashboard'} label={'Dashboard'}/>; 
    header = <h1 className="headerLabel">{props.quiz.name}</h1>;
    settings = <Settings type={'quiz'}/>;
    
  } else if (props.mode.view === 'accuracy') {
    home =<Home where={'dashboard'} label={'Dashboard'}/>; 
    header = <h1 className="headerLabel">Review: {props.quiz.name}</h1>;
    
  } else if (props.mode.view === 'answer') {
    home =<Home where={'dashboard'} label={'Dashboard'}/>; 
    header = <h1 className="headerLabel">See Key: {props.quiz.name}</h1>;
  }

    return (
      <header className="header">
        {home}
        {header}
        {settings}
      </header>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Header);