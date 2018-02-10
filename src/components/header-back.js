import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../actions/display';

export function Back(props) {
  
  const handleBackButton=()=> {
    if(props.where === 'dashboard') {
      props.dispatch(actionsMode.changeMode('dashboard', props.quiz));      
    } else if (props.where === 'profile') {
      props.dispatch(actionsMode.changeMode('profile', props.quiz));
    } else {
      props.dispatch(actionsMode.changeMode('landing', props.quiz));
    }
  }

  const label = props.label ;

    return (
        <i onClick={()=>handleBackButton()} className="fa fa-hand-o-left backIcon" aria-hidden="true"></i>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Back);