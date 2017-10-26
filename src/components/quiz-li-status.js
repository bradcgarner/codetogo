import React from 'react';
import { connect } from 'react-redux';

export function QuizLiStatus(props) {

  const total= props.total || 0;
  const completed= props.completed || 0;
  const correct= props.correct || 0;

    return (
      <div className="statusBox">
        <span>{total}|{completed}|{correct}</span>
      </div>
    );
}

export default connect()(QuizLiStatus);