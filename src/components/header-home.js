import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';

export function Home(props) {
  
  const handleHomeButton=()=> {
    console.log('GOING ~~~~~ TO ~~~~~', props.where);
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
        <i onClick={()=>handleHomeButton()} className="fa fa-hand-o-left homeIcon" aria-hidden="true"></i>
    );
}

export default connect()(Home);