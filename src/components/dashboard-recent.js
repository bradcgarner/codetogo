import React from 'react';
import { connect } from 'react-redux';

export function Recent(props) {
 // Recent activity can include unfinished quizzes, etc.
    return (
      <div>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Recent);