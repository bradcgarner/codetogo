import React from 'react';

export default class Loading extends React.Component {
  // Component function: displays spinner during async actions if user input it to wait on async actions (not used if async runs completely in background)
  render() {

    return (
      <div className='loadingContainer'>
        <div className='loadingBackground'
          onClick={()=>{}}>
        </div>
        <i className='fa fa-spinner loadingIcon' aria-hidden="true"></i>
      </div>
    );
  }
}