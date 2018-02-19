import React from 'react';

export default function Loading(props) {
  // Component function: displays spinner during async actions if user input it to wait on async actions (not used if async runs completely in background)

  return (
    <div className='loadingContainer'>
      <div className='loadingBackground'
        onClick={props.fn}>
      </div>
      <i className='fa fa-spinner loadingIcon' aria-hidden="true"></i>
    </div>
  );
}