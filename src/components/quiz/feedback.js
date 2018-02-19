import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';

export function Feedback(props) {
  // Component function: allow user to submit feedback on specific questions
  
  return (
    <div className="feedback">
      Feedback
    </div>
  );
}

export const mapStateToProps = state => ({
  questions: state.questions,
  quiz: state.quiz,
  user: state.user,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'feedback'})
)(Feedback);