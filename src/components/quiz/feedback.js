import React from 'react';
import { connect } from 'react-redux';

// ADD REDUX FORM!!!

export function Feedback(props) {
  // Component function: allow user to submit feedback on specific questions
  
  return (
    <div className="feedback">
      Feedback
    </div>
  );
}

export default connect()(Feedback);