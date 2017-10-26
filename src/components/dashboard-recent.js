import React from 'react';
import { connect } from 'react-redux';

export function Recent(props) {

    return (
      <div>
        <p className="temp">Recent Activity includes unfinished quizzes</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Recent);