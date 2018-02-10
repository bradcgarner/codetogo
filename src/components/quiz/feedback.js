import React from 'react';
import { connect } from 'react-redux';

export function Feedback(props) {
  
  return (
    <div className="feedback">
      Feedback
    </div>
  );
}

export default connect()(Feedback);