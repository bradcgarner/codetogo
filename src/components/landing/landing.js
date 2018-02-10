import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';
import About from './about';
import Home from './home';
import { Switch, Route, Redirect } from 'react-router-dom';
import NoMatch from  '../display/nomatch';

export function Landing(props) {

  const handleLoginButton = () => {
    // props.dispatch(actionsDisplay.changeMode('login', props.quiz));
  }

  const handleAboutButton = () => {
    // props.dispatch(actionsDisplay.changeMode('about', props.quiz));
  }  
  
    return (
      <div className="landing">
        <Switch>
          <Route exact path = '/' component={Home}/>
          <Route                  component={NoMatch}/>
        </Switch>
        <About/>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Landing);