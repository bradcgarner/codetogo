import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';

export function Back(props) {
  
  const handleBackButton=()=> {
    if(props.where === 'dashboard') {
      props.dispatch(actionsMode.gotoDashboard());      
    } else if (props.where === 'profile') {
      props.dispatch(actionsMode.gotoProfile());
    } else {
      props.dispatch(actionsMode.gotoLanding());
    }
  }

  const label = props.label ;

    return (
        <i onClick={()=>handleBackButton()} className="fa fa-hand-o-left backIcon" aria-hidden="true"></i>
    );
}

export default connect()(Back);