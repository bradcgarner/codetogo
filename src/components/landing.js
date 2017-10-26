import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';

export function Landing(props) {

  const handleLoginButton = () => {
    props.dispatch(actionsMode.gotoLogin());
  }

  const handleAboutButton = () => {
    props.dispatch(actionsMode.gotoAbout());
  }  
  
    return (
      <div className="landing">
        <div className="landingCover">
          <p className="landingLogo landingLogoTop">{`{()=>{}}`}</p>
          <p className="landingLogo landingLogoMid">{`~~:~~`}</p>
          <p className="landingLogo landingLogoBot">{`==`}</p>
          <h1 className="landingTitle">ama afk</h1>
        </div>
        <button className="loginButton clearfix" onClick={()=>handleLoginButton()}>Enter</button>
        <br />
        <button className="aboutButton clearfix"onClick={()=>handleAboutButton()}>About</button>
      </div>

    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Landing);