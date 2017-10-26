import React from 'react';
import { connect } from 'react-redux';

export function Badges(props) {

    return (
      <div>
        <p className="temp">Badges</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Badges);