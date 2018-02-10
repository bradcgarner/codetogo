import React from 'react';
import { connect } from 'react-redux';
import Resources from './resources';
import Reason from './reason';
import Feedback from './feedback';

export function Results(props) {
  
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