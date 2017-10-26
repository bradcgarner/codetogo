import React from 'react';
import { connect } from 'react-redux';

export function ResultsGraph(props) {

    return (
      <div>
        <p>ResultsGraph</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(ResultsGraph);