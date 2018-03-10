import React from 'react';
import { connect } from 'react-redux';
import * as actionsGeneral from '../../actions/general';
import BurgerIcon from './burger-icon';
import BurgerMenu from './burger-menu';

export class Header extends React.Component {
  // Component function: header across top of screen. Permanently displayed.

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
          <BurgerMenu match={this.props.match}/>
          <div className="header">
            <h1 className="headerLabel">{headerLabel}</h1>
            <BurgerIcon />
          </div>
        </header>
      );
  }
  
}

export const mapStateToProps = state => ({
  quiz: state.quiz,
  user: state.user,
})

export default connect(mapStateToProps)(Header);