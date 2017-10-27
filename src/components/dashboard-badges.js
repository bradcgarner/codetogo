import React from 'react';
import { connect } from 'react-redux';

export function Badges(props) {
// badges can be earned based on category (e.g. HTML, React), accuracy, difficulty, and score
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

export default connect(mapStateToProps)(Badges);