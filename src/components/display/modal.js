import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export class Modal extends React.Component {
  // Component function: displays message to user (usually error message)
  
  exit() {
    this.props.dispatch(actionsDisplay.closeModal());
  }

  render() {
    const message = this.props.display.modalMessage ? this.props.display.modalMessage : 'Sorry... something went wrong...' ;

    return (
      <div className='modalContainer'>
        <div className='modalBackground'
          onClick={()=>{}}>
        </div>
        <div className='modalPanel'>
          <p className='modalMessage'>
            {message}
          </p>
          <i className="fa fa-times-circle modalExitButton" aria-hidden="true"
            onClick={()=>this.exit()}></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  display: state.display,
})

export default connect(mapStateToProps)(Modal);


  