import React from 'react';
import { connect } from 'react-redux';

export function Reason(props) {
  // Component function: after answering question, displays reason correct answer is correct

  return (
    <div className="reason">
      Reason
    </div>
  );
}

export default connect()(Reason);