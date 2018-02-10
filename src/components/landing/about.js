import React from 'react';
import { connect } from 'react-redux';

export function About(props) {
  
    return (
      <div className="about">
          
          About

      </div>
    );
}

const mapStateToProps = state => ({
  display: state.display
})

export default connect(mapStateToProps)(About);