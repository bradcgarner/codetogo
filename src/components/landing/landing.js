import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';
import { Link } from 'react-router-dom';
import About from './about';

export default class Landing extends React.Component {
  // Component function: landing page. Click to log in, create account, show about. Receives most 404 redirects.
  // uncontrolled if rendered, but bypass this and go to dashboard if token is in local storage.
  
  constructor(props){
    super(props);
    this.state = {
      about: false,
    }
  }

  handleAboutButton() {
    this.setState({about: !this.state.about});
  }

  render() {

    const about = this.state.about ? <About/> : null ;

    return (
      <div className="landing">
        <div className="landingTop">
          <p className="landingLogo landingLogoTop">{`{()=>{}}`}</p>
          <p className="landingLogo landingLogoMid">{`</>`}</p>
          <p className="landingLogo landingLogoBot">{`...`}</p>
          <h1 className="landingTitle">codeToGo.io</h1>
        </div>
        <div className="landingButtons">
          <Link to='/users/login'>
            <button className="enterButton">Enter</button>
          </Link>
          <button className="aboutButton"onClick={()=>this.handleAboutButton()}>About</button>
        </div>
        {about}
      </div>
    );
  }  
}