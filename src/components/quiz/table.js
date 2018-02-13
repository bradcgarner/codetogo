import React from 'react';
import { connect } from 'react-redux';

export function Table(props) {

  return (
    <div>Table</div>
  );
}

const mapStateToProps = state => ({
  quiz: state.quiz,
  questions: state.questions,
})

export default connect(mapStateToProps)(Table);