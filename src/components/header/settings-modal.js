import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export function Modal(props) {
  
  const handleSettingsButton = () => {
    props.dispatch(actionsMode.showModal(props.type))
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

export default connect(mapStateToProps)(Modal);