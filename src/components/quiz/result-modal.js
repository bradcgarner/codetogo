import React from 'react';

export default function ResultModal(props) {
  // Component function: displays message to user (usually error message)

  const icon = props.correct ? <i className="fas fa-thumbs-up"></i> :
  <i className="fas fa-thumbs-down"></i> ;

  return (
    <div className='result-modal'>
      {icon}
    </div>
  );
}