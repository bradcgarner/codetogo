import React from 'react';
import { connect } from 'react-redux';
import Resources from './resources';
import Reason from './reason';
import Feedback from './feedback';

export function Results(props) {
  // Component function: after answering question, displays whether user's answer is correct

  return (
    <div className="results">
      Results
      <Reason/>
      <Resources/>
      <Feedback/>
    </div>
  );
}

export default connect()(Results);