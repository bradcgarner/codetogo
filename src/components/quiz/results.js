import React from 'react';
// import { connect } from 'react-redux';
import Reason from './reason';
import Resources from './resources';
import Feedback from './feedback';


export default function Results(props) {
  // Component function: after answering question, displays subcomponents

  return (
    <div className="results">
      <Reason reason={props.reason}/>
      <Resources resources={props.resources}/>
      <Feedback />
    </div>
  );
}