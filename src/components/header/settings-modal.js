import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export function SettingsModal(props) {
  
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
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(SettingsModal);