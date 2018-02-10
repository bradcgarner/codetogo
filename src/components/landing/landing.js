import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export function Landing(props) {

  const handleLoginButton = () => {
    // props.dispatch(actionsDisplay.changeMode('login', props.quiz));
  }

  const handleAboutButton = () => {
    // props.dispatch(actionsDisplay.changeMode('about', props.quiz));
  }  
  
    return (
      <div className="landing">
        <div className="landingCover">
          <p className="landingLogo landingLogoTop">{`{()=>{}}`}</p>
          <p className="landingLogo landingLogoMid">{`</>`}</p>
          <p className="landingLogo landingLogoBot">{`~~~`}</p>
          <h1 className="landingTitle">codeToGo.io</h1>
        </div>
        <div className="landingButtons">
          <button className="enterButton" onClick={()=>handleLoginButton()}>Enter</button>
          <button className="aboutButton"onClick={()=>handleAboutButton()}>About</button>
        </div>
      </div>

    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Landing);