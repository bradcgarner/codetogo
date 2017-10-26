import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';
import Modal from './header-settings-modal';
// we need to call the modal somewhere!

export function Settings(props) {
  
  const handleSettingsButton = () => {
    props.dispatch(actionsMode.showModal(props.type))
  }
  
    return (
        <i onClick={()=>handleSettingsButton()} className="fa fa-cogs settingsIcon" aria-hidden="true"></i>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Settings);