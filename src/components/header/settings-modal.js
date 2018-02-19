import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export function SettingsModal(props) {
  // Component function: modal of user settings. Settings can include functions such as toggle spaced-rep on and off, or graphic options, etc. Mostly future functions.
  // User must close modal to continue in app.

  const handleSettingsButton = () => {
    props.dispatch(actionsDisplay.showModal(props.type))
  }
  
    return (
      <div>
        <button onClick={()=>handleSettingsButton()}>Settings</button>
      </div>
    );
}

const mapStateToProps = state => ({
  quiz: state.quiz,
  user: state.user,
})

export default connect(mapStateToProps)(SettingsModal);