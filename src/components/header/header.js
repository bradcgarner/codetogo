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

    const score = path === '/quizzes' ? this.props.quiz.score : null ;

    const headerLabel = 
      path === '/' ? 'Welcome!' :
      path === '/users/login' ? 'Login' :
      path === '/users/profile' && this.props.user.id  ?  `${username} Profile` : 
      path === '/users/profile'  ?  'Create Account' :
      path === '/lists/dashboard' ? `${username} Dashboard` :
      path === '/lists/quizmenu' ?  'Menu of Quizzes' : 
      path === '/quizzes' ?  this.props.quiz.name : 
      'Welcome!';
  
      return (
        <header className="headerContainer">
          <BurgerMenu match={this.props.match} history={this.props.history}/>
          <div className="header">
            <div className='header-score'>{score}</div>
            <h1 className="header-label">{headerLabel}</h1>
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