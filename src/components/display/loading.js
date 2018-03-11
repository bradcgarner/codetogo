import React from 'react';

export default function Loading(props) {
  // Component function: displays spinner during async actions if user input it to wait on async actions (not used if async runs completely in background)

  return (
    <div className='loadingContainer'>
      <div className='loadingBackground'
        onClick={props.fn}>
      </div>
      <i className='fas fa-wrench loadingIcon' aria-hidden="true"></i>
    </div>
  );
}