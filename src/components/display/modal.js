import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export class Modal extends React.Component {
  
  handleCloseButton() {
    this.props.dispatch(actionsDisplay.closeModal());
  }

  render() {
    const message = `Sorry, ${this.props.mode.message}`;

    return (
      <div className="modalMask">
        <div className="modal">
          <p className="message">{message}</p>
          <i className="fa fa-window-close modalButton" aria-hidden="true" onClick={()=>this.handleCloseButton()}></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.mode,
})

export default connect(mapStateToProps)(Modal);