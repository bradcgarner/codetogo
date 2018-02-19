import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export function Modal(props) {
  // Component function: displays message to user (usually error message)
  
  const exit = () => {
    props.dispatch(actionsDisplay.closeModal());
  }

  const message = props.display.modalMessage ? props.display.modalMessage : 'Sorry... something went wrong...' ;

  return (
    <div className='modalContainer'>
      <div className='modalBackground'
        onClick={props.fn}>
      </div>
      <div className='modalPanel'>
        <p className='modalMessage'>
          {message}
        </p>
        <i className="fa fa-times-circle modalExitButton" aria-hidden="true"
          onClick={()=>exit()}></i>
      </div>
    </div>
  );
}

export const mapStateToProps = state => ({
  display: state.display,
})

export default connect(mapStateToProps)(Modal);


  