import React from 'react';
import { connect } from 'react-redux';

export function Resources(props) {
  // Component function: after answering question, displays resources for learning more or documentation about this topic

  return (
    <div className="resources">
      Resources
    </div>
  );
}

export default connect()(Resources);